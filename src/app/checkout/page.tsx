'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  ChevronRight,
  Package,
  Shield,
  Clock,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { useAuthStore } from '@/lib/auth-store';
import { apiCreateOrder } from '@/lib/api/auth';
import { getClientId } from '@/lib/client-id';

const DELIVERY_METHODS = [
  {
    id: 'nova-poshta',
    name: 'Нова Пошта',
    description: 'Доставка у відділення',
    price: 0,
    time: '1-2 дні',
    icon: Package,
  },
  {
    id: 'nova-poshta-courier',
    name: 'Нова Пошта (кур\'єр)',
    description: 'Доставка за адресою',
    price: 100,
    time: '1-2 дні',
    icon: Truck,
  },
  {
    id: 'ukrposhta',
    name: 'Укрпошта',
    description: 'Доставка у відділення',
    price: 0,
    time: '3-5 днів',
    icon: Package,
  },
];

const PAYMENT_METHODS = [
  {
    id: 'card-online',
    name: 'Оплата карткою онлайн',
    description: 'Visa, Mastercard',
    icon: CreditCard,
  },
  {
    id: 'cash-on-delivery',
    name: 'Накладений платіж',
    description: 'Оплата при отриманні',
    icon: Package,
  },
  {
    id: 'bank-transfer',
    name: 'Банківський переказ',
    description: 'На рахунок компанії',
    icon: Shield,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, totalPrice, clear: clearCart } = useCartStore();
  const { customer, isAuthenticated } = useAuthStore();

  const [step, setStep] = useState<'info' | 'delivery' | 'payment' | 'confirm'>('info');
  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_METHODS[0].id);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    comment: '',
  });

  // Pre-fill form from customer profile
  useEffect(() => {
    if (customer) {
      setFormData((prev) => ({
        ...prev,
        firstName: customer.name?.split(' ')[0] || prev.firstName,
        lastName: customer.name?.split(' ').slice(1).join(' ') || prev.lastName,
        phone: customer.phone || prev.phone,
        email: customer.email || prev.email,
      }));
    }
  }, [customer]);

  // Redirect to catalog if cart is empty (unless we just submitted)
  useEffect(() => {
    if (cartItems.length === 0 && !submitting) {
      // Don't redirect instantly — user may be landing
    }
  }, [cartItems, submitting]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = DELIVERY_METHODS.find(m => m.id === selectedDelivery)?.price || 0;
  const total = subtotal + deliveryPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStepComplete = (stepName: string) => {
    switch (stepName) {
      case 'info':
        return formData.firstName && formData.lastName && formData.phone && formData.email;
      case 'delivery':
        return selectedDelivery && formData.city;
      case 'payment':
        return selectedPayment;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-stone-600 mb-8">
          <Link href="/" className="hover:text-stone-900 transition-colors">Головна</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/catalog" className="hover:text-stone-900 transition-colors">Каталог</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-stone-900 font-medium">Оформлення замовлення</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-light text-stone-900 mb-2">
              Оформлення замовлення
            </h1>
            <p className="text-stone-600">
              Залишився всього один крок до отримання вашого замовлення
            </p>
          </div>
          <Link 
            href="/catalog"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Повернутись до каталогу
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { id: 'info', label: 'Контактні дані', icon: User },
              { id: 'delivery', label: 'Доставка', icon: Truck },
              { id: 'payment', label: 'Оплата', icon: CreditCard },
              { id: 'confirm', label: 'Підтвердження', icon: CheckCircle2 },
            ].map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isCompleted = ['info', 'delivery', 'payment', 'confirm'].indexOf(s.id) < ['info', 'delivery', 'payment', 'confirm'].indexOf(step);
              
              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={cn(
                        'w-12 h-12  flex items-center justify-center transition-all duration-300',
                        isCompleted ? 'bg-emerald-500 text-white' :
                        isActive ? 'bg-stone-900 text-white' :
                        'bg-stone-200 text-stone-400'
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={cn(
                      'text-sm font-medium text-center',
                      isActive ? 'text-stone-900' : 'text-stone-500'
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={cn(
                      'h-1 flex-1  transition-all duration-300 mt-6',
                      isCompleted ? 'bg-emerald-500' : 'bg-stone-200'
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Contact Info */}
            <div className={cn(
              'bg-white  shadow-sm border border-stone-200 overflow-hidden transition-all duration-300',
              step === 'info' ? 'ring-2 ring-stone-900' : ''
            )}>
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10  flex items-center justify-center',
                    isStepComplete('info') ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600'
                  )}>
                    {isStepComplete('info') ? <CheckCircle2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">Контактна інформація</h3>
                    <p className="text-sm text-stone-500">Вкажіть ваші дані для зв'язку</p>
                  </div>
                </div>
                {step !== 'info' && (
                  <button
                    onClick={() => setStep('info')}
                    className="text-stone-600 hover:text-stone-900 text-sm font-medium"
                  >
                    Редагувати
                  </button>
                )}
              </div>
              
              {step === 'info' && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Ім'я *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Іван"
                        className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Прізвище *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Іваненко"
                        className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+380 XX XXX XX XX"
                        className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => isStepComplete('info') && setStep('delivery')}
                    disabled={!isStepComplete('info')}
                    className="w-full bg-stone-900 text-white py-3  hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Продовжити
                  </button>
                </div>
              )}

              {step !== 'info' && isStepComplete('info') && (
                <div className="p-6 text-sm text-stone-600">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="text-stone-400">•</div>
                    <div>{formData.phone}</div>
                    <div className="text-stone-400">•</div>
                    <div>{formData.email}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Delivery */}
            <div className={cn(
              'bg-white  shadow-sm border border-stone-200 overflow-hidden transition-all duration-300',
              step === 'delivery' ? 'ring-2 ring-stone-900' : step === 'info' ? 'opacity-50 pointer-events-none' : ''
            )}>
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10  flex items-center justify-center',
                    isStepComplete('delivery') ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600'
                  )}>
                    {isStepComplete('delivery') ? <CheckCircle2 className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">Доставка</h3>
                    <p className="text-sm text-stone-500">Оберіть спосіб доставки</p>
                  </div>
                </div>
                {step !== 'delivery' && isStepComplete('info') && (
                  <button
                    onClick={() => setStep('delivery')}
                    className="text-stone-600 hover:text-stone-900 text-sm font-medium"
                  >
                    Редагувати
                  </button>
                )}
              </div>

              {step === 'delivery' && (
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    {DELIVERY_METHODS.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={cn(
                            'flex items-center gap-4 p-4 border-2  cursor-pointer transition-all',
                            selectedDelivery === method.id
                              ? 'border-stone-900 bg-stone-50'
                              : 'border-stone-200 hover:border-stone-300'
                          )}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            value={method.id}
                            checked={selectedDelivery === method.id}
                            onChange={(e) => setSelectedDelivery(e.target.value)}
                            className="w-5 h-5 text-stone-900"
                          />
                          <Icon className="w-6 h-6 text-stone-600" />
                          <div className="flex-1">
                            <div className="font-medium text-stone-900">{method.name}</div>
                            <div className="text-sm text-stone-500">{method.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-stone-900">
                              {method.price === 0 ? 'Безкоштовно' : `${method.price} ₴`}
                            </div>
                            <div className="text-sm text-stone-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {method.time}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Місто *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Київ"
                      className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Адреса / Відділення
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Відділення №1 або вул. Хрещатик 1"
                      className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={() => isStepComplete('delivery') && setStep('payment')}
                    disabled={!isStepComplete('delivery')}
                    className="w-full bg-stone-900 text-white py-3  hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Продовжити
                  </button>
                </div>
              )}

              {step !== 'delivery' && isStepComplete('delivery') && (
                <div className="p-6 text-sm text-stone-600">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-medium">
                        {DELIVERY_METHODS.find(m => m.id === selectedDelivery)?.name}
                      </span>
                    </div>
                    <div className="text-stone-400">•</div>
                    <div>{formData.city}</div>
                    {formData.address && (
                      <>
                        <div className="text-stone-400">•</div>
                        <div>{formData.address}</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className={cn(
              'bg-white  shadow-sm border border-stone-200 overflow-hidden transition-all duration-300',
              step === 'payment' ? 'ring-2 ring-stone-900' : !isStepComplete('delivery') ? 'opacity-50 pointer-events-none' : ''
            )}>
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10  flex items-center justify-center',
                    isStepComplete('payment') ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600'
                  )}>
                    {isStepComplete('payment') ? <CheckCircle2 className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">Оплата</h3>
                    <p className="text-sm text-stone-500">Оберіть спосіб оплати</p>
                  </div>
                </div>
                {step !== 'payment' && isStepComplete('delivery') && (
                  <button
                    onClick={() => setStep('payment')}
                    className="text-stone-600 hover:text-stone-900 text-sm font-medium"
                  >
                    Редагувати
                  </button>
                )}
              </div>

              {step === 'payment' && (
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={cn(
                            'flex items-center gap-4 p-4 border-2  cursor-pointer transition-all',
                            selectedPayment === method.id
                              ? 'border-stone-900 bg-stone-50'
                              : 'border-stone-200 hover:border-stone-300'
                          )}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="w-5 h-5 text-stone-900"
                          />
                          <Icon className="w-6 h-6 text-stone-600" />
                          <div className="flex-1">
                            <div className="font-medium text-stone-900">
                              {method.name}
                            </div>
                            <div className="text-sm text-stone-500">{method.description}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Коментар до замовлення
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Додаткова інформація для обробки замовлення..."
                      rows={3}
                      className="w-full px-4 py-3 border border-stone-300  focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    onClick={() => setStep('confirm')}
                    className="w-full bg-stone-900 text-white py-3  hover:bg-stone-800 transition-colors font-medium"
                  >
                    Переглянути замовлення
                  </button>
                </div>
              )}

              {step !== 'payment' && isStepComplete('payment') && (
                <div className="p-6 text-sm text-stone-600">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-medium">
                        {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Confirmation */}
            {step === 'confirm' && (
              <div className="bg-white  shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10  bg-stone-900 flex items-center justify-center text-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">Підтвердження замовлення</h3>
                      <p className="text-sm text-stone-500">Перевірте правильність даних</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-emerald-50 border border-emerald-200  p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-emerald-900 mb-1">
                          Ваші дані захищені
                        </div>
                        <div className="text-sm text-emerald-700">
                          Ми використовуємо сучасні технології шифрування для захисту вашої інформації
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div className="text-sm text-red-700">{submitError}</div>
                    </div>
                  )}

                  <button
                    onClick={async () => {
                      setSubmitting(true);
                      setSubmitError(null);
                      try {
                        const clientId = getClientId() || crypto.randomUUID();
                        const idempotencyKey = crypto.randomUUID();
                        const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ');
                        await apiCreateOrder(
                          {
                            phone: formData.phone,
                            clientId,
                            items: cartItems.map((item) => ({
                              productId: item.id,
                              sku: item.id,
                              quantity: item.quantity,
                              price: item.price,
                              title: item.name,
                              options: {},
                            })),
                            deliveryFee: deliveryPrice,
                            name: fullName || undefined,
                            comment: formData.comment || undefined,
                          },
                          idempotencyKey
                        );
                        clearCart();
                        router.push('/order-status');
                      } catch (err: unknown) {
                        const msg = err instanceof Error ? err.message : 'Помилка при оформленні замовлення';
                        setSubmitError(msg);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={submitting || cartItems.length === 0}
                    className="w-full bg-emerald-500 text-white py-4 hover:bg-emerald-600 transition-colors font-semibold text-lg shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Оформлення...
                      </>
                    ) : (
                      'Оформити замовлення'
                    )}
                  </button>

                  <p className="text-xs text-center text-stone-500">
                    Натискаючи кнопку, ви погоджуєтесь з{' '}
                    <a href="#" className="text-stone-900 underline">умовами обслуговування</a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* Cart Items */}
              <div className="bg-white  shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-stone-600" />
                    <h3 className="text-lg font-semibold text-stone-900">
                      Ваше замовлення
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-6 text-stone-500">
                      <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">Кошик порожній</p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-20 h-20 bg-stone-100 overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <Package className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-stone-900 text-sm line-clamp-2">
                            {item.name}
                          </div>
                          {item.brand && (
                            <div className="text-xs text-stone-500 mt-1">{item.brand}</div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-stone-500">
                              Кількість: {item.quantity}
                            </div>
                            <div className="font-semibold text-stone-900">
                              {(item.price * item.quantity).toLocaleString()} ₴
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-white  shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-stone-600">
                    <span>Вартість товарів:</span>
                    <span className="font-medium">{subtotal.toLocaleString()} ₴</span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Доставка:</span>
                    <span className="font-medium">
                      {deliveryPrice === 0 ? 'Безкоштовно' : `${deliveryPrice} ₴`}
                    </span>
                  </div>

                  <div className="border-t border-stone-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-stone-900">Всього:</span>
                      <span className="text-2xl font-bold text-stone-900">
                        {total.toLocaleString()} ₴
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-stone-900 to-stone-800  p-6 text-white">
                <h4 className="font-semibold mb-4">Переваги замовлення</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Гарантія якості</div>
                      <div className="text-stone-300 text-xs">Всі товари сертифіковані</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Швидка доставка</div>
                      <div className="text-stone-300 text-xs">По всій Україні</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Підтримка 24/7</div>
                      <div className="text-stone-300 text-xs">Завжди на зв'язку</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
