import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CText, GREY, WHITE, PURPLE_LIGHT, abs, exitOp, SoftIn, LText} from '../../ui';

/** SC53 优化的三条具体做法（原"脚本例外：JS 异常"按反馈删除）：本质 + 三条卡片 */
const F0 = 15337;
const TO = 15881;
export const SC53: React.FC = () => {
  const N = useCurrentFrame() + F0;
  // 全部相对段落首句（n1）定位，换稿/重排时不会漂移
  const n1 = N - 15345;
  const b1 = n1 - 70;
  const b2 = n1 - 168;
  const b3 = n1 - 366;
  const op = exitOp(N, TO, 10);

  const items = [
    {k: b1, tag: '实体', title: '少生成实体', desc: '别让几百个掉落物同时被算'},
    {k: b2, tag: '高频', title: '降高频', desc: '别让红石系统负担太重'},
    {k: b3, tag: '区块', title: '缩模拟距离', desc: '让参与计算的区块变少'},
  ];

  return (
    <div style={{...abs(0, 0, 1280, 720), opacity: op}}>
      <div style={{...abs(200, 172, 900)}}>
        <SoftIn N={N} f0={15345} len={10} dy={10}>
          <LText cx={0} cy={0} size={30} weight={900} color={WHITE} scaleX={0.88}>
            所谓优化，本质是让每一圈要算的东西变少
          </LText>
        </SoftIn>
      </div>

      {items.map((it, i) => {
        const a = Math.min(1, Math.max(0, it.k / 14));
        return (
          <div
            key={i}
            style={{
              ...abs(190, 268 + i * 116, 900, 96),
              border: `2px solid ${GREY}`,
              borderRadius: 10,
              background: 'rgba(255,255,255,.02)',
              opacity: a,
              transform: `translateY(${(1 - a) * 14}px)`,
            }}
          >
            <div style={{...abs(22, 26, 44, 44), borderRadius: 22, background: 'rgba(102,48,248,.22)', border: `2px solid ${PURPLE_LIGHT}`}}>
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: 20, color: PURPLE_LIGHT, fontWeight: 800}}>{i + 1}</span>
              </div>
            </div>
            <div style={{...abs(84, 24, 420), whiteSpace: 'nowrap'}}>
              <span style={{fontSize: 26, color: WHITE, fontWeight: 900}}>{it.title}</span>
            </div>
            <div style={{...abs(84, 60, 700), whiteSpace: 'nowrap'}}>
              <span style={{fontSize: 20, color: GREY, letterSpacing: 0.5}}>{it.desc}</span>
            </div>
            <div style={{...abs(690, 36, 180), textAlign: 'right', whiteSpace: 'nowrap'}}>
              <span style={{fontSize: 18, color: PURPLE_LIGHT, opacity: 0.85, letterSpacing: 1}}>{it.tag}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
