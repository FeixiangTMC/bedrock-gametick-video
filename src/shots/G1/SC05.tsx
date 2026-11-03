import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, slideUp, SoftIn, LText} from '../../ui';
import {BigNumber} from '../../fx';

/** SC05 眨眼六圈 / 一天两万四千刻（971–1225）：979 六个眨眼点依次点亮；1062 大数字 24000 刻 = 20 分钟 */
const F0 = 1139;
const TO = 1425;
export const SC05: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 1139;
  const n2 = N - 1242;
  const op = exitOp(N, TO, 10);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      {/* 六个眨眼点 = 六个游戏刻 */}
      <div style={{...abs(300, 232, 680), textAlign: 'center'}}>
        <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>眨一次眼</span>
      </div>
      {Array.from({length: 6}).map((_, i) => {
        const nn = n1 - i * 6;
        const on = Math.min(1, Math.max(0, nn / 8));
        return (
          <div
            key={i}
            style={{
              ...abs(392 + i * 88, 276, 22, 22),
              borderRadius: 11,
              border: `2px solid ${on > 0.5 ? PURPLE_LIGHT : GREY}`,
              background: on > 0.5 ? PURPLE_LIGHT : 'transparent',
              opacity: 0.35 + 0.65 * on,
              boxShadow: on > 0.5 ? '0 0 14px 3px rgba(161,117,241,.55)' : undefined,
              transform: `scale(${0.7 + 0.3 * on})`,
            }}
          />
        );
      })}
      <SoftIn N={N} f0={1178} len={10} dy={8}>
        <div style={{...abs(300, 314, 680), textAlign: 'center'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>六个游戏刻 · 三百毫秒</span>
        </div>
      </SoftIn>

      {/* 一天 = 24000 刻 = 20 分钟 */}
      <div style={{opacity: Math.min(1, Math.max(0, n2 / 14))}}>
        <BigNumber cx={400} cy={470} value="24,000" size={96} unit="刻 / 一天" unitSize={22} />
      </div>
      <SoftIn N={N} f0={1296} len={12} dy={10}>
        <div style={{...abs(700, 430, 400), textAlign: 'left'}}>
          <LText cx={0} cy={0} size={44} weight={900} color={PURPLE_LIGHT} scaleX={0.85}>
            = 20 分钟
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={1326} len={12} dy={8}>
        <div style={{...abs(700, 492, 420), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>白天到黑夜，现实中二十分钟</span>
        </div>
      </SoftIn>
    </div>
  );
};
