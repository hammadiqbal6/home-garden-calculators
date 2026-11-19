/**
 * Deck footing count + concrete volume estimator.
 *
 * Count model: rectangular post grid from deck length/width and beam/post
 * spacing — postsAlong = floor(span ÷ spacing) + 1 each way. This is a
 * shopping layout helper, not a span-table or code check.
 *
 * Pier volume: cylinder π r² h for tube/shaft diameter × frost depth.
 * Optional bell: frustum of a cone under the shaft
 *   V = (π h / 3) × (R² + R r + r²)
 * where R is bell radius, r is shaft radius, h is bell height, and shaft
 * height is depth − bell height.
 *
 * Bag yields follow QUIKRETE Concrete Mix (No. 1101) / Sakrete-style
 * planning coverage (~0.45 / 0.60 cu ft for 60 / 80 lb). Default waste 5%
 * (tube pours), matching the Sonotube tool.
 */
import { BAG_YIELD_CUFT } from './concrete';
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

export interface DeckFootingResult {
  postsAlongLength: number;
  postsAlongWidth: number;
  footingCount: number;
  /** Concrete per footing before waste (cu ft). */
  perFootingCuFt: number;
  perFootingCuYd: number;
  /** Total concrete with waste. */
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags60: number;
  bags80: number;
  bags40: number;
}

function postsAlong(spanFt: number, spacingFt: number): number {
  if (spacingFt <= 0) throw new Error('Post spacing must be positive');
  if (spanFt <= 0) throw new Error('Deck dimensions must be positive');
  return Math.floor(spanFt / spacingFt) + 1;
}

/** Cylinder volume in cu ft (diameter and height already in feet). */
function cylinderCuFt(diameterFt: number, heightFt: number): number {
  const r = diameterFt / 2;
  return Math.PI * r * r * heightFt;
}

/**
 * Frustum of a cone (bell) volume in cu ft.
 * Radii and height already in feet.
 */
function frustumCuFt(topDiameterFt: number, bottomDiameterFt: number, heightFt: number): number {
  const r = topDiameterFt / 2;
  const R = bottomDiameterFt / 2;
  return (Math.PI * heightFt) / 3 * (R * R + R * r + r * r);
}

export function deckFootings(opts: {
  deckLength: number;
  deckWidth: number;
  postSpacing: number;
  diameter: number;
  depth: number;
  /** When > diameter and height > 0, adds a frustum bell under the shaft. */
  bellDiameter?: number;
  bellHeight?: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  spacingUnit?: LengthUnit;
  diameterUnit?: LengthUnit;
  depthUnit?: LengthUnit;
  bellDiameterUnit?: LengthUnit;
  bellHeightUnit?: LengthUnit;
  wasteFactor?: number;
}): DeckFootingResult {
  const L = toFeet(opts.deckLength, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.deckWidth, opts.widthUnit ?? 'ft');
  const spacing = toFeet(opts.postSpacing, opts.spacingUnit ?? 'ft');
  const d = toFeet(opts.diameter, opts.diameterUnit ?? 'in');
  const depth = toFeet(opts.depth, opts.depthUnit ?? 'ft');
  const waste = opts.wasteFactor ?? 0.05;

  if (d <= 0 || depth <= 0) throw new Error('Footing diameter and depth must be positive');

  const alongL = postsAlong(L, spacing);
  const alongW = postsAlong(W, spacing);
  const count = alongL * alongW;

  const bellDRaw = opts.bellDiameter ?? 0;
  const bellHRaw = opts.bellHeight ?? 0;
  const bellD = bellDRaw > 0 ? toFeet(bellDRaw, opts.bellDiameterUnit ?? 'in') : 0;
  const bellH = bellHRaw > 0 ? toFeet(bellHRaw, opts.bellHeightUnit ?? 'in') : 0;

  let perCuFt: number;
  if (bellD > d && bellH > 0) {
    if (bellH >= depth) {
      throw new Error('Bell height must be less than footing depth');
    }
    const shaftH = depth - bellH;
    perCuFt = cylinderCuFt(d, shaftH) + frustumCuFt(d, bellD, bellH);
  } else if (bellD > 0 || bellH > 0) {
    // Partial bell inputs: treat as straight shaft so the UI can leave
    // unused fields at 0 when "No bell" is selected.
    perCuFt = cylinderCuFt(d, depth);
  } else {
    perCuFt = cylinderCuFt(d, depth);
  }

  const totalBeforeWaste = perCuFt * count;
  const withWaste = totalBeforeWaste * (1 + waste);

  return {
    postsAlongLength: alongL,
    postsAlongWidth: alongW,
    footingCount: count,
    perFootingCuFt: round(perCuFt, 3),
    perFootingCuYd: round(cuFtToCuYd(perCuFt), 3),
    volumeCuFt: round(withWaste, 3),
    volumeCuYd: round(cuFtToCuYd(withWaste), 3),
    volumeCuM: round(cuFtToCuM(withWaste), 3),
    bags40: ceilBags(withWaste, BAG_YIELD_CUFT[40]),
    bags60: ceilBags(withWaste, BAG_YIELD_CUFT[60]),
    bags80: ceilBags(withWaste, BAG_YIELD_CUFT[80]),
  };
}
