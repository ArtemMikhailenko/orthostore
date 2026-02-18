'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { Phone, User, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !name.trim()) return;
    setLoading(true);
    try {
      register(name.trim(), phone.trim());
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-50 flex overflow-hidden">
      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.04),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-stone-700 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              ORTHOSTORE
            </Link>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl xl:text-5xl font-light text-white leading-tight">
              Приєднуйтесь до
              <br />
              <span className="font-medium">професіоналів</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed">
              Створіть обліковий запис, щоб отримати доступ до повного каталогу та спеціальних цін
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-stone-800 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <span className="text-stone-300">Швидка реєстрація за 30 секунд</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-stone-800 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">2</span>
                </div>
                <span className="text-stone-300">Доступ до всього каталогу продукції</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-stone-800 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <span className="text-stone-300">Персональні ціни та знижки</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-stone-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Безпечна реєстрація · Ваші дані захищені</span>
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
            <h1 className="text-3xl font-light text-stone-900">Реєстрація</h1>
            <p className="text-stone-500">Заповніть дані, щоб створити профіль</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
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
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Ваше ім'я"
                  disabled={loading}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">Телефон</label>
              <div className="relative">
                <Phone className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                  focused === 'phone' ? 'text-stone-900' : 'text-stone-400'
                )} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  placeholder="+380 50 123 45 67"
                  inputMode="tel"
                  disabled={loading}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">
                Email <span className="text-stone-400 font-normal">(необов&apos;язково)</span>
              </label>
              <div className="relative">
                <Mail className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
                  focused === 'email' ? 'text-stone-900' : 'text-stone-400'
                )} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="email@example.com"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3.5 font-medium hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Створюємо...
                </>
              ) : (
                <>
                  Зареєструватися
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

          {/* Login link */}
          <div className="text-center">
            <p className="text-stone-500 text-sm">
              Вже є обліковий запис?{' '}
              <Link href="/login" className="text-stone-900 font-medium hover:underline underline-offset-4">
                Увійти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
