'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { Phone, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const storeError = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const error = localError || storeError;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginValue.trim() || !password.trim()) return;
    setLocalError(null);
    clearError();
    setLoading(true);
    try {
      await login(loginValue.trim(), password);
      router.push('/');
    } catch (err: any) {
      // error is set in the store, but also set locally for immediate display
      const msg = err?.message || 'Невірний логін або пароль';
      setLocalError(typeof msg === 'string' ? msg : 'Невірний логін або пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-50 flex overflow-hidden">
      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.04),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-stone-700 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              ORTHOSTORE
            </Link>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl xl:text-5xl font-light text-white leading-tight">
              Все для сучасної
              <br />
              <span className="font-medium">ортодонтії</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed">
              Професійне обладнання та матеріали від провідних світових брендів
            </p>

            <div className="flex gap-12 pt-4">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-stone-500 mt-1">Товарів</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-stone-500 mt-1">Брендів</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-sm text-stone-500 mt-1">Років досвіду</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-stone-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Безпечний вхід · Ваші дані захищені</span>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-12 text-center">
            <Link href="/" className="text-2xl font-bold text-stone-900 tracking-tight">
              ORTHOSTORE
            </Link>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-light text-stone-900">Вхід</h1>
            <p className="text-stone-500">Введіть email або телефон та пароль</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Login (email or phone) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">Email або телефон</label>
              <div className="relative">
                <Phone className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                  focused === 'login' ? 'text-stone-900' : 'text-stone-400'
                )} />
                <input
                  type="text"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  onFocus={() => setFocused('login')}
                  onBlur={() => setFocused(null)}
                  placeholder="email@example.com або +380..."
                  disabled={loading}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-stone-700">Пароль</label>
                <Link href="/forgot-password" className="text-xs text-stone-500 hover:text-stone-900 transition-colors">
                  Забули пароль?
                </Link>
              </div>
              <div className="relative">
                <Lock className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                  focused === 'password' ? 'text-stone-900' : 'text-stone-400'
                )} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="Ваш пароль"
                  disabled={loading}
                  required
                  minLength={6}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3.5 font-medium hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group rounded-lg"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Входимо...
                </>
              ) : (
                <>
                  Увійти
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-stone-50 px-4 text-sm text-stone-400">або</span>
            </div>
          </div>

          {/* Register link */}
          <div className="text-center">
            <p className="text-stone-500 text-sm">
              Немає облікового запису?{' '}
              <Link href="/register" className="text-stone-900 font-medium hover:underline underline-offset-4">
                Зареєструватися
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
