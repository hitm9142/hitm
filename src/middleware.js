import { NextResponse } from 'next/server';
import { proxy } from '@/proxy';

/**
 * Next.js middleware — runs on every matched request before rendering.
 *
 * Responsibilities:
 *  1. Injects the current pathname as `x-pathname` header so layout.jsx's
 *     generateMetadata can read it for dynamic SEO.
 *  2. Delegates Blog Admin route protection (/admin-dashboard/*) to proxy.js.
 *
 * The existing Firebase Lead Capture Admin at /admin/* is intentionally
 * excluded — it handles its own authentication independently.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── Blog Admin protection ────────────────────────────────────────────────
  if (pathname.startsWith('/admin-dashboard')) {
    return proxy(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
};
