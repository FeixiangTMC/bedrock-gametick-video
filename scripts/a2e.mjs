#!/usr/bin/env node
/**
 * a2e.mjs — anything2explainer 的跨平台命令行（Windows / macOS / Linux 通用）
 *
 * 上游的 new_project.sh / still.sh / preview.sh / render.sh / test_render.sh 都是 zsh 脚本，
 * Windows 上（无 zsh、无 WSL 发行版）跑不起来。本文件是它们的等价实现，命令与语义一一对应：
 *
 *   node scripts/a2e.mjs new <dest> <slug>                    等价 new_project.sh
 *   node scripts/a2e.mjs tts [args...]                        等价 `python3 scripts/tts_build.py`
 *   node scripts/a2e.mjs still <Comp> <frames> <out> [tag]    等价 still.sh   （帧号 1 起、逗号分隔）
 *   node scripts/a2e.mjs preview [sec=30] [from=0]            等价 preview.sh （前 N 秒样片）
 *   node scripts/a2e.mjs render [ver=v1]                      等价 render.sh  （整片 + 抽帧 + 缩略图）
 *   node scripts/a2e.mjs test <Comp> <startFrame> [tag]       等价 test_render.sh（测 30 帧渲速）
 *   node scripts/a2e.mjs doctor                               环境体检
 *
 * 与 .sh 的有意差异：
 *   - fs.cp 代替 rsync（Windows 没有 rsync）；字符串替换代替 sed -i；
 *   - python3 → 自动探测 python3 / python / py；
 *   - 自动把 tools 目录（ffmpeg 等）前置进子进程 PATH，不依赖父 shell 是否已刷新；
 *   - 不按 mtime 清理 remotion 临时 bundle（Windows 上递归删 tmp 风险大，需要时手动清）。
 *
 * 环境变量沿用上游：CONC / RTIMEOUT / VER / SKIP_BUNDLE / KEEP_BUNDLE，外加 TTS_ENGINE / VOICE 等（透传给 tts_build.py）
 */
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_ROOT = path.resolve(HERE, '..');
const ROOT = process.cwd();
const IS_WIN = process.platform === 'win32';

/** 本机工具目录（ffmpeg 静态包放这里）；子进程统一前置进 PATH */
const TOOLS_BIN = path.join(os.homedir(), '.dsh', 'tools', 'ffmpeg', 'bin');
const BASE_PATH = process.env.PATH || process.env.Path || '';
const CHILD_PATH = fs.existsSync(TOOLS_BIN) ? [TOOLS_BIN, BASE_PATH].join(path.delimiter) : BASE_PATH;

const C = {
  dim: (s) => (process.stdout.isTTY ? `\x1b[2m${s}\x1b[0m` : s),
  red: (s) => (process.stdout.isTTY ? `\x1b[31m${s}\x1b[0m` : s),
  green: (s) => (process.stdout.isTTY ? `\x1b[32m${s}\x1b[0m` : s),
};

function die(msg, code = 1) {
  console.error(C.red(msg));
  process.exit(code);
}

