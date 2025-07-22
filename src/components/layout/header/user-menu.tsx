'use client';

import React, { useState } from 'react';
import { User, ChevronDown, LogIn, UserPlus, Settings, Package, LogOut } from 'lucide-react';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Заглушка для состояния авторизации

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
          <div className="py-2">
            {isLoggedIn ? (
              // Авторизованный пользователь
              <>
                <a href="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Профиль
                </a>
                <a href="/orders" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Мои заказы
                </a>
                <a href="/settings" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Настройки
                </a>
                <hr className="my-2 border-gray-200" />
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Выйти
                </button>
              </>
            ) : (
              // Неавторизованный пользователь
              <>
                <a href="/login" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Войти
                </a>
                <a href="/register" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Регистрация
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )}
  