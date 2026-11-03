import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle, CellGrid} from './pipe';

/** SC16 刷怪决定数量，顺序每二十刻洗一次（3413–3645）：3421 怪的点阵；3511 格子重排 */
const F0 = 4302;
const TO = 4565;
export const SC16: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 4310;
  const n2 = N - 4324;
  const op = exitOp(N, TO, 10);
  const lit = Math.min(18, Math.max(0, Math.floor(n1 / 6)));
  // 洗牌：每 20 刻轮换一次顺序
  const rot = n2 < 0 ? 0 : Math.floor(N / 20) % 18;
  const order = Array.from({length: 18}, (_, i) => (i + rot) % 18);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={1} y={150} />
      <StageTitle text="刷怪：决定你脚边的怪" sub="密度与上限检测" />

      <CellGrid x={210} y={356} cols={6} rows={3} cell={34} gap={16} lit={lit} order={order} />

      <SoftIn N={N} f0={4389} len={10} dy={8}>
        <div style={{...abs(210, 540, 400), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={700} color={WHITE}>
            上限到了就停
          </LText>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={4324} len={10} dy={8}>
        <div style={{...abs(700, 356, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            每二十刻，洗一次顺序
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={4369} len={10} dy={8}>
        <div style={{...abs(700, 400, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>免得后续区块刻总是固定顺序执行</span>
        </div>
      </SoftIn>
    </div>
  );
};
