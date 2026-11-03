import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC33 第二步：环境（8107–8388）：8115 雨雪落下；第四步随机刻已独立成段，本镜头只讲环境 */
const F0 = 11589;
const TO = 11750;
export const SC33: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 11597;
  const n2 = N - 11709;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 18));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={1} y={214} />
      <StepTitle text="第二步：环境" sub="闪电、雨雪、结冰、积雪" />

      <div style={{...abs(420, 330, 420, 240), border: `2px solid ${WHITE}`, borderRadius: 10, opacity: k, background: '#0b0c11'}}>
        {Array.from({length: 40}).map((_, i) => {
          const x = (i * 47) % 400;
          const y = (i * 71 + (N - 11597) * 9) % 220;
          return <div key={i} style={{...abs(x + 10, y + 10, 2, 14), background: WHITE, opacity: 0.45}} />;
        })}
      </div>
      <SoftIn N={N} f0={11709} len={10} dy={8}>
        <div style={{...abs(900, 340, 340), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            随机刻挂在这
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={11738} len={10} dy={8}>
        <div style={{...abs(900, 384, 340), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>整条流水线里最没规律的一步</span>
        </div>
      </SoftIn>
    </div>
  );
};
