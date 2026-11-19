/**
 * Concrete slab cost compare: bagged mix vs ready-mix.
 * Volume reuses slabVolume (same QUIKRETE/Sakrete bag yields).
 * All dollar inputs are user-entered — no regional default prices.
 * Ready-mix order quantity rounds up to the next ¼ cubic yard.
 */
import { round, type LengthUnit } from '../units';
import {
  BAG_YIELD_CUFT,
  bagsNeeded,
  slabVolume,
  type BagSizeLb,
  type ConcreteVolumeResult,
} from './concrete';

export type SlabCostCheaper = 'bags' | 'ready-mix' | 'tie' | 'incomplete';

export interface SlabCostResult extends ConcreteVolumeResult {
  bagSize: BagSizeLb;
  bags: number;
  pricePerBag: number;
  pricePerCuYd: number;
  deliveryFee: number;
  bagCost: number;
  /** Exact yards after waste (same as volumeCuYd). */
  readyMixYardsExact: number;
  /** Yards to order after rounding up to the next ¼ yd. */
  readyMixYardsOrdered: number;
  readyMixMaterialCost: number;
  readyMixTotalCost: number;
  cheaper: SlabCostCheaper;
  /** Absolute savings of the cheaper option vs the other (0 if incomplete/tie). */
  savings: number;
}

/** Round cubic yards up to the next quarter yard (common ready-mix ticket step). */
export function roundUpToQuarterYard(cuYd: number): number {
  if (cuYd <= 0) return 0;
  return Math.ceil(cuYd * 4 - Number.EPSILON) / 4;
}

function money(n: number): number {
  return round(n, 2);
}

/**
 * Estimate slab volume + compare bagged-mix material cost vs ready-mix
 * (material + optional delivery). Prices default to 0 when omitted.
 */
export function slabCostCompare(opts: {
  length: number;
  width: number;
  thickness: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  thicknessUnit?: LengthUnit;
  wasteFactor?: number;
  bagSize?: BagSizeLb;
  pricePerBag?: number;
  pricePerCuYd?: number;
  deliveryFee?: number;
}): SlabCostResult {
  const bagSize = opts.bagSize ?? 80;
  const pricePerBag = opts.pricePerBag ?? 0;
  const pricePerCuYd = opts.pricePerCuYd ?? 0;
  const deliveryFee = opts.deliveryFee ?? 0;
  if (pricePerBag < 0 || pricePerCuYd < 0 || deliveryFee < 0) {
    throw new Error('Prices and delivery fee must be non-negative');
  }

  const vol = slabVolume({
    length: opts.length,
    width: opts.width,
    thickness: opts.thickness,
    lengthUnit: opts.lengthUnit,
    widthUnit: opts.widthUnit,
    thicknessUnit: opts.thicknessUnit,
    wasteFactor: opts.wasteFactor,
  });

  const bags = bagsNeeded(vol.volumeCuFt, bagSize);
  const bagCost = money(bags * pricePerBag);
  const readyMixYardsExact = vol.volumeCuYd;
  const readyMixYardsOrdered = roundUpToQuarterYard(readyMixYardsExact);
  const readyMixMaterialCost = money(readyMixYardsOrdered * pricePerCuYd);
  const readyMixTotalCost = money(readyMixMaterialCost + deliveryFee);

  const bagsPriced = pricePerBag > 0;
  /** Need a positive $/yd quote; delivery alone is not a complete ready-mix price. */
  const mixPriced = pricePerCuYd > 0;
  let cheaper: SlabCostCheaper = 'incomplete';
  let savings = 0;
  if (bagsPriced && mixPriced) {
    if (bagCost < readyMixTotalCost) {
      cheaper = 'bags';
      savings = money(readyMixTotalCost - bagCost);
    } else if (readyMixTotalCost < bagCost) {
      cheaper = 'ready-mix';
      savings = money(bagCost - readyMixTotalCost);
    } else {
      cheaper = 'tie';
    }
  }

  return {
    ...vol,
    bagSize,
    bags,
    pricePerBag: money(pricePerBag),
    pricePerCuYd: money(pricePerCuYd),
    deliveryFee: money(deliveryFee),
    bagCost,
    readyMixYardsExact,
    readyMixYardsOrdered: round(readyMixYardsOrdered, 3),
    readyMixMaterialCost,
    readyMixTotalCost,
    cheaper,
    savings,
  };
}

export { BAG_YIELD_CUFT };
