
export function buildApiUrl(endpoint) {
  const cleanEndpoint = endpoint?.startsWith('/') ? endpoint.slice(1) : endpoint;

  // Check if we're on the specific Vercel preview domain
  const isVercelPreview = typeof window !== 'undefined' &&
    window.location.hostname === 'cloudintellect-frontend-qi1g.vercel.app';

  // Use proxy only for local dev OR specific Vercel preview domain
  const useProxy = process.env.NODE_ENV === 'development' || isVercelPreview;

  return useProxy
    ? `/api-proxy/${cleanEndpoint}`
    : `${process.env.API_BASE_URL}${cleanEndpoint}`;
}

export async function clientApi(endpoint, options = {}) {
  try {
    const { method = 'GET', body = null } = options;
    const url = buildApiUrl(endpoint);

    const fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add body for POST/PUT/PATCH requests
    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    // Normalize response format
    if (data?.success) {
      return {
        status: true,
        result: data.data || data.result || null,
        message: data.message || null,
      };
    } else {
      return {
        status: false,
        result: null,
        message: data.message || 'Request failed',
      };
    }
  } catch (error) {
    console.error('[clientApi] Error:', error);
    return {
      status: false,
      result: null,
      message: error.message || 'Network error',
    };
  }
}
