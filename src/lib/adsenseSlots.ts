/**
 * AdSense fixed ad-unit (slot) IDs are numeric strings from the AdSense UI.
 * "auto" is not a valid data-ad-slot value for manual units.
 */

export type AdSlotPosition = 'top' | 'mid' | 'bottom';

/** True when `raw` is a real numeric AdSense ad unit id (at least 6 digits). */
export function isRealAdsenseSlotId(raw: string | undefined | null): boolean {
  return /^\d{6,}$/.test((raw ?? '').trim());
}

/** Return a trimmed numeric slot id, or '' when missing/invalid. */
export function normalizeAdsenseSlotId(raw: string | undefined | null): string {
  const id = (raw ?? '').trim();
  return isRealAdsenseSlotId(id) ? id : '';
}

export type AdsenseSlotEnv = {
  /** Primary in-page display unit (`PUBLIC_ADSENSE_SLOT_DISPLAY`). */
  display?: string;
  /** Optional per-placement overrides. */
  top?: string;
  mid?: string;
  bottom?: string;
};

/**
 * Resolve the fixed slot id for a placement.
 * Prefer a position-specific id when set; otherwise fall back to DISPLAY.
 * Returns '' when no real numeric id is configured (caller should omit the unit).
 */
export function resolveAdsenseSlotId(
  position: AdSlotPosition,
  env: AdsenseSlotEnv,
): string {
  const byPosition = normalizeAdsenseSlotId(env[position]);
  if (byPosition) return byPosition;
  return normalizeAdsenseSlotId(env.display);
}
