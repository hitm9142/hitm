/**
 * Unified In-Memory & Redis Cache Helper for HITM Ranchi
 * Prevents redundant MongoDB / Firebase queries and reduces Vercel Serverless CPU execution time.
 */

// In-Memory cache store (persisted across warm serverless invocations)
const globalCache = global.__hitmCache || new Map();
if (process.env.NODE_ENV !== 'production') {
  global.__hitmCache = globalCache;
}

/**
 * Retrieve cached data by key.
 * @param {string} key - Cache identifier
 * @returns {Promise<any|null>} Cached value or null if expired / missing
 */
export async function getCache(key) {
  try {
    // 1. Try Upstash Redis REST API if credentials exist
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      const res = await fetch(`${redisUrl}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          try {
            return JSON.parse(data.result);
          } catch {
            return data.result;
          }
        }
      }
    }

    // 2. Fallback to In-Memory TTL Cache
    const item = globalCache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      globalCache.delete(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error('[CACHE GET ERROR]:', error);
    return null;
  }
}

/**
 * Store data in cache.
 * @param {string} key - Cache identifier
 * @param {any} value - Data to cache
 * @param {number} ttlSeconds - Expiration time in seconds (default: 300 = 5 mins)
 */
export async function setCache(key, value, ttlSeconds = 300) {
  try {
    // 1. Try Upstash Redis REST API if credentials exist
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      const payload = typeof value === 'string' ? value : JSON.stringify(value);
      await fetch(`${redisUrl}/set/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([payload, 'EX', ttlSeconds]),
        cache: 'no-store',
      }).catch(() => {});
    }

    // 2. Always store in local In-Memory Map for instant warm hits
    globalCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  } catch (error) {
    console.error('[CACHE SET ERROR]:', error);
  }
}

/**
 * Remove key from cache.
 * @param {string} key - Cache identifier
 */
export async function delCache(key) {
  try {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      await fetch(`${redisUrl}/del/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: 'no-store',
      }).catch(() => {});
    }

    globalCache.delete(key);
  } catch (error) {
    console.error('[CACHE DEL ERROR]:', error);
  }
}
