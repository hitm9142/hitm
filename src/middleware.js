import { NextResponse } from 'next/server';

/**
 * Middleware – runs on every request before rendering.
 * Injects the current pathname as a request header (x-pathname)
 * so layout.jsx's generateMetadata can read it and serve the
 * correct title/description from metadata.json.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

// Run on all routes except static assets and Next.js internals
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)'],
};
