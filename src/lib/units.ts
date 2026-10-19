/** Unit conversion helpers used across calculators (US imperial + metric). */

export type LengthUnit = 'ft' | 'in' | 'm' | 'cm';
export type AreaUnit = 'sqft' | 'sqm';
export type VolumeUnit = 'cuft' | 'cuyd' | 'cum' | 'L';

export const IN_PER_FT = 12;
export const CM_PER_M = 100;
export const FT_PER_M = 3.280839895;
export const CUFT_PER_CUYD = 27;
export const L_PER_CUM = 1000;
export const SQFT_PER_SQM = 10.7639104167;

export function toFeet(value: number, unit: LengthUnit): number {
  switch (unit) {
    case 'ft':
      return value;
    case 'in':
      return value / IN_PER_FT;
    case 'm':
      return value * FT_PER_M;
    case 'cm':
      return (value / CM_PER_M) * FT_PER_M;
  }
}

export function toMeters(value: number, unit: LengthUnit): number {
  switch (unit) {
    case 'm':
      return value;
    case 'cm':
      return value / CM_PER_M;
    case 'ft':
      return value / FT_PER_M;
    case 'in':
      return value / IN_PER_FT / FT_PER_M;
  }
}

export function cuFtToCuYd(cuFt: number): number {
  return cuFt / CUFT_PER_CUYD;
}

export function cuFtToCuM(cuFt: number): number {
  return cuFt / Math.pow(FT_PER_M, 3);
}

export function sqFtToSqM(sqFt: number): number {
  return sqFt / SQFT_PER_SQM;
}

export function round(value: number, digits = 2): number {
  const f = 10 ** digits;
  return Math.round((value + Number.EPSILON) * f) / f;
}

export function ceilBags(volumeCuFt: number, bagYieldCuFt: number): number {
  if (bagYieldCuFt <= 0) throw new Error('Bag yield must be positive');
  return Math.ceil(volumeCuFt / bagYieldCuFt);
}
