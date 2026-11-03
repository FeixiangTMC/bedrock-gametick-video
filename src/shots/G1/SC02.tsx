import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CORAL, CText, Box, Gauge, GREY, WHITE, PURPLE, PURPLE_LIGHT, GREY_LIGHT, abs, exitOp, slideUp, SoftIn} from '../../ui';

/** SC02 公屏喊卡 vs CPU 只用了 3%（292–490）：300 聊天气泡滑入 + 仪表指针走到 3%；403 “不长 / 卡” 两条并列 */
const F0 = 311;
const TO = 599;
export const SC02: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 319;
  const n2 = N - 501;
  const k = Math.min(1, Math.max(0, n1 / 26));
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 聊天气泡 */}
      <div style={{transform: `translateY(${slideUp(Math.max(0, n1), 22, 16)}px)`, opacity: Math.min(1, Math.max(0, n1 / 12))}}>
        <div style={{...abs(120, 250, 34, 34), borderRadius: 17, background: '#1b1b22', border: `2px solid ${GREY_LIGHT}`}} />
        <CText cx={137} cy={268} size={20} weight={800} color={WHITE}>?</CText>
        <Box x={168} y={244} w={330} h={76} r={38} fill="#101014" stroke={GREY_LIGHT} sw={2} />
        <div style={{...abs(168, 244, 330, 76)}}>
          <CText cx={165} cy={40} size={30} weight={700} color={WHITE} scaleX={0.95}>
            卡了卡了，延迟太大了
          </CText>
        </div>
      </div>

      {/* CPU 仪表 */}
      <div style={{opacity: Math.min(1, Math.max(0, k)), transform: `translateY(${slideUp(k * 26, 18, 16)}px)`}}>
        <Gauge cx={950} cy={352} r={104} v={0.03 * k} label="CPU" value={`${Math.round(3 * k)}%`} color={WHITE} accent={PURPLE} />
      </div>

      {/* 旁白补充：只有一个核心占满 */}
      <div style={{...abs(760, 512, 380), opacity: Math.min(1, Math.max(0, (k - 0.6) / 0.4)), textAlign: 'center'}}>
        <span style={{fontSize: 21, color: CORAL, letterSpacing: 1}}>但有一个核心已经占满</span>
      </div>

      {/* 两个观察并列 */}
      <SoftIn N={N} f0={501} len={10} dy={14}>
        <div style={{...abs(300, 470, 200), textAlign: 'center'}}>
          <CText cx={100} cy={0} size={44} weight={900} color={WHITE} scaleX={0.85}>
            不长
          </CText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={510} len={10} dy={14}>
        <div style={{...abs(800, 470, 200), textAlign: 'center'}}>
          <CText cx={100} cy={0} size={44} weight={900} color={WHITE} scaleX={0.85}>
            卡
          </CText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={504} len={12} dy={0}>
        <div style={{...abs(590, 452, 100), textAlign: 'center'}}>
          <CText cx={50} cy={0} size={52} weight={700} color={PURPLE_LIGHT} scaleX={1}>
            ?
          </CText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={512} len={12} dy={0}>
        <div style={{...abs(300, 536, 700), textAlign: 'center'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>两台看着不像同一件事</span>
        </div>
      </SoftIn>
    </div>
  );
};
