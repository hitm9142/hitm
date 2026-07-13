'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  PlusCircle,
  Search,
  Trash2,
  Eye,
  EyeOff,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCw,
  CheckSquare,
  Square,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const API_BASE = '/api/blog';
const CREATE_PATH = '/admin-dashboard/blogs/create';
const EDIT_BASE = '/admin-dashboard/blogs';
const FRONTEND_BASE = '/blogs';

const STATUS_COLORS = {
  published: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-amber-50 text-amber-700 border-amber-200',
};

// Safely generate a thumbnail URL from a Cloudinary URL by inserting
// a small transformation. Falls back to the original URL on any error.
function thumbImage(url) {
  if (!url) return '';
  try {
    return url.replace('/upload/', '/upload/w_80,h_80,c_fill,f_auto,q_auto/');
  } catch {
    return url;
  }
}

export default function PostList() {
  const searchParams = useSearchParams();

  const [docs, setDocs] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalDocs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [counts, setCounts] = useState({ published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [sort, setSort] = useState(searchParams.get('sort') || '-updatedAt');
  const [selected, setSelected] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setSelected([]);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        sort,
        ...(statusFilter && { status: statusFilter }),
        ...(search && { search }),
      });
      const res = await fetch(`${API_BASE}?${params}`);
      const data = await res.json();
      if (data.success) {
        setDocs(data.data.docs || []);
        setPagination({
          page: data.data.page,
          totalPages: data.data.totalPages,
          totalDocs: data.data.totalDocs,
          hasNextPage: data.data.hasNextPage,
          hasPrevPage: data.data.hasPrevPage,
        });
        setCounts({
          published: data.data.publishedCount || 0,
          draft: data.data.draftCount || 0,
        });
      }
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [page, sort, statusFilter, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced search → reset to page 1
  useEffect(() => {
    const timer = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleStatus = async (doc) => {
    const newStatus = doc.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`${API_BASE}/${doc._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success(newStatus === 'published' ? 'Post published' : 'Post unpublished');
      fetchData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteOne = async (id) => {
    if (!confirm('Delete this post permanently?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Post deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const toggleSelect = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const toggleSelectAll = () => setSelected(selected.length === docs.length ? [] : docs.map((d) => d._id));

  const bulkAction = async (action) => {
    if (!selected.length) return;
    setBulkLoading(true);
    try {
      await Promise.all(
        selected.map((id) =>
          action === 'delete'
            ? fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
            : fetch(`${API_BASE}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: action }),
              }),
        ),
      );
      toast.success(
        action === 'delete' ? `${selected.length} post(s) deleted` : `${selected.length} post(s) ${action}`,
      );
      fetchData();
    } catch {
      toast.error('Bulk action failed');
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-[#222222]">Blog Posts</h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">
            {pagination.totalDocs} total · {counts.published} published · {counts.draft} drafts
          </p>
        </div>
        <Link
          href={CREATE_PATH}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1A1A] hover:bg-[#6B1212] text-white text-[13px] font-semibold rounded-lg transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Blog Post
        </Link>
      </div>

      {/* Filters bar */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] mb-4">
        {/* Status tabs */}
        <div className="flex items-center gap-0 border-b border-[#e2e8f0] px-4">
          {[
            { label: 'All', value: '' },
            { label: `Published (${counts.published})`, value: 'published' },
            { label: `Drafts (${counts.draft})`, value: 'draft' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setStatusFilter(tab.value);
                setPage(1);
              }}
              className={cn(
                'px-4 py-3 text-[13px] font-medium border-b-2 transition cursor-pointer',
                statusFilter === tab.value
                  ? 'border-[#8B1A1A] text-[#8B1A1A]'
                  : 'border-transparent text-[#77838f] hover:text-[#222222]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + sort + refresh */}
        <div className="p-3 flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#77838f]" />
            <input
              type="text"
              placeholder="Search blog posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] transition"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#222222] bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 transition"
          >
            <option value="-updatedAt">Last Updated</option>
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-publishedAt">Last Published</option>
            <option value="title">Title A–Z</option>
            <option value="-title">Title Z–A</option>
          </select>

          <button
            onClick={fetchData}
            className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
          </button>
        </div>

        {/* Bulk actions */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#e2e8f0] px-4 py-2.5 flex items-center gap-3 bg-[#8B1A1A]/5"
            >
              <span className="text-[12px] font-semibold text-[#8B1A1A]">{selected.length} selected</span>
              <button
                onClick={() => bulkAction('published')}
                disabled={bulkLoading}
                className="text-[12px] text-green-600 hover:underline disabled:opacity-50 cursor-pointer"
              >
                Publish all
              </button>
              <button
                onClick={() => bulkAction('draft')}
                disabled={bulkLoading}
                className="text-[12px] text-amber-600 hover:underline disabled:opacity-50 cursor-pointer"
              >
                Unpublish all
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${selected.length} post(s)?`)) bulkAction('delete');
                }}
                disabled={bulkLoading}
                className="text-[12px] text-red-600 hover:underline disabled:opacity-50 cursor-pointer"
              >
                Delete all
              </button>
              {bulkLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#77838f]" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-6 h-6 text-[#8B1A1A] animate-spin" />
            <p className="text-[13px] text-[#77838f]">Loading…</p>
          </div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <AlertCircle className="w-8 h-8 text-[#e2e8f0]" />
            <p className="text-[14px] font-medium text-[#222222]">No posts found</p>
            <p className="text-[13px] text-[#77838f]">
              {search || statusFilter ? 'Try clearing your filters.' : 'Create your first blog post.'}
            </p>
            {!search && !statusFilter && (
              <Link href={CREATE_PATH} className="text-[13px] text-[#8B1A1A] hover:underline mt-1">
                + Create Blog Post
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f4f6f9] bg-[#f8f9fa]">
                    <th className="px-4 py-3 text-left w-10">
                      <button
                        onClick={toggleSelectAll}
                        className="text-[#77838f] hover:text-[#8B1A1A] transition cursor-pointer"
                      >
                        {selected.length === docs.length && docs.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-[#8B1A1A]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-28">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-32">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-36">
                      Updated
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-28">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc) => (
                    <tr
                      key={doc._id}
                      className={cn(
                        'border-b border-[#f4f6f9] last:border-0 hover:bg-[#f8f9fa] transition',
                        selected.includes(doc._id) && 'bg-[#8B1A1A]/5',
                      )}
                    >
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleSelect(doc._id)}
                          className="text-[#77838f] hover:text-[#8B1A1A] cursor-pointer"
                        >
                          {selected.includes(doc._id) ? (
                            <CheckSquare className="w-4 h-4 text-[#8B1A1A]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          {doc.featuredImage?.url && (
                            <img
                              src={thumbImage(doc.featuredImage.url)}
                              alt={doc.title}
                              className="w-10 h-10 rounded object-cover shrink-0 border border-[#e2e8f0]"
                            />
                          )}
                          <div className="min-w-0">
                            <Link
                              href={`${EDIT_BASE}/${doc._id}/edit`}
                              className="text-[13px] font-medium text-[#222222] hover:text-[#8B1A1A] transition line-clamp-2 block"
                            >
                              {doc.title}
                            </Link>
                            <p className="text-[11px] text-[#77838f] truncate mt-0.5">/blogs/{doc.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border capitalize',
                            STATUS_COLORS[doc.status],
                          )}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[12px] text-[#77838f] truncate block max-w-[120px]">{doc.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[12px] text-[#77838f]">
                          {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`${FRONTEND_BASE}/${doc.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#222222] transition"
                            title="View on site"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => toggleStatus(doc)}
                            className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#222222] transition cursor-pointer"
                            title={doc.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {doc.status === 'published' ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5 text-green-500" />
                            )}
                          </button>
                          <Link
                            href={`${EDIT_BASE}/${doc._id}/edit`}
                            className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#8B1A1A] transition"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => deleteOne(doc._id)}
                            className="p-1.5 rounded hover:bg-red-50 text-[#77838f] hover:text-red-500 transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-[#f4f6f9]">
              {docs.map((doc) => (
                <div key={doc._id} className="p-4 flex items-start gap-3">
                  <button onClick={() => toggleSelect(doc._id)} className="mt-0.5 shrink-0 cursor-pointer">
                    {selected.includes(doc._id) ? (
                      <CheckSquare className="w-4 h-4 text-[#8B1A1A]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#77838f]" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`${EDIT_BASE}/${doc._id}/edit`}
                      className="text-[13px] font-medium text-[#222222] hover:text-[#8B1A1A] block mb-1 line-clamp-2"
                    >
                      {doc.title}
                    </Link>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          'text-[10px] font-semibold px-1.5 py-0.5 rounded border',
                          STATUS_COLORS[doc.status],
                        )}
                      >
                        {doc.status}
                      </span>
                      <span className="text-[11px] text-[#77838f]">{doc.category}</span>
                      <span className="text-[11px] text-[#77838f]">
                        {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link href={`${EDIT_BASE}/${doc._id}/edit`} className="p-1.5 text-[#77838f] hover:text-[#8B1A1A]">
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => deleteOne(doc._id)}
                      className="p-1.5 text-[#77838f] hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] text-[#77838f]">
            Page {pagination.page} of {pagination.totalPages} · {pagination.totalDocs} posts
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage || loading}
              className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'w-8 h-8 rounded-lg text-[13px] font-medium transition cursor-pointer',
                    page === p
                      ? 'bg-[#8B1A1A] text-white'
                      : 'border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9]',
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={!pagination.hasNextPage || loading}
              className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
