import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, GREY_LINE, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC08 服务端不看圈数，看时间（1582–1772）：1590 时间轴 + 游标；1660 目标时间刻度落在轴上 */
const F0 = 1805;
const TO = 2029;
export const SC08: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 1819;
  const n2 = N - 1906;
  const op = exitOp(N, TO, 10);
  const axisP = Math.min(1, Math.max(0, n1 / 24));
  // 游标：沿轴来回走，表示"时间一直往前"
  const t = (N - 1819) / 90;
  const px = 220 + (1100 - 220) * Math.min(1, (t % 1) * 1.0);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 轴 */}
      <div style={{...abs(220, 356, 880 * axisP, 2), background: WHITE, opacity: 0.85}} />
      {/* 刻度 */}
      {Array.from({length: 9}).map((_, i) => (
        <div key={i} style={{...abs(220 + i * 110, 348, 2, 18), background: GREY_LINE, opacity: axisP}} />
      ))}
      {/* 游标 */}
      <div style={{...abs(px - 1, 300, 2, 112), background: PURPLE_LIGHT, boxShadow: '0 0 12px 2px rgba(161,117,241,.6)', opacity: axisP}} />
      <div style={{...abs(px - 34, 274, 68), textAlign: 'center', whiteSpace: 'nowrap', opacity: axisP}}>
        <span style={{fontSize: 20, color: PURPLE_LIGHT, letterSpacing: 1}}>现在</span>
      </div>

      {/* 目标时间 */}
      <SoftIn N={N} f0={1906} len={12} dy={0}>
        <div style={{...abs(1080, 300, 2, 112), background: WHITE, opacity: 0.9}} />
        <div style={{...abs(1010, 424, 160), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={80} cy={0} size={22} weight={700} color={WHITE}>
            目标时间
          </CText>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={1837} len={12} dy={8}>
        <div style={{...abs(220, 244, 640), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={30} weight={800} color={WHITE} scaleX={0.9}>
            它记的是时间，不是圈数
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={1937} len={12} dy={8}>
        <div style={{...abs(220, 496, 900), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>时间走到哪，下一步就该在哪一刻</span>
        </div>
      </SoftIn>
    </div>
  );
};
