/**
 * Concrete footing estimators (continuous/strip and spread pad).
 * Volume = length × width × depth × count, then bag yields from QUIKRETE /
 * Sakrete standard-mix planning figures (same as slab concrete).
 * Optional rebar is a material takeoff only — not structural design.
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';
import { BAG_YIELD_CUFT, type BagSizeLb, type ConcreteVolumeResult } from './concrete';
import { REBAR_LB_PER_FT, type RebarSize } from './rebar';

export type FootingType = 'strip' | 'pad';

export interface FootingVolumeResult extends ConcreteVolumeResult {
  footingType: FootingType;
  count: number;
}

export interface FootingRebarResult {
  longitudinalBars: number;
  transverseBars: number;
  totalBars: number;
  linearFeet: number;
  linearFeetWithWaste: number;
  sticks: number;
  stickLengthFt: number;
  weightLbs: number;
  barSize: RebarSize;
}

function resultFromCuFt(
  volumeCuFt: number,
  wasteFactor: number,
  footingType: FootingType,
  count: number,
): FootingVolumeResult {
  const withWaste = volumeCuFt * (1 + wasteFactor);
  return {
    footingType,
    count,
    volumeCuFt: round(withWaste, 3),
    volumeCuYd: round(cuFtToCuYd(withWaste), 3),
    volumeCuM: round(cuFtToCuM(withWaste), 3),
    bags50: ceilBags(withWaste, BAG_YIELD_CUFT[50]),
    bags40: ceilBags(withWaste, BAG_YIELD_CUFT[40]),
    bags50: ceilBags(withWaste, BAG_YIELD_CUFT[50]),
    bags60: ceilBags(withWaste, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(withWaste, BAG_YIELD_CUFT[80]),
  };
}

/**
 * Rectangular strip or pad footing volume.
 * Depth defaults to inches (common for footing thickness); length/width in feet.
 */
export function footingVolume(opts: {
  footingType?: FootingType;
  length: number;
  width: number;
  depth: number;
  count?: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  depthUnit?: LengthUnit;
  wasteFactor?: number;
}): FootingVolumeResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const D = toFeet(opts.depth, opts.depthUnit ?? 'in');
  const n = opts.count ?? 1;
  if (L <= 0 || W <= 0 || D <= 0 || n <= 0) {
    throw new Error('Dimensions and count must be positive');
  }
  return resultFromCuFt(L * W * D * n, opts.wasteFactor ?? 0.1, opts.footingType ?? 'strip', n);
}

/**
 * Optional rebar takeoff for footings (planning only).
 * Strip: longitudinal bars along the run + transverse bars at spacing.
 * Pad: each-way grid like a small slab mat, multiplied by pad count.
 */
export function footingRebar(opts: {
  footingType: FootingType;
  length: number;
  width: number;
  count?: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  /** Strip: number of bars running the length. Pad: unused (grid from spacing). */
  longitudinalBars?: number;
  /** On-center spacing in inches (transverse for strip; each-way for pad). */
  spacingIn: number;
  barSize?: RebarSize;
  stickLengthFt?: number;
  wastePercent?: number;
}): FootingRebarResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const n = opts.count ?? 1;
  const spacing = opts.spacingIn;
  const stick = opts.stickLengthFt ?? 20;
  const barSize = opts.barSize ?? 4;
  if (L <= 0 || W <= 0 || n <= 0) throw new Error('Dimensions and count must be positive');
  if (spacing <= 0) throw new Error('Spacing must be positive');
  if (stick <= 0) throw new Error('Stick length must be positive');

  let longitudinalBars: number;
  let transverseBars: number;
  let linearFeet: number;

  if (opts.footingType === 'pad') {
    const barsAlongLength = Math.floor((W * 12) / spacing) + 1;
    const barsAlongWidth = Math.floor((L * 12) / spacing) + 1;
    longitudinalBars = barsAlongLength * n;
    transverseBars = barsAlongWidth * n;
    linearFeet = (barsAlongLength * L + barsAlongWidth * W) * n;
  } else {
    const longCount = opts.longitudinalBars ?? 2;
    if (longCount <= 0) throw new Error('Longitudinal bar count must be positive');
    const crossCount = Math.floor((L * 12) / spacing) + 1;
    longitudinalBars = longCount * n;
    transverseBars = crossCount * n;
    linearFeet = (longCount * L + crossCount * W) * n;
  }

  const waste = (opts.wastePercent ?? 10) / 100;
  const withWaste = linearFeet * (1 + waste);
  const sticks = Math.ceil(withWaste / stick);
  const weightLbs = withWaste * REBAR_LB_PER_FT[barSize];

  return {
    longitudinalBars,
    transverseBars,
    totalBars: longitudinalBars + transverseBars,
    linearFeet: round(linearFeet, 2),
    linearFeetWithWaste: round(withWaste, 2),
    sticks,
    stickLengthFt: stick,
    weightLbs: round(weightLbs, 1),
    barSize,
  };
}

export function footingBagsNeeded(volumeCuFt: number, bagSize: BagSizeLb): number {
  return ceilBags(volumeCuFt, BAG_YIELD_CUFT[bagSize]);
}
