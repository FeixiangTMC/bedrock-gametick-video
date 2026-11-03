import React from 'react';
import {useCurrentFrame} from 'remotion';
import {GREY, WHITE, PURPLE_LIGHT, abs, CText} from '../../ui';

/** CREDITS 片尾制作信息（TOTAL_FRAMES+1 起 150 帧 / 5 秒）：四行逐级淡入，最后淡出到黑 */
const F0 = 16481;
export const CREDITS_LEN = 150;

const SANS = "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

export const CREDITS: React.FC = () => {
  const N = useCurrentFrame() + F0;
  const n = N - F0;
  const fade = (delay: number, dur = 18) => Math.min(1, Math.max(0, (n - delay) / dur));
  const rise = (k: number) => `translateY(${(1 - k) * 12}px)`;

  const rows = [
    {k: 58, label: '视频制作', value: 'deepseek'},
    {k: 74, label: '使用工具', value: 'anything2explainer'},
    {k: 90, label: '配音工具', value: 'GPT-SoVITS v2'},
  ];

  return (
    <div style={{...abs(0, 0, 1280, 720), background: '#000'}}>
      <div style={{opacity: fade(6), transform: rise(fade(6))}}>
        <CText cx={640} cy={250} size={25} weight={800} color={GREY} letterSpacing={3}>
          游戏机制挖掘
        </CText>
      </div>

      <div style={{opacity: fade(20, 22), transform: rise(fade(20, 22))}}>
        <CText cx={640} cy={318} size={66} weight={900} color={WHITE} scaleX={0.92}>
          时之飞翔
        </CText>
      </div>

      <div
        style={{
          ...abs(540, 382, 200, 2),
          background: PURPLE_LIGHT,
          opacity: fade(44) * 0.85,
          transform: `scaleX(${Math.max(0.001, fade(44))})`,
          transformOrigin: 'center',
        }}
      />

      {rows.map((row, i) => {
        const k = fade(row.k);
        return (
          <div
            key={i}
            style={{
              ...abs(440, 424 + i * 50, 400, 36),
              opacity: k,
              transform: rise(k),
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{width: 120, fontSize: 21, color: GREY, letterSpacing: 1, fontFamily: SANS}}>
              {row.label}
            </span>
            <span style={{fontSize: 21, color: WHITE, fontWeight: 700, letterSpacing: 0.5, fontFamily: SANS}}>
              {row.value}
            </span>
          </div>
        );
      })}

      <div style={{...abs(0, 0, 1280, 720), background: '#000', opacity: fade(130, 20)}} />
    </div>
  );
};
