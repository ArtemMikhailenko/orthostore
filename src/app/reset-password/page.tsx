'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { apiResetPassword } from '@/lib/api/auth';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) return;

    if (password !== confirmPassword) {
      setError('Паролі не збігаються');
      return;
    }
    if (password.length < 6) {
      setError('Пароль має бути не менше 6 символів');
      return;
    }
    if (!token) {
      setError('Токен відсутній. Використайте посилання з листа.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await apiResetPassword(token, password);
      setSuccess(true);
    } catch (err: any) {
      const msg = err?.message || 'Помилка скидання пароля';
      setError(typeof msg === 'string' ? msg : 'Токен невалідний або вже використаний');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-light text-stone-900">Невалідне посилання</h1>
          <p className="text-stone-500">
            Посилання для скидання пароля недійсне або відсутнє. Спробуйте надіслати запит повторно.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-block w-full py-3 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors text-center"
        >
          Запросити нове посилання
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-light text-stone-900">Пароль змінено</h1>
          <p className="text-stone-500">
            Ваш пароль успішно оновлено. Тепер ви можете увійти з новим паролем.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors group"
        >
          Увійти
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-light text-stone-900">Новий пароль</h1>
        <p className="text-stone-500">Введіть новий пароль для вашого облікового запису</p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* New password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Новий пароль</label>
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
              placeholder="Мінімум 6 символів"
              disabled={loading}
              required
              minLength={6}
              autoFocus
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Confirm password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Підтвердіть пароль</label>
          <div className="relative">
            <Lock className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
              focused === 'confirm' ? 'text-stone-900' : 'text-stone-400'
            )} />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocused('confirm')}
              onBlur={() => setFocused(null)}
              placeholder="Повторіть пароль"
              disabled={loading}
              required
              minLength={6}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3.5 font-medium hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group rounded-lg"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Зберігаємо...
            </>
          ) : (
            <>
              Зберегти пароль
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="h-screen bg-stone-50 flex overflow-hidden">
      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-stone-700 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              ORTHOSTORE
            </Link>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl xl:text-5xl font-light text-white leading-tight">
              Скидання
              <br />
              <span className="font-medium">пароля</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed">
              Створіть надійний пароль для захисту вашого облікового запису
            </p>
          </div>

          <div className="flex items-center gap-3 text-stone-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Безпечне з&apos;єднання · Ваші дані захищені</span>
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

          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
