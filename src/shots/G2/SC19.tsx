import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle, CellGrid} from './pipe';

/** SC19 天气与区块生成（4181–4469）：4189 雨丝落下；4302 右侧区块逐个生成 */
const F0 = 5198;
const TO = 5530;
export const SC19: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 5206;
  const n2 = N - 5248;
  const op = exitOp(N, TO, 10);
  const rain = Math.min(1, Math.max(0, n1 / 16));
  const lit = Math.min(12, Math.max(0, Math.floor(n2 / 9)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={2} y={150} />
      <StageTitle text="天气：雨、雷暴、雨停" sub="天气与内部环境周期" />

      {/* 雨 */}
      <div style={{...abs(220, 356, 320, 200), opacity: rain}}>
        {Array.from({length: 22}).map((_, i) => {
          const x = (i * 37) % 320;
          const y = ((i * 53 + (N - 5206) * 7) % 200);
          return <div key={i} style={{...abs(x, y, 2, 16), background: WHITE, opacity: 0.5}} />;
        })}
      </div>
      <SoftIn N={N} f0={5286} len={10} dy={6}>
        <div style={{...abs(220, 570, 320), textAlign: 'center'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>下雨 · 结冰 · 积雪都在这一步</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={5248} len={10} dy={8}>
        <div style={{...abs(690, 330, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            区块生成任务也在这启动
          </LText>
        </div>
      </SoftIn>
      <CellGrid x={690} y={386} cols={4} rows={3} cell={40} gap={14} lit={lit} />
      <SoftIn N={N} f0={5316} len={10} dy={8}>
        <div style={{...abs(690, 560, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>你往前跑，世界是这时候被造出来的</span>
        </div>
      </SoftIn>
    </div>
  );
};
