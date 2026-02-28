'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, UserPlus, Package, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { customer, isAuthenticated, logout } = useAuthStore();

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
      >
        {isAuthenticated && customer ? (
          <span className="w-8 h-8 bg-stone-900 text-white rounded-lg flex items-center justify-center text-sm font-medium">
            {(customer.name || customer.phone)?.[0]?.toUpperCase() || 'U'}
          </span>
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-stone-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {isAuthenticated && customer ? (
            <>
              {/* User info header */}
              <div className="px-4 py-3 border-b border-stone-100">
                <p className="text-sm font-medium text-stone-900 truncate">
                  {customer.name || customer.phone}
                </p>
                {customer.email && (
                  <p className="text-xs text-stone-500 truncate">{customer.email}</p>
                )}
              </div>

              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Профіль
                </Link>
                <Link
                  href="/profile/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Мої замовлення
                </Link>
              </div>

              <div className="border-t border-stone-100 py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Вийти
                </button>
              </div>
            </>
          ) : (
            <div className="py-1">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Увійти
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
  