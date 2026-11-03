import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC43 源与电容 / 消费者与传输者（10811–11141）：10819 左列亮；10960 右列亮 */
const F0 = 9042;
const TO = 9447;
const SRC = ['拉杆', '按钮', '火把', '中继器'];
const DST = ['活塞', '红石灯', '漏斗', '红石线'];
export const SC43: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 9052;
  const n2 = N - 9271;
  const op = exitOp(N, TO, 10);
  const k1 = Math.min(1, Math.max(0, n1 / 16));
  const k2 = Math.min(1, Math.max(0, n2 / 16));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 206, 420), opacity: k1, whiteSpace: 'nowrap'}}>
        <LText cx={0} cy={0} size={28} weight={900} color={PURPLE_LIGHT}>信号源与电容</LText>
      </div>
      {SRC.map((s, i) => (
        <div key={s} style={{...abs(200, 268 + i * 62, 300, 48), opacity: k1 * (0.55 + 0.45 * Math.min(1, (n1 - i * 8) / 12)), border: `2px solid ${PURPLE_LIGHT}`, borderRadius: 10, background: 'rgba(102,48,248,.12)'}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 16}}>
            <span style={{fontSize: 21, color: WHITE}}>{s}</span>
          </div>
        </div>
      ))}

      <div style={{...abs(760, 206, 420), opacity: k2, whiteSpace: 'nowrap'}}>
        <LText cx={0} cy={0} size={28} weight={900} color={WHITE}>消费者与传输者</LText>
      </div>
      {DST.map((s, i) => (
        <div key={s} style={{...abs(760, 268 + i * 62, 300, 48), opacity: k2 * (0.55 + 0.45 * Math.min(1, (n2 - i * 8) / 12)), border: `2px solid ${WHITE}`, borderRadius: 10}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 16}}>
            <span style={{fontSize: 21, color: WHITE}}>{s}</span>
          </div>
        </div>
      ))}
      <SoftIn N={N} f0={9432} len={10} dy={8}>
        <div style={{...abs(540, 300, 200), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={100} cy={0} size={34} weight={700} color={GREY}>→</CText>
        </div>
      </SoftIn>
    </div>
  );
};
