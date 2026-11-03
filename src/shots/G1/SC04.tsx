import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {BigNumber} from '../../fx';
import {TickRing} from './parts';

/** SC04 一圈里的所有活儿 + 一秒二十圈（750–970）：758 循环环描边生长；867 二十个刻度逐个点亮，左侧 20 TPS / 50 ms */
const F0 = 882;
const TO = 1138;
export const SC04: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n2 = N - 1015;
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <TickRing N={N} f0={899} litFrom={1015} cx={700} cy={360} r={150} total={20} />

      <div style={{opacity: Math.min(1, Math.max(0, n2 / 12)), whiteSpace: 'nowrap'}}>
        <BigNumber cx={300} cy={300} value="20" size={108} unit="TPS" unitSize={24} />
      </div>
      <SoftIn N={N} f0={1038} len={12} dy={10}>
        <div style={{...abs(180, 390, 240), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 56, fontFamily: "'Orbitron', 'Audiowide', sans-serif", color: WHITE, textShadow: '0 0 18px rgba(102,45,248,.45)'}}>50 ms</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={1054} len={12} dy={10}>
        <div style={{...abs(170, 470, 260), textAlign: 'center'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>每圈五十毫秒</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={1064} len={12} dy={10}>
        <div style={{...abs(906, 524, 340), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={700} color={PURPLE_LIGHT} scaleX={1}>
            眨眼一次 ≈ 六个游戏刻
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
