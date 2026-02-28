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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-light text-stone-900 tracking-tight">Особистий кабінет</h1>
            <p className="text-stone-500 mt-1">Керуйте своїм профілем та замовленнями</p>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2 px-5 py-2.5 text-stone-600 hover:text-red-600 border border-stone-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300 text-sm font-medium rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Profile Card ── */}
          <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-transparent">
              <h2 className="text-lg font-medium text-stone-900">Профіль</h2>
              <Link
                href="/profile/edit"
                className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-all duration-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Редагувати
              </Link>
            </div>

            <div className="p-6 space-y-5">
              {/* Avatar placeholder + name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-stone-800 to-stone-950 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-stone-900/20">
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

              <div className="border-t border-stone-100 pt-5 space-y-1">
                {/* Phone */}
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-stone-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Телефон</div>
                    <div className="text-stone-900 font-medium">{customer.phone}</div>
                  </div>
                  {customer.isPhoneVerified && (
                    <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Підтверджено</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-stone-500" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Email</div>
                    <div className="text-stone-900 font-medium">{customer.email || '—'}</div>
                  </div>
                </div>

                {/* Last login */}
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-stone-500" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Останній вхід</div>
                    <div className="text-stone-900 font-medium">{formatDateTime(customer.lastLoginAt)}</div>
                  </div>
                </div>

                {/* Registration date */}
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-stone-500" />
                  </div>
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
              className="flex items-center gap-4 bg-white border border-stone-200 p-5 rounded-2xl hover:border-stone-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl flex items-center justify-center shrink-0 group-hover:from-stone-900 group-hover:to-stone-800 transition-all duration-300 shadow-sm">
                <Package className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-stone-900">Мої замовлення</div>
                <div className="text-sm text-stone-500">Історія та статус</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all duration-300" />
            </Link>

            <Link
              href="/profile/edit"
              className="flex items-center gap-4 bg-white border border-stone-200 p-5 rounded-2xl hover:border-stone-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl flex items-center justify-center shrink-0 group-hover:from-stone-900 group-hover:to-stone-800 transition-all duration-300 shadow-sm">
                <User className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-stone-900">Редагувати профіль</div>
                <div className="text-sm text-stone-500">Ім&apos;я та email</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all duration-300" />
            </Link>

            <Link
              href="/catalog"
              className="flex items-center gap-4 bg-white border border-stone-200 p-5 rounded-2xl hover:border-stone-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl flex items-center justify-center shrink-0 group-hover:from-stone-900 group-hover:to-stone-800 transition-all duration-300 shadow-sm">
                <Shield className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-stone-900">Каталог</div>
                <div className="text-sm text-stone-500">Перейти до покупок</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
