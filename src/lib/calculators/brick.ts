/**
 * Brick and concrete-block (CMU) counts for a rectangular wall face.
 * Modular brick defaults: 7⅝" × 2¼" face + ⅜" mortar → ~6.86 bricks/sq ft
 * (Glen-Gery published modular figure).
 * Standard CMU face defaults: 15⅝" × 7⅝" + ⅜" joint → 16" × 8" nominal module
 * (CMHA / NCMA TEK modular sizing).
 */
import { round, toFeet, type LengthUnit } from '../units';

export type MasonryMode = 'brick' | 'cmu';

/** Modular clay brick actual face (length × height), inches. */
export const MODULAR_BRICK_LENGTH_IN = 7.625;
export const MODULAR_BRICK_HEIGHT_IN = 2.25;
/** Standard 8×8×16 CMU specified face (length × height), inches. */
export const CMU_FACE_LENGTH_IN = 15.625;
export const CMU_FACE_HEIGHT_IN = 7.625;
/** Common mortar joint for modular brick and CMU, inches. */
export const STANDARD_MORTAR_JOINT_IN = 0.375;

export interface BrickResult {
  mode: MasonryMode;
  faceAreaSqFt: number;
  unitsPerSqFt: number;
  courses: number;
  unitsPerCourse: number;
  unitsExact: number;
  unitsWithWaste: number;
  moduleLengthIn: number;
  moduleHeightIn: number;
}

/**
 * Count masonry units for a wall face including mortar joint modules and waste.
 * unitLengthIn / unitHeightIn are the **actual** unit face sizes (not nominal).
 */
export function masonryUnits(opts: {
  wallLength: number;
  wallHeight: number;
  lengthUnit?: LengthUnit;
  heightUnit?: LengthUnit;
  mode?: MasonryMode;
  unitLengthIn?: number;
  unitHeightIn?: number;
  mortarJointIn?: number;
  wastePercent?: number;
}): BrickResult {
  const mode = opts.mode ?? 'brick';
  const L = toFeet(opts.wallLength, opts.lengthUnit ?? 'ft');
  const H = toFeet(opts.wallHeight, opts.heightUnit ?? 'ft');
  const unitL =
    opts.unitLengthIn ?? (mode === 'cmu' ? CMU_FACE_LENGTH_IN : MODULAR_BRICK_LENGTH_IN);
  const unitH =
    opts.unitHeightIn ?? (mode === 'cmu' ? CMU_FACE_HEIGHT_IN : MODULAR_BRICK_HEIGHT_IN);
  const joint = opts.mortarJointIn ?? STANDARD_MORTAR_JOINT_IN;
  if (L <= 0 || H <= 0 || unitL <= 0 || unitH <= 0) throw new Error('Dimensions must be positive');
  if (joint < 0) throw new Error('Mortar joint cannot be negative');

  const moduleL = unitL + joint;
  const moduleH = unitH + joint;
  const faceArea = L * H;
  // Units per sq ft = 144 / (moduleL × moduleH) in square inches.
  const unitsPerSqFt = 144 / (moduleL * moduleH);
  const courses = Math.ceil((H * 12) / moduleH);
  const unitsPerCourse = Math.ceil((L * 12) / moduleL);
  const exact = courses * unitsPerCourse;
  const waste = (opts.wastePercent ?? 5) / 100;
  const withWaste = Math.ceil(Math.round(exact * (1 + waste) * 1e6) / 1e6);

  return {
    mode,
    faceAreaSqFt: round(faceArea, 2),
    unitsPerSqFt: round(unitsPerSqFt, 2),
    courses,
    unitsPerCourse,
    unitsExact: exact,
    unitsWithWaste: withWaste,
    moduleLengthIn: round(moduleL, 3),
    moduleHeightIn: round(moduleH, 3),
  };
}

/** Convenience alias for clay brick walls. */
export function brickCount(opts: Omit<Parameters<typeof masonryUnits>[0], 'mode'>) {
  return masonryUnits({ ...opts, mode: 'brick' });
}

/** Convenience alias for CMU / concrete block walls. */
export function cmuCount(opts: Omit<Parameters<typeof masonryUnits>[0], 'mode'>) {
  return masonryUnits({ ...opts, mode: 'cmu' });
}
