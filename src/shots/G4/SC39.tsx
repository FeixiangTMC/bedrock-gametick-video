import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC39 顺序打乱 / 第八步应用红石（9931–10197）：9939 方块实体顺序洗牌；10020 红石结果落回方块 */
const F0 = 13700;
const TO = 13993;
export const SC39: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 13708;
  const n2 = N - 13981;
  const op = exitOp(N, TO, 10);
  const rot = Math.floor(N / 14) % 6;
  const order = Array.from({length: 6}, (_, i) => (i + rot) % 6);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={6} y={214} />
      <StepTitle text="顺序每轮打乱，红石结果落回方块" sub="第七步尾巴 · 第八步" />

      {order.map((id, pos) => (
        <div key={id} style={{...abs(420 + pos * 74, 350, 58, 58), border: `2px solid ${WHITE}`, borderRadius: 6, opacity: 0.5 + 0.5 * (id === 0 ? 1 : 0.4), background: id === 0 ? 'rgba(102,48,248,.2)' : 'transparent'}} />
      ))}
      <SoftIn N={N} f0={13812} len={10} dy={6}>
        <div style={{...abs(420, 424, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>这是基岩版红石机器不稳定的主要原因</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={13981} len={10} dy={8}>
        <div style={{...abs(760, 500, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            算好的信号，落回方块
          </LText>
        </div>
      </SoftIn>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={760} y1={470} x2={900} y2={470} stroke={PURPLE_LIGHT} strokeWidth={2.5} opacity={Math.min(1, Math.max(0, (n2 - 8) / 14))} />
      </svg>
    </div>
  );
};
