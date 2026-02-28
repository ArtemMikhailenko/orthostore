'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export function CartButton() {
  const open = useCartStore((s) => s.open);
  const totalItems = useCartStore((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button onClick={open} className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
        <ShoppingCart className="w-5 h-5" />
      </button>
    );
  }

  const count = totalItems();

  return (
    <button onClick={open} className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}