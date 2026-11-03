import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PhaseRuler} from './phase';

/** SC41 红石不在流水线里，每两刻算一次（10356–10614）：10364 相位尺亮起；10460 点出「红石刻」 */
const F0 = 8465;
const TO = 8754;
export const SC41: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 8473;
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 214, 880)}}>
        <LText cx={0} cy={0} size={34} weight={900} color={WHITE} scaleX={0.88}>
          红石：每两刻走一次
        </LText>
      </div>
      <PhaseRuler N={N} y={300} op={Math.min(1, Math.max(0, n / 18))} />
      <SoftIn N={N} f0={8627} len={12} dy={10}>
        <div style={{...abs(200, 450, 880), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={26} weight={800} color={PURPLE_LIGHT}>
            这一刻，就叫红石刻
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={8742} len={12} dy={8}>
        <div style={{...abs(200, 502, 900), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>它不在区块刻里直接算，而是单独一拍</span>
        </div>
      </SoftIn>
    </div>
  );
};
