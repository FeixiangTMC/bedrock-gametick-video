import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, LineArrow, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';
import {LightSweep, StageLine} from '../../fx';
import {GlitchIn} from '../../common';
import {Metronome, HeroHalo} from './parts';

/** SC03 两条线索汇成同一个东西：节拍（491–749）
 *  499 开场型高光：三轮扫光 + 舞台光，左右虚线汇向中央；631 节拍器升起，唯一一处 glitch 给「刻」 */
const F0 = 600;
const TO = 881;
export const SC03: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 608;
  const n2 = N - 748;
  const op = exitOp(N, TO, 10);
  const lineP = Math.min(1, Math.max(0, n1 / 24));
  const haloK = n2 < 0 ? 0 : Math.min(1, n2 / 24);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <LightSweep N={N} rounds={[588, 596, 608]} />
      <StageLine N={N} f0={608} flashAt={534} />

      {/* 左右汇入线 */}
      <LineArrow x0={210} y0={330} x1={520} y1={368} p={lineP} dashed rodW={2} color={GREY} />
      <LineArrow x0={1070} y0={330} x1={760} y1={368} p={lineP} dashed rodW={2} color={GREY} />
      <SoftIn N={N} f0={616} len={10} dy={8}>
        <div style={{...abs(110, 306, 120), textAlign: 'center'}}>
          <CText cx={60} cy={0} size={26} weight={700} color={GREY}>不长</CText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={600} len={10} dy={8}>
        <div style={{...abs(1050, 306, 120), textAlign: 'center'}}>
          <CText cx={60} cy={0} size={26} weight={700} color={GREY}>卡</CText>
        </div>
      </SoftIn>

      {/* 主角柔光（径向，不露矩形边） */}
      {haloK > 0 ? <HeroHalo cx={640} cy={430} r={210} k={haloK} /> : null}
      <Metronome N={N} f0={748} cx={640} cy={430} h={264} />

      {/* 唯一 glitch：「刻」 */}
      <div style={{...abs(0, 150, 1280, 120), textAlign: 'center'}}>
        <GlitchIn N={N} f0={757} rgbSplit={7}>
          <CText cx={640} cy={60} size={92} weight={900} color={WHITE} scaleX={0.86} shadow={`0 4px 0 ${PURPLE_LIGHT}, 0 0 26px rgba(102,45,248,.5)`}>
            刻
          </CText>
        </GlitchIn>
      </div>
      <SoftIn N={N} f0={776} len={12} dy={10}>
        <div style={{...abs(0, 588, 1280), textAlign: 'center'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 2}}>TICK · 每秒二十下</span>
        </div>
      </SoftIn>
    </div>
  );
};
