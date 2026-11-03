import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC24 行为：感知 → 选目标 → 寻路 → 移动（5523–5906）：5531 路径折线生长；5700 各类行为逐条列出 */
const F0 = 6709;
const TO = 7052;
const BEHAVIORS = ['年龄', '繁殖', '呼吸', '燃烧', '爆炸', '传送', '拴绳'];
export const SC24: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 6717;
  const n2 = N - 6761;
  const op = exitOp(N, TO, 10);
  const p = Math.min(1, Math.max(0, n1 / 34));
  const shown = Math.min(BEHAVIORS.length, Math.max(0, Math.floor((N - 6761) / 9)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={4} y={150} />
      <StageTitle text="感知、选目标、寻路、移动" sub="实体行为系统一层层往下跑" />

      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <polyline
          points="240,520 360,440 470,470 570,380 690,410"
          fill="none"
          stroke={PURPLE_LIGHT}
          strokeWidth={3}
          strokeDasharray={620}
          strokeDashoffset={620 * (1 - p)}
        />
        {p > 0.05 ? <circle cx={240} cy={520} r={8} fill={WHITE} opacity={0.9} /> : null}
        {p > 0.6 ? <circle cx={570} cy={380} r={10} fill={PURPLE_LIGHT} style={{filter: 'drop-shadow(0 0 12px rgba(161,117,241,.9))'}} /> : null}
      </svg>

      <SoftIn N={N} f0={6778} len={10} dy={6}>
        <div style={{...abs(240, 552, 420), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>视线看到你 → 决定追 → 算路 → 迈步</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={6761} len={10} dy={8}>
        <div style={{...abs(760, 330, 400), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={WHITE}>
            还有一大票行为
          </LText>
        </div>
      </SoftIn>
      {BEHAVIORS.map((b, i) => (
        <div
          key={b}
          style={{
            ...abs(760 + (i % 4) * 104, 380 + Math.floor(i / 4) * 62, 92, 44),
            border: `2px solid ${i < shown ? PURPLE_LIGHT : '#4A4A4A'}`,
            borderRadius: 22,
            background: i < shown ? 'rgba(102,48,248,.18)' : 'transparent',
            opacity: i < shown ? 1 : 0.35,
            textAlign: 'center',
          }}
        >
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: 20, color: WHITE}}>{b}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
