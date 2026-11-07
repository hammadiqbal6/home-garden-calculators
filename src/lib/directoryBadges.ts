/**
 * Build-time directory listing badges for the site footer.
 *
 * Prefer `PUBLIC_DIRECTORY_BADGES` (JSON array). When unset, fall back to the
 * Fazier badge gated by `PUBLIC_FAZIER_BADGE_ENABLED` (default on).
 */

export type DirectoryBadge = {
  href: string;
  img: string;
  alt: string;
  width: number;
  height: number;
  /** Set only when provided; omit for a normal followable link. */
  rel?: string;
  /** Optional dark-theme image (used by the built-in Fazier fallback). */
  imgDark?: string;
};

export const DEFAULT_BADGE_WIDTH = 182;
export const DEFAULT_BADGE_HEIGHT = 43;

/**
 * Built-in Fazier “Featured” badge (official embed path keeps the double slash).
 * Used when `PUBLIC_DIRECTORY_BADGES` is unset.
 */
export const FAZIER_BADGE: DirectoryBadge = {
  href: 'https://fazier.com',
  img: 'https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light',
  imgDark:
    'https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=dark',
  alt: 'Fazier badge',
  width: DEFAULT_BADGE_WIDTH,
  height: DEFAULT_BADGE_HEIGHT,
};

/**
 * JSON value equivalent to the current Fazier fallback (light theme only —
 * dark `picture` source is fallback-only). Paste into Cloudflare as
 * `PUBLIC_DIRECTORY_BADGES` when migrating off the hardcoded badge.
 */
export const FAZIER_DIRECTORY_BADGES_JSON =
  '[{"href":"https://fazier.com","img":"https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light","alt":"Fazier badge","width":182,"height":43}]';

type WarnFn = (message: string) => void;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function parsePositiveInt(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.round(value);
  }
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  return fallback;
}

/**
 * Normalize one JSON object into a badge, or `null` when required fields are missing.
 */
export function normalizeDirectoryBadge(raw: unknown, warn: WarnFn = console.warn): DirectoryBadge | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    warn('[directoryBadges] Skipping invalid badge entry (expected object).');
    return null;
  }

  const record = raw as Record<string, unknown>;
  if (!isNonEmptyString(record.href) || !isNonEmptyString(record.img) || !isNonEmptyString(record.alt)) {
    warn(
      '[directoryBadges] Skipping badge missing required string fields href, img, and alt.',
    );
    return null;
  }

  const badge: DirectoryBadge = {
    href: record.href.trim(),
    img: record.img.trim(),
    alt: record.alt.trim(),
    width: parsePositiveInt(record.width, DEFAULT_BADGE_WIDTH),
    height: parsePositiveInt(record.height, DEFAULT_BADGE_HEIGHT),
  };

  if (isNonEmptyString(record.rel)) {
    badge.rel = record.rel.trim();
  }
  if (isNonEmptyString(record.imgDark)) {
    badge.imgDark = record.imgDark.trim();
  }

  return badge;
}

/**
 * Parse `PUBLIC_DIRECTORY_BADGES` JSON.
 * - Invalid JSON / non-array → warn and return `[]` (do not break the build).
 * - Valid array → normalize entries (skip bad ones with a warning).
 */
export function parseDirectoryBadgesJson(
  raw: string,
  warn: WarnFn = console.warn,
): DirectoryBadge[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    warn(
      '[directoryBadges] PUBLIC_DIRECTORY_BADGES is invalid JSON; rendering no directory badges.',
    );
    return [];
  }

  if (!Array.isArray(parsed)) {
    warn(
      '[directoryBadges] PUBLIC_DIRECTORY_BADGES must be a JSON array; rendering no directory badges.',
    );
    return [];
  }

  return parsed
    .map((entry) => normalizeDirectoryBadge(entry, warn))
    .filter((badge): badge is DirectoryBadge => badge !== null);
}

export type ResolveDirectoryBadgesOptions = {
  /** Raw `PUBLIC_DIRECTORY_BADGES` value (may be empty). */
  jsonEnv: string;
  /** `PUBLIC_FAZIER_BADGE_ENABLED` resolved (default true). Only used when jsonEnv is unset. */
  fazierEnabled: boolean;
  warn?: WarnFn;
};

/**
 * Resolve footer badges from env.
 * Unset/empty `PUBLIC_DIRECTORY_BADGES` → Fazier fallback (if enabled).
 * Any set value → parse JSON (invalid → none); Fazier toggle is ignored.
 */
export function resolveDirectoryBadges(
  options: ResolveDirectoryBadgesOptions,
): DirectoryBadge[] {
  const warn = options.warn ?? console.warn;
  const json = options.jsonEnv.trim();

  if (!json) {
    return options.fazierEnabled ? [FAZIER_BADGE] : [];
  }

  return parseDirectoryBadgesJson(json, warn);
}
