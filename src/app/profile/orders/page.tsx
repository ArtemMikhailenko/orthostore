'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { apiGetMyOrders, type Order } from '@/lib/api/auth';
import {
  Package,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const STATUS_MAP: Record<string, { label: string; color: string; Icon: typeof Package }> = {
  new: { label: 'Нове', color: 'text-blue-600 bg-blue-50 border-blue-200', Icon: Clock },
  processing: { label: 'В обробці', color: 'text-yellow-600 bg-yellow-50 border-yellow-200', Icon: Loader2 },
  done: { label: 'Виконано', color: 'text-green-600 bg-green-50 border-green-200', Icon: CheckCircle2 },
  cancelled: { label: 'Скасовано', color: 'text-red-600 bg-red-50 border-red-200', Icon: XCircle },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_MAP[order.status] || STATUS_MAP.new;
  const StatusIcon = status.Icon;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 hover:bg-stone-50/50 transition-colors text-left"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl flex items-center justify-center shrink-0">
          <StatusIcon className={cn('w-5 h-5', status.color.split(' ')[0])} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
              #{order._id.slice(-8).toUpperCase()}
            </span>
            <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 border text-xs font-medium rounded-full', status.color)}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <div className="text-xs text-stone-400 mt-1.5">{formatDate(order.createdAt)}</div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-bold text-stone-900 text-lg">{order.total.toLocaleString()} ₴</div>
          <div className="text-xs text-stone-500">{order.items.length} товар(ів)</div>
        </div>

        <div className={cn('w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 transition-all duration-300', expanded && 'bg-stone-900')}>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-stone-100 p-5 space-y-4 bg-gradient-to-b from-stone-50/50 to-white">
          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-100">
                <div className="w-12 h-12 bg-stone-100 rounded-lg shrink-0 overflow-hidden">
                  {item.image ? (
                    <Image src={item.image} alt={item.title || item.sku} width={48} height={48} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-stone-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-stone-900 truncate">{item.title}</div>
                  <div className="text-xs text-stone-500">
                    Артикул: {item.sku} · {item.quantity} шт
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold text-stone-900">
                    {(item.price * item.quantity).toLocaleString()} ₴
                  </div>
                  {item.priceOriginal && item.priceOriginal > item.price && (
                    <div className="text-xs text-stone-400 line-through">
                      {(item.priceOriginal * item.quantity).toLocaleString()} ₴
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-white border border-stone-100 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Товари</span>
              <span className="text-stone-900">{order.itemsTotal.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Доставка</span>
              <span className={order.deliveryFee > 0 ? 'text-stone-900' : 'text-green-600 font-medium'}>
                {order.deliveryFee > 0 ? `${order.deliveryFee.toLocaleString()} ₴` : 'Безкоштовно'}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-stone-100">
              <span className="text-stone-900">Разом</span>
              <span className="text-stone-900">{order.total.toLocaleString()} ₴</span>
            </div>
          </div>

          {/* Meta */}
          {order.comment && (
            <div className="text-sm text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
              <span className="font-medium text-stone-700">Коментар:</span> {order.comment}
            </div>
          )}
          {order.name && (
            <div className="text-sm text-stone-500">
              <span className="font-medium text-stone-700">Отримувач:</span> {order.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    apiGetMyOrders(page, limit)
      .then((res) => {
        setOrders(res.items);
        setTotal(res.total);
      })
      .catch(() => {
        // handle silently, orders stay empty
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 bg-white border border-stone-200 hover:border-stone-300 px-4 py-2 rounded-xl transition-all duration-300 mb-8 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад до профілю
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-stone-900 tracking-tight">Мої замовлення</h1>
            <p className="text-stone-500 mt-1">{total > 0 ? `${total} замовлень` : ''}</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-stone-100 rounded-2xl animate-pulse h-24" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium rounded-xl shadow-sm"
                >
                  Назад
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={cn(
                        'w-9 h-9 rounded-lg text-sm font-medium transition-all duration-300',
                        page === i + 1
                          ? 'bg-stone-900 text-white shadow-md'
                          : 'text-stone-500 hover:bg-stone-100'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-5 py-2.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium rounded-xl shadow-sm"
                >
                  Далі
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty state */
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShoppingCart className="w-10 h-10 text-stone-400" />
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-3">Замовлень ще немає</h3>
            <p className="text-stone-500 mb-8 max-w-sm mx-auto">Перейдіть до каталогу, щоб зробити перше замовлення</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 font-medium hover:bg-stone-800 transition-all duration-300 rounded-xl shadow-lg shadow-stone-900/20 hover:-translate-y-0.5"
            >
              <Package className="w-4 h-4" />
              Перейти до каталогу
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
