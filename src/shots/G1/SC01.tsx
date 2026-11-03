import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, abs, exitOp, scaleIn, slideUp, SoftIn} from '../../ui';
import {ServerTile, CropCell, HeroHalo} from './parts';

/** SC01 深夜的服务器与那块田（78–291）：86 服务器缩放入场 + 指示灯呼吸；182 六格耕地 2 帧错峰滑入，芽只有 6px */
const F0 = 78;
const TO = 310;
export const SC01: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 86;
  const n2 = N - 194;
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <HeroHalo cx={315} cy={368} r={210} k={0.55} />      <div
        style={{
          ...abs(210, 250),
          transform: `scale(${0.86 + 0.14 * scaleIn(Math.max(0, n1), 20)}) translateY(${slideUp(Math.max(0, n1), 26, 18)}px)`,
          opacity: Math.min(1, Math.max(0, n1 / 12)),
        }}
      >
        <ServerTile x={0} y={0} w={210} h={236} N={N} />
      </div>
      <SoftIn N={N} f0={100} len={10} dy={8}>
        <div style={{...abs(210, 508, 210), textAlign: 'center'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>服务器</span>
        </div>
      </SoftIn>

      {Array.from({length: 6}).map((_, i) => {
        const nn = n2 - i * 2;
        return (
          <div key={i} style={{opacity: Math.min(1, Math.max(0, nn / 10)), transform: `translateY(${slideUp(Math.max(0, nn), 20, 16)}px)`}}>
            <CropCell x={620 + i * 92} y={330} size={68} sprout={6} />
          </div>
        );
      })}
      <SoftIn N={N} f0={218} len={10} dy={8}>
        <div style={{...abs(620, 424, 460), textAlign: 'center'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>三天前种下的小麦</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={243} len={12} dy={0}>
        <div style={{...abs(620, 470, 460), textAlign: 'center'}}>
          <CText cx={230} cy={0} size={26} weight={700} color={WHITE} scaleX={1}>
            一株都没长
          </CText>
        </div>
      </SoftIn>
    </div>
  );
};
