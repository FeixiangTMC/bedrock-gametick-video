import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';
import {LightSweep} from '../../fx';
import {CropCell, HeroHalo} from '../G1/parts';

/** SC55 回到那个卡顿的服务器（13689–13926）：13697 麦田重现；13760 收尾扫光（白名单第 2 处）；13810 大字回扣 */
const F0 = 16105;
const TO = 16384;
export const SC55: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 16113;
  const n2 = N - 16372;
  const op = exitOp(N, TO, 16);
  const k = Math.min(1, Math.max(0, n1 / 20));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <LightSweep N={N} rounds={[15481, 15489, 15497]} />
      <HeroHalo cx={640} cy={368} r={250} k={0.5 * k} />

      {Array.from({length: 6}).map((_, i) => (
        <div key={i} style={{opacity: k, transform: `translateY(${(1 - k) * 14}px)`}}>
          <CropCell x={420 + i * 92} y={300} size={68} sprout={13} />
        </div>
      ))}

      <div style={{...abs(0, 400, 1280), textAlign: 'center', whiteSpace: 'nowrap', opacity: Math.min(1, Math.max(0, (n2 - 30) / 20))}}>
        <CText cx={640} cy={0} size={26} weight={700} color={PURPLE_LIGHT} scaleX={1}>
          它等的是哪一拍
        </CText>
      </div>
      <div style={{...abs(0, 450, 1280), textAlign: 'center', whiteSpace: 'nowrap', opacity: Math.min(1, Math.max(0, (n2 - 70) / 20))}}>
        <CText cx={640} cy={0} size={46} weight={900} color={WHITE} scaleX={0.86} shadow={'0 4px 0 #5A3AD5, 0 0 28px rgba(102,45,248,.5)'}>
          又被谁挤掉了
        </CText>
      </div>
    </div>
  );
};
