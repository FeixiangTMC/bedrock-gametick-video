import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PersonIcon} from '../../ui';
import {PipeRail, StageTitle, CellGrid} from './pipe';

/** SC22 玩家：出生点、区块加载（5042–5299）：5050 玩家与四散的加载弧；5120 区块以玩家为中心展开 */
const F0 = 6092;
const TO = 6466;
export const SC22: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 6100;
  const n2 = N - 6098;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 18));
  const lit = Math.min(9, Math.max(0, Math.floor(n2 / 12)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={3} y={150} />
      <StageTitle text="玩家：出生点与加载" sub="区块视图、出生位置、加载就绪" />

      <div style={{opacity: k}}>
        <PersonIcon cx={470} cy={420} size={120} label="你" labelSize={20} />
      </div>
      {/* 分辨率弧 */}
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0, opacity: k}}>
        {[90, 130, 170].map((r, i) => (
          <circle
            key={r}
            cx={470}
            cy={420}
            r={r}
            fill="none"
            stroke={i === 2 ? PURPLE_LIGHT : WHITE}
            strokeWidth={2}
            opacity={0.16 + 0.18 * i}
            strokeDasharray={`${Math.PI * r * 0.5} ${Math.PI * r * 2}`}
          />
        ))}
      </svg>

      <SoftIn N={N} f0={6098} len={10} dy={8}>
        <div style={{...abs(720, 340, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            你走到哪，世界就加载到哪
          </LText>
        </div>
      </SoftIn>
      <CellGrid x={730} y={392} cols={3} rows={3} cell={44} gap={14} lit={lit} />
      <SoftIn N={N} f0={6138} len={10} dy={8}>
        <div style={{...abs(720, 566, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>加载与卸载，也在这一步对齐</span>
        </div>
      </SoftIn>
    </div>
  );
};
