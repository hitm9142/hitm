'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, User, Clock, Tag, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroImage, thumbImage } from '@/_utils/cloudinaryImage';
import parse from 'html-react-parser';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hitmranchi.ac.in';

// ─── Related post card ─────────────────────────────────────────────────────────
function RelatedCard({ blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:shadow-md hover:border-hitm-red/20 transition-all duration-200 group bg-white"
    >
      {blog.featuredImage?.url ? (
        <img
          src={thumbImage(blog.featuredImage.url)}
          alt={blog.title}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-hitm-navy/5 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-hitm-navy/30" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[11px] text-hitm-red font-semibold mb-1 uppercase tracking-wide">{blog.category}</p>
        <h4 className="text-[13px] font-semibold text-gray-800 group-hover:text-hitm-red transition line-clamp-2 leading-snug">
          {blog.title}
        </h4>
        {blog.publishedAt && (
          <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {format(new Date(blog.publishedAt), 'dd MMM yyyy')}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function BlogDetailPage({ blog, related = [] }) {
  const publishedDate = blog.publishedAt ? format(new Date(blog.publishedAt), 'dd MMMM yyyy') : '';

  const handleShare = (platform) => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    const title = encodeURIComponent(blog.title);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
  };

  // JSON-LD Article schema — HITM branding
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.shortDescription || blog.metaDescription || '',
    image: blog.featuredImage?.url || blog.ogImage || '',
    author: { '@type': 'Person', name: blog.author || 'HITM Ranchi' },
    publisher: {
      '@type': 'Organization',
      name: 'HITM Ranchi',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/ahct-logo.png`,
      },
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${blog.slug}`,
    },
  };

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-hitm-navy overflow-hidden">
        {blog.featuredImage?.url ? (
          <>
            <div className="absolute inset-0">
              <img
                src={heroImage(blog.featuredImage.url)}
                alt={blog.featuredImage.alt || blog.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-hitm-navy/70 via-hitm-navy/60 to-hitm-navy/90" />
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, #8B1A1A 0%, transparent 60%), radial-gradient(circle at 80% 50%, #D4A017 0%, transparent 60%)',
            }}
          />
        )}

        <div className="relative max-w-[1202px] mx-auto px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-white transition">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{blog.title}</span>
          </nav>

          {/* Category */}
          <span className="inline-block bg-hitm-red text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4 shadow">
            {blog.category}
          </span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[24px] md:text-[36px] lg:text-[42px] font-black text-white leading-snug mb-5 max-w-3xl"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {blog.title}
          </motion.h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-white/60">
            {publishedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-hitm-gold" /> {publishedDate}
              </span>
            )}
            {blog.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-hitm-gold" /> {blog.author}
              </span>
            )}
            {blog.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-hitm-gold" /> {blog.readingTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ─── Body ──────────────────────────────────────────────────────────── */}
      <article className="bg-gray-50 py-10 px-4 min-h-screen">
        <div className="max-w-[1202px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                {blog.featuredImage?.url && (
                  <div className="relative w-full h-full lg:max-h-[434px] overflow-hidden">
                    <img
                      src={heroImage(blog.featuredImage.url)}
                      alt={blog.featuredImage.alt || blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}
                <div className="p-6 md:p-8 lg:p-10">
                  {/* Short description pull-quote */}
                  {blog.shortDescription && (
                    <p className="text-[15px] text-gray-600 leading-relaxed mb-6 font-medium border-l-4 border-hitm-red pl-4 bg-hitm-red/5 py-3 rounded-r-xl">
                      {blog.shortDescription}
                    </p>
                  )}

                  {/* Content */}
                  <div className="blog-content">{parse(blog.content || '')}</div>

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-50 text-gray-500 text-[12px] rounded-full border border-gray-200 hover:border-hitm-red hover:text-hitm-red transition cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700">
                        <Share2 className="w-4 h-4" /> Share this article:
                      </span>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-8 h-8 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:opacity-80 transition"
                        aria-label="Share on Facebook"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-8 h-8 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:opacity-80 transition"
                        aria-label="Share on Twitter / X"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center hover:opacity-80 transition"
                        aria-label="Share on LinkedIn"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Back link */}
              <div className="mt-6">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-hitm-red transition group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to all blogs
                </Link>
              </div>
            </div>

            {/* ─── Sidebar ─────────────────────────────────────────────────── */}
            <aside className="space-y-6">
              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3
                    className="text-[15px] font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b border-hitm-red/20"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    <span className="w-1 h-5 bg-hitm-red rounded-full inline-block" />
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <RelatedCard key={r._id} blog={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Admission CTA */}
              <div className="relative bg-hitm-navy rounded-2xl p-6 text-white overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #D4A017 0%, transparent 60%)' }}
                />
                <div className="relative">
                  <span className="inline-block bg-hitm-red/20 text-hitm-gold text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full mb-3 border border-hitm-red/30">
                    Admissions 2026
                  </span>
                  <h3 className="text-[18px] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Start Your Journey at HITM
                  </h3>
                  <p className="text-[13px] text-white/60 mb-5">
                    AICTE-approved programmes in Engineering, Management, and Technology.
                  </p>
                  <Link
                    href="https://applynow.hitmranchi.ac.in/?utm_source=website"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-hitm-red hover:bg-hitm-red-dark text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition shadow-lg"
                  >
                    Apply Now <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3
                  className="text-[14px] font-bold text-gray-800 mb-3 pb-3 border-b border-gray-100"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Explore HITM
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'All Programmes', href: '/programs' },
                    { label: 'Campus Life', href: '/student-life' },
                    { label: 'Placements', href: '/placement/overview' },
                    { label: 'Contact Us', href: '/contact' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-hitm-red transition group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-hitm-gold group-hover:bg-hitm-red transition" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Blog content styles — HITM theme */}
      <style jsx global>{`
        .blog-content {
          font-size: 15px;
          color: #374151;
          line-height: 1.8;
        }
        .blog-content h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 1.75rem 0 0.75rem;
          color: #1a3a5c;
          font-family: 'Playfair Display', serif;
        }
        .blog-content h2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #1a3a5c;
          font-family: 'Playfair Display', serif;
        }
        .blog-content h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem;
          color: #1a3a5c;
          font-family: 'Playfair Display', serif;
        }
        .blog-content p {
          margin: 0.85rem 0;
          line-height: 1.8;
          color: #4b5563;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 0.85rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin: 0.4rem 0;
          line-height: 1.7;
          color: #4b5563;
        }
        .blog-content ul li {
          list-style-type: disc;
        }
        .blog-content ol li {
          list-style-type: decimal;
        }
        .blog-content strong {
          font-weight: 700;
          color: #111827;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content a {
          color: #8b1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover {
          color: #1a3a5c;
        }
        .blog-content blockquote {
          border-left: 4px solid #8b1a1a;
          padding: 0.85rem 1.25rem;
          color: #4b5563;
          font-style: italic;
          margin: 1.25rem 0;
          background: #fff8f8;
          border-radius: 0 8px 8px 0;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          margin: 1.25rem 0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
        }
        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 10px 14px;
          text-align: left;
          font-size: 14px;
        }
        .blog-content th {
          background: #1a3a5c;
          color: white;
          font-weight: 600;
        }
        .blog-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }
        .blog-content pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1.25rem;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 13px;
          margin: 1.25rem 0;
        }
        .blog-content code {
          background: #f3f4f6;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-size: 13px;
          color: #8b1a1a;
        }
        .blog-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
      `}</style>
    </>
  );
}
