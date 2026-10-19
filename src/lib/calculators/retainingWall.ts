import { round, toFeet, type LengthUnit } from '../units';

export interface RetainingWallResult {
  faceAreaSqFt: number;
  blocks: number;
  blocksWithWaste: number;
  courses: number;
  blocksPerCourse: number;
  baseGravelCuYd: number;
}

/**
 * Segmental retaining wall block count from wall face area.
 * Block face dimensions default to common 18" × 6" (length × height).
 */
export function retainingWallBlocks(opts: {
  wallLength: number;
  wallHeight: number;
  lengthUnit?: LengthUnit;
  heightUnit?: LengthUnit;
  blockLengthIn?: number;
  blockHeightIn?: number;
  wastePercent?: number;
  /** Depth of compacted gravel base trench in inches. */
  baseDepthIn?: number;
  baseWidthIn?: number;
}): RetainingWallResult {
  const L = toFeet(opts.wallLength, opts.lengthUnit ?? 'ft');
  const H = toFeet(opts.wallHeight, opts.heightUnit ?? 'ft');
  const bL = (opts.blockLengthIn ?? 18) / 12;
  const bH = (opts.blockHeightIn ?? 6) / 12;
  if (L <= 0 || H <= 0 || bL <= 0 || bH <= 0) throw new Error('Dimensions must be positive');
  const faceArea = L * H;
  const courses = Math.ceil(H / bH);
  const blocksPerCourse = Math.ceil(L / bL);
  const blocks = courses * blocksPerCourse;
  const waste = (opts.wastePercent ?? 5) / 100;
  const withWaste = Math.ceil(blocks * (1 + waste));
  const baseDepth = (opts.baseDepthIn ?? 6) / 12;
  const baseWidth = (opts.baseWidthIn ?? 24) / 12;
  const baseCuYd = (L * baseWidth * baseDepth) / 27;
  return {
    faceAreaSqFt: round(faceArea, 2),
    blocks,
    blocksWithWaste: withWaste,
    courses,
    blocksPerCourse,
    baseGravelCuYd: round(baseCuYd, 2),
  };
}
