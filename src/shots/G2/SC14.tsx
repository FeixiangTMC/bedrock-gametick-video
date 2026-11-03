import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {BigNumber} from '../../fx';
import {PipeRail} from './pipe';

/** SC14 先说节奏（3015–3172）：六段流水线整体亮出，右下角点明「绝大多数每刻都跑」 */
const F0 = 3827;
const TO = 4024;
export const SC14: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 3835;
  const op = exitOp(N, TO, 8);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={-1} y={300} op={Math.min(1, Math.max(0, n / 18))} />
      <SoftIn N={N} f0={3840} len={12} dy={10}>
        <div style={{...abs(210, 400, 860), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={40} weight={900} color={WHITE} scaleX={0.86}>
            一次世界更新，六段
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={3846} len={12} dy={10}>
        <div style={{...abs(210, 460, 860), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>绝大多数每一步都跑，少数隔几刻或隔几十秒</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={3873} len={12} dy={10}>
        <div style={{...abs(210, 512, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={26} weight={700} color={PURPLE_LIGHT} scaleX={1}>
            五十毫秒一遍
          </LText>
        </div>
      </SoftIn>
      <div style={{opacity: Math.min(1, Math.max(0, (N - 3846) / 16))}}>
        <BigNumber cx={1000} cy={430} value="50" size={96} unit="ms / 圈" unitSize={20} />
      </div>
    </div>
  );
};
