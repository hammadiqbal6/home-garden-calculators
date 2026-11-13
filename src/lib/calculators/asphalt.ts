/**
 * Asphalt / hot-mix tonnage from area × compacted depth.
 * Default density 145 lb/ft³ ≈ FHWA Federal Lands / industry planning weight
 * for compacted hot asphalt mix (Iowa DOT cites ~145 lb/ft³ for compacted HMA).
 * Confirm the plant mix density on the ticket before ordering.
 */
import { cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

/** Compacted hot-mix asphalt planning density (lb per cubic foot). */
export const ASPHALT_DENSITY_LB_PER_CUFT = 145;

export interface AsphaltResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  tons: number;
  densityLbPerCuFt: number;
}

export function asphaltTons(opts: {
  length: number;
  width: number;
  depthInches: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  /** Compaction / edge waste as a decimal (default 0.05). */
  wasteFactor?: number;
  /** Compacted mix density lb/ft³ (default 145). */
  densityLbPerCuFt?: number;
}): AsphaltResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const depthFt = opts.depthInches / 12;
  const density = opts.densityLbPerCuFt ?? ASPHALT_DENSITY_LB_PER_CUFT;
  if (L <= 0 || W <= 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  if (density <= 0) throw new Error('Density must be positive');
  const area = L * W;
  const volumeCuFt = area * depthFt * (1 + (opts.wasteFactor ?? 0.05));
  const tons = (volumeCuFt * density) / 2000;
  return {
    areaSqFt: round(area, 2),
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(cuFtToCuYd(volumeCuFt), 3),
    volumeCuM: round(cuFtToCuM(volumeCuFt), 3),
    tons: round(tons, 2),
    densityLbPerCuFt: density,
  };
}
