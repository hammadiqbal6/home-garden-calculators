/**
 * French drain takeoff: trench gravel (minus perforated pipe volume),
 * geotextile / landscape-fabric area for a wrap, and pipe length.
 *
 * Planning defaults echo common residential guidance ranges
 * (e.g. LSU AgCenter: ~12–18 in wide × 18–24 in deep trench, ~4 in pipe).
 * Confirm local code, discharge rules, and utility locates before digging.
 */
import { GRAVEL_DENSITY_LB_PER_CUYD } from './volumeMaterials';
import { cuFtToCuM, cuFtToCuYd, round, sqFtToSqM, toFeet, type LengthUnit } from '../units';

export { GRAVEL_DENSITY_LB_PER_CUYD as FRENCH_DRAIN_DEFAULT_DENSITY_LB_PER_CUYD };

export interface FrenchDrainResult {
  trenchLengthFt: number;
  trenchVolumeCuFt: number;
  pipeVolumeCuFt: number;
  gravelCuFt: number;
  gravelCuYd: number;
  gravelCuM: number;
  tons: number;
  densityLbPerCuYd: number;
  fabricWidthFt: number;
  fabricAreaSqFt: number;
  fabricAreaSqM: number;
  pipeLengthFt: number;
}

export function frenchDrainMaterials(opts: {
  /** Trench run length */
  length: number;
  lengthUnit?: LengthUnit;
  /** Trench width (clear excavation) */
  width: number;
  widthUnit?: LengthUnit;
  /** Trench depth */
  depth: number;
  depthUnit?: LengthUnit;
  /** Outside diameter of perforated drain pipe */
  pipeDiameter: number;
  pipeDiameterUnit?: LengthUnit;
  /** Extra fabric width beyond bottom + both walls (fold-over / overlap). */
  fabricOverlap?: number;
  fabricOverlapUnit?: LengthUnit;
  /** Compaction / irregular-edge waste as a decimal (default 0.1). */
  wasteFactor?: number;
  /** Dry bulk density lb/cu yd for ton estimates (default crushed-stone mid). */
  densityLbPerCuYd?: number;
}): FrenchDrainResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'in');
  const D = toFeet(opts.depth, opts.depthUnit ?? 'in');
  const pipeDiaFt = toFeet(opts.pipeDiameter, opts.pipeDiameterUnit ?? 'in');
  const overlapFt = toFeet(opts.fabricOverlap ?? 12, opts.fabricOverlapUnit ?? 'in');
  const waste = opts.wasteFactor ?? 0.1;
  const density = opts.densityLbPerCuYd ?? GRAVEL_DENSITY_LB_PER_CUYD;

  if (L <= 0 || W <= 0 || D <= 0) throw new Error('Trench dimensions must be positive');
  if (pipeDiaFt <= 0) throw new Error('Pipe diameter must be positive');
  if (pipeDiaFt >= W) throw new Error('Pipe diameter must be smaller than trench width');
  if (pipeDiaFt >= D) throw new Error('Pipe diameter must be smaller than trench depth');
  if (overlapFt < 0) throw new Error('Fabric overlap cannot be negative');
  if (waste < 0) throw new Error('Waste factor cannot be negative');
  if (density <= 0) throw new Error('Density must be positive');

  const trenchVolumeCuFt = L * W * D;
  const pipeRadiusFt = pipeDiaFt / 2;
  const pipeVolumeCuFt = Math.PI * pipeRadiusFt * pipeRadiusFt * L;
  const netGravelCuFt = Math.max(0, trenchVolumeCuFt - pipeVolumeCuFt);
  const gravelCuFt = netGravelCuFt * (1 + waste);
  const gravelCuYd = cuFtToCuYd(gravelCuFt);
  const fabricWidthFt = W + 2 * D + overlapFt;
  const fabricAreaSqFt = L * fabricWidthFt;

  return {
    trenchLengthFt: round(L, 2),
    trenchVolumeCuFt: round(trenchVolumeCuFt, 3),
    pipeVolumeCuFt: round(pipeVolumeCuFt, 3),
    gravelCuFt: round(gravelCuFt, 3),
    gravelCuYd: round(gravelCuYd, 3),
    gravelCuM: round(cuFtToCuM(gravelCuFt), 3),
    tons: round((gravelCuYd * density) / 2000, 2),
    densityLbPerCuYd: density,
    fabricWidthFt: round(fabricWidthFt, 2),
    fabricAreaSqFt: round(fabricAreaSqFt, 2),
    fabricAreaSqM: round(sqFtToSqM(fabricAreaSqFt), 3),
    pipeLengthFt: round(L, 2),
  };
}
