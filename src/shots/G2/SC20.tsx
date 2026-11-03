import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, Box, GREY, GREY_LINE, WHITE, PURPLE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC20 村庄与结构 / 末地多一层（4470–4759）：4478 村庄与边界；4600 末地龙战只在末地更新 */
const F0 = 5531;
const TO = 5840;
export const SC20: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 5539;
  const n2 = N - 5543;
  const op = exitOp(N, TO, 10);
  const k1 = Math.min(1, Math.max(0, n1 / 18));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={2} y={150} />
      <StageTitle text="村庄与结构：谁的地盘归谁" sub="村庄管理器与结构管理器" />

      {/* 村庄：两间小屋 + 虚线边界 */}
      <div style={{...abs(210, 344, 420, 220), opacity: k1}}>
        <div style={{position: 'absolute', inset: 0, border: `2px dashed ${PURPLE_LIGHT}`, borderRadius: 10, opacity: 0.75}} />
        {[0, 1].map((i) => (
          <div key={i} style={{...abs(50 + i * 170, 96, 84, 70)}}>
            <div style={{position: 'absolute', left: 0, top: 26, width: 84, height: 44, border: `2px solid ${WHITE}`, background: '#0b0c11'}} />
            <div style={{position: 'absolute', left: 8, top: 0, width: 68, height: 30, background: 'transparent', borderLeft: `34px solid transparent`, borderRight: `34px solid transparent`, borderBottom: `30px solid ${WHITE}`}} />
          </div>
        ))}
      </div>
      <SoftIn N={N} f0={5590} len={10} dy={6}>
        <div style={{...abs(210, 576, 420), textAlign: 'center'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>村民的工作站点、村庄的边界</span>
        </div>
      </SoftIn>

      {/* 末地 */}
      <SoftIn N={N} f0={5543} len={12} dy={8}>
        <div style={{...abs(760, 330, 380), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            末地还多一层
          </LText>
        </div>
      </SoftIn>
      <div style={{opacity: Math.min(1, Math.max(0, n2 / 16))}}>
        <div style={{...abs(860, 400, 160, 160), borderRadius: 80, border: `2px solid ${PURPLE_LIGHT}`, boxShadow: '0 0 26px 6px rgba(102,48,248,.35)'}} />
        <div style={{...abs(912, 452, 56, 56), borderRadius: 28, border: `2px solid ${WHITE}`, opacity: 0.8}} />
      </div>
      <SoftIn N={N} f0={5608} len={10} dy={8}>
        <div style={{...abs(760, 588, 440), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>龙战的数据，只在末地更新</span>
        </div>
      </SoftIn>
    </div>
  );
};