function q(a) {
  const s = String(a);
  return /[\s"&|<>^()]/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
}

/**
 * Windows 上 npm / npx / tsc 是 .cmd，Node 18.20+ 起必须 shell:true 才拉得起来
 * （CVE-2024-27980 之后 shell:false + .cmd 直接 EINVAL）。
 * 传单个命令串而不是 args 数组，既走 shell 又不会触发 DEP0190 告警。
 */
function run(cmd, args, opts = {}) {
  const line = [cmd, ...args].map(q).join(' ');
  const r = spawnSync(line, {
    stdio: opts.quiet ? 'pipe' : 'inherit',
    cwd: opts.cwd ?? ROOT,
    shell: true,
    // PYTHONUTF8：tsv/HTML 等产物含中文，脚本里有裸 open()，Windows 默认 GBK 会 UnicodeEncodeError
    env: {...process.env, PATH: CHILD_PATH, Path: CHILD_PATH, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8'},
    encoding: 'utf8',
  });
  if (r.error) die(`${cmd} 启动失败：${r.error.message}`);
  return r;
}

function mustRun(cmd, args, opts) {
  const r = run(cmd, args, opts);
  if (r.status !== 0) die(`命令失败（${r.status}）：${cmd} ${args.join(' ')}`);
  return r;
}

const readText = (p) => fs.readFileSync(p, 'utf8');

function slugOf() {
  const m = readText(path.join(ROOT, 'src/config.ts')).match(/slug:\s*'([^']+)'/);
  if (!m) die('读不到 src/config.ts 里的 slug');
  return m[1];
}

function totalFramesOf() {
  const m = readText(path.join(ROOT, 'src/common/timeline.ts')).match(/TOTAL_FRAMES\s*=\s*(\d+)/);
  if (!m) die('读不到 src/common/timeline.ts 里的 TOTAL_FRAMES');
  return Number(m[1]);
}

/** python3 → python → py 探测 */
let pyCache;
function pythonBin() {
  if (pyCache !== undefined) return pyCache;
  for (const cand of ['python3', 'python', 'py']) {
    const r = run(cand, ['-c', 'import sys;print(sys.version_info[0])'], {quiet: true});
    if (r.status === 0 && String(r.stdout).trim() === '3') return (pyCache = cand);
  }
  return (pyCache = null);
}

/** ffmpeg：先看 PATH，再退回本机 tools 目录 */
function ffmpegBin() {
  if (run('ffmpeg', ['-version'], {quiet: true}).status === 0) return 'ffmpeg';
  const local = path.join(TOOLS_BIN, IS_WIN ? 'ffmpeg.exe' : 'ffmpeg');
  return fs.existsSync(local) ? local : null;
}

function bundleTo(outDir) {
  mustRun('npx', ['remotion', 'bundle', 'src/index.ts', '--out-dir', outDir, '--log=error']);
}

const ensureBundle = (dir) => {
  if (!fs.existsSync(dir)) bundleTo(dir);
};

// ---------------------------------------------------------------- new
function cmdNew(argv) {
  const [destArg, slugArg] = argv;
  if (!destArg) die('usage: a2e.mjs new <dest_dir> <slug>');
  if (!/^[A-Za-z0-9_-]+$/.test(slugArg ?? '')) die(`slug 只能用字母/数字/-/_，收到：${slugArg}`);
  if (!fs.existsSync(path.join(TEMPLATE_ROOT, 'src/config.ts'))) {
    die(`找不到模板（${TEMPLATE_ROOT} 不像 template/）`);
  }

  const dest = path.resolve(destArg);
  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) die(`目标目录非空：${dest}`);

  fs.mkdirSync(dest, {recursive: true});
  fs.cpSync(TEMPLATE_ROOT, dest, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(TEMPLATE_ROOT, src).replace(/\\/g, '/');
      if (rel === '') return true;
      if (rel === 'node_modules' || rel.startsWith('node_modules/')) return false;
      if (/^build[^/]*(\/|$)/.test(rel)) return false;
      for (const skip of ['renders', 'fin_frames', 'stills', 'audio/cache', '.git']) {
        if (rel === skip || rel.startsWith(skip + '/')) return false;
      }
      return true;
    },
  });

  const cfgPath = path.join(dest, 'src/config.ts');
  const cfg = readText(cfgPath);
  if (!/slug:\s*'demo'/.test(cfg)) console.warn(C.dim("⚠ 模板里没找到 slug: 'demo'，跳过替换"));
  fs.writeFileSync(cfgPath, cfg.replace(/slug:\s*'demo'/, `slug: '${slugArg}'`), 'utf8');

  for (const d of [`public/assets/${slugArg}`, 'script', 'research', 'qc', 'stills', 'renders']) {
    fs.mkdirSync(path.join(dest, d), {recursive: true});
  }

  mustRun('npm', ['install', '--silent'], {cwd: dest});
  mustRun('npx', ['tsc', '--noEmit'], {cwd: dest});
  console.log(C.green(`project ready: ${dest} (slug=${slugArg})`));
}

// ---------------------------------------------------------------- tts
function cmdTts(argv) {
  const py = pythonBin();
  if (!py) die('找不到 python3（Windows 上装 Python 3 并勾选 Add to PATH）');
  mustRun(py, ['scripts/tts_build.py', ...argv]);
}

// ---------------------------------------------------------------- still
function cmdStill(argv) {
  const [comp, frames, outDir, tagArg] = argv;
  if (!comp || !frames || !outDir) die('usage: a2e.mjs still <Comp> <frames,csv> <out_dir> [tag]');
  const buildDir = `build_dev_${tagArg || comp}`;
  ensureBundle(buildDir);
  fs.mkdirSync(outDir, {recursive: true});
  for (const raw of frames.split(',')) {
    const n = Number(raw.trim());
    if (!Number.isInteger(n) || n < 1) die(`帧号必须是 1 起的整数，收到：${raw}`);
    mustRun('npx', [
      'remotion', 'still', buildDir, comp,
      path.join(outDir, `f_${String(n).padStart(4, '0')}.png`),
      `--frame=${n - 1}`, '--log=error',
    ]);
  }
  console.log(fs.readdirSync(outDir).length);
}

