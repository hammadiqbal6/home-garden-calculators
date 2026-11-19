/**
 * Shared bulk material volume math for gravel, topsoil, and sand.
 * Optional compaction / waste factor accounts for settling (gravel often 10–15%).
 * Optional convertTons + local prices support tons↔yards and bag-vs-bulk cost compare
 * (prices are user-supplied; never invent defaults).
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';
import { bulkCostCompare, tonsToYards, yardsToTons } from './bulkCost';

/** Common bagged gravel / sand / topsoil size at big-box retailers (0.5 cu ft). */
export const BULK_BAG_CU_FT = 0.5;

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

/** Tons → cubic yards (alias of tonsToYards). */
export function yardsFromTons(tons: number, densityLbPerCuYd: number): number {
  return tonsToYards(tons, densityLbPerCuYd);
}

/** Cubic yards → tons (alias of yardsToTons). */
export function tonsFromYards(yards: number, densityLbPerCuYd: number): number {
  return yardsToTons(yards, densityLbPerCuYd);
}

export interface BulkVolumeResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  /** Tons from calculated volume yards at density (same as tonsFromYards). */
  tons?: number;
  tonsFromYards?: number;
  /** Yards implied by optional convertTons input at the same density. */
  yardsFromTons?: number;
  bags05CuFt?: number;
  costYards?: number;
  costTons?: number;
  costBags?: number;
  cheapestLabel?: 'yard' | 'ton' | 'bags';
  cheapestCost?: number;
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
  /** Optional tonnage to convert → yards at the same density. */
  convertTons?: number;
  pricePerYard?: number;
  pricePerTon?: number;
  pricePerBag?: number;
}): BulkVolumeResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const depthFt = opts.depthInches / 12;
  if (L <= 0 || W <= 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  const volumeCuFt = area * depthFt * (1 + (opts.wasteFactor ?? 0));
  const volumeCuYd = cuFtToCuYd(volumeCuFt);
  const bags05CuFt = ceilBags(volumeCuFt, BULK_BAG_CU_FT);
  const result: BulkVolumeResult = {
    areaSqFt: round(area, 2),
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(volumeCuYd, 3),
    volumeCuM: round(cuFtToCuM(volumeCuFt), 3),
    bags05CuFt,
  };
  const density = opts.densityLbPerCuYd;
  if (density) {
    const tons = yardsToTons(volumeCuYd, density);
    result.tons = tons;
    const costs = bulkCostCompare({
      volumeCuYd: result.volumeCuYd,
      tons,
      bagCount: bags05CuFt,
      pricePerYard: opts.pricePerYard,
      pricePerTon: opts.pricePerTon,
      pricePerBag: opts.pricePerBag,
      convertTons: opts.convertTons,
      densityLbPerCuYd: density,
    });
    result.tonsFromYards = costs.tonsFromYards ?? tons;
    if (costs.yardsFromTons != null) result.yardsFromTons = costs.yardsFromTons;
    if (costs.costByYard != null) result.costYards = costs.costByYard;
    if (costs.costByTon != null) result.costTons = costs.costByTon;
    if (costs.costByBags != null) result.costBags = costs.costByBags;
    if (costs.cheapestLabel) result.cheapestLabel = costs.cheapestLabel;
    if (costs.cheapestCost != null) result.cheapestCost = costs.cheapestCost;
  } else {
    const costs = bulkCostCompare({
      volumeCuYd: result.volumeCuYd,
      bagCount: bags05CuFt,
      pricePerYard: opts.pricePerYard,
      pricePerBag: opts.pricePerBag,
    });
    if (costs.costByYard != null) result.costYards = costs.costByYard;
    if (costs.costByBags != null) result.costBags = costs.costByBags;
    if (costs.cheapestLabel) result.cheapestLabel = costs.cheapestLabel;
    if (costs.cheapestCost != null) result.cheapestCost = costs.cheapestCost;
  }
  return result;
}

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
