import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC11 一次循环补跑好几圈（2314–2614）：2322 时间槽里挤进三刻；2457 点明「不是加速，是把欠的还回去」 */
const F0 = 3068;
const TO = 3387;
const SLOTS = 6;
const X0 = 200;
const W = 880;
export const SC11: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 3074;
  const n2 = N - 3221;
  const op = exitOp(N, TO, 10);
  const burst = Math.min(1, Math.max(0, (n1 - 26) / 18));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 时间槽 */}
      {Array.from({length: SLOTS}).map((_, i) => {
        const x = X0 + (W / SLOTS) * i;
        const isBurst = i === 2;
        return (
          <div key={i}>
            <div style={{...abs(x, 320, W / SLOTS - 12, 96), border: `2px solid ${isBurst ? PURPLE : GREY_LINE}`, borderRadius: 8, opacity: 0.9}} />
            <div style={{...abs(x + (W / SLOTS - 12) / 2 - 1, 350, 2, 40), background: isBurst && burst > 0.4 ? PURPLE_LIGHT : WHITE, opacity: 0.8}} />
            {isBurst && burst > 0.2 ? (
              <>
                <div style={{...abs(x + 26, 340, 2, 56), background: PURPLE_LIGHT, opacity: Math.min(1, burst * 1.4), boxShadow: '0 0 10px rgba(161,117,241,.8)'}} />
                <div style={{...abs(x + (W / SLOTS - 12) - 26, 340, 2, 56), background: PURPLE_LIGHT, opacity: Math.min(1, burst * 1.4), boxShadow: '0 0 10px rgba(161,117,241,.8)'}} />
              </>
            ) : null}
          </div>
        );
      })}

      <SoftIn N={N} f0={3103} len={10} dy={8}>
        <div style={{...abs(X0 + (W / SLOTS) * 2, 424, W / SLOTS), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={(W / SLOTS) / 2} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            补跑三刻
          </CText>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={3074} len={10} dy={8}>
        <div style={{...abs(200, 236, 700), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={26} weight={800} color={WHITE} scaleX={0.9}>
            一次外层循环，可以跑好几个世界刻
          </LText>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={3221} len={12} dy={10}>
        <div style={{...abs(200, 524, 900), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={38} weight={900} color={WHITE} scaleX={0.85} shadow={'0 0 22px rgba(102,45,248,.45)'}>
            这是补帧，不是加速
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={3272} len={12} dy={8}>
        <div style={{...abs(200, 584, 900), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>算得快，就把省下的时间还给下一轮</span>
        </div>
      </SoftIn>
    </div>
  );
};
