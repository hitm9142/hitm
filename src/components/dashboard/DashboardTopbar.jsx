'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, ChevronRight, Home } from 'lucide-react';

// Map /admin-dashboard paths to human-readable breadcrumb labels
const BREADCRUMB_MAP = {
  '/admin-dashboard': 'Dashboard',
  '/admin-dashboard/blogs': 'Blogs',
  '/admin-dashboard/blogs/create': 'Create Blog',
  '/admin-dashboard/settings': 'Settings',
};

function getBreadcrumbs(pathname) {
  const crumbs = [{ label: 'Dashboard', href: '/admin-dashboard' }];

  if (pathname === '/admin-dashboard') return crumbs;

  // Walk each path segment and build breadcrumbs
  const parts = pathname.split('/').filter(Boolean); // ['admin-dashboard', 'blogs', '<id>', 'edit']

  let accumulated = '';
  let prevWasId = false;

  for (const part of parts) {
    accumulated += '/' + part;
    const isId = /^[a-f0-9]{24}$/.test(part) || /^[a-f0-9-]{36}$/.test(part);

    if (accumulated === '/admin-dashboard') continue; // already added as root

    // Skip the raw ID segment — the next segment (e.g. 'edit') will serve as the label
    if (isId) {
      prevWasId = true;
      continue;
    }

    const label = BREADCRUMB_MAP[accumulated];

    // If the previous segment was an ID, this is an action segment (edit, view, etc.)
    // Point the href back to the parent collection
    const href = prevWasId
      ? accumulated.split('/').slice(0, -2).join('/') // e.g. /admin-dashboard/blogs
      : accumulated;

    crumbs.push({
      label: label || part.charAt(0).toUpperCase() + part.slice(1),
      href,
    });

    prevWasId = false;
  }

  return crumbs;
}

export default function DashboardTopbar({ admin, onMenuClick }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg hover:bg-[#f4f6f9] text-[#77838f] transition shrink-0 cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb — desktop */}
        <nav className="hidden sm:flex items-center gap-1 text-[12px] text-[#77838f] min-w-0">
          <Link href="/admin-dashboard" className="flex items-center hover:text-[#8B1A1A] transition shrink-0">
            <Home className="w-3.5 h-3.5" /> <span className="text-[#222222] font-medium truncate ml-2">Home</span>
          </Link>
          {breadcrumbs.slice(1).map((crumb, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <span key={crumb.href} className="flex items-center gap-1 min-w-0">
                <ChevronRight className="w-3 h-3 shrink-0" />
                {isLast ? (
                  <span className="text-[#222222] font-medium truncate">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-[#77838f] font-medium truncate hover:text-[#8B1A1A] transition"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Mobile: just page title */}
        <span className="sm:hidden text-[14px] font-semibold text-[#222222] truncate">{pageTitle}</span>
      </div>

      {/* Right: website link + admin avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-[#77838f] hover:text-[#8B1A1A] transition border border-[#e2e8f0] rounded-lg px-3 py-1.5"
        >
          View Website ↗
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#8B1A1A] rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0">
            {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <span className="hidden md:block text-[13px] font-medium text-[#222222] max-w-[120px] truncate">
            {admin?.name}
          </span>
        </div>
      </div>
    </header>
  );
}
