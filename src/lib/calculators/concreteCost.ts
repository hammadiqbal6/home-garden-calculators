/**
 * Optional bag vs ready-mix cost helpers + quarter-yard order rounding.
 * No regional price defaults — callers pass user-entered prices only.
 */
import { round } from '../units';

/** Round cubic yards up to the next 0.25 yd. Zero stays zero. */
export function roundUpToQuarterYard(cuYd: number): number {
  if (cuYd <= 0) return 0;
  return round(Math.ceil(cuYd * 4) / 4, 3);
}

export interface ConcreteCostResult {
  volumeCuYd: number;
  orderCuYdQuarter: number;
  bagCost40?: number;
  bagCost60?: number;
  bagCost80?: number;
  readyMixCost?: number;
  cheapestBagCost?: number;
  cheapestBagSize?: 40 | 60 | 80;
  readyMixCheaperThanBags?: boolean;
}

export function concreteCostCompare(opts: {
  volumeCuYd: number;
  bags40: number;
  bags60: number;
  bags80: number;
  pricePerBag40?: number;
  pricePerBag60?: number;
  pricePerBag80?: number;
  pricePerCuYd?: number;
  deliveryFee?: number;
}): ConcreteCostResult {
  const orderCuYdQuarter = roundUpToQuarterYard(opts.volumeCuYd);
  const result: ConcreteCostResult = {
    volumeCuYd: round(opts.volumeCuYd, 3),
    orderCuYdQuarter,
  };

  let cheapest: { size: 40 | 60 | 80; cost: number } | undefined;
  const bagOpts: { size: 40 | 60 | 80; bags: number; price?: number }[] = [
    { size: 40, bags: opts.bags40, price: opts.pricePerBag40 },
    { size: 60, bags: opts.bags60, price: opts.pricePerBag60 },
    { size: 80, bags: opts.bags80, price: opts.pricePerBag80 },
  ];
  for (const opt of bagOpts) {
    if (opt.price != null && opt.price > 0) {
      const cost = round(opt.bags * opt.price, 2);
      if (opt.size === 40) result.bagCost40 = cost;
      if (opt.size === 60) result.bagCost60 = cost;
      if (opt.size === 80) result.bagCost80 = cost;
      if (!cheapest || cost < cheapest.cost) cheapest = { size: opt.size, cost };
    }
  }
  if (cheapest) {
    result.cheapestBagCost = cheapest.cost;
    result.cheapestBagSize = cheapest.size;
  }

  const priceYd = opts.pricePerCuYd ?? 0;
  const delivery = opts.deliveryFee ?? 0;
  if (priceYd > 0 || delivery > 0) {
    result.readyMixCost = round(orderCuYdQuarter * Math.max(priceYd, 0) + Math.max(delivery, 0), 2);
  }
  if (result.readyMixCost != null && result.cheapestBagCost != null) {
    result.readyMixCheaperThanBags = result.readyMixCost < result.cheapestBagCost;
  }
  return result;
}
