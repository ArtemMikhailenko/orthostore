"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, getCountries, getManufacturers, getProducts, getProduct, createOrder, getOrderHistory, type GetProductsParams } from './public';
import type { Category, Country, Manufacturer, ProductListResponse, ProductWithDiscounts, Order, CreateOrderRequest } from './public.types';

export function useCategories() {
  return useQuery<Category[]>({ queryKey: ['categories'], queryFn: getCategories });
}

export function useCountries() {
  return useQuery<Country[]>({ queryKey: ['countries'], queryFn: getCountries });
}

export function useManufacturers() {
  return useQuery<Manufacturer[]>({ queryKey: ['manufacturers'], queryFn: getManufacturers });
}

export function useProducts(params: GetProductsParams = {}) {
  return useQuery<ProductListResponse>({ queryKey: ['products', params], queryFn: () => getProducts(params) });
}

export function useProduct(idOrSlug: string | undefined) {
  return useQuery<ProductWithDiscounts>({
    queryKey: ['product', idOrSlug],
    queryFn: () => getProduct(idOrSlug as string),
    enabled: Boolean(idOrSlug),
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation<Order, Error, { body: CreateOrderRequest; idempotencyKey?: string }>({
    mutationFn: ({ body, idempotencyKey }) => createOrder(body, idempotencyKey),
    onSuccess: (_data, variables) => {
      // Invalidate order history for this phone+clientId
      const { phone, clientId } = variables.body;
      qc.invalidateQueries({ queryKey: ['orders', 'history', phone, clientId] });
    },
  });
}

export function useOrderHistory(phone?: string, clientId?: string) {
  return useQuery<Order[]>({
    queryKey: ['orders', 'history', phone, clientId],
    queryFn: () => getOrderHistory(phone as string, clientId as string),
    enabled: Boolean(phone && clientId),
  });
}
