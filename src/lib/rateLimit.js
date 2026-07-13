/**
 * In-memory rate limiter for login attempts.
 * Resets automatically per IP after the window expires.
 *
 * For production at scale, replace with a Redis-backed solution.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/** @type {Map<string, { count: number; firstAttempt: number }>} */
const attempts = new Map();

/**
 * Check whether the given IP is rate-limited.
 * @param {string} ip
 * @returns {{ limited: boolean; remaining: number; resetAt: number }}
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry) {
    return { limited: false, remaining: MAX_ATTEMPTS, resetAt: now + WINDOW_MS };
  }

  // Expired window – treat as fresh
  if (now - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(ip);
    return { limited: false, remaining: MAX_ATTEMPTS, resetAt: now + WINDOW_MS };
  }

  const resetAt = entry.firstAttempt + WINDOW_MS;

  if (entry.count >= MAX_ATTEMPTS) {
    return { limited: true, remaining: 0, resetAt };
  }

  return { limited: false, remaining: MAX_ATTEMPTS - entry.count, resetAt };
}

/**
 * Record a failed login attempt for the given IP.
 * @param {string} ip
 */
export function recordFailedAttempt(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    entry.count += 1;
  }
}

/**
 * Clear failed attempts for the given IP (on successful login).
 * @param {string} ip
 */
export function clearAttempts(ip) {
  attempts.delete(ip);
}
