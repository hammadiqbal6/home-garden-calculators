/**
 * Concrete volume estimators.
 * Bag yields follow common Quikrete / Sakrete published coverage for
 * 40 / 60 / 80 lb bags (approx. 0.30 / 0.45 / 0.60 cu ft per bag).
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

export type BagSizeLb = 40 | 60 | 80;

/** Approximate yield in cubic feet per bag (manufacturer typical). */
export const BAG_YIELD_CUFT: Record<BagSizeLb, number> = {
  40: 0.3,
  60: 0.45,
  80: 0.6,
};

export interface ConcreteVolumeResult {
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags40: number;
  bags60: number;
  bags80: number;
}

function resultFromCuFt(volumeCuFt: number, wasteFactor = 0): ConcreteVolumeResult {
  const withWaste = volumeCuFt * (1 + wasteFactor);
  return {
    volumeCuFt: round(withWaste, 3),
    volumeCuYd: round(cuFtToCuYd(withWaste), 3),
    volumeCuM: round(cuFtToCuM(withWaste), 3),
    bags40: ceilBags(withWaste, BAG_YIELD_CUFT[40]),
    bags60: ceilBags(withWaste, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(withWaste, BAG_YIELD_CUFT[80]),
  };
}

/** Rectangular slab / pad / footing: L × W × thickness. */
export function slabVolume(opts: {
  length: number;
  width: number;
  thickness: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  thicknessUnit?: LengthUnit;
  wasteFactor?: number;
}): ConcreteVolumeResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const T = toFeet(opts.thickness, opts.thicknessUnit ?? 'in');
  if (L <= 0 || W <= 0 || T <= 0) throw new Error('Dimensions must be positive');
  return resultFromCuFt(L * W * T, opts.wasteFactor ?? 0.1);
}

/** Circular column / Sonotube: π r² h. Diameter is the tube ID. */
export function sonotubeVolume(opts: {
  diameter: number;
  height: number;
  count?: number;
  diameterUnit?: LengthUnit;
  heightUnit?: LengthUnit;
  wasteFactor?: number;
}): ConcreteVolumeResult {
  const d = toFeet(opts.diameter, opts.diameterUnit ?? 'in');
  const h = toFeet(opts.height, opts.heightUnit ?? 'ft');
  const n = opts.count ?? 1;
  if (d <= 0 || h <= 0 || n <= 0) throw new Error('Dimensions must be positive');
  const r = d / 2;
  return resultFromCuFt(Math.PI * r * r * h * n, opts.wasteFactor ?? 0.05);
}

/** Post holes (fence posts): cylindrical hole volume × count. */
export function postHoleVolume(opts: {
  diameter: number;
  depth: number;
  count: number;
  diameterUnit?: LengthUnit;
  depthUnit?: LengthUnit;
  wasteFactor?: number;
}): ConcreteVolumeResult {
  return sonotubeVolume({
    diameter: opts.diameter,
    height: opts.depth,
    count: opts.count,
    diameterUnit: opts.diameterUnit ?? 'in',
    heightUnit: opts.depthUnit ?? 'ft',
    wasteFactor: opts.wasteFactor ?? 0.1,
  });
}

/**
 * Straight stair / step volume (solid fill approximation).
 * Each step is a rectangular prism; riser × tread × width summed for N steps.
 * For typical poured stairs this overestimates slightly vs. tapered forms —
 * a 5–10% waste factor is still recommended.
 */
export function stepsVolume(opts: {
  numberOfSteps: number;
  riser: number;
  tread: number;
  width: number;
  riserUnit?: LengthUnit;
  treadUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  wasteFactor?: number;
}): ConcreteVolumeResult {
  const n = opts.numberOfSteps;
  const riser = toFeet(opts.riser, opts.riserUnit ?? 'in');
  const tread = toFeet(opts.tread, opts.treadUnit ?? 'in');
  const width = toFeet(opts.width, opts.widthUnit ?? 'ft');
  if (n <= 0 || riser <= 0 || tread <= 0 || width <= 0) {
    throw new Error('Step dimensions must be positive');
  }
  // Solid stair block: sum of step prisms = width × tread × riser × (1+2+…+n)
  // Equivalent closed form: width × tread × riser × n(n+1)/2
  const volumeCuFt = width * tread * riser * ((n * (n + 1)) / 2);
  return resultFromCuFt(volumeCuFt, opts.wasteFactor ?? 0.1);
}

export function bagsNeeded(volumeCuFt: number, bagSize: BagSizeLb): number {
  return ceilBags(volumeCuFt, BAG_YIELD_CUFT[bagSize]);
}
