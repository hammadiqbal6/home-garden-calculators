/**
 * Sister-site origins for cross-site links (About + sparing topical tool links).
 * Read from PUBLIC_SITE_URL_* env vars so custom domains can replace workers.dev
 * without code changes. Same variable names across all five tool repos.
 */

import {
  DEFAULT_SISTER_NAME_BUSINESS_DOCS,
  DEFAULT_SISTER_NAME_FIBER_ARTS,
  DEFAULT_SISTER_NAME_PAYMENT_FEES,
  DEFAULT_SISTER_NAME_PET,
  DEFAULT_SISTER_URL_BUSINESS_DOCS,
  DEFAULT_SISTER_URL_FIBER_ARTS,
  DEFAULT_SISTER_URL_HOME_GARDEN,
  DEFAULT_SISTER_URL_PAYMENT_FEES,
  DEFAULT_SISTER_URL_PET,
} from './siteDefaults.mjs';

const DEFAULTS = {
  paymentFees: DEFAULT_SISTER_URL_PAYMENT_FEES,
  businessDocs: DEFAULT_SISTER_URL_BUSINESS_DOCS,
  /** Same fallback as PUBLIC_SITE_URL — do not paste the hostname again. */
  homeGarden: DEFAULT_SISTER_URL_HOME_GARDEN,
  fiberArts: DEFAULT_SISTER_URL_FIBER_ARTS,
  pet: DEFAULT_SISTER_URL_PET,
} as const;

type SisterKey = keyof typeof DEFAULTS;

const ENV_KEYS: Record<SisterKey, `PUBLIC_SITE_URL_${string}`> = {
  paymentFees: 'PUBLIC_SITE_URL_PAYMENT_FEES',
  businessDocs: 'PUBLIC_SITE_URL_BUSINESS_DOCS',
  homeGarden: 'PUBLIC_SITE_URL_HOME_GARDEN',
  fiberArts: 'PUBLIC_SITE_URL_FIBER_ARTS',
  pet: 'PUBLIC_SITE_URL_PET',
};

const NAME_ENV_KEYS = {
  paymentFees: 'PUBLIC_SISTER_NAME_PAYMENT_FEES',
  businessDocs: 'PUBLIC_SISTER_NAME_BUSINESS_DOCS',
  fiberArts: 'PUBLIC_SISTER_NAME_FIBER_ARTS',
  pet: 'PUBLIC_SISTER_NAME_PET',
} as const;

function readPublicEnv(key: `PUBLIC_${string}`): string {
  let fromMeta = '';
  try {
    const env = (import.meta as ImportMeta & { env?: Record<string, unknown> }).env;
    const v = env?.[key];
    if (typeof v === 'string') fromMeta = v;
  } catch {
    /* plain Node import may lack import.meta.env */
  }
  const fromProcess =
    typeof process !== 'undefined' && process.env ? String(process.env[key] ?? '') : '';
  return (fromMeta || fromProcess).trim();
}

function normalizeOrigin(raw: string, fallback: string): string {
  const trimmed = (raw || fallback).replace(/\/+$/, '');
  try {
    const u = new URL(trimmed);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return fallback;
    return `${u.protocol}//${u.host}`;
  } catch {
    return fallback;
  }
}

function originFor(key: SisterKey): string {
  return normalizeOrigin(readPublicEnv(ENV_KEYS[key]), DEFAULTS[key]);
}

/** Absolute origins (no trailing slash) for each sister site. */
export const sisterSiteOrigins = {
  paymentFees: originFor('paymentFees'),
  businessDocs: originFor('businessDocs'),
  homeGarden: originFor('homeGarden'),
  fiberArts: originFor('fiberArts'),
  pet: originFor('pet'),
} as const;

export type SisterSiteId = keyof typeof sisterSiteOrigins;

/** Join a sister origin with a path (path should start with `/`). */
export function sisterUrl(id: SisterSiteId, path = '/'): string {
  const base = sisterSiteOrigins[id];
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/') return `${base}/`;
  return `${base}${p.endsWith('/') ? p : `${p}/`}`;
}

/**
 * Other free tool sites by the same maintainer (About page only — not footers).
 * Exclude this site (homeGarden) from the list shown on YardTally.
 */
export const siblingSitesForAbout = [
  {
    id: 'paymentFees' as const,
    name: readPublicEnv(NAME_ENV_KEYS.paymentFees) || DEFAULT_SISTER_NAME_PAYMENT_FEES,
    niche: 'Payment fee calculators',
    get url() {
      return sisterUrl('paymentFees');
    },
  },
  {
    id: 'businessDocs' as const,
    name: readPublicEnv(NAME_ENV_KEYS.businessDocs) || DEFAULT_SISTER_NAME_BUSINESS_DOCS,
    niche: 'Business document generators',
    get url() {
      return sisterUrl('businessDocs');
    },
  },
  {
    id: 'fiberArts' as const,
    name: readPublicEnv(NAME_ENV_KEYS.fiberArts) || DEFAULT_SISTER_NAME_FIBER_ARTS,
    niche: 'Knitting & crochet calculators',
    get url() {
      return sisterUrl('fiberArts');
    },
  },
  {
    id: 'pet' as const,
    name: readPublicEnv(NAME_ENV_KEYS.pet) || DEFAULT_SISTER_NAME_PET,
    niche: 'Pet calculators',
    get url() {
      return sisterUrl('pet');
    },
  },
];
