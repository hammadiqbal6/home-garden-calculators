/**
 * Mulch volume for beds and tree rings.
 * Depth guidance commonly cites 2–3 inches for most organic mulches
 * (e.g. Penn State Extension, Clemson HGIC).
 * Optional local prices support bag-vs-bulk cost compare (no default prices).
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';
import { bulkCostCompare } from './bulkCost';

export interface MulchResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags2CuFt: number;
  bags3CuFt: number;
  costYards?: number;
  costBags2?: number;
  costBags3?: number;
  cheapestLabel?: 'yard' | 'bags';
  cheapestCost?: number;
}

export interface MulchPriceOpts {
  pricePerYard?: number;
  pricePerBag?: number;
}

function fromVolume(areaSqFt: number, volumeCuFt: number, prices?: MulchPriceOpts): MulchResult {
  const volumeCuYd = cuFtToCuYd(volumeCuFt);
  const bags2CuFt = ceilBags(volumeCuFt, 2);
  const bags3CuFt = ceilBags(volumeCuFt, 3);
  const result: MulchResult = {
    areaSqFt: round(areaSqFt, 2),
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(volumeCuYd, 3),
    volumeCuM: round(cuFtToCuM(volumeCuFt), 3),
    bags2CuFt,
    bags3CuFt,
  };
  // Compare bulk yards vs 2 cu ft bags (primary bag size); also show 3 cu ft bag total.
  const costs = bulkCostCompare({
    volumeCuYd,
    bagCount: bags2CuFt,
    pricePerYard: prices?.pricePerYard,
    pricePerBag: prices?.pricePerBag,
  });
  if (costs.costByYard != null) result.costYards = costs.costByYard;
  if (prices?.pricePerBag != null && prices.pricePerBag > 0) {
    result.costBags2 = round(bags2CuFt * prices.pricePerBag, 2);
    result.costBags3 = round(bags3CuFt * prices.pricePerBag, 2);
  }
  if (costs.cheapestLabel === 'yard' || costs.cheapestLabel === 'bags') {
    result.cheapestLabel = costs.cheapestLabel;
    result.cheapestCost = costs.cheapestCost;
  }
  return result;
}

/** Rectangular or freeform bed approximated as L × W × depth. */
export function bedMulch(opts: {
  length: number;
  width: number;
  depthInches: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  pricePerYard?: number;
  pricePerBag?: number;
}): MulchResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const depthFt = opts.depthInches / 12;
  if (L <= 0 || W <= 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  return fromVolume(area, area * depthFt, {
    pricePerYard: opts.pricePerYard,
    pricePerBag: opts.pricePerBag,
  });
}

/**
 * Tree ring / donut mulch: π (R_outer² − R_inner²) × depth.
 * Inner radius is trunk/root flare clearance (often leave 2–3" bare at trunk).
 */
export function treeRingMulch(opts: {
  outerDiameter: number;
  trunkDiameter: number;
  depthInches: number;
  diameterUnit?: LengthUnit;
  pricePerYard?: number;
  pricePerBag?: number;
}): MulchResult {
  const unit = opts.diameterUnit ?? 'ft';
  const Ro = toFeet(opts.outerDiameter, unit) / 2;
  const Ri = toFeet(opts.trunkDiameter, unit) / 2;
  const depthFt = opts.depthInches / 12;
  if (Ro <= 0 || Ri < 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  if (Ri >= Ro) throw new Error('Trunk diameter must be smaller than outer diameter');
  const area = Math.PI * (Ro * Ro - Ri * Ri);
  return fromVolume(area, area * depthFt, {
    pricePerYard: opts.pricePerYard,
    pricePerBag: opts.pricePerBag,
  });
}
