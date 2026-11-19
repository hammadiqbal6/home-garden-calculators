/**
 * French drain gravel: trench L×W×D minus cylindrical pipe displacement (πr²L).
 * Ton estimate uses the shared mid crushed-stone density (~2,700 lb/cu yd).
 */
import {
  GRAVEL_DENSITY_LB_PER_CUYD,
} from './volumeMaterials';
import { ceilBags, cuFtToCuM, cuFtToCuYd, round, toFeet, type LengthUnit } from '../units';

export interface FrenchDrainGravelResult {
  trenchVolumeCuFt: number;
  pipeVolumeCuFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  tons: number;
  bags05CuFt: number;
}

export function frenchDrainGravel(opts: {
  length: number;
  /** Trench width (usually inches in UI). */
  trenchWidth: number;
  /** Trench depth (usually inches in UI). */
  trenchDepth: number;
  /** Perforated drain-pipe outside diameter. */
  pipeDiameter: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  depthUnit?: LengthUnit;
  pipeUnit?: LengthUnit;
  wasteFactor?: number;
  densityLbPerCuYd?: number;
}): FrenchDrainGravelResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.trenchWidth, opts.widthUnit ?? 'in');
  const D = toFeet(opts.trenchDepth, opts.depthUnit ?? 'in');
  const pipeDia = toFeet(opts.pipeDiameter, opts.pipeUnit ?? 'in');
  if (L <= 0 || W <= 0 || D <= 0 || pipeDia <= 0) {
    throw new Error('Dimensions must be positive');
  }
  if (pipeDia >= W || pipeDia >= D) {
    throw new Error('Pipe diameter must fit inside the trench width and depth');
  }

  const trenchCuFt = L * W * D;
  const r = pipeDia / 2;
  const pipeCuFt = Math.PI * r * r * L;
  const gravelBeforeWaste = trenchCuFt - pipeCuFt;
  if (gravelBeforeWaste <= 0) {
    throw new Error('Pipe displacement exceeds trench volume');
  }

  const waste = opts.wasteFactor ?? 0.1;
  const volumeCuFt = gravelBeforeWaste * (1 + waste);
  const volumeCuYd = cuFtToCuYd(volumeCuFt);
  const density = opts.densityLbPerCuYd ?? GRAVEL_DENSITY_LB_PER_CUYD;

  return {
    trenchVolumeCuFt: round(trenchCuFt, 3),
    pipeVolumeCuFt: round(pipeCuFt, 3),
    volumeCuFt: round(volumeCuFt, 3),
    volumeCuYd: round(volumeCuYd, 3),
    volumeCuM: round(cuFtToCuM(volumeCuFt), 3),
    tons: round((volumeCuYd * density) / 2000, 2),
    bags05CuFt: ceilBags(volumeCuFt, 0.5),
  };
}
