'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export function CartButton() {
  const [cartCount] = useState(3); // Заглушка для количества товаров

  return (
    <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </button>
  );
}