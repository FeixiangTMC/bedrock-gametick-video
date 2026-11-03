import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {TickLane} from './parts';

/** SC06 画面一百多帧 vs 逻辑二十步（1226–1458）：1234 两条刻度道；1335 编号对比，紫色只给「20」 */
const F0 = 1426;
const TO = 1674;
export const SC06: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 1438;
  const n2 = N - 1548;
  const op = exitOp(N, TO, 10);
  const laneP = Math.min(1, Math.max(0, n1 / 20));
  const litRender = Math.min(120, Math.max(0, Math.floor((n1 - 6) * 1.6)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 道 A：画面（帧） */}
      <SoftIn N={N} f0={1442} len={10} dy={6}>
        <div style={{...abs(180, 232, 200), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={26} weight={700} color={WHITE}>画面</LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={1435} len={10} dy={6}>
        <div style={{...abs(180, 262, 240), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>每秒一百多帧（示意）</span>
        </div>
      </SoftIn>
      <TickLane x={430} y={250} w={700} count={120} lit={litRender} h={34} op={laneP} color={GREY_LINE} litColor="rgba(255,255,255,.85)" />

      {/* 道 B：逻辑（刻） */}
      <SoftIn N={N} f0={1447} len={10} dy={6}>
        <div style={{...abs(180, 400, 200), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={26} weight={700} color={PURPLE_LIGHT}>逻辑</LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={1453} len={10} dy={6}>
        <div style={{...abs(180, 430, 240), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>每秒二十刻</span>
        </div>
      </SoftIn>
      <TickLane x={430} y={418} w={700} count={20} lit={Math.min(20, Math.max(0, Math.floor((n1 - 20) / 3)))} h={34} op={laneP} litColor={PURPLE_LIGHT} />

      {/* 数字对比 */}
      <div style={{opacity: Math.min(1, Math.max(0, n2 / 14))}}>
        <div style={{...abs(430, 500, 260), textAlign: 'center'}}>
          <span style={{fontSize: 44, fontFamily: "'Orbitron','Audiowide',sans-serif", color: GREY_LIGHT_TXT}}>≈144</span>
        </div>
        <div style={{...abs(740, 494, 300), textAlign: 'center'}}>
          <CText cx={150} cy={30} size={64} weight={900} color={PURPLE_LIGHT} scaleX={1} shadow={'0 0 24px rgba(102,45,248,.55)'}>
            20
          </CText>
        </div>
      </div>
      <SoftIn N={N} f0={1600} len={12} dy={8}>
        <div style={{...abs(180, 586, 920), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>两个速率各管一头：画面管顺滑，逻辑管世界</span>
        </div>
      </SoftIn>
    </div>
  );
};

const GREY_LIGHT_TXT = '#D4D4D4';
