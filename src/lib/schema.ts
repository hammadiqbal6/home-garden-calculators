import { siteConfig } from '../config/site';
import { absoluteUrl } from '../data/tools';
import type { FaqItem, ToolSource } from '../data/tools';

const orgId = () => `${siteConfig.siteUrl}/#organization`;
const websiteId = () => `${siteConfig.siteUrl}/#website`;

export function personRef(extra: Record<string, unknown> = {}) {
  return {
    '@type': 'Person',
    '@id': siteConfig.author.canonicalPersonId,
    name: siteConfig.author.name,
    url: absoluteUrl('/about/'),
    ...extra,
  };
}

export function organizationNode() {
  const node: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId(),
    name: siteConfig.name,
    url: `${siteConfig.siteUrl}/`,
    email: siteConfig.contactEmail,
    logo: {
      '@type': 'ImageObject',
      url: new URL(siteConfig.logoPath, `${siteConfig.siteUrl}/`).toString(),
      width: 512,
      height: 512,
    },
    founder: { '@id': siteConfig.author.canonicalPersonId },
    publishingPrinciples: absoluteUrl('/methodology/'),
  };
  if (siteConfig.sameAs.length) node.sameAs = siteConfig.sameAs;
  return node;
}

export function personNode() {
  const node: Record<string, unknown> = {
    '@type': 'Person',
    '@id': siteConfig.author.canonicalPersonId,
    name: siteConfig.author.name,
    url: absoluteUrl('/about/'),
    description: siteConfig.author.bio,
    knowsAbout: siteConfig.author.knowsAbout,
  };
  if (siteConfig.author.sameAs.length) node.sameAs = siteConfig.author.sameAs;
  return node;
}

/** Home page @graph: WebSite + Organization + Person */
export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId(),
        name: siteConfig.name,
        alternateName: [siteConfig.shortName],
        url: `${siteConfig.siteUrl}/`,
        inLanguage: 'en',
        description: siteConfig.tagline,
        publisher: { '@id': orgId() },
      },
      organizationNode(),
      personNode(),
    ],
  };
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: `${siteConfig.dateCreated}T00:00:00+05:00`,
    dateModified: `${siteConfig.contentUpdated}T00:00:00+05:00`,
    mainEntity: personNode(),
  };
}

export function toolPageGraph(opts: {
  name: string;
  description: string;
  path: string;
  title: string;
  applicationCategory: string;
  datePublished: string;
  dateModified: string;
  sources: ToolSource[];
  faq: FaqItem[];
  primaryImagePath?: string;
}) {
  const pageUrl = absoluteUrl(opts.path);
  const appId = `${pageUrl}#app`;
  const webpageId = `${pageUrl}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebApplication',
      '@id': appId,
      name: opts.name,
      description: opts.description,
      url: pageUrl,
      applicationCategory: opts.applicationCategory,
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: personRef(),
      publisher: { '@id': orgId() },
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: pageUrl,
      name: opts.title,
      isPartOf: { '@id': websiteId() },
      mainEntity: { '@id': appId },
      datePublished: `${opts.datePublished}T00:00:00+05:00`,
      dateModified: `${opts.dateModified}T00:00:00+05:00`,
      lastReviewed: opts.dateModified,
      author: { '@id': siteConfig.author.canonicalPersonId },
      citation: opts.sources.map((s) => s.href),
      ...(opts.primaryImagePath
        ? {
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: new URL(opts.primaryImagePath, `${siteConfig.siteUrl}/`).toString(),
              width: 960,
              height: 540,
            },
          }
        : {}),
    },
  ];

  if (opts.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: opts.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
