/**
 * Tons↔yards conversion and optional bag-vs-bulk cost compare.
 * Densities come from the caller; no regional price defaults.
 */
import { round } from '../units';

export function yardsToTons(cuYd: number, densityLbPerCuYd: number): number {
  if (cuYd < 0 || densityLbPerCuYd <= 0) throw new Error('Yards and density must be positive');
  return round((cuYd * densityLbPerCuYd) / 2000, 2);
}

export function tonsToYards(tons: number, densityLbPerCuYd: number): number {
  if (tons < 0 || densityLbPerCuYd <= 0) throw new Error('Tons and density must be positive');
  return round((tons * 2000) / densityLbPerCuYd, 3);
}

export interface BulkCostResult {
  volumeCuYd: number;
  tons?: number;
  bagCount?: number;
  costByYard?: number;
  costByTon?: number;
  costByBags?: number;
  cheapestLabel?: 'yard' | 'ton' | 'bags';
  cheapestCost?: number;
  yardsFromTons?: number;
  tonsFromYards?: number;
}

export function bulkCostCompare(opts: {
  volumeCuYd: number;
  tons?: number;
  bagCount?: number;
  pricePerYard?: number;
  pricePerTon?: number;
  pricePerBag?: number;
  convertTons?: number;
  densityLbPerCuYd?: number;
}): BulkCostResult {
  const result: BulkCostResult = {
    volumeCuYd: round(opts.volumeCuYd, 3),
    tons: opts.tons,
    bagCount: opts.bagCount,
  };
  if (opts.densityLbPerCuYd && opts.densityLbPerCuYd > 0) {
    if (opts.volumeCuYd > 0) {
      result.tonsFromYards = yardsToTons(opts.volumeCuYd, opts.densityLbPerCuYd);
    }
    if (opts.convertTons != null && opts.convertTons > 0) {
      result.yardsFromTons = tonsToYards(opts.convertTons, opts.densityLbPerCuYd);
    }
  }
  const priced: { label: 'yard' | 'ton' | 'bags'; cost: number }[] = [];
  if (opts.pricePerYard != null && opts.pricePerYard > 0 && opts.volumeCuYd > 0) {
    result.costByYard = round(opts.volumeCuYd * opts.pricePerYard, 2);
    priced.push({ label: 'yard', cost: result.costByYard });
  }
  if (opts.pricePerTon != null && opts.pricePerTon > 0 && opts.tons != null && opts.tons > 0) {
    result.costByTon = round(opts.tons * opts.pricePerTon, 2);
    priced.push({ label: 'ton', cost: result.costByTon });
  }
  if (opts.pricePerBag != null && opts.pricePerBag > 0 && opts.bagCount != null && opts.bagCount > 0) {
    result.costByBags = round(opts.bagCount * opts.pricePerBag, 2);
    priced.push({ label: 'bags', cost: result.costByBags });
  }
  if (priced.length) {
    priced.sort((a, b) => a.cost - b.cost);
    result.cheapestLabel = priced[0].label;
    result.cheapestCost = priced[0].cost;
  }
  return result;
}
