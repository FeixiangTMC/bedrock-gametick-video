import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC46 会检查相位的方块（11608–11899）：11616 六个方块逐个亮；11780 讲台与侦测器补上 */
const F0 = 10071;
const TO = 10383;
const BLOCKS = ['漏斗', '比较器', '活塞', '钟', '讲台', '侦测器'];
export const SC46: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - 10079;
  const op = exitOp(N, TO, 10);
  const shown = Math.min(6, Math.max(0, Math.floor((n - 6) / 12)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 210, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          它们会问：这一刻是不是红石刻
        </LText>
      </div>
      {BLOCKS.map((b, i) => (
        <div
          key={b}
          style={{
            ...abs(200 + (i % 3) * 280, 320 + Math.floor(i / 3) * 140, 240, 100),
            border: `2.5px solid ${i < shown ? PURPLE_LIGHT : '#3A3A3A'}`,
            borderRadius: 10,
            opacity: i < shown ? 1 : 0.28,
            background: i < shown ? 'rgba(102,48,248,.12)' : 'transparent',
          }}
        >
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: 26, color: WHITE, fontWeight: 700}}>{b}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
