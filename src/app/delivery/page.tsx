'use client';

import React from 'react';
import { Truck, CreditCard, Shield, Clock, Globe, MapPin, Package, ArrowRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white">
      {/* Hero */}
      <section className="bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="text-sm text-stone-500 mb-2 font-medium">Главная / Доставка</div>
              <h1 className="text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">Доставка и оплата</h1>
              <p className="text-stone-600 mt-3 max-w-2xl">
                Быстрая и надёжная доставка по всей Украине. Выбирайте удобный способ получения и оплаты — мы позаботимся об остальном.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3"><Truck className="w-5 h-5"/>Новая Почта</div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3"><MapPin className="w-5 h-5"/>Самовывоз Киев</div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3"><Clock className="w-5 h-5"/>Отправка в день заказа</div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3"><Shield className="w-5 h-5"/>Гарантия сохранности</div>
            </div>
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Новая Почта */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-stone-700"/>
              <h3 className="text-lg font-semibold text-stone-900">Доставка Новой Почтой</h3>
            </div>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• Отправка в отделение или на адрес (курьер)</li>
              <li>• Срок доставки: 1–2 рабочих дня</li>
              <li>• Стоимость по тарифам Новой Почты</li>
              <li>• Наложенный платёж — по тарифам перевозчика</li>
            </ul>
          </div>

          {/* Самовывоз */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-stone-700"/>
              <h3 className="text-lg font-semibold text-stone-900">Самовывоз в Киеве</h3>
            </div>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• График: Пн–Пт 09:00–18:00</li>
              <li>• Подтвердите наличие перед визитом</li>
              <li>• Оплата на месте: наличные/карта</li>
              <li>• Удобно забрать в тот же день</li>
            </ul>
          </div>

          {/* Отправка и сроки */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-stone-700"/>
              <h3 className="text-lg font-semibold text-stone-900">Сроки и условия</h3>
            </div>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• Заказы, оформленные до 15:00 — отправляем в день заказа</li>
              <li>• В период повышенной нагрузки возможны задержки перевозчика</li>
              <li>• Мы аккуратно упаковываем товары для безопасной доставки</li>
              <li>• При получении проверяйте целостность упаковки</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="bg-white border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-5 h-5 text-stone-700"/>
            <h2 className="text-2xl font-semibold text-stone-900">Оплата</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">Онлайн оплата картой</h3>
              <p className="text-sm text-stone-600">Visa/Mastercard через защищённые платежные шлюзы.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">Оплата при получении</h3>
              <p className="text-sm text-stone-600">Наложенный платёж по тарифам Новой Почты.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">Безналичный расчёт</h3>
              <p className="text-sm text-stone-600">Для клиник и организаций — по реквизитам.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-5 h-5 text-stone-700"/>
          <h2 className="text-2xl font-semibold text-stone-900">Частые вопросы</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="font-medium text-stone-900 mb-2">Можно ли вернуть товар?</div>
            <div className="text-sm text-stone-600">Да, в соответствии с Законом Украины о защите прав потребителей и условиями возврата медицинских товаров, при сохранении целостности упаковки.</div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="font-medium text-stone-900 mb-2">Как отследить посылку?</div>
            <div className="text-sm text-stone-600">После отправки вы получите ТТН Новой Почты. Отслеживание доступно на сайте перевозчика.</div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="font-medium text-stone-900 mb-2">Есть ли бесплатная доставка?</div>
            <div className="text-sm text-stone-600">Периодически проводим акции. Следите за баннерами на сайте и в соцсетях.</div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="font-medium text-stone-900 mb-2">Работаете с клиниками?</div>
            <div className="text-sm text-stone-600">Да. Предоставляем счета и закрывающие документы. Свяжитесь с нами — подберём оптимальные условия.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Нужна помощь с заказом?</h3>
            <p className="text-stone-300">Позвоните — подскажем удобный способ доставки и оплаты</p>
          </div>
          <a href="tel:+380503039494" className="inline-flex items-center gap-2 bg-white text-stone-900 px-5 py-3 rounded-xl hover:bg-stone-100 transition-colors">
            <Phone className="w-4 h-4"/> +38 (050) 303-94-94
          </a>
        </div>
      </section>
    </div>
  );
}
