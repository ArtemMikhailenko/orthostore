'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { User, Mail, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProfileEditPage() {
  const router = useRouter();
  const customer = useAuthStore((s) => s.customer);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const storeError = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const error = localError || storeError;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
    }
  }, [isAuthenticated, customer, router]);

  if (!isAuthenticated || !customer) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(false);
    clearError();
    setLoading(true);
    try {
      const patch: { name?: string; email?: string } = {};
      if (name.trim() !== (customer.name || '')) patch.name = name.trim();
      if (email.trim() !== (customer.email || '')) patch.email = email.trim();

      if (Object.keys(patch).length === 0) {
        setSuccess(true);
        setLoading(false);
        return;
      }

      await updateProfile(patch);
      setSuccess(true);
    } catch (err: any) {
      const msg = err?.message || 'Помилка оновлення';
      setLocalError(typeof msg === 'string' ? msg : 'Помилка оновлення профілю');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад до профілю
        </Link>

        <div className="bg-white border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100">
            <h1 className="text-xl font-medium text-stone-900">Редагувати профіль</h1>
            <p className="text-sm text-stone-500 mt-1">Змініть ім&apos;я або email</p>
          </div>

          <div className="p-6">
            {/* Success */}
            {success && (
              <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">Профіль успішно оновлено</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Phone (read-only) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700">
                  Телефон <span className="text-stone-400 font-normal">(не змінюється)</span>
                </label>
                <div className="w-full px-4 py-3 bg-stone-100 border border-stone-200 text-stone-500">
                  {customer.phone}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700">Ім&apos;я</label>
                <div className="relative">
                  <User className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                    focused === 'name' ? 'text-stone-900' : 'text-stone-400'
                  )} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setSuccess(false); }}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Ваше ім'я"
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700">Email</label>
                <div className="relative">
                  <Mail className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                    focused === 'email' ? 'text-stone-900' : 'text-stone-400'
                  )} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSuccess(false); }}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="email@example.com"
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Link
                  href="/profile"
                  className="flex-1 py-3 border border-stone-300 text-stone-700 font-medium hover:bg-stone-100 transition-colors text-center"
                >
                  Скасувати
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white py-3 font-medium hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Зберігаємо...
                    </>
                  ) : (
                    <>
                      Зберегти
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
