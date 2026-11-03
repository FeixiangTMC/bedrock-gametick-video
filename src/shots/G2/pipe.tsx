import React from 'react';
import {CText, Box, GREY, GREY_LINE, WHITE, PURPLE, PURPLE_LIGHT, abs, LText} from '../../ui';

export const PIPE_STEPS = ['记账', '时间', '维度', '区块刻', '实体', '收尾'];

/** 世界更新的六段流水线：当前段紫、已过灰底、未到灰边（全章共用，保证承接） */
export const PipeRail: React.FC<{N: number; stage: number; y?: number; op?: number}> = ({stage, y = 150, op = 1}) => (
  <div style={{...abs(210, y, 860, 46), opacity: op}}>
    {PIPE_STEPS.map((s, i) => {
      const cur = i === stage;
      const past = i < stage;
      return (
        <div key={s} style={{...abs(i * 148, 0, 122, 40)}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 20,
              background: cur ? PURPLE : past ? 'rgba(255,255,255,.14)' : 'transparent',
              border: `2px solid ${cur ? WHITE : past ? 'transparent' : GREY_LINE}`,
              boxShadow: cur ? '0 0 18px 4px rgba(102,45,248,.45)' : undefined,
            }}
          />
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: 22, color: cur ? WHITE : past ? 'rgba(255,255,255,.8)' : GREY, fontWeight: cur ? 800 : 600}}>{s}</span>
          </div>
          {i < PIPE_STEPS.length - 1 ? (
            <div style={{...abs(128, 19, 14, 2), background: past || cur ? 'rgba(255,255,255,.5)' : GREY_LINE}} />
          ) : null}
        </div>
      );
    })}
  </div>
);

/** 小方块阵列：表示「区块 / 实体 / 打乱」这类复数对象 */
export const CellGrid: React.FC<{x: number; y: number; cols: number; rows: number; cell?: number; gap?: number; lit?: number; order?: number[]; color?: string; litColor?: string; op?: number}> = ({
  x,
  y,
  cols,
  rows,
  cell = 22,
  gap = 8,
  lit = 0,
  order,
  color = GREY_LINE,
  litColor = PURPLE_LIGHT,
  op = 1,
}) => {
  const idx = order ?? Array.from({length: cols * rows}, (_, i) => i);
  return (
    <div style={{...abs(x, y, cols * (cell + gap), rows * (cell + gap)), opacity: op}}>
      {idx.slice(0, cols * rows).map((id, pos) => {
        const c = pos % cols;
        const r = Math.floor(pos / cols);
        const on = pos < lit;
        return (
          <div
            key={pos}
            style={{
              ...abs(c * (cell + gap), r * (cell + gap), cell, cell),
              borderRadius: 4,
              background: on ? litColor : 'transparent',
              border: `2px solid ${on ? litColor : color}`,
              opacity: on ? 1 : 0.75,
              boxShadow: on ? '0 0 10px rgba(161,117,241,.6)' : undefined,
            }}
          />
        );
      })}
    </div>
  );
};

/** 小标题 + 说明（每个镜头左上角的固定版式） */
export const StageTitle: React.FC<{text: string; sub?: string}> = ({text, sub}) => (
  <>
    <div style={{...abs(210, 226, 860)}}>
      <LText cx={0} cy={0} size={34} weight={900} color={WHITE} scaleX={0.88}>
        {text}
      </LText>
    </div>
    {sub ? (
      <div style={{...abs(210, 284, 860), whiteSpace: 'nowrap'}}>
        <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>{sub}</span>
      </div>
    ) : null}
  </>
);
