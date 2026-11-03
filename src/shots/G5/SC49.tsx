import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, CORAL, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC49 跑超了就卡（12343–12518）：12351 预算条冲顶变红；12420 随后连跑补回来 */
const F0 = 14396;
const TO = 14590;
export const SC49: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 14407;
  const n2 = N - 14578;
  const op = exitOp(N, TO, 8);
  const over = Math.min(1, Math.max(0, n1 / 18));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 250, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          这一圈跑超了五十毫秒
        </LText>
      </div>
      <div style={{...abs(200, 360, 780, 32), border: `2px solid ${WHITE}`, borderRadius: 16, opacity: 0.9}}>
        <div style={{height: '100%', width: `${Math.min(1.08, over * 1.08) * 100}%`, background: over > 0.92 ? CORAL : PURPLE_LIGHT, borderRadius: 14, boxShadow: over > 0.92 ? '0 0 18px rgba(240,95,65,.7)' : undefined}} />
      </div>
      <SoftIn N={N} f0={14404} len={8} dy={6}>
        <div style={{...abs(200, 404, 820), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: over > 0.9 ? CORAL : GREY, letterSpacing: 1}}>超出预算</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={14578} len={10} dy={8}>
        <div style={{...abs(200, 470, 840), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={PURPLE_LIGHT}>
            服务端先补：连跑几圈
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
