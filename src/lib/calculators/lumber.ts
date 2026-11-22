/**
 * Softwood board-foot takeoffs and planning weight estimates.
 *
 * Board feet = (nominal thickness_in × nominal width_in × length_ft) ÷ 12
 * per piece, then × quantity (7 CFR 1217.4 / American Softwood Lumber Standard
 * board measure — use nominal thickness and width, actual length).
 *
 * Weight uses **actual (dressed) cross-section** × length × species density:
 *   volume_cu_ft = (actual_t_in × actual_w_in × length_ft × 12) / 1728
 *   weight_lb = volume_cu_ft × density_lb_per_cu_ft
 *
 * Densities are planning estimates from USDA Wood Handbook specific gravity
 * (FPL-GTR-190 / FPL-GTR-282 Table 5-3a style figures). Kiln-dried density ≈
 * SG × 62.4 × (1 + MC) with MC ≈ 0.12. Moisture content changes weight a lot—
 * treat results as planning estimates, not scale tickets.
 */
import { round, toFeet, type LengthUnit } from '../units';

/** lb/cu ft of liquid water at ~4 °C (Wood Handbook conversion basis). */
export const WATER_DENSITY_LB_PER_CU_FT = 62.4;

/** lb → kg. */
export const LB_TO_KG = 0.45359237;

export interface LumberFromPiecesResult {
  boardFeetPerPiece: number;
  totalBoardFeet: number;
  totalLinearFeet: number;
  pieces: number;
  volumeCuFt: number;
}

export interface LumberFromBoardFeetResult {
  boardFeetPerPiece: number;
  targetBoardFeet: number;
  piecesNeeded: number;
  totalBoardFeetOrdered: number;
  totalLinearFeet: number;
}

/** Actual dressed softwood section (inches). */
export interface SoftwoodActualSection {
  thicknessIn: number;
  widthIn: number;
}

/**
 * Common softwood dressed sizes (American Softwood Lumber Standard / PS 20).
 * Keys are "nominalT×nominalW" with nominal inches.
 */
export const ACTUAL_SOFTWOOD_SECTIONS: Record<string, SoftwoodActualSection> = {
  '1x2': { thicknessIn: 0.75, widthIn: 1.5 },
  '1x3': { thicknessIn: 0.75, widthIn: 2.5 },
  '1x4': { thicknessIn: 0.75, widthIn: 3.5 },
  '1x6': { thicknessIn: 0.75, widthIn: 5.5 },
  '1x8': { thicknessIn: 0.75, widthIn: 7.25 },
  '1x10': { thicknessIn: 0.75, widthIn: 9.25 },
  '1x12': { thicknessIn: 0.75, widthIn: 11.25 },
  '2x2': { thicknessIn: 1.5, widthIn: 1.5 },
  '2x3': { thicknessIn: 1.5, widthIn: 2.5 },
  '2x4': { thicknessIn: 1.5, widthIn: 3.5 },
  '2x6': { thicknessIn: 1.5, widthIn: 5.5 },
  '2x8': { thicknessIn: 1.5, widthIn: 7.25 },
  '2x10': { thicknessIn: 1.5, widthIn: 9.25 },
  '2x12': { thicknessIn: 1.5, widthIn: 11.25 },
  '4x4': { thicknessIn: 3.5, widthIn: 3.5 },
  '4x6': { thicknessIn: 3.5, widthIn: 5.5 },
  '6x6': { thicknessIn: 5.5, widthIn: 5.5 },
};

/**
 * Map nominal softwood thickness × width (inches) to actual dressed size.
 * Falls back to common PS 20 reductions when the exact pair isn't tabulated.
 */
export function actualSoftwoodSection(
  nominalThicknessIn: number,
  nominalWidthIn: number,
): SoftwoodActualSection {
  const tKey = Math.round(nominalThicknessIn);
  const wKey = Math.round(nominalWidthIn);
  const keyed = ACTUAL_SOFTWOOD_SECTIONS[`${tKey}x${wKey}`];
  if (keyed) return { ...keyed };

  // PS 20-style dressed reductions for common framing sizes.
  const dressThickness = (n: number): number => {
    if (n <= 0) return n;
    if (n <= 1.5) return Math.max(0.75, n - 0.25); // 1" → ¾"
    if (n <= 4) return n - 0.5; // 2" → 1½", 4" → 3½"
    if (n <= 6) return n - 0.5; // 6" → 5½"
    return n - 0.5;
  };
  const dressWidth = (n: number): number => {
    if (n <= 0) return n;
    if (n <= 6) return n - 0.5; // 4→3.5, 6→5.5
    if (n <= 8) return 7.25;
    if (n <= 10) return 9.25;
    if (n <= 12) return 11.25;
    return n - 0.75; // wider boards often dress −¾"
  };
  return {
    thicknessIn: round(dressThickness(nominalThicknessIn), 3),
    widthIn: round(dressWidth(nominalWidthIn), 3),
  };
}

