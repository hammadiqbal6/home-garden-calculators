import { round, sqFtToSqM, toFeet, type LengthUnit } from '../units';

export interface PaverResult {
  areaSqFt: number;
  areaSqM: number;
  paversNeeded: number;
  paversWithWaste: number;
  edgeSandCuFt: number;
  baseGravelCuYd: number;
}

/**
 * Count pavers for a rectangular patio/path.
 * paverLength/Width in inches (imperial) or cm when unitSystem is metric —
 * callers convert to inches/feet consistently via lengthUnit for the area.
 */
export function paverCount(opts: {
  areaLength: number;
  areaWidth: number;
  paverLengthIn: number;
  paverWidthIn: number;
  wastePercent?: number;
  areaLengthUnit?: LengthUnit;
  areaWidthUnit?: LengthUnit;
  /** Sand setting bed depth in inches (default 1"). */
  sandDepthIn?: number;
  /** Compacted gravel base depth in inches (default 4"). */
  baseDepthIn?: number;
}): PaverResult {
  const L = toFeet(opts.areaLength, opts.areaLengthUnit ?? 'ft');
  const W = toFeet(opts.areaWidth, opts.areaWidthUnit ?? 'ft');
  const pL = opts.paverLengthIn / 12;
  const pW = opts.paverWidthIn / 12;
  if (L <= 0 || W <= 0 || pL <= 0 || pW <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  const paverArea = pL * pW;
  const exact = Math.ceil(area / paverArea);
  const waste = (opts.wastePercent ?? 10) / 100;
  // Avoid float ceil artifacts (e.g. 100 * 1.1 → 110.0000000002).
  const withWaste = Math.ceil(Math.round(exact * (1 + waste) * 1e6) / 1e6);
  const sandDepth = (opts.sandDepthIn ?? 1) / 12;
  const baseDepth = (opts.baseDepthIn ?? 4) / 12;
  return {
    areaSqFt: round(area, 2),
    areaSqM: round(sqFtToSqM(area), 2),
    paversNeeded: exact,
    paversWithWaste: withWaste,
    edgeSandCuFt: round(area * sandDepth, 2),
    baseGravelCuYd: round((area * baseDepth) / 27, 2),
  };
}
