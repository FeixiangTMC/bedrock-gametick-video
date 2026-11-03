import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {BudgetBar} from './parts';

/** SC09 一圈就是 50 毫秒，干完就睡（1773–2015）：1781 整整一条预算；1885 紫段收缩，剩下的灰色就是线程睡眠 */
const F0 = 2030;
const TO = 2298;
export const SC09: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 2044;
  const n2 = N - 2160;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n2 / 22));
  const used = 1 - 0.38 * k;
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <SoftIn N={N} f0={2044} len={10} dy={8}>
        <div style={{...abs(260, 250, 760), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={28} weight={800} color={WHITE} scaleX={0.9}>
            一圈的预算：五十毫秒
          </LText>
        </div>
      </SoftIn>

      <div style={{opacity: Math.min(1, Math.max(0, n1 / 14))}}>
        <BudgetBar x={260} y={318} w={760} h={34} used={used} />
      </div>

      <SoftIn N={N} f0={2140} len={10} dy={6}>
        <div style={{...abs(300, 372, 200), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: PURPLE_LIGHT, letterSpacing: 1}}>干活</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={2178} len={10} dy={6}>
        <div style={{...abs(830, 372, 220), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>睡到目标时间</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={2206} len={12} dy={10}>
        <div style={{...abs(260, 430, 760), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={380} cy={0} size={36} weight={900} color={WHITE} scaleX={0.85}>
            这叫线程睡眠
          </CText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={2231} len={12} dy={8}>
        <div style={{...abs(260, 492, 760), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>Thread sleep · 睡到下一次该醒的时刻</span>
        </div>
      </SoftIn>
    </div>
  );
};
