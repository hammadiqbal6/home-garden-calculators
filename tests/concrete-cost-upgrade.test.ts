import { describe, expect, it } from 'vitest';
import { concreteCostCompare, roundUpToQuarterYard, slabVolume } from '../src/lib/calculators';

describe('concrete cost upgrade', () => {
  it('rounds up to quarter yard', () => {
    expect(roundUpToQuarterYard(0)).toBe(0);
    expect(roundUpToQuarterYard(1.23)).toBe(1.25);
    expect(roundUpToQuarterYard(1.25)).toBe(1.25);
  });

  it('compares bag vs ready-mix with delivery', () => {
    const vol = slabVolume({ length: 10, width: 10, thickness: 4, wasteFactor: 0.1 });
    const c = concreteCostCompare({
      volumeCuYd: vol.volumeCuYd,
      bags40: vol.bags40,
      bags60: vol.bags60,
      bags80: vol.bags80,
      pricePerBag80: 6,
      pricePerCuYd: 150,
      deliveryFee: 50,
    });
    expect(c.orderCuYdQuarter).toBe(1.5); // ~1.358 → 1.5
    expect(c.bagCost80).toBe(vol.bags80 * 6);
    expect(c.readyMixCost).toBe(1.5 * 150 + 50);
    expect(c.readyMixCheaperThanBags).toBe(true);
  });
});
