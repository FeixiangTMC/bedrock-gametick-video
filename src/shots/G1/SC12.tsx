import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, LText} from '../../ui';

/** SC12 算得慢就欠账（2615–2876）：2623 一条线从零开始越抬越高，代表欠下的圈数 */
const F0 = 3388;
const TO = 3693;
const X0 = 200;
const X1 = 1060;
const Y0 = 470;
const Y1 = 300;
export const SC12: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 3399;
  const op = exitOp(N, TO, 10);
  const p = Math.min(1, Math.max(0, n / 60));
  const x = X0 + (X1 - X0) * p;
  const y = Y0 + (Y1 - Y0) * p;
  const pts = Array.from({length: 40}).map((_, i) => {
    const t = (i / 39) * p;
    return `${X0 + (X1 - X0) * t},${Y0 + (Y1 - Y0) * Math.pow(t, 1.6)}`;
  });
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        {/* 轴 */}
        <line x1={X0} y1={Y0 + 30} x2={X1} y2={Y0 + 30} stroke={GREY_LINE} strokeWidth={2} />
        <line x1={X0} y1={Y0 + 30} x2={X0} y2={Y1 - 30} stroke={GREY_LINE} strokeWidth={2} />
        {/* 欠账曲线 */}
        {p > 0.02 ? <polyline points={pts.join(' ')} fill="none" stroke={PURPLE_LIGHT} strokeWidth={3} /> : null}
        {p > 0.02 ? <circle cx={x} cy={y} r={7} fill={PURPLE_LIGHT} style={{filter: 'drop-shadow(0 0 10px rgba(161,117,241,.9))'}} /> : null}
      </svg>

      <div style={{...abs(X0, Y1 - 52, 120), textAlign: 'left'}}>
        <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>欠下的圈数</span>
      </div>
      <div style={{...abs(X0, Y0 + 44, 400), textAlign: 'left', whiteSpace: 'nowrap'}}>
        <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>真实时间 →</span>
      </div>

      <div style={{...abs(360, 236, 700), whiteSpace: 'nowrap'}}>
        <LText cx={0} cy={0} size={34} weight={900} color={WHITE} scaleX={0.9}>
          欠的账，记在目标时间上
        </LText>
      </div>
      <div style={{...abs(360, 540, 700), whiteSpace: 'nowrap', opacity: Math.min(1, Math.max(0, (n - 60) / 20))}}>
        <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>下一轮接着补，越欠越多</span>
      </div>
    </div>
  );
};
