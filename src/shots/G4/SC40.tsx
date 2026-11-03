import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC40 第九步：推进保存计时（10198–10355）：10206 计时器走在区块上 */
const F0 = 13994;
const TO = 14163;
export const SC40: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 14002;
  const op = exitOp(N, TO, 8);
  const k = Math.min(1, Math.max(0, n / 16));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={8} y={214} />
      <StepTitle text="第九步：记下改过" sub="推进保存计时，区块才知道自己脏了" />

      <div style={{...abs(430, 330, 240, 240), border: `2.5px solid ${WHITE}`, borderRadius: 10, opacity: k}}>
        <div style={{...abs(20, 20, 200, 200), border: `2px dashed ${PURPLE_LIGHT}`, borderRadius: 6, opacity: 0.6}} />
      </div>
      <SoftIn N={N} f0={14081} len={10} dy={8}>
        <div style={{...abs(720, 360, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            这一块「改过」
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={14151} len={10} dy={8}>
        <div style={{...abs(720, 404, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>攒够次数，才轮到写盘</span>
        </div>
      </SoftIn>
    </div>
  );
};
