import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';
import {CellGrid} from '../G2/pipe';
import {StepLadder, StepTitle} from './steps';

/** SC31 区块刻：模拟距离内每个区块都过一次（7608–7852）：7616 区块网格里一个被圈住，其余逐个亮起 */
const F0 = 10938;
const TO = 11300;
export const SC31: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 10946;
  const op = exitOp(N, TO, 10);
  const lit = Math.min(16, Math.max(0, Math.floor((n - 10) / 4)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={-1} y={214} op={Math.min(1, Math.max(0, n / 16))} />
      <StepTitle text="区块刻：整个流程最核心的阶段" sub="模拟距离内，每个区块都过一次" />

      <CellGrid x={420} y={330} cols={5} rows={3} cell={64} gap={18} lit={lit} />
      <SoftIn N={N} f0={11288} len={10} dy={6}>
        <div style={{...abs(420, 560, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>一次循环里，它要跑几十上百遍</span>
        </div>
      </SoftIn>
    </div>
  );
};
