import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const LOGIN_PAGE = '/admin-login';
const COOKIE_NAME = 'hitm_admin_token';

/**
 * Edge-compatible JWT verification using `jose`.
 * Called from middleware.js — only runs for /admin-dashboard/* paths.
 *
 * NOTE: We deliberately use `jose` here (not `jsonwebtoken`) because
 * Next.js middleware runs in the Edge Runtime which does not support
 * Node.js built-ins required by jsonwebtoken/bcryptjs.
 * API Route Handlers run in the Node.js runtime and continue to use
 * the `jsonwebtoken`-based helpers in @/lib/auth.
 */
async function verifyEdgeToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_1);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Protects /admin-dashboard/* routes with JWT cookie authentication.
 * The existing Firebase Lead Capture Admin at /admin/* is completely
 * separate and is never touched by this function.
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only protect /admin-dashboard routes
  if (!pathname.startsWith('/admin-dashboard')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyEdgeToken(token);

  if (!payload) {
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set('from', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Authenticated — pass through
  return NextResponse.next();
}
