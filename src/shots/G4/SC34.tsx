import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {StepLadder, StepTitle} from './steps';

/** SC34 随机刻：每刻抓几个方块，抓到谁谁长（8389–8687）：8397 格子里随机闪烁；8500 列出受影响的方块 */
const F0 = 11751;
const TO = 12356;
const COLS = 6;
const ROWS = 4;
export const SC34: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 11759;
  const n2 = N - 12071;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 16));
  const hot = Math.floor(N / 8) % (COLS * ROWS);
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <StepLadder current={2} y={214} />
      <StepTitle text="随机刻：抓到谁，谁才长" sub="每刻从区块里抽几个方块" />

      <div style={{...abs(420, 326, COLS * 62, ROWS * 62), opacity: k}}>
        {Array.from({length: COLS * ROWS}).map((_, i) => {
          const c = i % COLS;
          const r = Math.floor(i / COLS);
          const on = i === hot;
          return (
            <div
              key={i}
              style={{
                ...abs(c * 62, r * 62, 52, 52),
                border: `2px solid ${on ? PURPLE_LIGHT : GREY_LINE}`,
                borderRadius: 5,
                background: on ? 'rgba(102,48,248,.3)' : 'transparent',
                boxShadow: on ? '0 0 16px 3px rgba(161,117,241,.5)' : undefined,
              }}
            />
          );
        })}
      </div>

      <SoftIn N={N} f0={12071} len={10} dy={8}>
        <div style={{...abs(840, 330, 380), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={WHITE}>
            作物、草蔓延
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={12157} len={10} dy={8}>
        <div style={{...abs(840, 374, 380), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={22} weight={800} color={WHITE}>
            树叶消失、铜氧化
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={12344} len={10} dy={8}>
        <div style={{...abs(840, 424, 380), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>都等这一次抽签</span>
        </div>
      </SoftIn>
    </div>
  );
};
