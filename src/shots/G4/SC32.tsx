import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {CellGrid} from '../G2/pipe';
import {StepLadder, StepTitle} from './steps';

/** SC32 第一步：刷怪（7853–8106）：7861 怪的点阵随刷怪塔产出增长 */
const F0 = 11301;
const TO = 11588;
export const SC32: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 11309;
  const op = exitOp(N, TO, 10);
  const lit = Math.min(12, Math.max(0, Math.floor((n - 16) / 7)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={0} y={214} />
      <StepTitle text="第一步：刷怪" sub="密度与上限检测" />

      <CellGrid x={420} y={330} cols={4} rows={3} cell={58} gap={18} lit={lit} />
      <SoftIn N={N} f0={11380} len={10} dy={8}>
        <div style={{...abs(780, 340, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={WHITE}>
            刷怪塔的产量
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={11464} len={10} dy={8}>
        <div style={{...abs(780, 384, 440), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>就是这一步的产物</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={11576} len={10} dy={8}>
        <div style={{...abs(780, 434, 440), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            上限到了就停
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
