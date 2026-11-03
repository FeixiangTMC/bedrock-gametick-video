import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC37 每块每刻一百条 / 邻域要预加载（9270–9608）：9278 额度条走满；9400 邻域方块亮起 */
const F0 = 13056;
const TO = 13280;
export const SC37: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 13064;
  const n2 = N - 13161;
  const op = exitOp(N, TO, 10);
  const used = Math.min(1, Math.max(0, (n1 - 8) / 40));
  const near = Math.min(8, Math.max(0, Math.floor((n2 - 8) / 6)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={4} y={214} />
      <StepTitle text="每块每刻，最多一百条" sub="超出的排队到下一圈" />

      <div style={{...abs(420, 340, 460, 28), border: `2px solid ${WHITE}`, borderRadius: 14}}>
        <div style={{height: '100%', width: `${used * 100}%`, background: PURPLE_LIGHT, borderRadius: 12, boxShadow: '0 0 14px rgba(161,117,241,.6)'}} />
      </div>
      <SoftIn N={N} f0={13106} len={10} dy={6}>
        <div style={{...abs(420, 378, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>一百条 · 超了下一圈再来</span>
        </div>
      </SoftIn>

      {/* 邻域：目标方块周围八格 */}
      <div style={{...abs(720, 430, 300)}}>
        {Array.from({length: 9}).map((_, i) => {
          const c = i % 3;
          const r = Math.floor(i / 3);
          const center = i === 4;
          const on = center || i - 1 < near;
          return (
            <div
              key={i}
              style={{
                ...abs(c * 66, r * 66, 54, 54),
                border: `2px solid ${center ? PURPLE_LIGHT : on ? WHITE : GREY_LINE}`,
                borderRadius: 5,
                opacity: on ? 1 : 0.35,
                background: center ? 'rgba(102,48,248,.25)' : 'transparent',
              }}
            />
          );
        })}
      </div>
      <SoftIn N={N} f0={13161} len={10} dy={8}>
        <div style={{...abs(420, 500, 280), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={21} weight={800} color={WHITE}>
            周围得先加载好
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={13268} len={10} dy={8}>
        <div style={{...abs(420, 540, 280), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>没准备好，下一圈再试</span>
        </div>
      </SoftIn>
    </div>
  );
};
