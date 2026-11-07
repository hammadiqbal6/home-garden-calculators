import { describe, expect, it } from 'vitest';
import {
  isRealAdsenseSlotId,
  normalizeAdsenseSlotId,
  resolveAdsenseSlotId,
} from '../src/lib/adsenseSlots';

describe('normalizeAdsenseSlotId / isRealAdsenseSlotId', () => {
  it('accepts numeric ad unit ids', () => {
    expect(isRealAdsenseSlotId('1234567890')).toBe(true);
    expect(normalizeAdsenseSlotId(' 9876543210 ')).toBe('9876543210');
  });

  it('rejects empty, auto, and non-numeric placeholders', () => {
    for (const bad of ['', 'auto', 'AUTO', 'ca-pub-1', 'slot-1', '12345', '12ab34']) {
      expect(isRealAdsenseSlotId(bad)).toBe(false);
      expect(normalizeAdsenseSlotId(bad)).toBe('');
    }
  });
});

describe('resolveAdsenseSlotId', () => {
  it('uses DISPLAY when position-specific ids are unset', () => {
    expect(
      resolveAdsenseSlotId('mid', { display: '1111111111' }),
    ).toBe('1111111111');
    expect(
      resolveAdsenseSlotId('top', { display: '1111111111' }),
    ).toBe('1111111111');
  });

  it('prefers position-specific overrides over DISPLAY', () => {
    expect(
      resolveAdsenseSlotId('mid', {
        display: '1111111111',
        mid: '2222222222',
      }),
    ).toBe('2222222222');
    expect(
      resolveAdsenseSlotId('bottom', {
        display: '1111111111',
        bottom: '3333333333',
      }),
    ).toBe('3333333333');
  });

  it('returns empty when no real numeric id is set', () => {
    expect(resolveAdsenseSlotId('mid', {})).toBe('');
    expect(resolveAdsenseSlotId('mid', { display: 'auto' })).toBe('');
    expect(resolveAdsenseSlotId('top', { display: '', top: 'auto' })).toBe('');
  });
});
