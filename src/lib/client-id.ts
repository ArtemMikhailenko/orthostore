import { storage } from '@/lib/utils';

const STORAGE_KEY = 'clientId';

export function getClientId(): string | null {
  if (typeof window === 'undefined') return null;
  const existing = storage.get(STORAGE_KEY);
  if (existing) return existing;

  const id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    ? crypto.randomUUID()
    : `web-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
  storage.set(STORAGE_KEY, id);
  return id;
}
