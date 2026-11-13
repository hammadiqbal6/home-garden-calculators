import { siteConfig } from '../config/site';

/** Ensure a document title ends with `| {site name}` exactly once. */
export function formatPageTitle(pageTitle: string, brand = siteConfig.name): string {
  const suffix = `| ${brand}`;
  const trimmed = pageTitle.trim();
  if (!trimmed) return brand;
  const withoutBrand = trimmed
    .replace(new RegExp(`\\s*\\|\\s*${escapeRegExp(brand)}\\s*$`, 'i'), '')
    .trim();
  return `${withoutBrand} ${suffix}`;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
