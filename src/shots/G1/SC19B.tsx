import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC19B 三层结构（2386–2779）：先把游戏刻流程的骨架摆出来，再进「一次外层循环可以跑好几个世界刻」
 *  2394 外框（外层循环）→ 2487 中框（世界更新）→ 2571 内块（区块刻）→ 2664 点明从属关系 */
const F0 = 2608;
const TO = 3067;
export const SC19B: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 2623;
  const n2 = N - 2728;
  const n3 = N - 2833;
  const k = (x: number) => Math.min(1, Math.max(0, x / 18));
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 外框：外层循环 */}
      <div style={{...abs(170, 210, 940, 330), border: `2.5px solid ${WHITE}`, borderRadius: 16, opacity: k(n1)}} />
      <SoftIn N={N} f0={2623} len={10} dy={6}>
        <div style={{...abs(196, 232, 300), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>外层循环</LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={2638} len={10} dy={6}>
        <div style={{...abs(196, 268, 360), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 19, color: GREY, letterSpacing: 1}}>决定什么时候跑</span>
        </div>
      </SoftIn>

      {/* 中框：世界更新 */}
      <div style={{...abs(250, 300, 780, 196), border: `2.5px solid ${PURPLE_LIGHT}`, borderRadius: 12, opacity: k(n2), background: 'rgba(102,48,248,.06)'}} />
      <SoftIn N={N} f0={2728} len={10} dy={6}>
        <div style={{...abs(276, 316, 300), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={PURPLE_LIGHT}>世界更新</LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={2742} len={10} dy={6}>
        <div style={{...abs(276, 352, 360), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 19, color: GREY, letterSpacing: 1}}>一圈里的全部工序</span>
        </div>
      </SoftIn>

      {/* 内块：区块刻 */}
      <div style={{...abs(560, 396, 420, 76), border: `2.5px solid ${WHITE}`, borderRadius: 10, opacity: k(n3), background: '#0b0c11'}} />
      <SoftIn N={N} f0={2833} len={10} dy={6}>
        <div style={{...abs(560, 396, 420), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={210} cy={38} size={22} weight={800} color={WHITE}>区块刻</CText>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={2948} len={12} dy={8}>
        <div style={{...abs(170, 560, 940), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>区块刻只是世界更新里按区块重复的那一段</span>
        </div>
      </SoftIn>
    </div>
  );
};
