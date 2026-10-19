/**
 * Mulch volume for beds and tree rings.
 * Depth guidance commonly cites 2–3 inches for most organic mulches
 * (e.g. Penn State Extension, Clemson HGIC).
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

export interface MulchResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags2CuFt: number;
  bags3CuFt: number;
}

function fromVolume(areaSqFt: number, volumeCuFt: number): MulchResult {
  return {
    areaSqFt: round(areaSqFt, 2),
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(cuFtToCuYd(volumeCuFt), 3),
    volumeCuM: round(cuFtToCuM(volumeCuFt), 3),
    bags2CuFt: ceilBags(volumeCuFt, 2),
    bags3CuFt: ceilBags(volumeCuFt, 3),
  };
}

/** Rectangular or freeform bed approximated as L × W × depth. */
export function bedMulch(opts: {
  length: number;
  width: number;
  depthInches: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
}): MulchResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const depthFt = opts.depthInches / 12;
  if (L <= 0 || W <= 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  return fromVolume(area, area * depthFt);
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
}): MulchResult {
  const unit = opts.diameterUnit ?? 'ft';
  const Ro = toFeet(opts.outerDiameter, unit) / 2;
  const Ri = toFeet(opts.trunkDiameter, unit) / 2;
  const depthFt = opts.depthInches / 12;
  if (Ro <= 0 || Ri < 0 || depthFt <= 0) throw new Error('Dimensions must be positive');
  if (Ri >= Ro) throw new Error('Trunk diameter must be smaller than outer diameter');
  const area = Math.PI * (Ro * Ro - Ri * Ri);
  return fromVolume(area, area * depthFt);
}
