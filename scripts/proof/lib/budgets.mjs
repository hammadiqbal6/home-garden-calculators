/** Lighthouse category and metric budgets (aligned with lighthouserc.cjs). */
export const CATEGORY_MIN = 0.95;
export const LCP_MAX_MS = 2500;
export const CLS_MAX = 0.05;
export const TBT_WARN_MS = 150;
export const JS_GZ_MAX_BYTES = 50 * 1024;

export function scoreCategory(lhr, id) {
  return lhr.categories?.[id]?.score ?? null;
}

export function metric(lhr, id) {
  return lhr.audits?.[id]?.numericValue ?? null;
}

export function evaluateLhr(lhr, { desktop = false } = {}) {
  const issues = [];
  const cats = ['performance', 'accessibility', 'best-practices', 'seo'];
  for (const c of cats) {
    const s = scoreCategory(lhr, c);
    if (s == null) issues.push(`missing category ${c}`);
    else if (s < CATEGORY_MIN) issues.push(`${c} ${Math.round(s * 100)} < ${CATEGORY_MIN * 100}`);
  }
  const lcp = metric(lhr, 'largest-contentful-paint');
  if (lcp != null && lcp > LCP_MAX_MS) issues.push(`LCP ${Math.round(lcp)}ms > ${LCP_MAX_MS}ms`);
  const cls = metric(lhr, 'cumulative-layout-shift');
  if (cls != null && cls > CLS_MAX) issues.push(`CLS ${cls} > ${CLS_MAX}`);
  return { pass: issues.length === 0, issues, lcp, cls, tbt: metric(lhr, 'total-blocking-time') };
}
