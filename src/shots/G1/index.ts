import type {ShotDef, BgSpec, FootageSpec} from '../../common';
import {SC01} from './SC01';
import {SC02} from './SC02';
import {SC03} from './SC03';
import {SC04} from './SC04';
import {SC05} from './SC05';
import {SC06} from './SC06';
import {SC07} from './SC07';
import {SC08} from './SC08';
import {SC09} from './SC09';
import {SC10} from './SC10';
import {SC19B} from './SC19B';
import {SC11} from './SC11';
import {SC12} from './SC12';
import {SC13} from './SC13';

export const SHOTS_G1: ShotDef[] = [
  {id: 'SC01', from: 78, to: 310, Comp: SC01},
  {id: 'SC02', from: 311, to: 599, Comp: SC02},
  {id: 'SC03', from: 600, to: 881, Comp: SC03},
  {id: 'SC04', from: 882, to: 1138, Comp: SC04},
  {id: 'SC05', from: 1139, to: 1425, Comp: SC05},
  {id: 'SC06', from: 1426, to: 1674, Comp: SC06},
  {id: 'SC07', from: 1675, to: 1804, Comp: SC07},
  {id: 'SC08', from: 1805, to: 2029, Comp: SC08},
  {id: 'SC09', from: 2030, to: 2298, Comp: SC09},
  {id: 'SC10', from: 2299, to: 2607, Comp: SC10},
  {id: 'SC19B', from: 2608, to: 3067, Comp: SC19B},
  {id: 'SC11', from: 3068, to: 3387, Comp: SC11},
  {id: 'SC12', from: 3388, to: 3693, Comp: SC12},
  {id: 'SC13', from: 3694, to: 3826, Comp: SC13},
];
export const BG_G1: BgSpec[] = [];
export const FOOTAGE_G1: FootageSpec[] = [];
