import { http } from './client';
import type {
  Category,
  Country,
  Manufacturer,
  ProductListResponse,
  ProductWithDiscounts,
  Order,
  CreateOrderRequest,
} from './public.types';

// Categories
export function getCategories(): Promise<Category[]> {
  return http<Category[]>('/categories');
}

// Countries
export function getCountries(): Promise<Country[]> {
  return http<Country[]>('/countries');
}

// Manufacturers
export function getManufacturers(): Promise<Manufacturer[]> {
  return http<Manufacturer[]>('/manufacturers');
}

// Products list
export type GetProductsParams = {
  q?: string;
  qLike?: string;
  category?: string;
  manufacturerId?: string | string[];
  countryId?: string | string[];
  tags?: string | string[];
  priceFrom?: number;
  priceTo?: number;
  options?: Record<string, string | number>;
  // Alternative options via opt.* will be passed via query directly if needed from caller
  sort?: string;
  page?: number;
  limit?: number;
};

export function getProducts(params: GetProductsParams = {}): Promise<ProductListResponse> {
  return http<ProductListResponse>('/products', { query: params as any });
}

// Product details by id or slug
export function getProduct(idOrSlug: string): Promise<ProductWithDiscounts> {
  return http<ProductWithDiscounts>(`/products/${encodeURIComponent(idOrSlug)}`);
}

// Orders
export function createOrder(body: CreateOrderRequest, idempotencyKey?: string): Promise<Order> {
  return http<Order>('/orders', { method: 'POST', body, idempotencyKey });
}

export function getOrderHistory(phone: string, clientId: string): Promise<Order[]> {
  return http<Order[]>('/orders/history', { query: { phone, clientId } });
}
