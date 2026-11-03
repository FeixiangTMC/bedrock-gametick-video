import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, CORAL, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC50 补跑是顿一下，落后两秒才丢（12519–12802）：12527 顿一下；12640 两秒阈值 */
const F0 = 14591;
const TO = 14913;
export const SC50: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 14599;
  const n2 = N - 14744;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 16));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 226, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          补跑：动作顿一下，不是时间变快
        </LText>
      </div>

      {/* 帧间顿挫 */}
      <div style={{...abs(220, 330, 820, 60), opacity: k}}>
        <div style={{...abs(0, 28, 820, 2), background: GREY, opacity: 0.5}} />
        {Array.from({length: 21}).map((_, i) => {
          const gap = i === 10 ? 34 : 0;
          return <div key={i} style={{...abs(i * 38 + gap, 18, 2, 24), background: i === 10 ? CORAL : WHITE, opacity: i === 10 ? 1 : 0.7}} />;
        })}
      </div>
      <SoftIn N={N} f0={14669} len={8} dy={6}>
        <div style={{...abs(220, 400, 500), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>某一帧多停了一下</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={14744} len={10} dy={8}>
        <div style={{...abs(220, 480, 860), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            落后超过两秒，才一次性丢掉欠的圈数
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={14901} len={8} dy={8}>
        <div style={{...abs(220, 528, 860), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: CORAL, letterSpacing: 1}}>阈值 ≈ 2 秒</span>
        </div>
      </SoftIn>
    </div>
  );
};
