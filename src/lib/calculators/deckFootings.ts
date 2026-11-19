/**
 * Deck footing / pier layout estimator.
 * Counts posts on a rectangular grid from deck size + beam/post spacing,
 * then estimates cylindrical footing volume (π r² h) from frost depth and
 * hole or Sonotube diameter. Bag yields match QUIKRETE Concrete Mix 1101
 * planning coverage used elsewhere in this repo.
 *
 * Planning estimate only — not structural design. Confirm frost depth,
 * pier size, and layout with local code / an engineer.
 */
import { BAG_YIELD_CUFT, type ConcreteVolumeResult } from './concrete';
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

export type DeckFootingLayout = 'freestanding' | 'attached';

export interface DeckFootingResult {
  deckAreaSqFt: number;
  postsAlong: number;
  beamRows: number;
  footingCount: number;
  holeDiameterIn: number;
  holeDepthFt: number;
  /** Diameter used for concrete volume (Sonotube ID when set, else hole). */
  formDiameterIn: number;
  /** Optional Sonotube inside diameter; null when none entered. */
  sonotubeDiameterIn: number | null;
  volumePerHoleCuFt: number;
  volumePerHoleCuYd: number;
  totalVolumeCuFt: number;
  totalVolumeCuYd: number;
  totalVolumeCuM: number;
  bags40: number;
  bags60: number;
  bags80: number;
}

function postsOnLine(lengthFt: number, spacingFt: number): number {
  if (spacingFt <= 0) throw new Error('Spacing must be positive');
  return Math.floor(lengthFt / spacingFt) + 1;
}

function beamRowCount(widthFt: number, beamSpacingFt: number, layout: DeckFootingLayout): number {
  if (beamSpacingFt <= 0) throw new Error('Beam spacing must be positive');
  if (layout === 'attached') {
    // Ledger on the house side — count post rows away from the ledger only.
    return Math.max(1, Math.floor(widthFt / beamSpacingFt));
  }
  return Math.floor(widthFt / beamSpacingFt) + 1;
}

function cylinderFromCuFt(volumeCuFt: number, wasteFactor: number): ConcreteVolumeResult {
  const withWaste = volumeCuFt * (1 + wasteFactor);
  return {
    volumeCuFt: round(withWaste, 3),
    volumeCuYd: round(cuFtToCuYd(withWaste), 3),
    volumeCuM: round(cuFtToCuM(withWaste), 3),
    bags40: ceilBags(withWaste, BAG_YIELD_CUFT[40]),
    bags50: ceilBags(withWaste, BAG_YIELD_CUFT[50]),
    bags60: ceilBags(withWaste, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(withWaste, BAG_YIELD_CUFT[80]),
  };
}

/**
 * Estimate deck footing count and concrete for round piers.
 * Hole depth defaults to the frost-depth input (user’s local frost line).
 * When sonotubeDiameter is omitted or ≤0, concrete uses hole diameter.
 */
export function deckFootings(opts: {
  length: number;
  width: number;
  postSpacing: number;
  beamSpacing: number;
  frostDepth: number;
  holeDiameter: number;
  sonotubeDiameter?: number;
  layout?: DeckFootingLayout;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  postSpacingUnit?: LengthUnit;
  beamSpacingUnit?: LengthUnit;
  frostDepthUnit?: LengthUnit;
  holeDiameterUnit?: LengthUnit;
  sonotubeDiameterUnit?: LengthUnit;
  wasteFactor?: number;
}): DeckFootingResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const postSpacing = toFeet(opts.postSpacing, opts.postSpacingUnit ?? 'ft');
  const beamSpacing = toFeet(opts.beamSpacing, opts.beamSpacingUnit ?? 'ft');
  const frostDepth = toFeet(opts.frostDepth, opts.frostDepthUnit ?? 'ft');
  const holeDiameterFt = toFeet(opts.holeDiameter, opts.holeDiameterUnit ?? 'in');
  const layout = opts.layout ?? 'freestanding';
  const waste = opts.wasteFactor ?? 0.05;

  if (L <= 0 || W <= 0) throw new Error('Deck dimensions must be positive');
  if (frostDepth <= 0) throw new Error('Frost depth must be positive');
  if (holeDiameterFt <= 0) throw new Error('Hole diameter must be positive');

  const postsAlong = postsOnLine(L, postSpacing);
  const beamRows = beamRowCount(W, beamSpacing, layout);
  const footingCount = postsAlong * beamRows;

  let sonotubeDiameterIn: number | null = null;
  let formDiameterFt = holeDiameterFt;
  if (opts.sonotubeDiameter != null && opts.sonotubeDiameter > 0) {
    formDiameterFt = toFeet(opts.sonotubeDiameter, opts.sonotubeDiameterUnit ?? 'in');
    if (formDiameterFt <= 0) throw new Error('Sonotube diameter must be positive');
    sonotubeDiameterIn = round(formDiameterFt * 12, 2);
  }

  const r = formDiameterFt / 2;
  const perHoleRaw = Math.PI * r * r * frostDepth;
  const perHole = cylinderFromCuFt(perHoleRaw, 0);
  const total = cylinderFromCuFt(perHoleRaw * footingCount, waste);

  return {
    deckAreaSqFt: round(L * W, 2),
    postsAlong,
    beamRows,
    footingCount,
    holeDiameterIn: round(holeDiameterFt * 12, 2),
    holeDepthFt: round(frostDepth, 3),
    formDiameterIn: round(formDiameterFt * 12, 2),
    sonotubeDiameterIn,
    volumePerHoleCuFt: perHole.volumeCuFt,
    volumePerHoleCuYd: perHole.volumeCuYd,
    totalVolumeCuFt: total.volumeCuFt,
    totalVolumeCuYd: total.volumeCuYd,
    totalVolumeCuM: total.volumeCuM,
    bags40: total.bags40,
    bags60: total.bags60,
    bags80: total.bags80,
  };
}
