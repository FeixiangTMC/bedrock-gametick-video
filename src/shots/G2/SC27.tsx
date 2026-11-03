import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC27 红石依赖 + 三十秒存档（6488–6792）：6496 元件连线；6620 存档节拍 */
const F0 = 7728;
const TO = 8039;
export const SC27: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 7736;
  const n2 = N - 7883;
  const op = exitOp(N, TO, 10);
  const p = Math.min(1, Math.max(0, n1 / 26));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={5} y={150} />
      <StageTitle text="红石依赖：谁连着谁" sub="元件增删、连接变化，在这一步重连" />

      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={330} y1={430} x2={470} y2={380} stroke={WHITE} strokeWidth={2.5} opacity={p} />
        <line x1={470} y1={380} x2={620} y2={440} stroke={WHITE} strokeWidth={2.5} opacity={p} />
        <line x1={470} y1={380} x2={520} y2={300} stroke={GREY_LINE} strokeWidth={2} strokeDasharray="6 6" opacity={p} />
      </svg>
      {[
        {x: 310, y: 410},
        {x: 450, y: 360},
        {x: 600, y: 420},
        {x: 500, y: 280},
      ].map((d, i) => (
        <div
          key={i}
          style={{
            ...abs(d.x, d.y, 40, 40),
            border: `2.5px solid ${i === 1 ? PURPLE_LIGHT : WHITE}`,
            borderRadius: 6,
            opacity: Math.max(0, Math.min(1, (n1 - i * 5) / 14)),
            boxShadow: i === 1 ? '0 0 18px 3px rgba(161,117,241,.5)' : undefined,
          }}
        />
      ))}

      <SoftIn N={N} f0={7883} len={10} dy={8}>
        <div style={{...abs(760, 340, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            世界数据每三十秒存一次
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={7946} len={10} dy={8}>
        <div style={{...abs(760, 386, 440), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>按真实时间算，不按刻数</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={7750} len={10} dy={8}>
        <div style={{...abs(760, 438, 440), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            三十秒
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
