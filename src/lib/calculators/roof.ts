import { round, sqFtToSqM, toFeet, type LengthUnit } from '../units';

export interface RoofPitchResult {
  /** Rise:run expressed as inches of rise per 12" run */
  pitchOver12: number;
  angleDegrees: number;
  slopePercent: number;
  /** Multiplier to convert plan area to roof surface area */
  areaFactor: number;
}

/**
 * Roof pitch from rise and run.
 * Standard US expression: X-in-12 (rise inches per 12" horizontal run).
 */
export function roofPitch(opts: {
  rise: number;
  run: number;
  riseUnit?: LengthUnit;
  runUnit?: LengthUnit;
}): RoofPitchResult {
  const riseFt = toFeet(opts.rise, opts.riseUnit ?? 'in');
  const runFt = toFeet(opts.run, opts.runUnit ?? 'in');
  if (riseFt < 0 || runFt <= 0) throw new Error('Run must be positive; rise must be non-negative');
  const ratio = riseFt / runFt;
  const pitchOver12 = ratio * 12;
  const angleDegrees = (Math.atan(ratio) * 180) / Math.PI;
  const slopePercent = ratio * 100;
  const areaFactor = Math.sqrt(1 + ratio * ratio);
  return {
    pitchOver12: round(pitchOver12, 2),
    angleDegrees: round(angleDegrees, 2),
    slopePercent: round(slopePercent, 2),
    areaFactor: round(areaFactor, 4),
  };
}

export interface RoofingResult {
  planAreaSqFt: number;
  roofAreaSqFt: number;
  roofAreaSqM: number;
  squares: number;
  squaresWithWaste: number;
  bundles3PerSquare: number;
}

/**
 * Asphalt shingle takeoff.
 * 1 roofing square = 100 sq ft. Most 3-tab/laminate bundles cover ~33.3 sq ft (3 per square).
 * Pitch factor converts horizontal footprint to slope area.
 */
export function roofingSquares(opts: {
  planLength: number;
  planWidth: number;
  pitchOver12: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  wastePercent?: number;
  /** Number of bundles that make one square (default 3). */
  bundlesPerSquare?: number;
}): RoofingResult {
  const L = toFeet(opts.planLength, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.planWidth, opts.widthUnit ?? 'ft');
  if (L <= 0 || W <= 0) throw new Error('Plan dimensions must be positive');
  if (opts.pitchOver12 < 0) throw new Error('Pitch must be non-negative');
  const factor = Math.sqrt(1 + Math.pow(opts.pitchOver12 / 12, 2));
  const planArea = L * W;
  const roofArea = planArea * factor;
  const squares = roofArea / 100;
  const waste = (opts.wastePercent ?? 10) / 100;
  const withWaste = squares * (1 + waste);
  const bps = opts.bundlesPerSquare ?? 3;
  return {
    planAreaSqFt: round(planArea, 2),
    roofAreaSqFt: round(roofArea, 2),
    roofAreaSqM: round(sqFtToSqM(roofArea), 2),
    squares: round(squares, 2),
    squaresWithWaste: round(withWaste, 2),
    bundles3PerSquare: Math.ceil(withWaste * bps),
  };
}
