import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, GREY_LINE, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC47 中继器一档还是两刻，差别在结构（11900–12148）：11908 两个版本并排；12020 点明「不在档位」 */
const F0 = 10384;
const TO = 10621;
export const SC47: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n1 = N - 10391;
  const n2 = N - 10529;
  const op = exitOp(N, TO, 8);
  const k = Math.min(1, Math.max(0, n1 / 16));
  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 210, 880)}}>
        <LText cx={0} cy={0} size={32} weight={900} color={WHITE} scaleX={0.88}>
          中继器一档：还是两个游戏刻
        </LText>
      </div>

      {[0, 1].map((i) => (
        <div key={i} style={{...abs(240 + i * 460, 320, 300, 120), opacity: k, border: `2.5px solid ${i === 0 ? WHITE : PURPLE_LIGHT}`, borderRadius: 10}}>
          {[0, 1].map((j) => (
            <div key={j} style={{...abs(30 + j * 90, 40, 60, 40), border: `2px solid ${i === 0 ? WHITE : PURPLE_LIGHT}`, borderRadius: 4, opacity: 0.8}} />
          ))}
          <div style={{...abs(0, 126, 300), textAlign: 'center'}}>
            <span style={{fontSize: 20, color: i === 0 ? GREY : PURPLE_LIGHT}}>{i === 0 ? 'Java' : '基岩'}</span>
          </div>
        </div>
      ))}

      <SoftIn N={N} f0={10529} len={12} dy={10}>
        <div style={{...abs(240, 520, 820), whiteSpace: 'nowrap'}}>
          <LText cx={0} cy={0} size={26} weight={800} color={PURPLE_LIGHT}>
            两版一致，差别不在档位
          </LText>
        </div>
      </SoftIn>
      <SoftIn N={N} f0={10610} len={12} dy={8}>
        <div style={{...abs(240, 566, 860), whiteSpace: 'nowrap'}}>
          <span style={{fontSize: 21, color: GREY, letterSpacing: 1}}>而在于「全部加锁、统一生效」这一层</span>
        </div>
      </SoftIn>
    </div>
  );
};
