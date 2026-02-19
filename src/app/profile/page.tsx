'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  Edit3,
  Package,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const customer = useAuthStore((s) => s.customer);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    refreshProfile();
  }, [isAuthenticated, router, refreshProfile]);

  if (!isAuthenticated || !customer) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-light text-stone-900">Особистий кабінет</h1>
            <p className="text-stone-500 mt-1">Керуйте своїм профілем та замовленнями</p>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Profile Card ── */}
          <div className="lg:col-span-2 bg-white border border-stone-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="text-lg font-medium text-stone-900">Профіль</h2>
              <Link
                href="/profile/edit"
                className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Редагувати
              </Link>
            </div>

            <div className="p-6 space-y-5">
              {/* Avatar placeholder + name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-stone-900 flex items-center justify-center shrink-0">
                  <span className="text-white text-2xl font-medium">
                    {customer.name ? customer.name.charAt(0).toUpperCase() : customer.phone.charAt(1)}
                  </span>
                </div>
                <div>
                  <div className="text-xl font-medium text-stone-900">
                    {customer.name || 'Без імені'}
                  </div>
                  <div className="text-sm text-stone-500">
                    Клієнт з {formatDate(customer.createdAt)}
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-5 space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Телефон</div>
                    <div className="text-stone-900 font-medium">{customer.phone}</div>
                  </div>
                  {customer.isPhoneVerified && (
                    <ShieldCheck className="w-4 h-4 text-green-500 ml-auto" />
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Email</div>
                    <div className="text-stone-900 font-medium">{customer.email || '—'}</div>
                  </div>
                </div>

                {/* Last login */}
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Останній вхід</div>
                    <div className="text-stone-900 font-medium">{formatDateTime(customer.lastLoginAt)}</div>
                  </div>
                </div>

                {/* Registration date */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Дата реєстрації</div>
                    <div className="text-stone-900 font-medium">{formatDate(customer.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="space-y-4">
            <Link
              href="/profile/orders"
              className="flex items-center gap-4 bg-white border border-stone-200 p-5 hover:border-stone-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-900 transition-colors">
                <Package className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-stone-900">Мої замовлення</div>
                <div className="text-sm text-stone-500">Історія та статус</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </Link>

            <Link
              href="/profile/edit"
              className="flex items-center gap-4 bg-white border border-stone-200 p-5 hover:border-stone-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-900 transition-colors">
                <User className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-stone-900">Редагувати профіль</div>
                <div className="text-sm text-stone-500">Ім&apos;я та email</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </Link>

            <Link
              href="/catalog"
              className="flex items-center gap-4 bg-white border border-stone-200 p-5 hover:border-stone-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-900 transition-colors">
                <Shield className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-stone-900">Каталог</div>
                <div className="text-sm text-stone-500">Перейти до покупок</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