// ---------------------------------------------------------------- preview
function cmdPreview(argv) {
  const sec = Number(argv[0] ?? 30);
  const from = Number(argv[1] ?? 0);
  const slug = slugOf();
  const total = totalFramesOf();
  const a = from * 30;
  const b = Math.min(a + sec * 30 - 1, total - 1);
  if (a >= total) die(`起始秒 ${from} 超出片长（${(total / 30).toFixed(1)}s）`);

  if (!(process.env.SKIP_BUNDLE === '1' && fs.existsSync('build_prev'))) {
    fs.rmSync('build_prev', {recursive: true, force: true});
    bundleTo('build_prev');
  }
  fs.mkdirSync('renders', {recursive: true});
  const outFile = `renders/${slug}_preview_${from}-${from + sec}s.mp4`;
  mustRun('npx', [
    'remotion', 'render', 'build_prev', 'Video', outFile,
    '--codec=h264', '--crf=18', `--frames=${a}-${b}`,
    `--concurrency=${process.env.CONC || '6'}`, `--timeout=${process.env.RTIMEOUT || '300000'}`, '--log=error',
  ]);
  if (!fs.existsSync(outFile) || fs.statSync(outFile).size === 0) die('PREVIEW FAILED');
  if (process.env.KEEP_BUNDLE !== '1') fs.rmSync('build_prev', {recursive: true, force: true});
  console.log(outFile);
}

// ---------------------------------------------------------------- render
function cmdRender(argv) {
  const ver = process.env.VER || argv[0] || 'v1';
  const slug = slugOf();
  if (!(process.env.SKIP_BUNDLE === '1' && fs.existsSync('build_full'))) {
    fs.rmSync('build_full', {recursive: true, force: true});
    bundleTo('build_full');
  }
  fs.mkdirSync('renders', {recursive: true});
  const outFile = `renders/${slug}_${ver}.mp4`;
  mustRun('npx', [
    'remotion', 'render', 'build_full', 'Video', outFile,
    '--codec=h264', '--crf=16',
    `--concurrency=${process.env.CONC || '6'}`, `--timeout=${process.env.RTIMEOUT || '300000'}`, '--log=error',
  ]);
  if (!fs.existsSync(outFile) || fs.statSync(outFile).size === 0) die('RENDER FAILED');

  const ff = ffmpegBin();
  if (!ff) die('找不到 ffmpeg（抽帧与质检需要）：把 ffmpeg.exe 放进 PATH 或 ~/.dsh/tools/ffmpeg/bin/');
  fs.rmSync('fin_frames', {recursive: true, force: true});
  fs.mkdirSync('fin_frames', {recursive: true});
  mustRun(ff, ['-v', 'error', '-y', '-i', outFile, '-q:v', '4', 'fin_frames/f_%04d.jpg']);
  const n = fs.readdirSync('fin_frames').length;
  fs.writeFileSync('fin_count.txt', String(n), 'utf8');

  const py = pythonBin();
  if (py) {
    const r = run(py, ['scripts/sheet.py', 'fin_frames', `renders/sheet_${ver}.html`, '60'], {quiet: true});
    if (r.status !== 0) console.warn(C.dim('⚠ sheet.py 失败（缩略图 HTML 跳过），不影响成片'));
  }
  if (process.env.KEEP_BUNDLE !== '1') fs.rmSync('build_full', {recursive: true, force: true});
  fs.writeFileSync('render.done', 'done\n', 'utf8');
  console.log(C.green('done ') + outFile + C.dim(`  (${n} frames extracted)`));
}

// ---------------------------------------------------------------- test
function cmdTest(argv) {
  const [comp, startArg, tagArg] = argv;
  if (!comp || !startArg) die('usage: a2e.mjs test <Comp> <startFrame> [tag]');
  const a = Number(startArg);
  const buildDir = `build_dev_${tagArg || comp}`;
  ensureBundle(buildDir);
  const out = fs.mkdtempSync(path.join(os.tmpdir(), `a2e_test_${tagArg || comp}_`));
  const t0 = Date.now();
  try {
    mustRun('npx', [
      'remotion', 'render', buildDir, comp, out, '--sequence',
      '--image-format=jpeg', `--frames=${a - 1}-${a + 28}`, '--log=error',
    ]);
    const n = fs.readdirSync(out).length;
    const dt = (Date.now() - t0) / 1000;
    console.log(`${n} frames in ${dt.toFixed(1)}s → ${(n / dt).toFixed(1)} fps`);
  } finally {
    fs.rmSync(out, {recursive: true, force: true});
  }
}

