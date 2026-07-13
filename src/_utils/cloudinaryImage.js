/**
 * Inject Cloudinary transformation parameters into a Cloudinary image URL.
 *
 * How Cloudinary URLs work:
 *   https://res.cloudinary.com/<cloud>/image/upload/<transformations>/<public_id>
 *
 * We insert the transformation string right after "/image/upload/" (or "/video/upload/").
 * Non-Cloudinary URLs (local /uploads/, external CDN, etc.) are returned unchanged.
 *
 * @param {string} url       - Original image URL from the database
 * @param {string} transform - Cloudinary transformation string (default: "f_auto,q_auto,w_800")
 * @returns {string}         - Transformed URL (or original if not a Cloudinary URL)
 */
export function cloudinaryImage(url, transform = 'f_auto,q_auto,w_800') {
  if (!url) return url;

  // Only process Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  // Already has transformations injected — return as-is to avoid double-injection
  // (Cloudinary transformations always appear between /upload/ and the version/public_id)
  const uploadMarker = '/upload/';
  const idx = url.indexOf(uploadMarker);
  if (idx === -1) return url;

  const afterUpload = url.slice(idx + uploadMarker.length);

  // If transformations are already present (starts with a known param like f_, q_, w_, c_, etc.)
  // skip re-injection
  if (/^[a-z_]+_/.test(afterUpload)) return url;

  const before = url.slice(0, idx + uploadMarker.length);
  const after = afterUpload;

  return `${before}${transform}/${after}`;
}

/**
 * Shorthand helpers for common use-cases
 */

/** Card thumbnails — list pages (800px wide, auto format/quality) */
export const cardImage = (url) => cloudinaryImage(url, 'f_auto,q_auto,w_800');

/** Detail page hero — larger screens (1200px wide) */
export const heroImage = (url) => cloudinaryImage(url, 'f_auto,q_auto,w_1200');

/** Small thumbnails — sidebar related cards, admin table (160px wide) */
export const thumbImage = (url) => cloudinaryImage(url, 'f_auto,q_auto,w_160');
