import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC17 时间管理器：昼夜在这一步推进（3646–3918）：3654 昼夜弧 + 太阳；3750 说明同步间隔 */
const F0 = 4566;
const TO = 4898;
const CX = 400;
const CY = 470;
const R = 150;
export const SC17: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 4703;
  const n2 = N - 4574;
  const op = exitOp(N, TO, 10);
  const p = Math.min(1, Math.max(0, n1 / 30));
  const a = Math.PI * (1 - 0.62 * p); // 太阳沿半圆走
  const sx = CX + R * Math.cos(a);
  const sy = CY - R * Math.sin(a);
  const arc = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={1} y={150} />
      <StageTitle text="时间管理器：昼夜在这推进" sub="太阳高度、天色、日照强度" />

      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={arc} fill="none" stroke={GREY_LINE} strokeWidth={2} strokeDasharray={470} strokeDashoffset={470 * (1 - p)} />
        <line x1={CX - R - 20} y1={CY} x2={CX + R + 20} y2={CY} stroke={GREY_LINE} strokeWidth={1.5} opacity={0.7} />
        {p > 0.15 ? <circle cx={sx} cy={sy} r={9} fill={PURPLE_LIGHT} style={{filter: 'drop-shadow(0 0 12px rgba(161,117,241,.9))'}} /> : null}
      </svg>
      <SoftIn N={N} f0={4886} len={10} dy={6}>
        <div style={{...abs(CX - 60, CY + 12, 120), textAlign: 'center'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>地平线</span>
        </div>
      </SoftIn>

      <SoftIn N={N} f0={4574} len={10} dy={8}>
        <div style={{...abs(720, 320, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            两百五十六刻同步一次
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={4719} len={10} dy={8}>
        <div style={{...abs(720, 364, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>你看到的天色，不是每刻都刷</span>
        </div>
      </SoftIn>
    </div>
  );
};
