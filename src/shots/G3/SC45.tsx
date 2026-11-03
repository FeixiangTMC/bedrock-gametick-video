import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC45 同一拍里看到的是旧值 / 半拍（11343–11607）：11351 两行波形错拍 */
const F0 = 9789;
const TO = 10070;
export const SC45: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 9797;
  const n2 = N - 10058;
  const op = exitOp(N, TO, 10);
  const p = Math.min(1, Math.max(0, n1 / 24));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 210, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          同一拍里，看到的都是旧值
        </LText>
      </div>

      {[0, 1].map((row) => {
        const y = 320 + row * 110;
        const shift = row === 0 ? 0 : 44;
        return (
          <div key={row} style={{...abs(220, y, 840, 70)}}>
            <div style={{...abs(0, 30, 840, 2), background: GREY_LINE, opacity: p}} />
            {Array.from({length: 8}).map((_, i) => (
              <div
                key={i}
                style={{
                  ...abs(i * 100 + shift, 18, 44, 28),
                  border: `2px solid ${row === 0 ? WHITE : PURPLE_LIGHT}`,
                  borderRadius: 4,
                  background: row === 0 ? 'transparent' : 'rgba(102,48,248,.14)',
                  opacity: p,
                }}
              />
            ))}
            <div style={{...abs(-110, 18, 100), textAlign: 'right'}}>
              <span style={{fontSize: 18, color: GREY}}>{row === 0 ? '输入' : '输出'}</span>
            </div>
          </div>
        );
      })}

      <SoftIn N={N} f0={10058} len={12} dy={10}>
        <div style={{...abs(220, 552, 840), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={PURPLE_LIGHT}>
            差的那一步，就是「半拍」
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
