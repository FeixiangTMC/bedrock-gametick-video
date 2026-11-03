import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';
import {PipeRail, StageTitle} from './pipe';

/** SC29 服务端的活：计分板、命令、每刻函数（7060–7320）：7068 终端逐行；7180 三枚胶囊 */
const F0 = 8197;
const TO = 8464;
const LINES = ['scoreboard update', '/execute run …', 'tick.json function'];
export const SC29: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 8206;
  const n2 = N - 8367;
  const op = exitOp(N, TO, 10);
  const k = Math.min(1, Math.max(0, n1 / 16));
  const shown = Math.min(3, Math.max(0, Math.floor((N - 8206) / 26)));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <PipeRail N={N} stage={5} y={150} />
      <StageTitle text="服务端附加更新" sub="计分板、排队的命令、每刻函数" />

      <div style={{...abs(210, 344, 470, 176), border: `2px solid ${WHITE}`, borderRadius: 8, background: '#0b0c11', opacity: k}}>
        {LINES.slice(0, shown).map((l, i) => (
          <div key={l} style={{...abs(22, 26 + i * 44, 420)}}>
            <span style={{fontSize: 22, fontFamily: "'SF Mono', Menlo, Consolas, monospace", color: i === 2 ? PURPLE_LIGHT : WHITE}}>{l}</span>
          </div>
        ))}
      </div>

      <SoftIn N={N} f0={8367} len={10} dy={8}>
        <div style={{...abs(760, 344, 420), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={24} weight={800} color={WHITE}>
            行为包的每刻函数
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={8450} len={10} dy={8}>
        <div style={{...abs(760, 392, 460), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 20, color: GREY, letterSpacing: 1}}>每刻给你一次机会，不多不少</span>
        </div>
      </SoftIn>
      <div style={{...abs(760, 440, 340), height: 40, opacity: Math.min(1, Math.max(0, n2 / 14))}}>
        <div style={{...abs(0, 0, 150, 40), border: `2px solid ${PURPLE_LIGHT}`, borderRadius: 20, background: 'rgba(102,48,248,.2)'}} />
        <div style={{position: 'absolute', left: 0, top: 0, width: 150, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{fontSize: 20, color: WHITE}}>tick.json</span>
        </div>
      </div>
    </div>
  );
};
