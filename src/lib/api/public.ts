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

// Subcategories (backend returns all; filter by categoryId on the client)
export type Subcategory = {
  _id: string;
  slug: string;
  categoryId: string;
  nameI18n: { uk: string; en?: string };
  sort?: number;
  isActive?: boolean;
};

export function getSubcategories(): Promise<Subcategory[]> {
  return http<Subcategory[]>('/subcategories');
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
  subcategory?: string;
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

// Gallery
export type GalleryImage = {
  _id: string;
  imageUrl: string;
  altI18n?: { uk?: string; en?: string };
  sort: number;
  isActive: boolean;
};

export function getGalleryImages(): Promise<GalleryImage[]> {
  return http<GalleryImage[]>('/gallery');
}

// Reviews
export type ProductReview = {
  _id: string;
  authorName: string;
  rating: number;
  comment?: string;
  source: 'customer' | 'admin';
  createdAt: string;
};

export interface CreateReviewDto {
  authorName: string;
  rating: number;
  comment?: string;
}

export function getProductReviews(idOrSlug: string): Promise<ProductReview[]> {
  return http<ProductReview[]>(`/products/${encodeURIComponent(idOrSlug)}/reviews`);
}

export function createProductReview(
  idOrSlug: string,
  dto: CreateReviewDto,
  token?: string,
): Promise<{ message: string }> {
  return http<{ message: string }>(`/products/${encodeURIComponent(idOrSlug)}/reviews`, {
    method: 'POST',
    body: dto,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function getPageContent(key: string): Promise<Record<string, unknown>> {
  return http<Record<string, unknown>>(`/pages/${encodeURIComponent(key)}`);
}
