/**
 * Client-side API fetch helper.
 * Builds query strings and calls the Next.js API routes.
 */

/**
 * Fetch from a Next.js API route with query params.
 * @param {string} endpoint - e.g. 'blog', 'news'
 * @param {Record<string, string>} params - query parameters
 * @returns {Promise<any>} parsed JSON response
 */
export async function fetchWithClient(endpoint, params = {}, options = {}) {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  );
  const query = new URLSearchParams(cleaned).toString();
  const url = `/api/${endpoint}${query ? `?${query}` : ''}`;
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  return res.json();
}
