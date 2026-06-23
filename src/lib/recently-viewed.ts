import { storage } from '@/lib/utils';

const STORAGE_KEY = 'recently_viewed_v1';
const MAX_ITEMS = 12;

/** Minimal snapshot of a product, enough to render a card without re-fetching. */
export type RecentProduct = {
  slug: string;
  categorySlug: string;
  title: string;
  image?: string;
  price: number;
  originalPrice?: number;
  brand?: string | null;
};

export function getRecentlyViewed(): RecentProduct[] {
  const raw = storage.get(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RecentProduct[]) : [];
  } catch {
    return [];
  }
}

/** Add (or move to front) a product in the recently-viewed list. */
export function addRecentlyViewed(item: RecentProduct): void {
  if (typeof window === 'undefined' || !item.slug) return;
  const list = getRecentlyViewed().filter((p) => p.slug !== item.slug);
  list.unshift(item);
  storage.set(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ITEMS)));
}
