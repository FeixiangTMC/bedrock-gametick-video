import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle, CellGrid} from './pipe';

/** SC28 区块不是到点就存 / 遥测（6793–7059）：6801 一百次更新的倒计时；6920 十分钟一次的遥测 */
const F0 = 8040;
const TO = 8196;
export const SC28: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 8048;
  const n2 = N - 8149;
  const op = exitOp(N, TO, 10);
  const count = Math.min(100, Math.max(0, Math.floor((n1 / 60) * 100)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={5} y={150} />
      <StageTitle text="区块不是到点就存" sub="要攒满一百次完整更新" />

      <div style={{...abs(210, 360, 180)}}>
        <span style={{fontSize: 54, fontFamily: "'Orbitron','Audiowide',sans-serif", color: WHITE}}>{String(count).padStart(3, '0')}</span>
      </div>
      <SoftIn N={N} f0={8048} len={8} dy={6}>
        <div style={{...abs(210, 330, 200), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>完整更新次数</span>
        </div>
      </SoftIn>
      <div style={{...abs(210, 440, 420, 12), border: `2px solid ${WHITE}`, borderRadius: 6, opacity: 0.85}}>
        <div style={{height: '100%', width: `${count}%`, background: PURPLE_LIGHT, borderRadius: 4, boxShadow: '0 0 10px rgba(161,117,241,.6)'}} />
      </div>

      <SoftIn N={N} f0={8149} len={10} dy={8}>
        <div style={{...abs(760, 340, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            性能遥测：一万二千刻一次
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={8184} len={10} dy={8}>
        <div style={{...abs(760, 386, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>也就是现实里的十分钟</span>
        </div>
      </SoftIn>
      <CellGrid x={760} y={430} cols={4} rows={1} cell={18} gap={10} lit={4} />
    </div>
  );
};
