import { round, sqFtToSqM, toFeet, type LengthUnit } from '../units';

export interface PaintResult {
  wallAreaSqFt: number;
  paintableAreaSqFt: number;
  paintableAreaSqM: number;
  gallonsOneCoat: number;
  gallonsTwoCoats: number;
  litersOneCoat: number;
  litersTwoCoats: number;
}

/**
 * Interior/exterior paint estimator.
 * Default coverage 350 sq ft/gallon per coat (typical manufacturer mid-range).
 */
export function paintNeeded(opts: {
  length: number;
  width: number;
  height: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  heightUnit?: LengthUnit;
  doors?: number;
  windows?: number;
  doorAreaSqFt?: number;
  windowAreaSqFt?: number;
  coats?: number;
  coverageSqFtPerGallon?: number;
}): PaintResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const H = toFeet(opts.height, opts.heightUnit ?? 'ft');
  if (L <= 0 || W <= 0 || H <= 0) throw new Error('Dimensions must be positive');
  const wallArea = 2 * (L + W) * H;
  const doorArea = (opts.doors ?? 0) * (opts.doorAreaSqFt ?? 20);
  const windowArea = (opts.windows ?? 0) * (opts.windowAreaSqFt ?? 15);
  const paintable = Math.max(0, wallArea - doorArea - windowArea);
  const coverage = opts.coverageSqFtPerGallon ?? 350;
  const coats = opts.coats ?? 2;
  const gallonsOne = paintable / coverage;
  const gallonsTotal = (paintable * coats) / coverage;
  const L_PER_GAL = 3.785411784;
  return {
    wallAreaSqFt: round(wallArea, 2),
    paintableAreaSqFt: round(paintable, 2),
    paintableAreaSqM: round(sqFtToSqM(paintable), 2),
    gallonsOneCoat: round(gallonsOne, 2),
    gallonsTwoCoats: round(gallonsTotal, 2),
    litersOneCoat: round(gallonsOne * L_PER_GAL, 2),
    litersTwoCoats: round(gallonsTotal * L_PER_GAL, 2),
  };
}
