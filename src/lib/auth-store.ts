'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getClientId } from '@/lib/client-id';
import {
  apiRegister,
  apiLogin,
  apiRefresh,
  apiGetMe,
  apiUpdateMe,
  saveTokens,
  clearTokens,
  getAccessToken,
  type Customer,
  ApiError,
} from '@/lib/api/auth';

/* ─── State shape ─── */

type AuthState = {
  customer: Customer | null;
  clientId: string;
  isAuthenticated: boolean;

  loading: boolean;
  error: string | null;

  login: (login: string, password: string) => Promise<void>;
  register: (data: { phone: string; email: string; password: string; name?: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: { name?: string; email?: string }) => Promise<void>;
  clearError: () => void;
  isLoggedIn: () => boolean;
};

function extractError(err: unknown): string {
  if (err instanceof ApiError) {
    const msg = err.message;
    if (Array.isArray(msg)) return (msg as string[]).join('. ');
    return String(msg);
  }
  if (err instanceof Error) return err.message;
  return 'Невідома помилка';
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      customer: null,
      clientId: getClientId() ?? (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : 'web'),
      isAuthenticated: false,
      loading: false,
      error: null,

      isLoggedIn: () => get().isAuthenticated && !!getAccessToken(),

      login: async (loginValue: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const result = await apiLogin({ login: loginValue, password });
          saveTokens(result.tokens);
          set({
            customer: result.customer,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (err) {
          set({ loading: false, error: extractError(err) });
          throw err;
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const result = await apiRegister(data);
          saveTokens(result.tokens);
          set({
            customer: result.customer,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (err) {
          set({ loading: false, error: extractError(err) });
          throw err;
        }
      },

      logout: () => {
        clearTokens();
        set({ customer: null, isAuthenticated: false, error: null });
      },

      refreshProfile: async () => {
        try {
          const customer = await apiGetMe();
          set({ customer, isAuthenticated: true });
        } catch (err) {
          if (err instanceof ApiError && err.status === 401) {
            try {
              const tokens = await apiRefresh();
              saveTokens(tokens);
              const customer = await apiGetMe();
              set({ customer, isAuthenticated: true });
            } catch {
              clearTokens();
              set({ customer: null, isAuthenticated: false });
            }
          }
        }
      },

      updateProfile: async (data) => {
        set({ loading: true, error: null });
        try {
          const customer = await apiUpdateMe(data);
          set({ customer, loading: false });
        } catch (err) {
          set({ loading: false, error: extractError(err) });
          throw err;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customer: state.customer,
        clientId: state.clientId,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
