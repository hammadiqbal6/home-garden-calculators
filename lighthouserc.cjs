module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/',
        'http://localhost/hubs/concrete/',
        'http://localhost/calculators/concrete-calculator/',
        'http://localhost/calculators/mulch-calculator/',
        'http://localhost/calculators/roof-pitch-calculator/',
      ],
      numberOfRuns: 1,
      settings: {
        formFactor: 'mobile',
        throttlingMethod: 'simulate',
        screenEmulation: {
          mobile: true,
          width: 360,
          height: 640,
          deviceScaleFactor: 2,
          disabled: false,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['warn', { maxNumericValue: 150 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
