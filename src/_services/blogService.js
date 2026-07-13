/**
 * blogService.js — CLIENT SIDE ONLY
 * Import this only in 'use client' components.
 */

import { fetchWithClient } from '@/_utils/apiService';

/**
 * Paginated blog list.
 * @param {{ page?: number, limit?: number, search?: string }} options
 */
export async function getBlogs({ page = 1, limit = 9, search = '' } = {}) {
  const res = await fetchWithClient('blog', {
    status: 'published',
    page: String(page),
    limit: String(limit),
    sort: '-publishedAt',
    ...(search && { search }),
  });

  if (!res.success) throw new Error(res.message);

  return {
    docs: res.data?.docs || [],
    page: res.data?.page ?? page,
    totalPages: res.data?.totalPages ?? 1,
    totalDocs: res.data?.totalDocs ?? 0,
  };
}
