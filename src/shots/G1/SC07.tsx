import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';
import {SmallRing} from './parts';

/** SC07 屏幕也在跑自己的刻（1459–1581）：1467 客户端 / 服务端两个环同时走，紫色只给服务端那一个 */
const F0 = 1675;
const TO = 1804;
export const SC07: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 1685;
  const op = exitOp(N, TO, 8);
  const litC = Math.min(20, Math.max(0, Math.floor(n / 5)));
  const litS = Math.min(20, Math.max(0, Math.floor(n / 5)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <SmallRing cx={420} cy={344} r={86} lit={litC} label="客户端" sub="CLIENT" color={WHITE} op={Math.min(1, Math.max(0, n / 12))} />
      <SmallRing cx={860} cy={344} r={86} lit={litS} label="服务端" sub="SERVER" color={PURPLE_LIGHT} op={Math.min(1, Math.max(0, n / 12))} />
      <SoftIn N={N} f0={1718} len={10} dy={8}>
        <div style={{...abs(560, 536, 160), textAlign: 'center'}}>
          <CText cx={80} cy={0} size={40} weight={700} color={GREY}>
            +
          </CText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={1730} len={12} dy={10}>
        <div style={{...abs(300, 576, 680), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>两个循环同时在跑：一个算世界，一个管画面</span>
        </div>
      </SoftIn>
    </div>
  );
};
