import { describe, expect, it } from 'vitest';
import {
  bulkCostCompare,
  GRAVEL_DENSITY_LB_PER_CUYD,
  gravelVolume,
  tonsToYards,
  yardsToTons,
} from '../src/lib/calculators';

describe('bulk cost upgrade', () => {
  it('converts tons ↔ yards both ways', () => {
    const tons = yardsToTons(2, GRAVEL_DENSITY_LB_PER_CUYD);
    expect(tons).toBeCloseTo(2.7, 2);
    expect(tonsToYards(tons, GRAVEL_DENSITY_LB_PER_CUYD)).toBeCloseTo(2, 2);
  });

  it('compares bag vs yard cost when prices set', () => {
    const r = gravelVolume({ length: 20, width: 10, depthInches: 4, wasteFactor: 0 });
    const c = bulkCostCompare({
      volumeCuYd: r.volumeCuYd,
      tons: r.tons,
      bagCount: r.bags05CuFt,
      pricePerYard: 45,
      pricePerBag: 5,
      densityLbPerCuYd: GRAVEL_DENSITY_LB_PER_CUYD,
      convertTons: r.tons,
    });
    expect(c.costByYard).toBeGreaterThan(0);
    expect(c.cheapestLabel).toBe('yard');
    expect(c.yardsFromTons).toBeCloseTo(r.volumeCuYd!, 2);
  });
});