// ---------------------------------------------------------------- doctor
function cmdDoctor() {
  const rows = [];
  const add = (name, ok, detail) => rows.push({name, ok, detail});

  add('node ≥18', Number(process.versions.node.split('.')[0]) >= 18, process.versions.node);

  const npmv = run('npm', ['--version'], {quiet: true});
  add('npm', npmv.status === 0, String(npmv.stdout || '').trim() || '不可用');

  const ff = ffmpegBin();
  if (ff) {
    const v = run(ff, ['-version'], {quiet: true});
    add('ffmpeg', true, String(v.stdout || '').split('\n')[0].slice(0, 44));
  } else add('ffmpeg', false, '不在 PATH，也不在 ~/.dsh/tools/ffmpeg/bin');

  const py = pythonBin();
  add('python3', !!py, py ?? '未找到');

  if (py) {
    const probe = 'import importlib.util as u;m=["edge_tts","numpy","PIL","scipy"];print(",".join(x for x in m if u.find_spec(x) is None))';
    const r = run(py, ['-c', probe], {quiet: true});
    const missing = String(r.stdout || '').trim();
    add('python 依赖', missing === '', missing === '' ? 'edge_tts / numpy / PIL / scipy 就绪' : `缺：${missing}`);
    const v = run(py, ['-c', 'import edge_tts;print(edge_tts.__version__)'], {quiet: true});
    const ver = String(v.stdout || '').trim();
    // 7.2.8 对 Microsoft 端点返回 403；7.3.1 已修复
    add('edge-tts', v.status === 0 && ver !== '7.2.8', ver || '未安装');
  }

  const isProject = fs.existsSync(path.join(ROOT, 'src/config.ts'));
  add('当前目录=项目根', isProject, ROOT);
  if (isProject) {
    add('node_modules', fs.existsSync(path.join(ROOT, 'node_modules')), 'npm install 产物');
    add('配音 audio.wav', fs.existsSync(path.join(ROOT, `public/assets/${slugOf()}/audio.wav`)), 'a2e.mjs tts 产物（可选）');
  }

  console.log('\n anything2explainer · doctor\n');
  for (const r of rows) console.log(`  ${r.ok ? C.green('✓') : C.red('✗')} ${r.name.padEnd(16)} ${C.dim(String(r.detail))}`);
  const bad = rows.filter((r) => !r.ok);
  console.log('');
  if (bad.length) {
    console.log(C.red(`  ${bad.length} 项待修：`) + bad.map((b) => b.name).join('、'));
    process.exitCode = 1;
  } else console.log(C.green('  全部通过'));
  console.log(C.dim(`  ${process.platform} · 模板 ${TEMPLATE_ROOT}\n`));
}

// ---------------------------------------------------------------- main
const table = {
  new: cmdNew, tts: cmdTts, still: cmdStill, preview: cmdPreview,
  render: cmdRender, test: cmdTest, doctor: cmdDoctor,
  help: () => console.log(`anything2explainer · a2e.mjs

  node scripts/a2e.mjs new <dest> <slug>                  建项目（复制模板 + 改 slug + npm install + tsc）
  node scripts/a2e.mjs tts [args...]                      配音 + 时间轴（透传 tts_build.py）
  node scripts/a2e.mjs still <Comp> <frames> <out> [tag]  出静帧（帧号 1 起，逗号分隔）
  node scripts/a2e.mjs preview [sec=30] [from=0]          前 N 秒样片 → renders/<slug>_preview_*.mp4
  node scripts/a2e.mjs render [ver=v1]                    整片 → renders/<slug>_v1.mp4 + fin_frames/
  node scripts/a2e.mjs test <Comp> <startFrame> [tag]     测 30 帧渲速
  node scripts/a2e.mjs doctor                             环境体检

  环境变量：CONC · RTIMEOUT · VER · SKIP_BUNDLE=1 · KEEP_BUNDLE=1 · TTS_ENGINE · VOICE`),
};

const [, , cmd, ...rest] = process.argv;
if (!table[cmd]) {
  table.help();
  process.exit(cmd ? 1 : 0);
}
table[cmd](rest);
