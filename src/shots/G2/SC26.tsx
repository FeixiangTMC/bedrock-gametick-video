import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC26 传送门：排队等目标维度（6187–6487）：6195 门框亮起；6300 实体在队列里等，下一刻再试 */
const F0 = 7383;
const TO = 7727;
export const SC26: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 7391;
  const n2 = N - 7527;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 20));
  const pulse = 0.5 + 0.5 * Math.sin(N * 0.12);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={5} y={150} />
      <StageTitle text="传送门：先排队" sub="跨维度请求排进队列，等目标维度就绪" />

      {/* 门框 */}
      <div style={{...abs(320, 330, 180, 240), opacity: k}}>
        <div style={{position: 'absolute', inset: 0, border: `3px solid ${WHITE}`, borderRadius: 6}} />
        <div style={{position: 'absolute', inset: 22, background: `rgba(102,48,248,${0.25 + 0.25 * pulse})`, borderRadius: 3, boxShadow: '0 0 30px 8px rgba(102,48,248,.35)'}} />
      </div>
      <SoftIn N={N} f0={7429} len={10} dy={6}>
        <div style={{...abs(320, 586, 180), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>下界传送门</span>
        </div>
      </SoftIn>

      {/* 队列 */}
      <SoftIn N={N} f0={7527} len={10} dy={8}>
        <div style={{...abs(640, 330, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            想过去的实体，先排队
          </LText>
        </div>
      </SoftIn>
      {[0, 1, 2, 3].map((i) => {
        const on = N - 7527 > i * 14;
        return (
          <div
            key={i}
            style={{
              ...abs(650 + i * 60, 392, 34, 34),
              borderRadius: 17,
              border: `2px solid ${on ? PURPLE_LIGHT : '#4A4A4A'}`,
              background: on ? 'rgba(102,48,248,.25)' : 'transparent',
              opacity: on ? 1 : 0.4,
            }}
          />
        );
      })}
      <SoftIn N={N} f0={7622} len={10} dy={8}>
        <div style={{...abs(640, 452, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>目标维度没加载好，就下一刻再试</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={7435} len={10} dy={8}>
        <div style={{...abs(640, 500, 460), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            不是卡住，是排队
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
