/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hitmranchi.ac.in';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,

  exclude: [
    '/404',
    '/api/*',
    '/api-proxy/*',
    '/admin/*',
    '/admin-login/*',
    '/admin-dashboard/*',
    '/dashboard/*',
    '/_next/*',
    '/thank-you',
    '/blogs',
    '/payment/*',
    '/ccavenue-test/*',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: [
          '/404',
          '/thank-you',
          '/blogs',
          '/api/',
          '/api-proxy/',
          '/_next/',
          '/admin/',
          '/admin-login/',
          '/admin-dashboard/',
          '/dashboard/',
          '/payment/',
          '/ccavenue-test/',
        ],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/blogs-sitemap.xml`,
    ],
  },

  transform: async (config, path) => {
    // Skip excluded paths
    if (
      path === '/thank-you' ||
      path === '/admin' ||
      path === '/admin-login' ||
      path === '/admin-dashboard' ||
      path === '/dashboard' ||
      path === '/blogs' ||
      path.startsWith('/admin/') ||
      path.startsWith('/admin-login/') ||
      path.startsWith('/admin-dashboard/') ||
      path.startsWith('/dashboard/') ||
      path.startsWith('/payment/') ||
      path.startsWith('/ccavenue-test/')
    ) {
      return null;
    }

    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/programs') || path.startsWith('/admissions')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (
      path.startsWith('/about') ||
      path.startsWith('/placement')
    ) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (
      path.startsWith('/contact') ||
      path.startsWith('/campus') ||
      path.startsWith('/academics')
    ) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (
      path === '/privacy' ||
      path === '/terms' ||
      path === '/refund-policy'
    ) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async (config) => {
    const staticPages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/about', priority: 0.9, changefreq: 'monthly' },
      { path: '/about/overview', priority: 0.8, changefreq: 'monthly' },
      { path: '/about/director', priority: 0.8, changefreq: 'monthly' },
      { path: '/about/governing-body', priority: 0.7, changefreq: 'monthly' },
      { path: '/about/faculty', priority: 0.7, changefreq: 'monthly' },
      { path: '/about/vision', priority: 0.7, changefreq: 'monthly' },
      { path: '/about/awards', priority: 0.6, changefreq: 'monthly' },
      { path: '/about/naac', priority: 0.6, changefreq: 'monthly' },
      { path: '/about/nirf', priority: 0.6, changefreq: 'monthly' },
      { path: '/about/anti-ragging', priority: 0.5, changefreq: 'monthly' },
      { path: '/programs', priority: 0.9, changefreq: 'monthly' },
      { path: '/programs/engineering', priority: 0.8, changefreq: 'monthly' },
      { path: '/programs/mba', priority: 0.8, changefreq: 'monthly' },
      { path: '/programs/bba', priority: 0.8, changefreq: 'monthly' },
      { path: '/programs/bca', priority: 0.8, changefreq: 'monthly' },
      { path: '/programs/mca', priority: 0.8, changefreq: 'monthly' },
      { path: '/programs/diploma', priority: 0.8, changefreq: 'monthly' },
      { path: '/admissions/eligibility', priority: 0.8, changefreq: 'monthly' },
      { path: '/admissions/fee', priority: 0.8, changefreq: 'monthly' },
      { path: '/admissions/brochures', priority: 0.7, changefreq: 'monthly' },
      { path: '/admissions/scholarship-admission', priority: 0.7, changefreq: 'monthly' },
      { path: '/academics/calendar', priority: 0.7, changefreq: 'monthly' },
      { path: '/academics/syllabus', priority: 0.7, changefreq: 'monthly' },
      { path: '/academics/examination', priority: 0.6, changefreq: 'monthly' },
      { path: '/academics/library', priority: 0.6, changefreq: 'monthly' },
      { path: '/academics/e-learning', priority: 0.6, changefreq: 'monthly' },
      { path: '/academics/scholarships', priority: 0.6, changefreq: 'monthly' },
      { path: '/academics/scholarship-academic', priority: 0.6, changefreq: 'monthly' },
      { path: '/campus', priority: 0.7, changefreq: 'monthly' },
      { path: '/campus/gallery', priority: 0.6, changefreq: 'monthly' },
      { path: '/campus/facilities', priority: 0.6, changefreq: 'monthly' },
      { path: '/campus/sports', priority: 0.6, changefreq: 'monthly' },
      { path: '/campus/clubs', priority: 0.5, changefreq: 'monthly' },
      { path: '/campus/events', priority: 0.6, changefreq: 'weekly' },
      { path: '/campus/nss', priority: 0.5, changefreq: 'monthly' },
      { path: '/placement/overview', priority: 0.8, changefreq: 'monthly' },
      { path: '/placement/recruiters', priority: 0.7, changefreq: 'monthly' },
      { path: '/placement/stats', priority: 0.7, changefreq: 'monthly' },
      { path: '/student-life', priority: 0.7, changefreq: 'monthly' },
      { path: '/incubation', priority: 0.7, changefreq: 'monthly' },
      { path: '/aicte', priority: 0.6, changefreq: 'monthly' },
      { path: '/mandatory-disclosure', priority: 0.5, changefreq: 'monthly' },
      { path: '/notice', priority: 0.7, changefreq: 'weekly' },
      { path: '/contact', priority: 0.8, changefreq: 'monthly' },
      { path: '/career', priority: 0.6, changefreq: 'monthly' },
      { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { path: '/terms', priority: 0.3, changefreq: 'yearly' },
      { path: '/refund-policy', priority: 0.3, changefreq: 'yearly' },
      { path: '/sitemap', priority: 0.4, changefreq: 'monthly' },
    ];

    return staticPages.map((page) => ({
      loc: page.path,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString(),
    }));
  },
};
