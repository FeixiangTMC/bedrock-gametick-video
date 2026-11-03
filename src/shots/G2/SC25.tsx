import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC25 保存区块、回收实体、清掉线记录（5907–6186）：5915 磁盘写入；6000 掉线玩家淡出 */
const F0 = 7053;
const TO = 7382;
export const SC25: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 7061;
  const n2 = N - 7063;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 20));
  const fade = Math.max(0.12, 1 - Math.min(1, Math.max(0, n2 / 26)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={5} y={150} />
      <StageTitle text="收尾：存档与清理" sub="保存区块、回收实体、清掉线记录" />

      {/* 磁盘 */}
      <div style={{...abs(300, 350, 200, 150), opacity: k}}>
        <div style={{position: 'absolute', inset: 0, border: `2.5px solid ${WHITE}`, borderRadius: 10, background: '#0b0c11'}} />
        <div style={{position: 'absolute', left: 26, top: 22, right: 26, height: 44, border: `2px solid ${GREY_LINE}`, borderRadius: 4}} />
        <div style={{position: 'absolute', left: 26, top: 96, width: 148, height: 10, background: PURPLE_LIGHT, boxShadow: '0 0 12px rgba(161,117,241,.7)'}} />
      </div>
      <SoftIn N={N} f0={7117} len={10} dy={6}>
        <div style={{...abs(300, 520, 200), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>区块写盘</span>
        </div>
      </SoftIn>

      {/* 掉线玩家淡出 */}
      <div style={{...abs(760, 340, 200, 220), opacity: fade}}>
        <div style={{...abs(64, 0, 72, 72), borderRadius: 36, border: `2px solid ${WHITE}`}} />
        <div style={{...abs(48, 82, 104, 96), border: `2px solid ${WHITE}`, borderRadius: 12, borderBottomLeftRadius: 40, borderBottomRightRadius: 40}} />
      </div>
      <SoftIn N={N} f0={7063} len={10} dy={6}>
        <div style={{...abs(700, 570, 420), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>掉线的残留记录，这一圈清掉</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={7135} len={10} dy={8}>
        <div style={{...abs(700, 610, 420), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={210} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            不然会一直占着位置
          </CText>
        </div>
      </SoftIn>
    </div>
  );
};
