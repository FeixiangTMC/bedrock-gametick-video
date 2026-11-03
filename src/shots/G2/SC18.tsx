import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {TiltPlane} from '../../fx';
import {PipeRail, StageTitle} from './pipe';

/** SC18 维度：每个维度挨个走（3919–4180）：3927 三块平面依次亮起；4056 说明遍历顺序 */
const F0 = 4899;
const TO = 5197;
const NAMES = ['主世界', '下界', '末地'];
export const SC18: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 4907;
  const n2 = N - 4980;
  const op = exitOp(N, TO, 10);
  const active = n1 < 0 ? -1 : Math.floor(N / 26) % 3;
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={2} y={150} />
      <StageTitle text="维度：挨个走一遍" sub="每个维度各跑一次基础更新" />
      {NAMES.map((nm, i) => {
        const cy = 330 + i * 92;
        const on = active === i;
        return (
          <div key={nm} style={{opacity: Math.min(1, Math.max(0, (n1 - i * 8) / 16))}}>
            <TiltPlane cx={470} cy={cy} w={420} h={62} skew={-26} sy={0.42} stroke={on ? PURPLE_LIGHT : WHITE} sw={on ? 2.5 : 1.6} fill={on ? 'rgba(102,48,248,.22)' : 'rgba(0,0,0,.7)'} />
            <div style={{...abs(470 - 90, cy - 16, 180), textAlign: 'center'}}>
              <CText cx={90} cy={16} size={22} weight={700} color={on ? WHITE : GREY}>
                {nm}
              </CText>
            </div>
          </div>
        );
      })}
      <SoftIn N={N} f0={4980} len={10} dy={8}>
        <div style={{...abs(760, 340, 400), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            按加入的先后遍历
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={5013} len={10} dy={8}>
        <div style={{...abs(760, 384, 420), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>顺序随平台而异，不是坐标顺序</span>
        </div>
      </SoftIn>
    </div>
  );
};
