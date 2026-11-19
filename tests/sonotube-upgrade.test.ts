import { describe, expect, it } from 'vitest';
import {
  BAG_YIELD_50_LB,
  bagsPerFootOfTube,
  mixedSonotubeVolume,
  sonotubeWithFootingVolume,
} from '../src/lib/calculators';

describe('sonotube upgrade', () => {
  it('adds bell frustum under the tube', () => {
    const tube = sonotubeWithFootingVolume({
      diameter: 12,
      height: 4,
      baseType: 'none',
      wasteFactor: 0,
    });
    const bell = sonotubeWithFootingVolume({
      diameter: 12,
      height: 4,
      baseType: 'bell',
      bellDiameter: 24,
      bellHeight: 1,
      wasteFactor: 0,
    });
    expect(bell.volumeCuFt).toBeGreaterThan(tube.volumeCuFt);
    expect(BAG_YIELD_50_LB).toBe(0.375);
    expect(bell.bags50).toBeGreaterThan(0);
  });

  it('sums mixed tube sizes', () => {
    const r = mixedSonotubeVolume(
      [
        { diameter: 12, height: 4, count: 2 },
        { diameter: 10, height: 3, count: 2 },
      ],
      0,
    );
    const a = sonotubeWithFootingVolume({ diameter: 12, height: 4, count: 2, wasteFactor: 0 });
    const b = sonotubeWithFootingVolume({ diameter: 10, height: 3, count: 2, wasteFactor: 0 });
    expect(r.volumeCuFt).toBeCloseTo(a.volumeCuFt + b.volumeCuFt, 2);
  });

  it('bags per foot for 12 in', () => {
    const row = bagsPerFootOfTube(12);
    expect(row.cuFtPerFt).toBeCloseTo(Math.PI * 0.5 ** 2, 3);
    expect(row.bags80).toBe(2);
    expect(row.bags50).toBe(3);
  });

  it('pad cylinder adds volume under the tube', () => {
    const tube = sonotubeWithFootingVolume({
      diameter: 12,
      height: 4,
      baseType: 'none',
      wasteFactor: 0,
    });
    const pad = sonotubeWithFootingVolume({
      diameter: 12,
      height: 4,
      baseType: 'pad',
      padDiameter: 24,
      padThickness: 12,
      wasteFactor: 0,
    });
    // Pad: π × 1² × 1 = π cu ft
    expect(pad.volumeCuFt).toBeCloseTo(tube.volumeCuFt + Math.PI, 2);
  });
});
