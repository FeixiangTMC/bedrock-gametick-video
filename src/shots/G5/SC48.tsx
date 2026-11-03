import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {BudgetBar} from '../G1/parts';

/** SC48 五十毫秒够不够：大多数时候够（12149–12342）：12157 预算条只用了一小截 */
const F0 = 14164;
const TO = 14395;
export const SC48: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 14172;
  const op = exitOp(N, TO, 8);
  const used = Math.min(0.32, Math.max(0, (n - 8) / 60 * 0.32));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 250, 880), whiteSpace: 'nowrap'}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          大多数时候，够用
        </LText>
      </div>
      <div style={{opacity: Math.min(1, Math.max(0, n / 14))}}>
        <BudgetBar x={200} y={360} w={780} h={32} used={used} />
      </div>
      <SoftIn N={N} f0={14242} len={10} dy={8}>
        <div style={{...abs(200, 424, 820), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>一圈里的活是稀疏的，大部分时间在等</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={14383} len={10} dy={8}>
        <div style={{...abs(200, 480, 820), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            不够的时候，就是卡顿
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
