/**
 * Deck footing / pier layout + concrete volume.
 * Grid count: floor(span / spacing) + 1 along each axis.
 * Pier shaft: cylinder (Sonotube / cardboard tube) π r² h.
 * Optional base: circular pad (cylinder) or bell footing (conical frustum).
 * Bag yields: QUIKRETE Concrete Mix 1101 planning yields
 * (~0.30 / 0.45 / 0.60 cu ft for 40 / 60 / 80 lb). Default waste 5%.
 */
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';
import { BAG_YIELD_CUFT } from './concrete';

export type DeckFootingBaseStyle = 'none' | 'bell' | 'pad';

export interface FootingGridResult {
  alongLength: number;
  alongWidth: number;
  count: number;
  lengthFt: number;
  widthFt: number;
  spacingAlongLengthFt: number;
  spacingAlongWidthFt: number;
}

export interface DeckFootingResult {
  alongLength: number;
  alongWidth: number;
  footings: number;
  volumePerPierCuFt: number;
  shaftCuFt: number;
  baseCuFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags40: number;
  bags60: number;
  bags80: number;
  baseStyle: DeckFootingBaseStyle;
}

/** Posts/piers on a rectangular grid: floor(span/spacing)+1 each way. */
export function footingGridCount(opts: {
  length: number;
  width: number;
  spacingAlongLength: number;
  spacingAlongWidth: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  spacingAlongLengthUnit?: LengthUnit;
  spacingAlongWidthUnit?: LengthUnit;
}): FootingGridResult {
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const widthFt = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const spacingAlongLengthFt = toFeet(
    opts.spacingAlongLength,
    opts.spacingAlongLengthUnit ?? 'ft',
  );
  const spacingAlongWidthFt = toFeet(opts.spacingAlongWidth, opts.spacingAlongWidthUnit ?? 'ft');
  if (lengthFt <= 0 || widthFt <= 0) throw new Error('Deck dimensions must be positive');
  if (spacingAlongLengthFt <= 0 || spacingAlongWidthFt <= 0) {
    throw new Error('Footing spacing must be positive');
  }
  const alongLength = Math.floor(lengthFt / spacingAlongLengthFt) + 1;
  const alongWidth = Math.floor(widthFt / spacingAlongWidthFt) + 1;
  return {
    alongLength,
    alongWidth,
    count: alongLength * alongWidth,
    lengthFt: round(lengthFt, 3),
    widthFt: round(widthFt, 3),
    spacingAlongLengthFt: round(spacingAlongLengthFt, 3),
    spacingAlongWidthFt: round(spacingAlongWidthFt, 3),
  };
}

/** Cylinder volume in cu ft (diameter × height). */
function cylinderCuFt(diameterFt: number, heightFt: number): number {
  const r = diameterFt / 2;
  return Math.PI * r * r * heightFt;
}

/**
 * Conical frustum (bell footing): top diameter = tube, bottom = bell base.
 * V = (π h / 3) (R² + R r + r²).
 */
function bellFrustumCuFt(topDiameterFt: number, baseDiameterFt: number, heightFt: number): number {
  const r = topDiameterFt / 2;
  const R = baseDiameterFt / 2;
  return (Math.PI * heightFt * (R * R + R * r + r * r)) / 3;
}

export function deckFootingConcrete(opts: {
  length: number;
  width: number;
  spacingAlongLength: number;
  spacingAlongWidth: number;
  tubeDiameter: number;
  tubeHeight: number;
  baseStyle?: DeckFootingBaseStyle;
  /** Bell base (bottom) diameter — required when baseStyle is 'bell'. */
  bellBaseDiameter?: number;
  /** Bell / frustum height — required when baseStyle is 'bell'. */
  bellHeight?: number;
  /** Circular pad diameter — required when baseStyle is 'pad'. */
  padDiameter?: number;
  /** Circular pad thickness — required when baseStyle is 'pad'. */
  padThickness?: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  spacingAlongLengthUnit?: LengthUnit;
  spacingAlongWidthUnit?: LengthUnit;
  tubeDiameterUnit?: LengthUnit;
  tubeHeightUnit?: LengthUnit;
  bellBaseDiameterUnit?: LengthUnit;
  bellHeightUnit?: LengthUnit;
  padDiameterUnit?: LengthUnit;
  padThicknessUnit?: LengthUnit;
  wasteFactor?: number;
}): DeckFootingResult {
  const grid = footingGridCount({
    length: opts.length,
    width: opts.width,
    spacingAlongLength: opts.spacingAlongLength,
    spacingAlongWidth: opts.spacingAlongWidth,
    lengthUnit: opts.lengthUnit,
    widthUnit: opts.widthUnit,
    spacingAlongLengthUnit: opts.spacingAlongLengthUnit,
    spacingAlongWidthUnit: opts.spacingAlongWidthUnit,
  });

  const tubeD = toFeet(opts.tubeDiameter, opts.tubeDiameterUnit ?? 'in');
  const tubeH = toFeet(opts.tubeHeight, opts.tubeHeightUnit ?? 'ft');
  if (tubeD <= 0 || tubeH <= 0) throw new Error('Tube dimensions must be positive');

  const baseStyle: DeckFootingBaseStyle = opts.baseStyle ?? 'none';
  const shaftCuFt = cylinderCuFt(tubeD, tubeH);
  let baseCuFt = 0;

  if (baseStyle === 'bell') {
    const bellD = opts.bellBaseDiameter;
    const bellH = opts.bellHeight;
    if (bellD == null || bellH == null) {
      throw new Error('Bell base diameter and height are required for a bell footing');
    }
    const baseD = toFeet(bellD, opts.bellBaseDiameterUnit ?? 'in');
    const baseH = toFeet(bellH, opts.bellHeightUnit ?? 'in');
    if (baseD <= 0 || baseH <= 0) throw new Error('Bell dimensions must be positive');
    if (baseD < tubeD) {
      throw new Error('Bell base diameter must be at least the tube diameter');
    }
    baseCuFt = bellFrustumCuFt(tubeD, baseD, baseH);
  } else if (baseStyle === 'pad') {
    const padD = opts.padDiameter;
    const padT = opts.padThickness;
    if (padD == null || padT == null) {
      throw new Error('Pad diameter and thickness are required for a circular pad');
    }
    const d = toFeet(padD, opts.padDiameterUnit ?? 'in');
    const t = toFeet(padT, opts.padThicknessUnit ?? 'in');
    if (d <= 0 || t <= 0) throw new Error('Pad dimensions must be positive');
    if (d < tubeD) {
      throw new Error('Pad diameter must be at least the tube diameter');
    }
    baseCuFt = cylinderCuFt(d, t);
  }

  const perPier = shaftCuFt + baseCuFt;
  const waste = opts.wasteFactor ?? 0.05;
  const withWaste = perPier * grid.count * (1 + waste);

  return {
    alongLength: grid.alongLength,
    alongWidth: grid.alongWidth,
    footings: grid.count,
    volumePerPierCuFt: round(perPier, 3),
    shaftCuFt: round(shaftCuFt, 3),
    baseCuFt: round(baseCuFt, 3),
    volumeCuFt: round(withWaste, 3),
    volumeCuYd: round(cuFtToCuYd(withWaste), 3),
    volumeCuM: round(cuFtToCuM(withWaste), 3),
    bags40: ceilBags(withWaste, BAG_YIELD_CUFT[40]),
    bags60: ceilBags(withWaste, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(withWaste, BAG_YIELD_CUFT[80]),
    baseStyle,
  };
}
