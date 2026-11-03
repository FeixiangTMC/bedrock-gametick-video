import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PersonIcon} from '../../ui';
import {PipeRail, StageTitle, CellGrid} from './pipe';

/** SC23 实体：这一圈的大头（5300–5522）：5308 输入箭头打到玩家身上；5350 其余实体排开 */
const F0 = 6467;
const TO = 6708;
export const SC23: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 6475;
  const n2 = N - 6544;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 16));
  const lit = Math.min(9, Math.max(0, Math.floor(n2 / 10)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={4} y={150} />
      <StageTitle text="实体：这一圈的大头" sub="玩家的输入、碰撞、坐骑" />

      <div style={{opacity: k}}>
        <PersonIcon cx={380} cy={420} size={120} label="玩家" labelSize={20} />
      </div>
      {/* 键盘 / 鼠标输入 */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{...abs(210 + i * 34, 372 + i * 26, 120, 3), background: WHITE, opacity: 0.75 * k, transform: `rotate(${18 - i * 18}deg)`}} />
      ))}
      <SoftIn N={N} f0={6488} len={10} dy={6}>
        <div style={{...abs(150, 330, 200), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>输入 → 碰撞 → 移动</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={6544} len={10} dy={8}>
        <div style={{...abs(720, 340, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            玩家先更，非玩家后更
          </LText>
        </div>
      </SoftIn>
      <CellGrid x={720} y={392} cols={3} rows={3} cell={44} gap={14} lit={lit} />
      <SoftIn N={N} f0={6468} len={10} dy={8}>
        <div style={{...abs(720, 566, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>顺序从"组件最少的列表"开始，还倒着遍历</span>
        </div>
      </SoftIn>
    </div>
  );
};
