'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getClientId } from '@/lib/client-id';

type AuthState = {
  phone?: string;
  name?: string;
  clientId: string;
  isLoggedIn: () => boolean;
  login: (phone: string, name?: string) => void;
  register: (name: string, phone: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      phone: undefined,
      name: undefined,
  clientId: getClientId() ?? (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : 'web'),
      isLoggedIn: () => Boolean(get().phone),
      login: (phone, name) => set({ phone, name }),
      register: (name, phone) => set({ name, phone }),
      logout: () => set({ phone: undefined, name: undefined }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ phone: state.phone, name: state.name, clientId: state.clientId }),
    }
  )
);
