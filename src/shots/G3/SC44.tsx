import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC44 算完加锁，再一起放出（11142–11342）：11150 锁；11240 结果同时放出 */
const F0 = 9448;
const TO = 9788;
export const SC44: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 9456;
  const n2 = N - 9652;
  const op = exitOp(N, TO, 8);
  const k = Math.min(1, Math.max(0, n1 / 16));
  const release = Math.min(1, Math.max(0, (n2 - 20) / 16));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 210, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          算完不立刻生效
        </LText>
      </div>

      {/* 与旁白对齐：两刻一次 = 每秒十次 */}
      <SoftIn N={N} f0={9456} len={10} dy={6}>
        <div style={{...abs(200, 252, 880), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>红石刻：两刻一次 · 每秒十次</span>
        </div>
      </SoftIn>

      {/* 锁 */}
      <div style={{...abs(330, 300, 120, 150), opacity: k}}>
        <div style={{...abs(18, 62, 84, 70), border: `3px solid ${PURPLE_LIGHT}`, borderRadius: 10, background: 'rgba(102,48,248,.14)'}} />
        <div style={{...abs(34, 12, 52, 56), border: `3px solid ${PURPLE_LIGHT}`, borderRadius: 26, borderBottom: 'none', opacity: release > 0.5 ? 0.4 : 1}} />
      </div>

      {/* 结果一起放出 */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            ...abs(620, 320 + i * 56, 260, 40),
            border: `2px solid ${release > 0.2 ? PURPLE_LIGHT : '#3A3A3A'}`,
            borderRadius: 8,
            opacity: release > 0.2 ? 1 : 0.25,
            background: release > 0.2 ? 'rgba(102,48,248,.14)' : 'transparent',
            transition: 'none',
          }}
        />
      ))}
      <SoftIn N={N} f0={9652} len={10} dy={8}>
        <div style={{...abs(620, 512, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            三步走完，一起放出去
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={9776} len={10} dy={8}>
        <div style={{...abs(620, 556, 480), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>给全部元件加锁，这一步之后才生效</span>
        </div>
      </SoftIn>
    </div>
  );
};
