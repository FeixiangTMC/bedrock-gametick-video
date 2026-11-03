import React from 'react';
import {CText, GREY, GREY_LINE, WHITE, PURPLE, PURPLE_LIGHT, abs, LText} from '../../ui';

export const CHUNK_STEPS = ['刷怪', '环境', '随机刻', '普通计划刻', '随机计划刻', '实体标记', '方块实体', '应用红石', '保存计时'];

/** 区块刻九步的阶梯：当前步紫，已过灰底。全章共用，保证「同一台机器往下走」的承接感 */
export const StepLadder: React.FC<{current: number; y?: number; op?: number; compact?: boolean}> = ({current, y = 210, op = 1, compact = false}) => (
  <div style={{...abs(120, y, compact ? 200 : 210, 0), opacity: op}}>
    {CHUNK_STEPS.slice(0, compact ? 5 : 9).map((s, i) => {
      const cur = i === current;
      const past = i < current;
      return (
        <div key={s} style={{...abs(0, i * 34, 190, 28)}}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 190,
              height: 28,
              borderRadius: 14,
              background: cur ? PURPLE : past ? 'rgba(255,255,255,.12)' : 'transparent',
              border: `1.5px solid ${cur ? WHITE : past ? 'transparent' : GREY_LINE}`,
              boxShadow: cur ? '0 0 16px 3px rgba(102,45,248,.4)' : undefined,
            }}
          />
          <div style={{position: 'absolute', left: 0, top: 0, width: 190, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: 18, color: cur ? WHITE : past ? 'rgba(255,255,255,.85)' : GREY, fontWeight: cur ? 800 : 500}}>
              {i + 1} · {s}
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

/** 右侧内容区标题（与 G2 的 StageTitle 同版式，但让出阶梯的位置） */
export const StepTitle: React.FC<{text: string; sub?: string}> = ({text, sub}) => (
  <>
    <div style={{...abs(380, 218, 780)}}>
      <LText cx={0} cy={0} size={34} weight={900} color={WHITE} scaleX={0.88}>
        {text}
      </LText>
    </div>
    {sub ? (
      <div style={{...abs(380, 276, 800), whiteSpace: 'nowrap'}}>
        <span style={{fontSize: 22, color: GREY, letterSpacing: 1}}>{sub}</span>
      </div>
    ) : null}
  </>
);
