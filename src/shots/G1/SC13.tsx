import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC13 暂停只停世界，不停连接（2877–3014）：上行刻度停住，下行刻度继续走 */
const F0 = 3694;
const TO = 3826;
const X0 = 240;
const W = 800;
const SP = 50;
export const SC13: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 3702;
  const op = exitOp(N, TO, 8);
  const moved = Math.max(0, n) * 3.2;
  const worldShift = Math.min(moved, 96); // 世界刻度先走一点就停
  const netShift = moved % SP;
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 世界轨道 */}
      <SoftIn N={N} f0={3702} len={8} dy={6}>
        <div style={{...abs(X0 - 110, 288, 100), textAlign: 'right', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 24, color: PURPLE_LIGHT, letterSpacing: 1}}>世界</span>
        </div>
      </SoftIn>
      <div style={{...abs(X0, 300, W, 2), background: GREY_LINE}} />
      <div style={{...abs(X0, 276, W, 52), overflow: 'hidden'}}>
        {Array.from({length: 20}).map((_, i) => (
          <div
            key={i}
            style={{
              ...abs(i * SP - worldShift, 0, 2, 44),
              background: WHITE,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      {/* 连接轨道 */}
      <SoftIn N={N} f0={3732} len={8} dy={6}>
        <div style={{...abs(X0 - 110, 428, 100), textAlign: 'right', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 24, color: WHITE, letterSpacing: 1}}>连接</span>
        </div>
      </SoftIn>
      <div style={{...abs(X0, 440, W, 2), background: GREY_LINE}} />
      <div style={{...abs(X0, 416, W, 52), overflow: 'hidden'}}>
        {Array.from({length: 20}).map((_, i) => (
          <div
            key={i}
            style={{
              ...abs(i * SP - netShift, 0, 2, 44),
              background: WHITE,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      <SoftIn N={N} f0={3707} len={10} dy={8}>
        <div style={{...abs(X0, 486, W), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>世界刻停在这里 · 网络和资源包还在跑</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={3713} len={12} dy={10}>
        <div style={{...abs(X0, 528, W), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.9}>
            暂停只停世界，不停连接
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
