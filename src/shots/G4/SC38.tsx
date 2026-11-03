import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC38 第六步标记实体 / 第七步方块实体（9609–9930）：9617 实体打勾；9750 漏斗、熔炉、箱子 */
const F0 = 13281;
const TO = 13699;
export const SC38: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 13290;
  const n2 = N - 13547;
  const op = exitOp(N, TO, 10);
  const marked = Math.min(6, Math.max(0, Math.floor((n1 - 8) / 8)));
  const boxes = Math.min(3, Math.max(0, Math.floor((n2 - 8) / 10)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={5} y={214} />
      <StepTitle text="标记实体，再更新方块实体" sub="第六步与第七步" />

      {/* 实体打标记 */}
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => {
          const i = r * 2 + c;
          const on = i < marked;
          return (
            <div key={i} style={{...abs(420 + c * 76, 340 + r * 76, 56, 56), border: `2px solid ${on ? PURPLE_LIGHT : GREY_LINE}`, borderRadius: 28, opacity: on ? 1 : 0.4}}>
              {on ? <div style={{...abs(18, 16, 20, 20), borderRadius: 10, background: PURPLE_LIGHT, boxShadow: '0 0 10px rgba(161,117,241,.8)'}} /> : null}
            </div>
          );
        }),
      )}
      <SoftIn N={N} f0={13367} len={10} dy={6}>
        <div style={{...abs(420, 566, 300), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>给这一圈要更新的实体打标</span>
        </div>
      </SoftIn>

      {/* 方块实体 */}
      {['漏斗', '熔炉', '箱子'].map((nm, i) => (
        <div key={nm} style={{...abs(780 + i * 130, 360, 100, 100), opacity: i < boxes ? 1 : 0.25}}>
          <div style={{position: 'absolute', inset: 0, border: `2.5px solid ${i === 0 ? PURPLE_LIGHT : WHITE}`, borderRadius: 8, background: '#0b0c11'}} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: -26, textAlign: 'center'}}>
            <span style={{fontSize: 19, color: GREY}}>{nm}</span>
          </div>
        </div>
      ))}
      <SoftIn N={N} f0={13686} len={10} dy={8}>
        <div style={{...abs(780, 500, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={21} weight={800} color={WHITE}>
            搬东西、烧东西、记内容
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
