import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PersonIcon} from '../../ui';
import {PipeRail, StageTitle, CellGrid} from './pipe';

/** SC21 常加载区：人不在也在转（4760–5041）：4768 远处一块地被虚线框住；4870 点明「不刷怪」 */
const F0 = 5841;
const TO = 6091;
export const SC21: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 5849;
  const n2 = N - 6079;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 20));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={3} y={150} />
      <StageTitle text="常加载区：人不在也在转" sub="给农场用的白名单" />

      <div style={{...abs(250, 350, 320, 220), opacity: k}}>
        <div style={{position: 'absolute', inset: 0, border: `2px dashed ${PURPLE_LIGHT}`, borderRadius: 12}} />
        <CellGrid x={26} y={26} cols={3} rows={2} cell={54} gap={16} lit={6} />
      </div>
      <SoftIn N={N} f0={5921} len={10} dy={6}>
        <div style={{...abs(250, 590, 320), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: PURPLE_LIGHT, letterSpacing: 1}}>常加载区</span>
        </div>
      </SoftIn>

      <div style={{opacity: k}}>
        <PersonIcon cx={1000} cy={430} size={110} label="玩家在这里" labelSize={20} />
      </div>
      <div style={{...abs(690, 452, 190), height: 2, background: GREY, opacity: 0.5 * k, borderStyle: 'dashed'}} />
      <SoftIn N={N} f0={5989} len={10} dy={6}>
        <div style={{...abs(660, 500, 260), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>人影都不在</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={6079} len={10} dy={8}>
        <div style={{...abs(620, 560, 560), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            它不省算力，也不刷怪
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
