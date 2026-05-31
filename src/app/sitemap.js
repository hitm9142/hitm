/**
 * Next.js App Router Dynamic Sitemap
 * Accessible at: https://ahctranchi.com/sitemap.xml
 * This file auto-generates the sitemap and is picked up by Next.js.
 * The static /public/sitemap.xml is kept for direct Google Search Console submission.
 */

const BASE_URL = 'https://www.hitmranchi.ac.in';

export default function sitemap() {
  const lastModified = new Date('2026-05-29');

  const routes = [
    // Home
    { url: '/', priority: 1.0, changeFrequency: 'daily' },

    // About
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/about/overview', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/about/director', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/about/governing-body', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/about/faculty', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/about/vision', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/about/awards', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/about/naac', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/about/nirf', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/about/anti-ragging', priority: 0.5, changeFrequency: 'monthly' },

    // Programs
    { url: '/programs', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/programs/engineering', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/programs/mba', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/programs/bba', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/programs/bca', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/programs/mca', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/programs/diploma', priority: 0.8, changeFrequency: 'monthly' },

    // Admissions
    { url: '/admissions/apply', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/admissions/eligibility', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/admissions/fee', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/admissions/brochures', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/admissions/scholarship-admission', priority: 0.7, changeFrequency: 'monthly' },

    // Academics
    { url: '/academics/calendar', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/academics/syllabus', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/academics/examination', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/academics/library', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/academics/e-learning', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/academics/scholarships', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/academics/scholarship-academic', priority: 0.6, changeFrequency: 'monthly' },

    // Campus
    { url: '/campus', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/campus/gallery', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/campus/facilities', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/campus/sports', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/campus/clubs', priority: 0.5, changeFrequency: 'monthly' },
    { url: '/campus/events', priority: 0.6, changeFrequency: 'weekly' },
    { url: '/campus/nss', priority: 0.5, changeFrequency: 'monthly' },

    // Placement
    { url: '/placement/overview', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/placement/recruiters', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/placement/stats', priority: 0.7, changeFrequency: 'monthly' },

    // Student Life
    { url: '/student-life', priority: 0.7, changeFrequency: 'monthly' },

    // Incubation
    { url: '/incubation', priority: 0.7, changeFrequency: 'monthly' },

    // AICTE
    { url: '/aicte', priority: 0.6, changeFrequency: 'monthly' },

    // Notice
    { url: '/notice', priority: 0.7, changeFrequency: 'weekly' },

    // Contact
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },

    // Career
    { url: '/career', priority: 0.6, changeFrequency: 'monthly' },

    // Legal
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },

    // Sitemap HTML page
    { url: '/sitemap', priority: 0.4, changeFrequency: 'monthly' },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
