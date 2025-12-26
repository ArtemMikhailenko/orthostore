'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Package,
  CheckCircle2,
  Truck,
  Home,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Download,
  Share2,
  ArrowLeft,
  CreditCard,
  Calendar,
  User,
  Copy,
  ExternalLink,
  MessageCircle,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Мокові дані замовлення
const MOCK_ORDER = {
  id: 'ORD-2024-001234',
  status: 'paid',
  statusText: 'Оплачено',
  date: '15 грудня 2024',
  estimatedDelivery: '18-20 грудня 2024',
  paymentMethod: 'card',
  paymentStatus: 'completed',
  total: 16910,
  items: [
    {
      id: '1',
      name: 'Брекети металеві самолігувальні Damon Q',
      brand: 'Ormco',
      price: 15500,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
    },
    {
      id: '4',
      name: 'Набір еластиків для ортодонтії',
      brand: 'Ortho Technology',
      price: 280,
      quantity: 2,
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
    },
    {
      id: '3',
      name: 'Дуги ортодонтичні NiTi термоактивні',
      brand: 'American Orthodontics',
      price: 350,
      quantity: 3,
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
    },
  ],
  customer: {
    name: 'Іван Іваненко',
    phone: '+380 50 123 45 67',
    email: 'ivan.ivanenko@example.com',
  },
  delivery: {
    method: 'Нова Пошта',
    address: 'м. Київ, Відділення №12',
    trackingNumber: 'NP20241215123456',
  },
};

const ORDER_TIMELINE = [
  {
    status: 'ordered',
    title: 'Замовлення оформлено',
    date: '15 грудня, 14:30',
    completed: true,
    icon: FileText,
  },
  {
    status: 'paid',
    title: 'Оплата підтверджена',
    date: '15 грудня, 14:35',
    completed: true,
    icon: CheckCircle2,
  },
  {
    status: 'processing',
    title: 'Готується до відправки',
    date: '16 грудня, 10:00',
    completed: true,
    icon: Package,
    current: true,
  },
  {
    status: 'shipped',
    title: 'Передано в доставку',
    date: 'Очікується 17 грудня',
    completed: false,
    icon: Truck,
  },
  {
    status: 'delivered',
    title: 'Доставлено',
    date: 'Очікується 18-20 грудня',
    completed: false,
    icon: Home,
  },
];

