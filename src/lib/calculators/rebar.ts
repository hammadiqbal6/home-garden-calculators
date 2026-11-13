/**
 * Rebar takeoff for a rectangular slab grid (each-way spacing).
 * Counts bars and linear feet from on-center spacing; converts to stock sticks.
 * This is a material estimator — not a structural design. Confirm bar size,
 * spacing, cover, and laps with local code / drawings (ACI 318 caps shrinkage/
 * temperature spacing at the lesser of 5× thickness or 18 in for many slabs).
 *
 * Unit weights (lb/ft) follow common CRSI published nominal bar weights.
 */
import { round, toFeet, type LengthUnit } from '../units';

export type RebarSize = 3 | 4 | 5 | 6;

/** Nominal unit weight lb/ft (CRSI / ASTM A615 common published values). */
export const REBAR_LB_PER_FT: Record<RebarSize, number> = {
  3: 0.376,
  4: 0.668,
  5: 1.043,
  6: 1.502,
};

export interface RebarResult {
  barsAlongLength: number;
  barsAlongWidth: number;
  totalBars: number;
  linearFeet: number;
  linearFeetWithWaste: number;
  sticks: number;
  stickLengthFt: number;
  weightLbs: number;
  barSize: RebarSize;
  spacingIn: number;
}

/**
 * Estimate rebar for a slab mat with equal spacing each way.
 * Bars parallel to length: count across the width; each is `length` long.
 * Bars parallel to width: count across the length; each is `width` long.
 */
export function rebarForSlab(opts: {
  length: number;
  width: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  /** On-center spacing in inches (same each way). */
  spacingIn: number;
  barSize?: RebarSize;
  /** Stock stick length in feet (yards often sell 20 ft or 40 ft). */
  stickLengthFt?: number;
  wastePercent?: number;
}): RebarResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const spacing = opts.spacingIn;
  const stick = opts.stickLengthFt ?? 20;
  const barSize = opts.barSize ?? 4;
  if (L <= 0 || W <= 0) throw new Error('Dimensions must be positive');
  if (spacing <= 0) throw new Error('Spacing must be positive');
  if (stick <= 0) throw new Error('Stick length must be positive');

  const barsAlongLength = Math.floor((W * 12) / spacing) + 1;
  const barsAlongWidth = Math.floor((L * 12) / spacing) + 1;
  const linearFeet = barsAlongLength * L + barsAlongWidth * W;
  const waste = (opts.wastePercent ?? 10) / 100;
  const withWaste = linearFeet * (1 + waste);
  const sticks = Math.ceil(withWaste / stick);
  const weightLbs = withWaste * REBAR_LB_PER_FT[barSize];

  return {
    barsAlongLength,
    barsAlongWidth,
    totalBars: barsAlongLength + barsAlongWidth,
    linearFeet: round(linearFeet, 2),
    linearFeetWithWaste: round(withWaste, 2),
    sticks,
    stickLengthFt: stick,
    weightLbs: round(weightLbs, 1),
    barSize,
    spacingIn: spacing,
  };
}
