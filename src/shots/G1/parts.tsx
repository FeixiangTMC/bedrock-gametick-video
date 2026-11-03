import React from 'react';
import {CText, Box, GREY, GREY_LINE, WHITE, PURPLE, PURPLE_LIGHT, abs} from '../../ui';
import {FONT_ORB} from '../../common';

/** 服务器机箱：黑填充白描边 + 呼吸的指示灯 + 风扇格栅 */
export const ServerTile: React.FC<{x: number; y: number; w?: number; h?: number; N: number; op?: number}> = ({x, y, w = 210, h = 250, N, op = 1}) => {
  const breath = 0.55 + 0.45 * Math.sin(N * 0.11);
  return (
    <div style={{...abs(x, y, w, h), opacity: op}}>
      <Box x={0} y={0} w={w} h={h} r={10} fill="#0b0c11" stroke={WHITE} sw={2.5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{...abs(22, 30 + i * 38, w - 44, 26), border: `1.5px solid ${GREY_LINE}`, borderRadius: 4}} />
      ))}
      <div style={{...abs(w - 40, 36, 10, 10), borderRadius: 5, background: PURPLE_LIGHT, opacity: breath, boxShadow: `0 0 12px 3px rgba(161,117,241,${0.5 * breath})`}} />
      <div style={{...abs(w - 40, 74, 10, 10), borderRadius: 5, background: WHITE, opacity: 0.25}} />
      <div style={{...abs(w / 2, h - 44), width: 56, height: 56, marginLeft: -28, borderRadius: 28, border: `2px solid ${GREY_LINE}`}} />
    </div>
  );
};

/** 一格耕地 + 一株（没长起来的）芽 */
export const CropCell: React.FC<{x: number; y: number; size?: number; sprout?: number; op?: number}> = ({x, y, size = 64, sprout = 6, op = 1}) => (
  <div style={{...abs(x, y, size, size), opacity: op}}>
    <Box x={0} y={0} w={size} h={size} r={4} fill="#0b0c11" stroke={GREY_LINE} sw={2} />
    <div style={{...abs(size / 2 - 1, size - sprout - 6, 2.5, sprout), background: GREY, borderRadius: 2}} />
  </div>
);

/** 主角柔光：径向渐变（不用盒状阴影，避免露出矩形边界） */
export const HeroHalo: React.FC<{cx: number; cy: number; r: number; k?: number}> = ({cx, cy, r, k = 1}) => (
  <div
    style={{
      ...abs(cx - r, cy - r, r * 2, r * 2),
      borderRadius: '50%',
      background: `radial-gradient(closest-side, rgba(102,48,248,${0.5 * k}) 0%, rgba(102,48,248,${0.22 * k}) 45%, rgba(102,48,248,0) 72%)`,
      filter: 'blur(2px)',
      pointerEvents: 'none',
    }}
  />
);

/** 节拍器：梯形身体 + 摆杆 + 刻度 */
export const Metronome: React.FC<{N: number; f0: number; cx?: number; cy?: number; h?: number}> = ({N, f0, cx = 640, cy = 392, h = 252}) => {
  const n = N - f0;
  if (n < 0) return null;
  const grow = Math.min(1, n / 18);
  const swing = Math.sin((N - f0) * 0.16) * 16;
  const bw = 160 * grow;
  const bh = h * grow;
  const top = cy - bh / 2;
  const pivotY = bh * 0.86;
  return (
    <div style={{...abs(cx - bw / 2, top, bw, bh)}}>
      <svg width={bw} height={bh} style={{position: 'absolute', inset: 0}}>
        <polygon points={`${bw * 0.2},0 ${bw * 0.8},0 ${bw},${bh} 0,${bh}`} fill="#0b0c11" stroke={WHITE} strokeWidth={2.5} />
        <g transform={`rotate(${swing} ${bw / 2} ${pivotY})`} opacity={grow}>
          <line x1={bw / 2} y1={pivotY} x2={bw / 2} y2={bh * 0.12} stroke={PURPLE_LIGHT} strokeWidth={3} />
          <circle cx={bw / 2} cy={bh * 0.12} r={7} fill={PURPLE} stroke={WHITE} strokeWidth={2} />
        </g>
        {[0.3, 0.42, 0.54, 0.66].map((t, i) => (
          <line key={i} x1={bw * 0.28} y1={bh * t} x2={bw * 0.72} y2={bh * t} stroke={GREY_LINE} strokeWidth={1.5} />
        ))}
      </svg>
    </div>
  );
};

/** 秤：一行竖刻度，lit 个点亮（用于「帧」与「刻」的密度对比） */
export const TickLane: React.FC<{x: number; y: number; w: number; count: number; lit: number; color?: string; litColor?: string; h?: number; op?: number}> = ({
  x,
  y,
  w,
  count,
  lit,
  color = GREY_LINE,
  litColor = WHITE,
  h = 24,
  op = 1,
}) => {
  const step = w / count;
  return (
    <div style={{...abs(x, y - h / 2, w, h), opacity: op}}>
      {Array.from({length: count}).map((_, i) => {
        const on = i < lit;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: i * step,
              top: 0,
              width: Math.max(1.5, Math.min(3.5, step * 0.55)),
              height: h,
              background: on ? litColor : color,
              opacity: on ? 1 : 0.75,
              boxShadow: on ? '0 0 6px rgba(255,255,255,.35)' : undefined,
            }}
          />
        );
      })}
    </div>
  );
};