export default function OrderStatusPage() {
  const [activeTab, setActiveTab] = useState<'details' | 'tracking'>('details');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const subtotal = MOCK_ORDER.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 2500;

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
                Замовлення #{MOCK_ORDER.id}
              </h1>
              <p className="text-stone-600">
                Оформлено {MOCK_ORDER.date}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="p-3 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors">
                <Share2 className="w-5 h-5 text-stone-600" />
              </button>
              <button className="p-3 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors">
                <Download className="w-5 h-5 text-stone-600" />
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-emerald-900">{MOCK_ORDER.statusText}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              'px-6 py-3 font-medium transition-all relative',
              activeTab === 'details'
                ? 'text-stone-900'
                : 'text-stone-500 hover:text-stone-700'
            )}
          >
            Деталі замовлення
            {activeTab === 'details' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={cn(
              'px-6 py-3 font-medium transition-all relative',
              activeTab === 'tracking'
                ? 'text-stone-900'
                : 'text-stone-500 hover:text-stone-700'
            )}
          >
            Відстеження
            {activeTab === 'tracking' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'details' && (
              <>
                {/* Order Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Товари в замовленні
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {MOCK_ORDER.items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                        <div className="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-stone-900 mb-1">
                            {item.name}
                          </div>
                          <div className="text-sm text-stone-500 mb-2">{item.brand}</div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-stone-600">
                              Кількість: <span className="font-medium">{item.quantity}</span>
                            </div>
                            <div className="font-semibold text-stone-900">
                              {(item.price * item.quantity).toLocaleString()} ₴
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
                    <div className="flex justify-between text-emerald-600">
                      <span>Знижка:</span>
                      <span className="font-medium">-{discount.toLocaleString()} ₴</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Доставка:</span>
                      <span className="font-medium">Безкоштовно</span>
                    </div>
                    <div className="border-t border-stone-300 pt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold text-stone-900">Всього:</span>
                      <span className="text-2xl font-bold text-stone-900">
                        {MOCK_ORDER.total.toLocaleString()} ₴
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Контактна інформація
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Отримувач</div>
                        <div className="font-medium text-stone-900">{MOCK_ORDER.customer.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Телефон</div>
                        <div className="font-medium text-stone-900">{MOCK_ORDER.customer.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Email</div>
                        <div className="font-medium text-stone-900">{MOCK_ORDER.customer.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Доставка
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-stone-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-stone-500 mb-1">Спосіб доставки</div>
                        <div className="font-medium text-stone-900">{MOCK_ORDER.delivery.method}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-stone-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-stone-500 mb-1">Адреса доставки</div>
                        <div className="font-medium text-stone-900">{MOCK_ORDER.delivery.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-stone-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-stone-500 mb-1">Очікувана дата доставки</div>
                        <div className="font-medium text-stone-900">{MOCK_ORDER.estimatedDelivery}</div>
                      </div>
                    </div>

                    {MOCK_ORDER.delivery.trackingNumber && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-blue-900 font-medium mb-1">
                              Трек-номер
                            </div>
                            <code className="text-sm font-mono text-blue-700">
                              {MOCK_ORDER.delivery.trackingNumber}
                            </code>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(MOCK_ORDER.delivery.trackingNumber)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'tracking' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                  <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Статус замовлення
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-8">
                    {ORDER_TIMELINE.map((step, index) => {
                      const Icon = step.icon;
                      const isLast = index === ORDER_TIMELINE.length - 1;
                      
                      return (
                        <div key={step.status} className="relative">
                          {!isLast && (
                            <div className={cn(
                              "absolute left-5 top-12 w-0.5 h-full -ml-px",
                              step.completed ? "bg-emerald-500" : "bg-stone-200"
                            )} />
                          )}
                          
                          <div className="flex gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10",
                              step.completed 
                                ? "bg-emerald-500 text-white"
                                : step.current
                                ? "bg-stone-900 text-white animate-pulse"
                                : "bg-stone-200 text-stone-400"
                            )}>
                              <Icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1 pt-1">
                              <div className={cn(
                                "font-semibold mb-1",
                                step.current ? "text-stone-900" : "text-stone-700"
                              )}>
                                {step.title}
                              </div>
                              <div className="text-sm text-stone-500">{step.date}</div>
                              
                              {step.current && (
                                <div className="mt-3 bg-stone-50 border border-stone-200 rounded-lg p-3">
                                  <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-stone-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-stone-700">
                                      Менеджер готує ваше замовлення до відправки. Ми повідомимо вас, коли товар буде передано в службу доставки.
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Payment Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden sticky top-6">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Оплата
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Метод оплати:</span>
                  <span className="font-medium text-stone-900">Банківська картка</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Статус:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Оплачено
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-4">Потрібна допомога?</h4>
              <p className="text-sm text-stone-300 mb-4">
                Наша команда підтримки завжди готова відповісти на ваші питання
              </p>
              <button className="w-full bg-white text-stone-900 py-3 rounded-xl hover:bg-stone-100 transition-colors font-medium flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Зв'язатись з підтримкою
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 space-y-3">
                <Link
                  href="/catalog"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors group"
                >
                  <span className="text-stone-700 group-hover:text-stone-900">
                    Продовжити покупки
                  </span>
                  <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:text-stone-600 rotate-180" />
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors group"
                >
                  <span className="text-stone-700 group-hover:text-stone-900">
                    Всі замовлення
                  </span>
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
