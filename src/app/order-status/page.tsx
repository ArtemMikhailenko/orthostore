'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Package,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  ArrowLeft,
  CreditCard,
  User,
  Copy,
  MessageCircle,
  Loader2,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/auth-store';
import { apiGetMyOrders, apiGetGuestOrders, type Order } from '@/lib/api/auth';
import { getClientId } from '@/lib/client-id';

/* ─── Status config ─── */
const STATUS_MAP: Record<string, { label: string; color: string; bgColor: string; borderColor: string }> = {
  new: { label: 'Нове замовлення', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  processing: { label: 'В обробці', color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  done: { label: 'Виконано', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  cancelled: { label: 'Скасовано', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
};

const STATUS_ICON: Record<string, React.ElementType> = {
  new: FileText,
  processing: Package,
  done: CheckCircle2,
  cancelled: AlertCircle,
};

/* ─── Timeline builder ─── */
function buildTimeline(order: Order) {
  const steps = [
    { key: 'new', title: 'Замовлення оформлено', icon: FileText },
    { key: 'processing', title: 'В обробці', icon: Package },
    { key: 'done', title: 'Виконано', icon: CheckCircle2 },
  ];

  const statusOrder = ['new', 'processing', 'done'];
  const currentIdx = statusOrder.indexOf(order.status);

  return steps.map((s, i) => ({
    ...s,
    completed: order.status !== 'cancelled' && i <= currentIdx,
    current: order.status !== 'cancelled' && i === currentIdx,
    date: i === 0 ? formatDate(order.createdAt) : i <= currentIdx ? formatDate(order.updatedAt) : 'Очікується',
  }));
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function OrderStatusPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'tracking'>('details');
  const { customer, isAuthenticated } = useAuthStore();

  useEffect(() => {
    async function loadOrder() {
      // 1. Try sessionStorage (just placed order)
      try {
        const raw = sessionStorage.getItem('lastOrder');
        if (raw) {
          setOrder(JSON.parse(raw));
          setLoading(false);
          return;
        }
      } catch { /* ignore */ }

      // 2. Fetch from API
      try {
        if (isAuthenticated) {
          const page = await apiGetMyOrders(1, 1);
          if (page.items.length > 0) {
            setOrder(page.items[0]);
          } else {
            setError('Замовлень не знайдено');
          }
        } else {
          const clientId = getClientId();
          if (customer?.phone && clientId) {
            const orders = await apiGetGuestOrders(customer.phone, clientId);
            if (orders.length > 0) {
              setOrder(orders[orders.length - 1]);
            } else {
              setError('Замовлень не знайдено');
            }
          } else {
            setError('Замовлень не знайдено');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка завантаження');
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [isAuthenticated, customer]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-stone-400 mx-auto mb-4" />
          <p className="text-stone-600">Завантаження замовлення...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-stone-900 mb-2">
            {error || 'Замовлення не знайдено'}
          </h2>
          <p className="text-stone-500 mb-6">
            Перевірте ваші замовлення в особистому кабінеті
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/profile/orders" className="px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors font-medium">
              Мої замовлення
            </Link>
            <Link href="/catalog" className="px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors font-medium">
              Каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.new;
  const StatusIcon = STATUS_ICON[order.status] || FileText;
  const timeline = buildTimeline(order);
  const subtotal = order.itemsTotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/catalog"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors mb-4 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Повернутись до каталогу
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-light text-stone-900 mb-2">
                Замовлення #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-stone-600">
                Оформлено {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={cn('inline-flex items-center gap-2 px-4 py-2 border', statusInfo.bgColor, statusInfo.borderColor)}>
            <StatusIcon className={cn('w-5 h-5', statusInfo.color)} />
            <span className={cn('font-medium', statusInfo.color)}>{statusInfo.label}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              'px-6 py-3 font-medium transition-all relative',
              activeTab === 'details' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'
            )}
          >
            Деталі замовлення
            {activeTab === 'details' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />}
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={cn(
              'px-6 py-3 font-medium transition-all relative',
              activeTab === 'tracking' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'
            )}
          >
            Відстеження
            {activeTab === 'tracking' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {activeTab === 'details' && (
              <>
                {/* Order Items */}
                <div className="bg-white shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Товари в замовленні
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-stone-100 flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <Image src={item.image} alt={item.title || item.sku} width={64} height={64} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-stone-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-stone-900 mb-1">
                            {item.title || item.sku}
                          </div>
                          <div className="text-sm text-stone-500 mb-2">
                            Арт.: {item.sku}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-stone-600">
                              Кількість: <span className="font-medium">{item.quantity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.priceOriginal && item.priceOriginal > item.price && (
                                <span className="text-xs text-stone-400 line-through">
                                  {(item.priceOriginal * item.quantity).toLocaleString()} ₴
                                </span>
                              )}
                              <span className="font-semibold text-stone-900">
                                {(item.price * item.quantity).toLocaleString()} ₴
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3">
                    <div className="flex justify-between text-stone-600">
                      <span>Вартість товарів:</span>
                      <span className="font-medium">{subtotal.toLocaleString()} ₴</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Доставка:</span>
                      <span className="font-medium">
                        {order.deliveryFee > 0 ? `${order.deliveryFee.toLocaleString()} ₴` : 'Безкоштовно'}
                      </span>
                    </div>
                    <div className="border-t border-stone-300 pt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold text-stone-900">Всього:</span>
                      <span className="text-2xl font-bold text-stone-900">
                        {order.total.toLocaleString()} ₴
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-white shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Контактна інформація
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {order.name && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-stone-600" />
                        </div>
                        <div>
                          <div className="text-sm text-stone-500">Отримувач</div>
                          <div className="font-medium text-stone-900">{order.name}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Телефон</div>
                        <div className="font-medium text-stone-900">{order.phone}</div>
                      </div>
                    </div>

                    {order.comment && (
                      <div className="flex items-start gap-3 mt-2">
                        <div className="w-10 h-10 bg-stone-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-stone-600" />
                        </div>
                        <div>
                          <div className="text-sm text-stone-500">Коментар</div>
                          <div className="text-stone-700">{order.comment}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'tracking' && (
              <div className="bg-white shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                  <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Статус замовлення
                  </h3>
                </div>

                <div className="p-6">
                  {order.status === 'cancelled' ? (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-900 mb-1">Замовлення скасовано</div>
                        <div className="text-sm text-red-700">
                          Це замовлення було скасовано. Зверніться до підтримки, якщо маєте питання.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {timeline.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === timeline.length - 1;

                        return (
                          <div key={step.key} className="relative">
                            {!isLast && (
                              <div className={cn(
                                'absolute left-5 top-12 w-0.5 h-full -ml-px',
                                step.completed ? 'bg-emerald-500' : 'bg-stone-200'
                              )} />
                            )}

                            <div className="flex gap-4">
                              <div className={cn(
                                'w-10 h-10 flex items-center justify-center flex-shrink-0 relative z-10',
                                step.completed
                                  ? 'bg-emerald-500 text-white'
                                  : step.current
                                    ? 'bg-stone-900 text-white animate-pulse'
                                    : 'bg-stone-200 text-stone-400'
                              )}>
                                <Icon className="w-5 h-5" />
                              </div>

                              <div className="flex-1 pt-1">
                                <div className={cn(
                                  'font-semibold mb-1',
                                  step.current ? 'text-stone-900' : 'text-stone-700'
                                )}>
                                  {step.title}
                                </div>
                                <div className="text-sm text-stone-500">{step.date}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* Order Summary */}
            <div className="bg-white shadow-sm border border-stone-200 overflow-hidden sticky top-6">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Підсумок
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Статус:</span>
                  <span className={cn('inline-flex items-center gap-1 font-medium', statusInfo.color)}>
                    <StatusIcon className="w-4 h-4" />
                    {statusInfo.label}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Товарів:</span>
                  <span className="font-medium text-stone-900">{order.items.length}</span>
                </div>

                <div className="border-t border-stone-200 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-stone-900">Всього:</span>
                  <span className="text-xl font-bold text-stone-900">{order.total.toLocaleString()} ₴</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => copyToClipboard(order._id)}
                    className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Копіювати ID замовлення
                  </button>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white">
              <h4 className="font-semibold mb-4">Потрібна допомога?</h4>
              <p className="text-sm text-stone-300 mb-4">
                Наша команда підтримки завжди готова відповісти на ваші питання
              </p>
              <Link
                href="/contacts"
                className="w-full bg-white text-stone-900 py-3 hover:bg-stone-100 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Зв&#39;язатись з підтримкою
              </Link>
            </div>

            {/* Quick Links */}
            <div className="bg-white shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 space-y-3">
                <Link
                  href="/catalog"
                  className="flex items-center justify-between p-3 hover:bg-stone-50 transition-colors group"
                >
                  <span className="text-stone-700 group-hover:text-stone-900">Продовжити покупки</span>
                  <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:text-stone-600 rotate-180" />
                </Link>
                <Link
                  href="/profile/orders"
                  className="flex items-center justify-between p-3 hover:bg-stone-50 transition-colors group"
                >
                  <span className="text-stone-700 group-hover:text-stone-900">Всі замовлення</span>
                  <Package className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
