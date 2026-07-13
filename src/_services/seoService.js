/**
 * SEO metadata helpers for page.js files (server-side).
 * All branding uses HITM Ranchi.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hitmranchi.ac.in';
const SITE_NAME = 'HITM Ranchi';
const LOGO_URL = `${SITE_URL}/images/logo/ahct-logo.png`;

/**
 * Static metadata for listing/static pages.
 * @param {{ title: string, description: string, meta_keywords?: string, slug?: string }} data
 */
export const getMetaDataStatic = async (data) => {
  if (!data) {
    return {
      title: 'HITM Ranchi | AICTE Approved Institution',
      description: 'Haider Institute of Technology and Management, Ranchi.',
    };
  }

  const canonical = data.slug
    ? `${SITE_URL}/${data.slug}`.replace(/\/+$/, '')
    : SITE_URL;

  return {
    title: data.title,
    description: data.description,
    ...(data.meta_keywords && { keywords: data.meta_keywords }),
    alternates: { canonical },
    openGraph: {
      title: data.title,
      description: data.description,
      siteName: SITE_NAME,
      url: canonical,
      type: 'website',
      images: [{ url: LOGO_URL, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [LOGO_URL],
    },
  };
};

/**
 * Dynamic metadata for blog posts.
 * @param {{ content: object|null, pathPrefix: string, fallbackTitle: string }} config
 */
export const getMetaDataDynamic = ({ content, pathPrefix, fallbackTitle }) => {
  if (!content) return { title: fallbackTitle || 'HITM Ranchi' };

  const canonical = `${SITE_URL}/${pathPrefix}/${content.slug}`;
  const ogImage = content.ogImage || content.featuredImage?.url || LOGO_URL;

  return {
    title: content.metaTitle || content.title,
    description: content.metaDescription || content.shortDescription || '',
    keywords: content.metaKeywords || content.tags?.join(', ') || '',
    alternates: { canonical: content.canonicalUrl || canonical },
    openGraph: {
      title: content.metaTitle || content.title,
      description: content.metaDescription || content.shortDescription || '',
      url: content.canonicalUrl || canonical,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt,
      authors: [content.author || SITE_NAME],
      images: [{ url: ogImage, alt: content.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle || content.title,
      description: content.metaDescription || content.shortDescription || '',
      images: [ogImage],
    },
  };
};
