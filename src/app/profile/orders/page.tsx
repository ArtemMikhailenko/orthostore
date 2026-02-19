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
    <div className="bg-white border border-stone-200 overflow-hidden">
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-mono text-stone-500">
              #{order._id.slice(-8).toUpperCase()}
            </span>
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 border text-xs font-medium', status.color)}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <div className="text-xs text-stone-400 mt-1">{formatDate(order.createdAt)}</div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-bold text-stone-900">{order.total.toLocaleString()} ₴</div>
          <div className="text-xs text-stone-500">{order.items.length} товар(ів)</div>
        </div>

        {expanded ? (
          <ChevronUp className="w-5 h-5 text-stone-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-stone-100 p-5 space-y-4">
          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-stone-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-stone-900 truncate">{item.title}</div>
                  <div className="text-xs text-stone-500">
                    Артикул: {item.sku} · {item.quantity} шт
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-medium text-stone-900">
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
          <div className="border-t border-stone-100 pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Товари</span>
              <span className="text-stone-900">{order.itemsTotal.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Доставка</span>
              <span className="text-stone-900">
                {order.deliveryFee > 0 ? `${order.deliveryFee.toLocaleString()} ₴` : 'Безкоштовно'}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1 border-t border-stone-100">
              <span className="text-stone-900">Разом</span>
              <span className="text-stone-900">{order.total.toLocaleString()} ₴</span>
            </div>
          </div>

          {/* Meta */}
          {order.comment && (
            <div className="text-sm text-stone-500">
              <span className="font-medium">Коментар:</span> {order.comment}
            </div>
          )}
          {order.name && (
            <div className="text-sm text-stone-500">
              <span className="font-medium">Отримувач:</span> {order.name}
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
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад до профілю
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-stone-900">Мої замовлення</h1>
            <p className="text-stone-500 mt-1">{total > 0 ? `${total} замовлень` : ''}</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-stone-100 animate-pulse h-20" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="space-y-3">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Назад
                </button>
                <span className="text-sm text-stone-500 px-4">
                  {page} з {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Далі
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-stone-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-stone-400" />
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-3">Замовлень ще немає</h3>
            <p className="text-stone-500 mb-8">Перейдіть до каталогу, щоб зробити перше замовлення</p>
            <Link
              href="/catalog"
              className="inline-block bg-stone-900 text-white px-8 py-3 font-medium hover:bg-stone-800 transition-colors"
            >
              Перейти до каталогу
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
