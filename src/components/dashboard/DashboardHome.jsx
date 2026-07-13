'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, Clock, PlusCircle, ArrowRight, TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

function StatCard({ icon: Icon, label, value, sub, color, href, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="block bg-white rounded-xl border border-[#e2e8f0] p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: color + '18' }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <ArrowRight className="w-4 h-4 text-[#77838f] opacity-0 group-hover:opacity-100 transition" />
        </div>
        <p className="text-[28px] font-bold text-[#222222] leading-tight mb-1">{value ?? '—'}</p>
        <p className="text-[13px] font-medium text-[#222222]">{label}</p>
        {sub && <p className="text-[12px] text-[#77838f] mt-0.5">{sub}</p>}
      </Link>
    </motion.div>
  );
}

function ActivityItem({ item }) {
  const isPublished = item.status === 'published';
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#f4f6f9] last:border-0">
      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${isPublished ? 'bg-green-500' : 'bg-[#ff9e3d]'}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-[#222222] truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
              isPublished ? 'bg-green-50 text-green-600' : 'bg-[#ff9e3d]/10 text-[#ff9e3d]'
            }`}
          >
            {isPublished ? 'Published' : 'Draft'}
          </span>
          <span className="text-[11px] text-[#77838f]">
            {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      <Link
        href={`/admin-dashboard/blogs/${item._id}/edit`}
        className="shrink-0 text-[11px] text-[#8B1A1A] hover:underline"
      >
        Edit
      </Link>
    </div>
  );
}

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog?limit=8&sort=-updatedAt');
      const data = await res.json();
      const blogs = data.success ? data.data : { docs: [], totalDocs: 0, publishedCount: 0, draftCount: 0 };

      setStats({
        total: blogs.totalDocs ?? 0,
        published: blogs.publishedCount ?? 0,
        draft: blogs.draftCount ?? 0,
      });

      setActivity(blogs.docs || []);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      icon: FileText,
      label: 'Total Blog Posts',
      value: stats?.total,
      sub: 'All posts',
      color: '#8B1A1A',
      href: '/admin-dashboard/blogs',
      delay: 0,
    },
    {
      icon: CheckCircle2,
      label: 'Published',
      value: stats?.published,
      sub: 'Live on website',
      color: '#10b981',
      href: '/admin-dashboard/blogs?status=published',
      delay: 0.06,
    },
    {
      icon: Clock,
      label: 'Drafts',
      value: stats?.draft,
      sub: 'Pending publish',
      color: '#f59e0b',
      href: '/admin-dashboard/blogs?status=draft',
      delay: 0.12,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#222222]">Dashboard</h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">Welcome back. Here&apos;s what&apos;s happening.</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 text-[12px] text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Bottom row: Quick actions + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl border border-[#e2e8f0] p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#8B1A1A]" />
            <h2 className="text-[14px] font-bold text-[#222222]">Quick Actions</h2>
          </div>
          <div className="space-y-2.5">
            <Link
              href="/admin-dashboard/blogs/create"
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-[#8B1A1A]/40 hover:bg-[#8B1A1A]/5 hover:border-[#8B1A1A] transition group"
            >
              <PlusCircle className="w-4 h-4 text-[#8B1A1A]" />
              <span className="text-[13px] font-medium text-[#222222] group-hover:text-[#8B1A1A] transition">
                New Blog Post
              </span>
            </Link>
            <Link
              href="/admin-dashboard/blogs"
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-200 hover:bg-[#f4f6f9] transition"
            >
              <FileText className="w-4 h-4 text-[#77838f]" />
              <span className="text-[13px] font-medium text-[#77838f]">Manage All Blogs</span>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold text-[#222222]">Recent Blog Posts</h2>
            <Link href="/admin-dashboard/blogs" className="text-[12px] text-[#8B1A1A] hover:underline">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex gap-3 py-2">
                  <div className="w-2 h-2 bg-gray-200 rounded-full mt-1.5 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[13px] text-[#77838f]">No blog posts yet.</p>
              <Link
                href="/admin-dashboard/blogs/create"
                className="text-[13px] text-[#8B1A1A] hover:underline mt-1 inline-block"
              >
                Create your first blog post &rarr;
              </Link>
            </div>
          ) : (
            <div>
              {activity.map((item) => (
                <ActivityItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
