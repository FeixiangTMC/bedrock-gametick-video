import type {ShotDef, BgSpec, FootageSpec} from '../../common';
import {TOTAL_FRAMES} from '../../common';
import {CREDITS, CREDITS_LEN} from './CREDITS';

// 组 G8：片尾制作信息（接在正片之后，不占解说段落）
export const SHOTS_G8: ShotDef[] = [
  {id: 'CREDITS', from: TOTAL_FRAMES + 1, to: TOTAL_FRAMES + CREDITS_LEN, Comp: CREDITS},
];
export const BG_G8: BgSpec[] = [];
export const FOOTAGE_G8: FootageSpec[] = [];
