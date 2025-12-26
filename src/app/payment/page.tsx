'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft,
  Shield,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Card form
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Order summary
  const orderTotal = 16910;
  const subtotal = 19410;
  const discount = 2500;

  const handleCardPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setPaymentSuccess(true);
      setIsPaying(false);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-light text-stone-900 mb-2">
              Оплата успішна! 🎉
            </h1>
            <p className="text-stone-600 mb-8">
              Ваше замовлення успішно оплачено та прийнято в обробку
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-stone-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Лист-підтвердження надіслано на вашу email</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-stone-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Менеджер зв'яжеться з вами найближчим часом</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/catalog"
                className="px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors font-medium"
              >
                Продовжити покупки
              </Link>
              <Link
                href="/order-status"
                className="px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors font-medium"
              >
                Переглянути замовлення
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-8">
          <Link 
            href="/checkout"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors mb-4 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Повернутись до оформлення
          </Link>
          
          <h1 className="text-4xl font-light text-stone-900 mb-2">
            Оплата замовлення
          </h1>
          <p className="text-stone-600">
            Введіть дані картки для завершення оплати
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Банківська картка
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Номер картки
                  </label>
                  <input
                    type="text"
                    maxLength={19}
                    value={cardForm.number}
                    onChange={(e) => setCardForm({ 
                      ...cardForm, 
                      number: formatCardNumber(e.target.value) 
                    })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Ім'я власника
                  </label>
                  <input
                    type="text"
                    value={cardForm.name}
                    onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    placeholder="IVAN IVANOV"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Термін дії
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardForm.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setCardForm({ ...cardForm, expiry: value });
                      }}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '') })}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent font-mono"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <div className="font-medium mb-1">Безпечна оплата</div>
                    <div className="text-blue-700">
                      Ваші дані захищені шифруванням SSL та не зберігаються на наших серверах
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCardPayment}
                  disabled={isPaying || !cardForm.number || !cardForm.name || !cardForm.expiry || !cardForm.cvv}
                  className="w-full bg-gradient-to-r from-stone-900 to-stone-800 text-white py-4 rounded-xl hover:from-stone-800 hover:to-stone-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-2"
                >
                  {isPaying ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Обробка платежу...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Оплатити {orderTotal.toLocaleString()} ₴
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden sticky top-6">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-lg font-semibold text-stone-900">
                  Деталі замовлення
                </h3>
              </div>

              <div className="p-6 space-y-4">
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
                <div className="border-t border-stone-300 pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-stone-900">До сплати:</span>
                  <span className="text-2xl font-bold text-stone-900">
                    {orderTotal.toLocaleString()} ₴
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