/** 50 ms 预算条：used 部分为紫色（这一圈真正用的时间），余下为灰（能睡的时间） */
export const BudgetBar: React.FC<{x: number; y: number; w: number; h?: number; used: number; label?: string; labelSize?: number; op?: number}> = ({
  x,
  y,
  w,
  h = 26,
  used,
  label,
  labelSize = 20,
  op = 1,
}) => {
  const u = Math.min(1, Math.max(0, used));
  return (
    <div style={{...abs(x, y, w, h), opacity: op}}>
      <div style={{position: 'absolute', inset: 0, border: `2px solid ${WHITE}`, borderRadius: h / 2, opacity: 0.85}} />
      <div style={{position: 'absolute', left: 0, top: 0, height: '100%', width: `${u * 100}%`, background: PURPLE, borderRadius: h / 2, boxShadow: '0 0 12px rgba(102,48,248,.6)'}} />
      {label ? (
        <div style={{position: 'absolute', left: 0, top: h + 6, width: w, textAlign: 'center'}}>
          <span style={{fontSize: labelSize, color: GREY, letterSpacing: 1}}>{label}</span>
        </div>
      ) : null}
    </div>
  );
};

/** 小循环环（客户端 / 服务端各一块） */
export const SmallRing: React.FC<{cx: number; cy: number; r: number; lit: number; total?: number; label?: string; sub?: string; color?: string; op?: number}> = ({
  cx,
  cy,
  r,
  lit,
  total = 20,
  label,
  sub,
  color = PURPLE_LIGHT,
  op = 1,
}) => {
  const circ = 2 * Math.PI * r;
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={WHITE} strokeWidth={2} strokeDasharray={circ} strokeDashoffset={0} opacity={0.55} />
        {Array.from({length: total}).map((_, i) => {
          const a = (i / total) * Math.PI * 2 - Math.PI / 2;
          const on = i < lit;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * (r - 9)}
              y1={cy + Math.sin(a) * (r - 9)}
              x2={cx + Math.cos(a) * (r + 4)}
              y2={cy + Math.sin(a) * (r + 4)}
              stroke={on ? color : GREY_LINE}
              strokeWidth={on ? 3.5 : 2}
              opacity={on ? 1 : 0.7}
            />
          );
        })}
      </svg>
      {label ? (
        <div style={{...abs(cx - 90, cy - 16, 180), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <CText cx={90} cy={16} size={26} weight={800} color={WHITE}>
            {label}
          </CText>
        </div>
      ) : null}
      {sub ? (
        <div style={{...abs(cx - 90, cy + 26, 180), textAlign: 'center', whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 18, color: GREY, letterSpacing: 2}}>{sub}</span>
        </div>
      ) : null}
    </div>
  );
};

export const TickRing: React.FC<{N: number; f0: number; litFrom?: number; cx?: number; cy?: number; r?: number; total?: number}> = ({
  N,
  f0,
  litFrom,
  cx = 640,
  cy = 372,
  r = 150,
  total = 20,
}) => {
  const n = N - f0;
  if (n < 0) return null;
  const draw = Math.min(1, n / 26);
  const circ = 2 * Math.PI * r;
  const lit = litFrom == null ? 0 : Math.min(total, Math.max(0, Math.floor((N - litFrom) / 3)));
  return (
    <div style={{...abs(0, 0, 1280, 720)}}>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={WHITE}
          strokeWidth={2.5}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - draw)}
          opacity={0.9}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {Array.from({length: total}).map((_, i) => {
          const a = (i / total) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + Math.cos(a) * (r - 14);
          const y1 = cy + Math.sin(a) * (r - 14);
          const x2 = cx + Math.cos(a) * (r + 2);
          const y2 = cy + Math.sin(a) * (r + 2);
          const on = i < lit;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={on ? PURPLE_LIGHT : GREY_LINE}
              strokeWidth={on ? 4 : 2}
              opacity={on ? 1 : 0.7}
              style={on ? {filter: 'drop-shadow(0 0 6px rgba(161,117,241,.9))'} : undefined}
            />
          );
        })}
      </svg>
      <div style={{...abs(cx - 90, cy - 16, 180), textAlign: 'center'}}>
        <CText cx={90} cy={16} size={30} weight={800} color={WHITE} letterSpacing={1}>
          游戏刻
        </CText>
      </div>
      <div style={{...abs(cx - 110, cy + 30, 220), textAlign: 'center'}}>
        <span style={{fontFamily: FONT_ORB, fontSize: 20, color: GREY, letterSpacing: 2}}>GAME TICK</span>
      </div>
    </div>
  );
};
