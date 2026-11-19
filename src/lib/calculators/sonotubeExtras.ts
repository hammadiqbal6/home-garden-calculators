/**
 * Sonotube footing/bell, mixed sizes, and bags-per-foot helpers.
 * Bag yields: QUIKRETE Concrete Mix No. 1101 — 0.30 / 0.375 / 0.45 / 0.60 cu ft
 * for 40 / 50 / 60 / 80 lb (TDS). Planning estimates only.
 */
import { BAG_YIELD_CUFT, type ConcreteVolumeResult, sonotubeVolume } from './concrete';
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

function resultFromCuFt(volumeCuFt: number, wasteFactor: number): ConcreteVolumeResult {
  const withWaste = volumeCuFt * (1 + wasteFactor);
  return {
    volumeCuFt: round(withWaste, 3),
    volumeCuYd: round(cuFtToCuYd(withWaste), 3),
    volumeCuM: round(cuFtToCuM(withWaste), 3),
    bags40: ceilBags(withWaste, BAG_YIELD_CUFT[40]),
    bags50: ceilBags(withWaste, BAG_YIELD_CUFT[50]),
    bags60: ceilBags(withWaste, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(withWaste, BAG_YIELD_CUFT[80]),
  };
}

/** Alias for QUIKRETE 1101 ~0.375 cu ft for 50 lb. */
export const BAG_YIELD_50_LB = BAG_YIELD_CUFT[50];

export type SonotubeResult = ConcreteVolumeResult;

/**
 * Tube cylinder plus optional flared bell (frustum) or circular pad.
 * Bell: V = (π h / 3)(R² + R r + r²) with r = tube radius, R = bell base radius.
 */
export function sonotubeWithFootingVolume(opts: {
  diameter: number;
  height: number;
  count?: number;
  diameterUnit?: LengthUnit;
  heightUnit?: LengthUnit;
  baseType?: 'none' | 'bell' | 'pad';
  bellDiameter?: number;
  bellHeight?: number;
  padDiameter?: number;
  padThickness?: number;
  baseUnit?: LengthUnit;
  wasteFactor?: number;
}): SonotubeResult {
  const n = opts.count ?? 1;
  const tube = sonotubeVolume({
    diameter: opts.diameter,
    height: opts.height,
    count: n,
    diameterUnit: opts.diameterUnit ?? 'in',
    heightUnit: opts.heightUnit ?? 'ft',
    wasteFactor: 0,
  });
  let baseCuFt = 0;
  const baseType = opts.baseType ?? 'none';
  const baseUnit = opts.baseUnit ?? opts.diameterUnit ?? 'in';
  if (baseType === 'bell') {
    const dTube = toFeet(opts.diameter, opts.diameterUnit ?? 'in');
    const dBell = toFeet(opts.bellDiameter ?? 0, baseUnit);
    const hBell = toFeet(opts.bellHeight ?? 0, opts.heightUnit ?? 'ft');
    if (dBell <= 0 || hBell <= 0) throw new Error('Bell diameter and height must be positive');
    if (dBell < dTube) throw new Error('Bell base diameter must be at least the tube diameter');
    const r1 = dTube / 2;
    const r2 = dBell / 2;
    baseCuFt = ((Math.PI * hBell) / 3) * (r2 * r2 + r2 * r1 + r1 * r1) * n;
  } else if (baseType === 'pad') {
    const dPad = toFeet(opts.padDiameter ?? 0, baseUnit);
    const thicknessUnit: LengthUnit = baseUnit === 'cm' || baseUnit === 'm' ? 'cm' : 'in';
    const tPad = toFeet(opts.padThickness ?? 0, thicknessUnit);
    if (dPad <= 0 || tPad <= 0) throw new Error('Pad diameter and thickness must be positive');
    const r = dPad / 2;
    baseCuFt = Math.PI * r * r * tPad * n;
  }
  // Re-apply waste on tube + base (tube was computed at wasteFactor 0).
  return resultFromCuFt(tube.volumeCuFt + baseCuFt, opts.wasteFactor ?? 0.05);
}

/** Sum two size groups (count 0 skips a group). */
export function mixedSonotubeVolume(
  groups: {
    diameter: number;
    height: number;
    count: number;
    diameterUnit?: LengthUnit;
    heightUnit?: LengthUnit;
    baseType?: 'none' | 'bell' | 'pad';
    bellDiameter?: number;
    bellHeight?: number;
    padDiameter?: number;
    padThickness?: number;
  }[],
  wasteFactor = 0.05,
): SonotubeResult {
  let totalCuFt = 0;
  for (const g of groups) {
    if (!g.count || g.count <= 0) continue;
    const r = sonotubeWithFootingVolume({ ...g, wasteFactor: 0 });
    totalCuFt += r.volumeCuFt;
  }
  if (totalCuFt <= 0) throw new Error('Enter at least one tube with a positive count');
  return resultFromCuFt(totalCuFt, wasteFactor);
}

export function bagsPerFootOfTube(diameterInches: number): {
  diameterIn: number;
  cuFtPerFt: number;
  bags40: number;
  bags50: number;
  bags60: number;
  bags80: number;
} {
  if (diameterInches <= 0) throw new Error('Diameter must be positive');
  const r = diameterInches / 24;
  const cuFtPerFt = Math.PI * r * r;
  return {
    diameterIn: diameterInches,
    cuFtPerFt: round(cuFtPerFt, 3),
    bags40: ceilBags(cuFtPerFt, BAG_YIELD_CUFT[40]),
    bags50: ceilBags(cuFtPerFt, BAG_YIELD_CUFT[50]),
    bags60: ceilBags(cuFtPerFt, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(cuFtPerFt, BAG_YIELD_CUFT[80]),
  };
}

/** Common Sonotube IDs from 8–36 in for the bags-per-foot reference table. */
export const SONOTUBE_TABLE_DIAMETERS_IN = [8, 10, 12, 14, 16, 18, 20, 24, 30, 36] as const;

export function sonotubeBagsPerFootTable() {
  return SONOTUBE_TABLE_DIAMETERS_IN.map((d) => bagsPerFootOfTube(d));
}