export type LumberDensityPresetId =
  | 'spf_kd'
  | 'douglas_fir_larch_kd'
  | 'southern_pine_kd'
  | 'southern_pine_green'
  | 'custom';

export interface LumberDensityPreset {
  id: LumberDensityPresetId;
  label: string;
  /**
   * Wood Handbook specific gravity (oven-dry weight / volume at stated MC),
   * except green/treated where the handbook green density is used directly.
   */
  specificGravity: number;
  /** Moisture content as a fraction (0.12 ≈ kiln-dried; green is wetter). */
  moistureContent: number;
  /** Planning density lb/cu ft used by the weight formula. */
  densityLbPerCuFt: number;
  /** Short citation note for UI / docs. */
  note: string;
}

/**
 * Density = SG × 62.4 × (1 + MC) for kiln-dried presets (Wood Handbook basis).
 * Green/treated southern pine uses the handbook green density (~53 lb/cu ft for
 * loblolly) because wet PT stock is closer to green weight than KD.
 */
function kdDensity(sg: number, mc = 0.12): number {
  return round(sg * WATER_DENSITY_LB_PER_CU_FT * (1 + mc), 1);
}

export const LUMBER_DENSITY_PRESETS: Record<
  Exclude<LumberDensityPresetId, 'custom'>,
  LumberDensityPreset
> = {
  spf_kd: {
    id: 'spf_kd',
    label: 'SPF kiln-dried (~12% MC)',
    // Lodgepole pine / mid-SPF: Wood Handbook G at 12% ≈ 0.41 → ~29 lb/cu ft.
    specificGravity: 0.41,
    moistureContent: 0.12,
    densityLbPerCuFt: kdDensity(0.41, 0.12), // 28.6 → stored via kdDensity
    note: 'USDA Wood Handbook SPF-group planning mid (lodgepole-like SG 0.41 at 12% MC)',
  },
  douglas_fir_larch_kd: {
    id: 'douglas_fir_larch_kd',
    label: 'Douglas fir-larch kiln-dried',
    // Coast Douglas-fir G at 12% ≈ 0.48; handbook density ≈ 34 lb/cu ft.
    specificGravity: 0.48,
    moistureContent: 0.12,
    densityLbPerCuFt: kdDensity(0.48, 0.12), // 33.5
    note: 'USDA Wood Handbook coast Douglas-fir SG 0.48 at 12% MC (density ~34 lb/cu ft)',
  },
  southern_pine_kd: {
    id: 'southern_pine_kd',
    label: 'Southern pine kiln-dried',
    // Loblolly / shortleaf-class southern pine G at 12% ≈ 0.51 → ~36 lb/cu ft.
    specificGravity: 0.51,
    moistureContent: 0.12,
    densityLbPerCuFt: kdDensity(0.51, 0.12), // 35.6
    note: 'USDA Wood Handbook loblolly-class southern pine SG 0.51 at 12% MC',
  },
  southern_pine_green: {
    id: 'southern_pine_green',
    label: 'Southern pine green / wet treated',
    // Handbook green density for loblolly ≈ 53 lb/cu ft (much wetter than KD).
    specificGravity: 0.47,
    moistureContent: 0.5, // informational; density pinned to handbook green value
    densityLbPerCuFt: 53,
    note: 'USDA Wood Handbook green loblolly density ~53 lb/cu ft; wet PT is often in this range',
  },
};

/** Resolve a preset or custom density (lb/cu ft). */
export function resolveLumberDensityLbPerCuFt(
  presetId: LumberDensityPresetId | string,
  customDensityLbPerCuFt?: number,
): number {
  if (presetId === 'custom') {
    const d = customDensityLbPerCuFt ?? LUMBER_DENSITY_PRESETS.spf_kd.densityLbPerCuFt;
    if (d <= 0) throw new Error('Density must be positive');
    return d;
  }
  const preset = LUMBER_DENSITY_PRESETS[presetId as Exclude<LumberDensityPresetId, 'custom'>];
  if (!preset) {
    const d = customDensityLbPerCuFt ?? LUMBER_DENSITY_PRESETS.spf_kd.densityLbPerCuFt;
    if (d <= 0) throw new Error('Density must be positive');
    return d;
  }
  return preset.densityLbPerCuFt;
}

export interface LumberWeightResult {
  actualThicknessIn: number;
  actualWidthIn: number;
  lengthFt: number;
  pieces: number;
  densityLbPerCuFt: number;
  volumeCuFtPerPiece: number;
  volumeCuFtTotal: number;
  weightLbPerPiece: number;
  weightLbPerLinearFoot: number;
  weightLbTotal: number;
  weightKgPerPiece: number;
  weightKgPerLinearFoot: number;
  weightKgTotal: number;
}

