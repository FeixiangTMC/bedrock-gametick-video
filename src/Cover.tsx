import React from 'react';
import {AbsoluteFill} from 'remotion';
import {WHITE, GREY, PURPLE_LIGHT, abs, LText} from './ui';

/**
 * Cover —— B 站封面（1280×720 源图）。
 *
 * 安全区：B 站首页推荐按 4:3 居中裁切（1280×720 → 取中间 960×720，左右各裁 160px），
 * 因此所有文字与图形都收在 x ∈ [180, 1100] 内，保证 16:9 / 16:10 / 4:3 三种裁切都不溢字。
 */
const DOTS = Array.from({length: 26 * 15}).map((_, i) => ({
  x: 24 + (i % 26) * 49,
  y: 24 + Math.floor(i / 26) * 48,
}));

// 20 格 = 一秒二十刻；紫格 = 红石刻（每两刻一次）
const CELLS = Array.from({length: 20}).map((_, i) => ({
  col: i % 5,
  row: Math.floor(i / 5),
  redstone: i % 2 === 0,
}));

const SAFE_L = 182; // 左安全线
const SAFE_R = 1094; // 右安全线

export const Cover: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {DOTS.map((d, i) => (
      <div
        key={i}
        style={{position: 'absolute', left: d.x, top: d.y, width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: 0.07}}
      />
    ))}

    {/* 左上：系列名 */}
    <div style={{...abs(SAFE_L, 58), display: 'flex', alignItems: 'center'}}>
      <div style={{width: 10, height: 10, background: PURPLE_LIGHT, borderRadius: 2, marginRight: 14}} />
      <span style={{fontSize: 25, color: GREY, letterSpacing: 4, fontWeight: 700}}>我的世界 · 基岩版</span>
    </div>

    {/* 主标题：两行 */}
    <div style={{filter: 'drop-shadow(0 0 34px rgba(102,48,248,.55))'}}>
      <LText cx={SAFE_L} cy={192} size={124} weight={900} color={WHITE} scaleX={0.92}>
        游戏刻
      </LText>
      <LText cx={SAFE_L} cy={330} size={124} weight={900} color={WHITE} scaleX={0.92}>
        流程全解
      </LText>
    </div>

    {/* 副标题 */}
    <div style={{...abs(SAFE_L, 458, 54, 4), background: PURPLE_LIGHT}} />
    <LText cx={SAFE_L + 76} cy={460} size={40} weight={800} color={WHITE} scaleX={0.92}>
      一秒二十刻
    </LText>

    {/* 五章清单 */}
    <div style={{...abs(SAFE_L, 522), whiteSpace: 'nowrap'}}>
      <span style={{fontSize: 22, color: GREY, letterSpacing: 2}}>世界更新 · 红石刻 · 区块刻九步 · 掉刻与补刻</span>
    </div>

    {/* 右上：50ms 标签 */}
    <div
      style={{
        ...abs(SAFE_R - 290, 74, 290, 100),
        border: `2px solid ${PURPLE_LIGHT}`,
        borderRadius: 14,
        background: 'rgba(102,48,248,.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{fontSize: 48, color: WHITE, fontWeight: 900, lineHeight: 1}}>50 ms</span>
      <span style={{fontSize: 18, color: PURPLE_LIGHT, letterSpacing: 4, marginTop: 8}}>一个游戏刻</span>
    </div>

    {/* 右侧 20 格网格（右缘对齐安全线） */}
    <div style={{...abs(SAFE_R - 324, 226)}}>
      {CELLS.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: c.col * 66,
            top: c.row * 66,
            width: 54,
            height: 54,
            borderRadius: 7,
            background: c.redstone ? PURPLE_LIGHT : 'rgba(255,255,255,.10)',
            border: c.redstone ? 'none' : '1px solid rgba(255,255,255,.14)',
            boxShadow: c.redstone ? '0 0 18px rgba(161,117,241,.5)' : 'none',
          }}
        />
      ))}
    </div>
    <div style={{...abs(SAFE_R - 324, 500), whiteSpace: 'nowrap'}}>
      <span style={{fontSize: 18, color: GREY, letterSpacing: 1}}>紫色格 = 红石刻（每两刻一次）</span>
    </div>

    {/* 右下：时长 */}
    <div style={{...abs(SAFE_R - 324, 546), width: 324, textAlign: 'right', whiteSpace: 'nowrap'}}>
      <span style={{fontSize: 28, color: WHITE, fontWeight: 800, letterSpacing: 2}}>9 分钟 · 5 章</span>
    </div>

    {/* 底部进度条装饰（装饰性，允许被裁） */}
    <div style={{...abs(0, 708, 1280, 12), background: 'rgba(255,255,255,.08)'}} />
    <div style={{...abs(0, 708, 344, 12), background: PURPLE_LIGHT}} />
  </AbsoluteFill>
);
