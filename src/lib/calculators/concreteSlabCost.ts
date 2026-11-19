/**
 * Concrete slab cost estimator.
 * Volume math reuses slabVolume / bag yields from concrete.ts.
 * Every dollar figure is a user input — defaults are labeled examples only,
 * not published market rates.
 */
import { slabVolume, type BagSizeLb } from './concrete';
import { round, toFeet, type LengthUnit } from '../units';

export type ConcretePurchaseMode = 'ready-mix' | 'bags';

export interface ConcreteSlabCostResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags: number | null;
  bagSize: BagSizeLb | null;
  materialCost: number;
  gravelBaseCost: number;
  rebarMeshCost: number;
  formsCost: number;
  deliveryFee: number;
  laborCost: number;
  addOnsTotal: number;
  totalCost: number;
  costPerSqFt: number;
  purchaseMode: ConcretePurchaseMode;
}

function money(n: number): number {
  return round(n, 2);
}

/**
 * Estimate slab volume + cost from user-supplied prices.
 * Ready-mix: material = yards_with_waste × pricePerYard.
 * Bags: material = ceil(cu_ft_with_waste ÷ yield) × bagPrice.
 * Add-ons (gravel, rebar/mesh, forms, delivery, labor×area) are lump sums /
 * rates the user enters; pass 0 to omit.
 */
export function concreteSlabCost(opts: {
  length: number;
  width: number;
  thickness: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  thicknessUnit?: LengthUnit;
  wastePercent?: number;
  purchaseMode?: ConcretePurchaseMode;
  /**
   * Ready-mix unit price. Multiplied by cubic yards when `readyMixPriceUnit` is
   * `'cuyd'` (default), or by cubic meters when `'cum'`.
   */
  readyMixPrice?: number;
  readyMixPriceUnit?: 'cuyd' | 'cum';
  bagSize?: BagSizeLb;
  bagPrice?: number;
  gravelBaseCost?: number;
  rebarMeshCost?: number;
  formsCost?: number;
  deliveryFee?: number;
  /** Labor rate × slab area (sq ft). */
  laborPerSqFt?: number;
}): ConcreteSlabCostResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const T = toFeet(opts.thickness, opts.thicknessUnit ?? 'in');
  if (L <= 0 || W <= 0 || T <= 0) throw new Error('Dimensions must be positive');

  const wastePercent = opts.wastePercent ?? 10;
  if (wastePercent < 0) throw new Error('Waste percent cannot be negative');

  const vol = slabVolume({
    length: opts.length,
    width: opts.width,
    thickness: opts.thickness,
    lengthUnit: opts.lengthUnit ?? 'ft',
    widthUnit: opts.widthUnit ?? 'ft',
    thicknessUnit: opts.thicknessUnit ?? 'in',
    wasteFactor: wastePercent / 100,
  });

  const areaSqFt = round(L * W, 3);
  const mode: ConcretePurchaseMode = opts.purchaseMode ?? 'ready-mix';

  let materialCost = 0;
  let bags: number | null = null;
  let bagSize: BagSizeLb | null = null;

  if (mode === 'ready-mix') {
    const price = opts.readyMixPrice ?? 0;
    if (price < 0) throw new Error('Ready-mix price cannot be negative');
    const qty = (opts.readyMixPriceUnit ?? 'cuyd') === 'cum' ? vol.volumeCuM : vol.volumeCuYd;
    materialCost = money(qty * price);
  } else {
    const size = (opts.bagSize ?? 80) as BagSizeLb;
    if (![40, 60, 80].includes(size)) throw new Error('Bag size must be 40, 60, or 80 lb');
    const bagPrice = opts.bagPrice ?? 0;
    if (bagPrice < 0) throw new Error('Bag price cannot be negative');
    bagSize = size;
    bags = vol[`bags${size}` as 'bags40' | 'bags60' | 'bags80'];
    materialCost = money(bags * bagPrice);
  }

  const gravelBaseCost = money(Math.max(0, opts.gravelBaseCost ?? 0));
  const rebarMeshCost = money(Math.max(0, opts.rebarMeshCost ?? 0));
  const formsCost = money(Math.max(0, opts.formsCost ?? 0));
  const deliveryFee = money(Math.max(0, opts.deliveryFee ?? 0));
  const laborRate = opts.laborPerSqFt ?? 0;
  if (laborRate < 0) throw new Error('Labor rate cannot be negative');
  const laborCost = money(laborRate * areaSqFt);

  const addOnsTotal = money(
    gravelBaseCost + rebarMeshCost + formsCost + deliveryFee + laborCost,
  );
  const totalCost = money(materialCost + addOnsTotal);
  const costPerSqFt = areaSqFt > 0 ? money(totalCost / areaSqFt) : 0;

  return {
    areaSqFt,
    volumeCuFt: vol.volumeCuFt,
    volumeCuYd: vol.volumeCuYd,
    volumeCuM: vol.volumeCuM,
    bags,
    bagSize,
    materialCost,
    gravelBaseCost,
    rebarMeshCost,
    formsCost,
    deliveryFee,
    laborCost,
    addOnsTotal,
    totalCost,
    costPerSqFt,
    purchaseMode: mode,
  };
}

/** Format a dollar amount for result rows (plain ASCII; no locale surprises). */
export function formatUsd(amount: number): string {
  const n = money(amount);
  const fixed = n.toFixed(2);
  return `$${fixed}`;
}
