import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PhaseRuler} from './phase';

/** SC42 一秒只有十次，求值分三步（10615–10810）：10623 大数字 10；10700 三步胶囊 */
const F0 = 8755;
const TO = 9041;
const STEPS = ['缓存输入', '算源与电容', '算消费者与传输者'];
export const SC42: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 8761;
  const n2 = N - 9029;
  const op = exitOp(N, TO, 8);
  const shown = Math.min(3, Math.max(0, Math.floor((N - 9029) / 12)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 210, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          一秒只有十次
        </LText>
      </div>
      <div style={{opacity: Math.min(1, Math.max(0, n1 / 14))}}>
        <div style={{...abs(200, 280, 200), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 96, fontFamily: "'Orbitron','Audiowide',sans-serif", color: PURPLE_LIGHT}}>10</span>
        </div>
        <div style={{...abs(320, 336, 200), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>次 / 秒</span>
        </div>
      </div>
      <PhaseRuler N={N} y={280} op={0.55} />
      {STEPS.map((s, i) => (
        <div
          key={s}
          style={{
            ...abs(200, 470 + i * 52, 420, 40),
            border: `2px solid ${i < shown ? PURPLE_LIGHT : '#3A3A3A'}`,
            borderRadius: 20,
            opacity: i < shown ? 1 : 0.3,
            background: i < shown ? 'rgba(102,48,248,.14)' : 'transparent',
          }}
        >
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 18}}>
            <span style={{fontSize: 21, color: WHITE}}>{i + 1} · {s}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
