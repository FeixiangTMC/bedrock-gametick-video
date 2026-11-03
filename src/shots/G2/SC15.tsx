import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';
import {BudgetBar} from '../G1/parts';

/** SC15 世界刻一开始先记账：刷怪配额（3173–3412）：3181 圈数计数器跑起来；3290 配额条给出「这一圈能刷多少」 */
const F0 = 4025;
const TO = 4301;
export const SC15: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 4149;
  const n2 = N - 4098;
  const op = exitOp(N, TO, 10);
  const tickNo = Math.max(1, Math.floor((N - 4033) / 3) + 1);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={0} y={150} />
      <StageTitle text="先记账" sub="更新刷怪统计 · 清理临时引用" />

      <SoftIn N={N} f0={4149} len={10} dy={8}>
        <div style={{...abs(210, 350, 220), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>已走过的圈数</span>
        </div>
      </SoftIn>
      <div style={{...abs(210, 386, 240)}}>
        <span style={{fontSize: 64, fontFamily: "'Orbitron','Audiowide',sans-serif", color: WHITE, letterSpacing: 2}}>
          {String(tickNo).padStart(3, '0')}
        </span>
      </div>

      <SoftIn N={N} f0={4098} len={10} dy={8}>
        <div style={{...abs(560, 350, 300), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={700} color={WHITE}>
            这一圈的刷怪配额
          </LText>
        </div>
      </SoftIn>
      <div style={{opacity: Math.min(1, Math.max(0, n2 / 14))}}>
        <BudgetBar x={560} y={394} w={480} h={26} used={0.62} />
      </div>
      <SoftIn N={N} f0={4129} len={10} dy={8}>
        <div style={{...abs(560, 434, 520), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>配额用完，这一圈就不再生成</span>
        </div>
      </SoftIn>
    </div>
  );
};
