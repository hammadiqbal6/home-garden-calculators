import { ceilBags, round, sqFtToSqM, toFeet, type LengthUnit } from '../units';

export interface GrassSeedResult {
  areaSqFt: number;
  areaSqM: number;
  seedLbsNew: number;
  seedLbsOverseed: number;
  seedKgNew: number;
  seedKgOverseed: number;
}

/**
 * Grass seed rates vary by species. Defaults follow common cool-season
 * blends (~3–4 lb/1000 sq ft new; ~1.5–2 lb/1000 overseed).
 */
export function grassSeed(opts: {
  length: number;
  width: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  newLawnLbPer1000?: number;
  overseedLbPer1000?: number;
}): GrassSeedResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  if (L <= 0 || W <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  const newRate = opts.newLawnLbPer1000 ?? 3.5;
  const overRate = opts.overseedLbPer1000 ?? 1.75;
  const seedLbsNew = (area / 1000) * newRate;
  const seedLbsOverseed = (area / 1000) * overRate;
  const LB_TO_KG = 0.45359237;
  return {
    areaSqFt: round(area, 2),
    areaSqM: round(sqFtToSqM(area), 2),
    seedLbsNew: round(seedLbsNew, 2),
    seedLbsOverseed: round(seedLbsOverseed, 2),
    seedKgNew: round(seedLbsNew * LB_TO_KG, 2),
    seedKgOverseed: round(seedLbsOverseed * LB_TO_KG, 2),
  };
}

export interface FertilizerResult {
  areaSqFt: number;
  productLbs: number;
  productKg: number;
  bagsNeeded: number;
}

/**
 * Fertilizer from nitrogen target: product lbs = (area/1000) × (N_lb_per_1000 / N_fraction).
 * Example: 1 lb N/1000 on 25-0-5 → product = 1 / 0.25 = 4 lb per 1000 sq ft.
 */
export function fertilizerNeeded(opts: {
  length: number;
  width: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  nitrogenLbPer1000?: number;
  nitrogenPercent?: number;
  bagSizeLbs?: number;
}): FertilizerResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const nTarget = opts.nitrogenLbPer1000 ?? 1;
  const nPct = opts.nitrogenPercent ?? 25;
  const bag = opts.bagSizeLbs ?? 40;
  if (L <= 0 || W <= 0 || nPct <= 0 || nPct > 100) {
    throw new Error('Invalid fertilizer inputs');
  }
  const area = L * W;
  const productPer1000 = nTarget / (nPct / 100);
  const productLbs = (area / 1000) * productPer1000;
  return {
    areaSqFt: round(area, 2),
    productLbs: round(productLbs, 2),
    productKg: round(productLbs * 0.45359237, 2),
    bagsNeeded: ceilBags(productLbs, bag),
  };
}

export interface RaisedBedResult {
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags15CuFt: number;
}

/** Raised bed soil fill: L × W × depth (interior dimensions). */
export function raisedBedSoil(opts: {
  length: number;
  width: number;
  depthInches: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
}): RaisedBedResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const D = opts.depthInches / 12;
  if (L <= 0 || W <= 0 || D <= 0) throw new Error('Dimensions must be positive');
  const volumeCuFt = L * W * D;
  return {
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(volumeCuFt / 27, 3),
    volumeCuM: round(volumeCuFt / Math.pow(3.280839895, 3), 3),
    bags15CuFt: ceilBags(volumeCuFt, 1.5),
  };
}
