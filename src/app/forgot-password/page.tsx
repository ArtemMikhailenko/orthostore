'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { apiForgotPassword } from '@/lib/api/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setLoading(true);
    try {
      await apiForgotPassword(email.trim());
      setSent(true);
    } catch (err: any) {
      // API always returns 201 for security, but handle network errors
      setError(err?.message || 'Помилка з\'єднання. Спробуйте пізніше.');
    } finally {
      setLoading(false);
    }
  };

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
              Відновлення
              <br />
              <span className="font-medium">доступу</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed">
              Ми надішлемо інструкції для скидання пароля на вашу електронну пошту
            </p>
          </div>

          <div className="flex items-center gap-3 text-stone-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Безпечне відновлення · Ваші дані захищені</span>
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

          {sent ? (
            /* ── Success state ── */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-light text-stone-900">Лист надіслано</h1>
                <p className="text-stone-500">
                  Якщо обліковий запис з адресою <span className="font-medium text-stone-700">{email}</span> існує,
                  ви отримаєте лист з інструкціями для скидання пароля.
                </p>
              </div>
              <p className="text-sm text-stone-400">
                Не отримали лист? Перевірте папку «Спам» або спробуйте ще раз через кілька хвилин.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => { setSent(false); setEmail(''); }}
                  className="w-full py-3 border border-stone-300 text-stone-700 font-medium hover:bg-stone-100 transition-colors"
                >
                  Спробувати іншу адресу
                </button>
                <Link
                  href="/login"
                  className="w-full py-3 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors text-center"
                >
                  Повернутися до входу
                </Link>
              </div>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Назад до входу
              </Link>

              <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-light text-stone-900">Забули пароль?</h1>
                <p className="text-stone-500">Введіть email, і ми надішлемо посилання для скидання пароля</p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">Email</label>
                  <div className="relative">
                    <Mail className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                      focused ? 'text-stone-900' : 'text-stone-400'
                    )} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="email@example.com"
                      disabled={loading}
                      required
                      autoFocus
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3.5 font-medium hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Надсилаємо...
                    </>
                  ) : (
                    <>
                      Надіслати посилання
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
