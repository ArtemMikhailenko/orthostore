'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, close, removeItem, increase, decrease, totalItems, totalPrice, clear } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 bottom-0 z-[61] w-full sm:w-[420px] bg-white shadow-2xl border-l border-stone-200 transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-stone-700" />
            <h2 className="text-lg font-semibold text-stone-900">Корзина</h2>
            <span className="text-sm text-stone-500">{totalItems()} шт.</span>
          </div>
          <button onClick={close} className="p-2 rounded-lg hover:bg-stone-100">
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-500">
              <ShoppingBag className="w-12 h-12 mb-3" />
              <p className="text-sm">Ваша корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 p-3 bg-white border border-stone-200 rounded-xl">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-50 border border-stone-200">
                    {it.imageUrl ? (
                      <Image src={it.imageUrl} alt={it.name} fill className="object-contain" />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium text-stone-900 line-clamp-2">{it.name}</div>
                        {it.brand ? (
                          <div className="text-xs text-stone-500 mt-0.5">{it.brand}</div>
                        ) : null}
                      </div>
                      <button onClick={() => removeItem(it.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => decrease(it.id)} className="p-1.5 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{it.quantity}</span>
                        <button onClick={() => increase(it.id)} className="p-1.5 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm font-semibold text-stone-900">{(it.price * it.quantity).toLocaleString()} ₴</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 p-4 bg-stone-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-stone-600">Итого</span>
            <span className="text-lg font-semibold text-stone-900">{totalPrice().toLocaleString()} ₴</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button onClick={clear} className="text-sm text-stone-500 hover:text-stone-700 underline">Очистить</button>
            <span className="text-xs text-stone-400">Налоги и доставка рассчитываются при оформлении</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Перейти к оформлению
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
