import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn} from '../../ui';

/** 相位尺：20 格刻，每两格标一个红石刻（当前相位高亮） */
export const PhaseRuler: React.FC<{N: number; y?: number; op?: number; litPhase?: boolean}> = ({N, y = 300, op = 1}) => {
  const cur = Math.floor(N / 3) % 20;
  return (
    <div style={{...abs(200, y, 880, 90), opacity: op}}>
      {Array.from({length: 20}).map((_, i) => {
        const on = i === cur;
        const rt = i % 2 === 0;
        return (
          <div key={i} style={{...abs(i * 44, 20, 30, 50)}}>
            <div
              style={{
                ...abs(0, 0, 30, 50),
                border: `2px solid ${on ? WHITE : rt ? PURPLE_LIGHT : GREY_LINE}`,
                borderRadius: 4,
                background: on ? 'rgba(102,48,248,.45)' : rt ? 'rgba(102,48,248,.14)' : 'transparent',
                opacity: on ? 1 : rt ? 0.9 : 0.5,
              }}
            />
          </div>
        );
      })}
      <div style={{...abs(0, 76, 880)}}>
        <span style={{fontSize: 19, color: GREY, letterSpacing: 1}}>紫格 = 红石刻（每两刻一次）</span>
      </div>
    </div>
  );
};
