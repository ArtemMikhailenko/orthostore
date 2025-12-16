// Lightweight typed HTTP client for public API
// Uses native fetch; base URL comes from NEXT_PUBLIC_API_URL

export class ApiError extends Error {
  status: number;
  path?: string;
  details?: unknown;
  requestId?: string;

  constructor(message: string, status: number, extra?: Partial<ApiError>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    Object.assign(this, extra);
  }
}

export type QueryParams = Record<string, string | number | boolean | (string | number | boolean)[] | undefined>;

export function buildQuery(params?: QueryParams): string {
  if (!params) return '';
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) usp.append(key, String(v));
    } else if (typeof value === 'object' && value !== null) {
      // If params contain nested objects (e.g., options as JSON), send as JSON string
      usp.set(key, JSON.stringify(value));
    } else {
      usp.set(key, String(value));
    }
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    // Fallback for local development; adjust if needed
    return 'http://localhost:4000';
  }
  return url.replace(/\/?$/, '');
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  // Optional idempotency key for POST/PUT operations
  idempotencyKey?: string;
  // Pass raw query string params
  query?: QueryParams;
  // Abort support
  signal?: AbortSignal;
}

export async function http<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const base = getBaseUrl();
  const { method = 'GET', headers, body, idempotencyKey, query, signal } = opts;
  const url = `${base}${path}${buildQuery(query)}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(idempotencyKey ? { 'X-Idempotency-Key': idempotencyKey } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
    // credentials: 'include', // enable if API requires cookies
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

  if (!res.ok) {
    const message = isJson && payload?.message ? payload.message : `${res.status} ${res.statusText}`;
    throw new ApiError(message, res.status, {
      path: (payload as any)?.path,
      details: (payload as any)?.details,
      requestId: (payload as any)?.requestId,
    });
  }

  return payload as T;
}
