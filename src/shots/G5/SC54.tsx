import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC54 关渲染距离没用，要关模拟距离（13486–13688）：13494 两个同心范围；13560 点明算力在哪 */
const F0 = 15882;
const TO = 16104;
export const SC54: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 15890;
  const n2 = N - 15989;
  const op = exitOp(N, TO, 8);
  const k = Math.min(1, Math.max(0, n1 / 18));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 214, 880)}}>
        <LText cx={0} cy={0} size={30} weight={900} color={WHITE} scaleX={0.88}>
          关渲染距离，救不了 TPS
        </LText>
      </div>

      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0, opacity: k}}>
        <circle cx={420} cy={410} r={150} fill="none" stroke={GREY} strokeWidth={2} strokeDasharray="8 8" />
        <circle cx={420} cy={410} r={64} fill="none" stroke={PURPLE_LIGHT} strokeWidth={3} />
        <circle cx={420} cy={410} r={6} fill={WHITE} />
      </svg>
      <SoftIn N={N} f0={15906} len={8} dy={6}>
        <div style={{...abs(560, 350, 240), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>渲染：看得见</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={15939} len={8} dy={6}>
        <div style={{...abs(300, 440, 220), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: PURPLE_LIGHT, letterSpacing: 1}}>模拟：真在算</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={15989} len={10} dy={8}>
        <div style={{...abs(720, 424, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            省的是客户端
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={16092} len={10} dy={8}>
        <div style={{...abs(720, 480, 480), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={PURPLE_LIGHT}>
            要关的是模拟距离
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
