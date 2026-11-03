import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, CORAL, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC52 接下来讲一下异常：抛异常（13028–13245）：13036 异常击中刻流程，没有兜底 */
const F0 = 14914;
const TO = 15336;
export const SC52: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 14922;
  const n2 = N - 15226;
  const op = exitOp(N, TO, 8);
  const k = Math.min(1, Math.max(0, n1 / 18));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 226, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          接下来讲一下异常
        </LText>
      </div>

      {/* 刻流程的方框，被异常击中 */}
      <div style={{...abs(320, 330, 300, 160), border: `2.5px solid ${WHITE}`, borderRadius: 10, opacity: k}}>
        <div style={{...abs(0, 0, 300, 160), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{fontSize: 24, color: WHITE}}>刻流程</span>
        </div>
      </div>
      <div style={{...abs(650, 330, 260, 160), opacity: k}}>
        <svg width={260} height={160}>
          <line x1={0} y1={80} x2={120} y2={80} stroke={CORAL} strokeWidth={3} />
          <circle cx={140} cy={80} r={16} fill="none" stroke={CORAL} strokeWidth={3} />
          <line x1={128} y1={68} x2={152} y2={92} stroke={CORAL} strokeWidth={3} />
          <line x1={152} y1={68} x2={128} y2={92} stroke={CORAL} strokeWidth={3} />
        </svg>
      </div>

      <SoftIn N={N} f0={15226} len={10} dy={8}>
        <div style={{...abs(320, 520, 700), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={CORAL}>
            没有兜底：C++ 异常直接让游戏崩
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={14929} len={10} dy={8}>
        <div style={{...abs(320, 568, 760), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>没有兜底，也没有更新抑制器</span>
        </div>
      </SoftIn>
    </div>
  );
};
