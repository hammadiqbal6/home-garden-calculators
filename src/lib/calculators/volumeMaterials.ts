/**
 * Shared bulk material volume math for gravel, topsoil, and sand.
 * Optional compaction / waste factor accounts for settling (gravel often 10–15%).
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

export interface BulkVolumeResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  tons?: number;
  bags05CuFt?: number;
}

export function rectangularBulkVolume(opts: {
  length: number;
  width: number;
  depthInches: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  wasteFactor?: number;
  /** Dry bulk density in lb/cu yd for ton estimates (optional). */
  densityLbPerCuYd?: number;
}): BulkVolumeResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const depthFt = opts.depthInches / 12;
  if (L <= 0 || W <= 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  const volumeCuFt = area * depthFt * (1 + (opts.wasteFactor ?? 0));
  const volumeCuYd = cuFtToCuYd(volumeCuFt);
  const result: BulkVolumeResult = {
    areaSqFt: round(area, 2),
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(volumeCuYd, 3),
    volumeCuM: round(cuFtToCuM(volumeCuFt), 3),
    bags05CuFt: ceilBags(volumeCuFt, 0.5),
  };
  if (opts.densityLbPerCuYd) {
    result.tons = round((volumeCuYd * opts.densityLbPerCuYd) / 2000, 2);
  }
  return result;
}

/**
 * Mid-range crushed stone / gravel dry bulk density (~1.35 ton/cu yd).
 * Supplier tickets often fall ~2,400–2,800 lb/cu yd by rock type and moisture.
 */
export const GRAVEL_DENSITY_LB_PER_CUYD = 2700;
/**
 * Screened topsoil mid estimate (~1.1 ton/cu yd). Wet or clay-heavy blends
 * can run heavier; lightweight mixes run lighter—confirm with the yard.
 */
export const TOPSOIL_DENSITY_LB_PER_CUYD = 2200;
/**
 * Dry sand mid estimate (~1.35 ton/cu yd). Masonry, concrete, and play sand
 * differ; moisture swings weight more than volume.
 */
export const SAND_DENSITY_LB_PER_CUYD = 2700;

export function gravelVolume(opts: Parameters<typeof rectangularBulkVolume>[0]) {
  return rectangularBulkVolume({
    wasteFactor: opts.wasteFactor ?? 0.1,
    densityLbPerCuYd: opts.densityLbPerCuYd ?? GRAVEL_DENSITY_LB_PER_CUYD,
    ...opts,
  });
}

export function topsoilVolume(opts: Parameters<typeof rectangularBulkVolume>[0]) {
  return rectangularBulkVolume({
    wasteFactor: opts.wasteFactor ?? 0.1,
    densityLbPerCuYd: opts.densityLbPerCuYd ?? TOPSOIL_DENSITY_LB_PER_CUYD,
    ...opts,
  });
}

export function sandVolume(opts: Parameters<typeof rectangularBulkVolume>[0]) {
  return rectangularBulkVolume({
    wasteFactor: opts.wasteFactor ?? 0.1,
    densityLbPerCuYd: opts.densityLbPerCuYd ?? SAND_DENSITY_LB_PER_CUYD,
    ...opts,
  });
}
