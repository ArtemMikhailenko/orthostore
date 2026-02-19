// ─── Auth API client ───
// Typed wrappers around /auth/* and /me endpoints
// Uses the base http() client + token management

import { http, ApiError } from './client';
import { getClientId } from '@/lib/client-id';

/* ─── Types (matching backend contracts) ─── */

export interface Customer {
  id: string;
  phone: string;
  email: string | null;
  name: string | null;
  isPhoneVerified: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  lastLoginAt: string | null;
}

export interface AuthTokens {
  accessToken: string;
  accessTokenExpiresInSec: number;
  tokenType: 'bearer';
  refreshToken?: string;
  refreshTokenExpiresInSec?: number;
}

export interface AuthResult {
  customer: Customer;
  tokens: AuthTokens;
}

export interface Order {
  _id: string;
  phone: string;
  clientId: string;
  customerId?: string;
  items: OrderItem[];
  itemsTotal: number;
  deliveryFee: number;
  total: number;
  status: 'new' | 'processing' | 'done' | 'cancelled';
  name?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  sku: string;
  quantity: number;
  price: number;
  priceOriginal?: number;
  title: string;
  options: Record<string, string | number>;
  manufacturerId?: string;
  countryId?: string;
  unit?: string;
  discountsApplied?: Array<{
    discountId: string;
    name: string;
    type: 'percent' | 'fixed';
    value: number;
    priceBefore: number;
    priceAfter: number;
  }>;
}

export interface OrdersPage {
  items: Order[];
  page: number;
  limit: number;
  total: number;
}

export interface CreateOrderPayload {
  phone: string;
  clientId: string;
  items: Array<{
    productId: string;
    sku: string;
    quantity: number;
    price: number;
    title?: string;
    options?: Record<string, string | number>;
    manufacturerId?: string;
    countryId?: string;
    unit?: string;
  }>;
  deliveryFee?: number;
  name?: string;
  comment?: string;
}

/* ─── Token storage helpers ─── */

const TOKEN_KEYS = {
  access: 'accessToken',
  refresh: 'refreshToken',
} as const;

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.access);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.refresh);
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(TOKEN_KEYS.access, tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem(TOKEN_KEYS.refresh, tokens.refreshToken);
  }
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEYS.access);
  localStorage.removeItem(TOKEN_KEYS.refresh);
}

/** Build Authorization header if token exists */
export function authHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ─── Auth API calls ─── */

export async function apiRegister(data: {
  phone: string;
  email: string;
  password: string;
  name?: string;
  marketingOptIn?: boolean;
}): Promise<AuthResult> {
  const clientId = getClientId() || crypto.randomUUID();
  return http<AuthResult>('/auth/register', {
    method: 'POST',
    body: { ...data, clientId },
  });
}

export async function apiLogin(data: {
  login: string; // email or phone
  password: string;
}): Promise<AuthResult> {
  const clientId = getClientId() || crypto.randomUUID();
  return http<AuthResult>('/auth/login', {
    method: 'POST',
    body: { ...data, clientId },
  });
}

export async function apiRefresh(): Promise<AuthTokens> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');
  return http<AuthTokens>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  });
}

export async function apiForgotPassword(email: string): Promise<{ message: string }> {
  return http<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
}

export async function apiResetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  return http<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: { token, newPassword },
  });
}

/* ─── Profile API calls ─── */

export async function apiGetMe(): Promise<Customer> {
  return http<Customer>('/me', { headers: authHeaders() });
}

export async function apiUpdateMe(data: { name?: string; email?: string }): Promise<Customer> {
  return http<Customer>('/me', {
    method: 'PATCH',
    headers: authHeaders(),
    body: data,
  });
}

/* ─── Orders API calls ─── */

export async function apiGetMyOrders(page = 1, limit = 20): Promise<OrdersPage> {
  return http<OrdersPage>('/me/orders', {
    headers: authHeaders(),
    query: { page, limit },
  });
}

export async function apiCreateOrder(payload: CreateOrderPayload, idempotencyKey?: string): Promise<Order> {
  return http<Order>('/orders', {
    method: 'POST',
    headers: authHeaders(),
    body: payload,
    idempotencyKey,
  });
}

export async function apiGetGuestOrders(phone: string, clientId: string): Promise<Order[]> {
  return http<Order[]>('/orders/history', {
    query: { phone, clientId },
  });
}

/* ─── Auto-refresh wrapper ─── */

let refreshPromise: Promise<AuthTokens> | null = null;

/**
 * Execute an authenticated API call with automatic token refresh on 401.
 * Deduplicates concurrent refresh requests.
 */
export async function withAuth<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      // Try to refresh
      try {
        if (!refreshPromise) {
          refreshPromise = apiRefresh();
        }
        const newTokens = await refreshPromise;
        saveTokens(newTokens);
        refreshPromise = null;
        // Retry the original call
        return await fn();
      } catch {
        // Refresh failed — clear everything
        refreshPromise = null;
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw err;
      }
    }
    throw err;
  }
}

export { ApiError };