/**
 * Actual-section volume in cubic feet for one piece.
 * volume = (t_in × w_in × length_ft × 12) / 1728
 */
export function lumberActualVolumeCuFt(opts: {
  actualThicknessIn: number;
  actualWidthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
}): number {
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const t = opts.actualThicknessIn;
  const w = opts.actualWidthIn;
  if (t <= 0 || w <= 0 || lengthFt <= 0) throw new Error('Dimensions must be positive');
  return (t * w * lengthFt * 12) / 1728;
}

/**
 * Planning weight from nominal size (dressed section looked up) × density.
 * Does **not** use board-foot (nominal) volume — weight uses actual cross-section.
 */
export function lumberWeight(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
  pieces?: number;
  /** Preset id or 'custom'. */
  densityPreset?: LumberDensityPresetId | string;
  /** Required when densityPreset is 'custom'; also overrides unknown ids. */
  densityLbPerCuFt?: number;
}): LumberWeightResult {
  const pieces = opts.pieces ?? 1;
  if (pieces <= 0 || !Number.isFinite(pieces)) throw new Error('Piece count must be positive');
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const actual = actualSoftwoodSection(opts.thicknessIn, opts.widthIn);
  const density = resolveLumberDensityLbPerCuFt(
    opts.densityPreset ?? 'spf_kd',
    opts.densityLbPerCuFt,
  );
  const volumeCuFtPerPiece = lumberActualVolumeCuFt({
    actualThicknessIn: actual.thicknessIn,
    actualWidthIn: actual.widthIn,
    length: lengthFt,
    lengthUnit: 'ft',
  });
  const weightLbPerPiece = volumeCuFtPerPiece * density;
  const weightLbPerLinearFoot = lengthFt > 0 ? weightLbPerPiece / lengthFt : 0;
  const weightLbTotal = weightLbPerPiece * pieces;
  const volumeCuFtTotal = volumeCuFtPerPiece * pieces;

  return {
    actualThicknessIn: actual.thicknessIn,
    actualWidthIn: actual.widthIn,
    lengthFt: round(lengthFt, 3),
    pieces: Math.ceil(pieces),
    densityLbPerCuFt: round(density, 2),
    volumeCuFtPerPiece: round(volumeCuFtPerPiece, 4),
    volumeCuFtTotal: round(volumeCuFtTotal, 4),
    weightLbPerPiece: round(weightLbPerPiece, 2),
    weightLbPerLinearFoot: round(weightLbPerLinearFoot, 2),
    weightLbTotal: round(weightLbTotal, 2),
    weightKgPerPiece: round(weightLbPerPiece * LB_TO_KG, 2),
    weightKgPerLinearFoot: round(weightLbPerLinearFoot * LB_TO_KG, 2),
    weightKgTotal: round(weightLbTotal * LB_TO_KG, 2),
  };
}

/** Board feet for one piece using softwood nominal dimensions. */
export function boardFeetPerPiece(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
}): number {
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const t = opts.thicknessIn;
  const w = opts.widthIn;
  if (t <= 0 || w <= 0 || lengthFt <= 0) throw new Error('Dimensions must be positive');
  // Softwood < 1" nominal thickness is tallied as 1" (7 CFR 1217.4).
  const thickness = t < 1 ? 1 : t;
  return round((thickness * w * lengthFt) / 12, 2);
}

/** Total board feet and linear feet from a piece list of identical sizes. */
export function lumberFromPieces(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
  pieces: number;
}): LumberFromPiecesResult {
  const pieces = opts.pieces;
  if (pieces <= 0 || !Number.isFinite(pieces)) throw new Error('Piece count must be positive');
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const per = boardFeetPerPiece(opts);
  const total = round(per * pieces, 2);
  return {
    boardFeetPerPiece: per,
    totalBoardFeet: total,
    totalLinearFeet: round(lengthFt * pieces, 2),
    pieces: Math.ceil(pieces),
    // 1 board foot = 1/12 cu ft of nominal wood.
    volumeCuFt: round(total / 12, 3),
  };
}

/** How many identical pieces are needed for a target board-foot total. */
export function lumberFromBoardFeet(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
  targetBoardFeet: number;
}): LumberFromBoardFeetResult {
  const target = opts.targetBoardFeet;
  if (target <= 0) throw new Error('Board feet must be positive');
  const per = boardFeetPerPiece(opts);
  if (per <= 0) throw new Error('Board feet per piece must be positive');
  const piecesNeeded = Math.ceil(target / per);
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  return {
    boardFeetPerPiece: per,
    targetBoardFeet: round(target, 2),
    piecesNeeded,
    totalBoardFeetOrdered: round(per * piecesNeeded, 2),
    totalLinearFeet: round(lengthFt * piecesNeeded, 2),
  };
}
