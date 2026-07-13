import { getLatestBlogs } from '@/_services/dataService';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hitmranchi.ac.in';

export async function GET() {
  try {
    // Fetch all published blogs
    const blogs = await getLatestBlogs(1000); // Get up to 1000 blogs

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/blogs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${blogs
        .map(
          (blog) => `  <url>
    <loc>${SITE_URL}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(blog.publishedAt || blog.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
        )
        .join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('[BLOGS SITEMAP ERROR]:', error);
    // Return a minimal valid sitemap on error so Googlebot gets 200 instead of 500
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/blogs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    return new Response(fallback, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store',
      },
    });
  }
}
