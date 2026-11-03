import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC36 两条队列：普通计划刻 / 随机计划刻（8964–9269）：8972 队列堆叠；9100 第二条队列 */
const F0 = 12712;
const TO = 13055;
export const SC36: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 12720;
  const n2 = N - 12964;
  const op = exitOp(N, TO, 10);
  const qA = Math.min(6, Math.max(0, Math.floor((n1 - 10) / 6)));
  const qB = Math.min(6, Math.max(0, Math.floor((n2 - 10) / 6)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={4} y={214} />
      <StepTitle text="计划刻：约好第几刻做" sub="两条队列：普通与随机" />

      {[0, 1].map((q) => {
        const x = 420 + q * 400;
        const cnt = q === 0 ? qA : qB;
        return (
          <div key={q} style={{...abs(x, 320, 340)}}>
            <div style={{...abs(0, 0, 340), whiteSpace: 'nowrap'}}>
              <LText cx={0} cy={0} size={22} weight={800} color={q === 0 ? WHITE : PURPLE_LIGHT}>
                {q === 0 ? '普通计划刻' : '随机计划刻'}
              </LText>
            </div>
            {Array.from({length: 6}).map((_, i) => (
              <div
                key={i}
                style={{
                  ...abs(0, 40 + i * 34, 320, 26),
                  border: `2px solid ${i < cnt ? (q === 0 ? WHITE : PURPLE_LIGHT) : '#3A3A3A'}`,
                  borderRadius: 6,
                  opacity: i < cnt ? 1 : 0.35,
                  background: i < cnt ? (q === 0 ? 'rgba(255,255,255,.08)' : 'rgba(102,48,248,.16)') : 'transparent',
                }}
              />
            ))}
          </div>
        );
      })}

      <SoftIn N={N} f0={13043} len={10} dy={8}>
        <div style={{...abs(420, 560, 760), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>发射器、投掷器、侦测器的延迟走普通计划刻</span>
        </div>
      </SoftIn>
    </div>
  );
};
