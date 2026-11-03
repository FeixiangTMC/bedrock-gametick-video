import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {BigNumber} from '../../fx';
import {StepLadder, StepTitle} from './steps';

/** SC35 概率与等待：万分之六 / 平均八十二秒（8688–8963）：8696 概率与大数字；8780 随机刻已独立，本镜头只讲概率 */
const F0 = 12357;
const TO = 12711;
export const SC35: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 12365;
  const n2 = N - 12699;
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={3} y={214} />
      <StepTitle text="抽中的机会：万分之六" sub="平均要等八十二秒才轮到一次" />

      <div style={{opacity: Math.min(1, Math.max(0, n1 / 16))}}>
        <BigNumber cx={470} cy={400} value="0.006" size={96} unit="% / 刻" unitSize={22} />
      </div>
      <SoftIn N={N} f0={12539} len={10} dy={8}>
        <div style={{...abs(820, 340, 340), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={WHITE}>
            平均等 82 秒
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={12619} len={10} dy={8}>
        <div style={{...abs(820, 384, 360), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>从种下到收获，都是这个等待</span>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={12699} len={10} dy={8}>
        <div style={{...abs(820, 440, 360), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={PURPLE_LIGHT}>
            下一步：普通计划刻
          </LText>
        </div>
      </SoftIn>
    </div>
  );
};
