'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getBlogs } from '@/_services/blogService';
import { cardImage } from '@/_utils/cloudinaryImage';

function BlogCard({ blog, index }) {
  const publishedDate = blog.publishedAt ? format(new Date(blog.publishedAt), 'dd MMM yyyy') : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
    >
      {/* Image */}
      <Link href={`/blogs/${blog.slug}`} className="block relative overflow-hidden h-52">
        {blog.featuredImage?.url ? (
          <img
            src={cardImage(blog.featuredImage.url)}
            alt={blog.featuredImage.alt || blog.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-hitm-navy/10 to-hitm-red/10 flex items-center justify-center">
            <span className="text-[42px]">📝</span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-hitm-red text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
            {blog.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 mb-3">
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-hitm-gold" />
              {publishedDate}
            </span>
          )}
          {blog.author && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-hitm-gold" />
              {blog.author}
            </span>
          )}
          {blog.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-hitm-gold" />
              {blog.readingTime} min read
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`} className="block mb-2 group/title">
          <h2
            className="text-[16px] font-bold text-gray-900 group-hover/title:text-hitm-red transition leading-snug line-clamp-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {blog.title}
          </h2>
        </Link>

        {blog.shortDescription && (
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">{blog.shortDescription}</p>
        )}

        <Link
          href={`/blogs/${blog.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold text-hitm-red hover:text-hitm-navy hover:gap-3 transition-all duration-200 uppercase tracking-wide"
        >
          Read More <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalDocs: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getBlogs({ page, search: debouncedSearch });
      setBlogs(result.docs);
      setPagination({ page: result.page, totalPages: result.totalPages, totalDocs: result.totalDocs });
    } catch {
      /* fail silently */
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative bg-hitm-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #8B1A1A 0%, transparent 60%), radial-gradient(circle at 80% 50%, #D4A017 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-[1202px] mx-auto px-4 py-16 md:py-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-hitm-red/20 text-hitm-gold text-[11px] font-bold uppercase tracking-[3px] px-4 py-1.5 rounded-full mb-4 border border-hitm-red/30"
          >
            Knowledge Hub
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-[32px] md:text-[44px] font-black text-white leading-tight mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our <span className="text-hitm-gold">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="text-white/60 text-[15px] max-w-xl mx-auto mb-8"
          >
            Insights, career tips, industry trends and stories from HITM Ranchi
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-hitm-red/40 shadow-lg"
            />
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ─── Blog Grid ───────────────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-[1202px] mx-auto">
          {/* Results count */}
          {!loading && blogs.length > 0 && (
            <p className="text-[13px] text-gray-400 mb-6">
              Showing <span className="font-semibold text-gray-700">{pagination.totalDocs}</span> article
              {pagination.totalDocs !== 1 ? 's' : ''}
              {debouncedSearch && (
                <>
                  {' '}
                  for &ldquo;<span className="text-hitm-red font-medium">{debouncedSearch}</span>&rdquo;
                </>
              )}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[44px] mb-4">📭</p>
              <h3
                className="text-[20px] font-bold text-gray-800 mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {debouncedSearch ? 'No results found' : 'No blogs published yet'}
              </h3>
              <p className="text-[14px] text-gray-400">
                {debouncedSearch ? 'Try a different search term.' : 'Check back soon — new articles coming!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-hitm-red hover:text-white hover:border-hitm-red transition disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-[13px] font-semibold transition ${
                    page === p
                      ? 'bg-hitm-red text-white shadow-sm'
                      : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="p-2.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-hitm-red hover:text-white hover:border-hitm-red transition disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
