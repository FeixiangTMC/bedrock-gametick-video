import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';
import {PipeRail, StageTitle} from '../G2/pipe';

/** SC30 睡觉与收尾（7321–7607）：7329 全体入睡、时间跳到日出；7450 刻计数 +1 */
const F0 = 10622;
const TO = 10937;
export const SC30: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 10631;
  const n2 = N - 10924;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 20));
  const jump = Math.min(1, Math.max(0, (N - 10799) / 24));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={5} y={150} />
      <StageTitle text="收尾：睡觉与 +1" sub="所有人躺下，时间直接跳到日出" />

      {/* 床 */}
      <div style={{...abs(250, 388, 260, 110), opacity: k}}>
        <div style={{position: 'absolute', inset: 0, border: `2.5px solid ${WHITE}`, borderRadius: 10, background: '#0b0c11'}} />
        <div style={{position: 'absolute', left: 16, top: 16, width: 90, height: 78, border: `2px solid ${GREY}`, borderRadius: 8}} />
        <div style={{position: 'absolute', left: 116, top: 40, width: 128, height: 50, border: `2px solid ${PURPLE_LIGHT}`, borderRadius: 6, opacity: 0.6}} />
      </div>
      <SoftIn N={N} f0={10680} len={10} dy={6}>
        <div style={{...abs(250, 520, 260), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>所有人入睡</span>
        </div>
      </SoftIn>

      {/* 日出跳变 */}
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={620} y1={470} x2={1060} y2={470} stroke="#4A4A4A" strokeWidth={1.5} />
        <line x1={620} y1={470} x2={620} y2={300} stroke="#4A4A4A" strokeWidth={1.5} />
        <path d={`M 640 460 Q 760 ${460 - 120 * (1 - jump) - 20} 1000 340`} fill="none" stroke={PURPLE_LIGHT} strokeWidth={2} strokeDasharray="8 8" opacity={k} />
        {k > 0.3 ? <circle cx={640 + 360 * jump} cy={460 - 120 * jump} r={9} fill={PURPLE_LIGHT} /> : null}
      </svg>
      <SoftIn N={N} f0={10799} len={10} dy={8}>
        <div style={{...abs(640, 512, 420), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>时间跳到下一个日出</span>
        </div>
      </SoftIn>

      {/* 刻 +1 */}
      <SoftIn N={N} f0={10924} len={10} dy={8}>
        <div style={{...abs(880, 250, 260), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={130} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            刻计数 +1
          </CText>
        </div>
      </SoftIn>
      <div style={{...abs(880, 292, 260), textAlign: 'center', opacity: Math.min(1, Math.max(0, n2 / 12))}}>
        <span style={{fontSize: 62, fontFamily: "'Orbitron','Audiowide',sans-serif", color: WHITE}}>
          {String(Math.floor(N / 3) % 1000).padStart(3, '0')}
        </span>
      </div>
    </div>
  );
};
