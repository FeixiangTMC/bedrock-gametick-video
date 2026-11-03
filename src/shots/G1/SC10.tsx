import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {BudgetBar} from './parts';

/** SC10 跑得越久，能睡的时间越短（2016–2313）：2024 两条预算对比；2193 点破规律 */
const F0 = 2299;
const TO = 2607;
export const SC10: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 2312;
  const n2 = N - 2387;
  const n3 = N - 2494;
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <SoftIn N={N} f0={2312} len={10} dy={6}>
        <div style={{...abs(200, 232, 300), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={700} color={WHITE}>跑得快的圈</LText>
        </div>
      </SoftIn>
      <div style={{opacity: Math.min(1, Math.max(0, n1 / 14))}}>
        <BudgetBar x={200} y={278} w={700} h={30} used={0.42} />
      </div>
      <SoftIn N={N} f0={2346} len={10} dy={6}>
        <div style={{...abs(910, 274, 260), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>睡 29 ms</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={2387} len={10} dy={6}>
        <div style={{...abs(200, 388, 300), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={700} color={WHITE}>跑得慢的圈</LText>
        </div>
      </SoftIn>
      <div style={{opacity: Math.min(1, Math.max(0, n2 / 14))}}>
        <BudgetBar x={200} y={434} w={700} h={30} used={0.86} />
      </div>
      <SoftIn N={N} f0={2417} len={10} dy={6}>
        <div style={{...abs(910, 430, 260), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>只睡 7 ms</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={2494} len={12} dy={10}>
        <div style={{...abs(200, 520, 900), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={38} weight={900} color={PURPLE_LIGHT} scaleX={0.85} shadow={'0 0 22px rgba(102,45,248,.5)'}>
            跑得越久，能睡的时间越短
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
