'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Package, Phone, Mail } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: 'Каталог',
    href: '/catalog',
    hasSubmenu: true,
    items: [
      { title: 'Брекет-системы', href: '/catalog/braces' },
      { title: 'Ортодонтические инструменты', href: '/catalog/instruments' },
      { title: 'Дуги и аксессуары', href: '/catalog/accessories' },
      { title: 'Расходные материалы', href: '/catalog/materials' },
    ]
  },
  {
    title: 'Бренды',
    href: '/brands',
    hasSubmenu: true,
    items: [
      { title: '3M Unitek', href: '/brands/3m-unitek' },
      { title: 'Ormco', href: '/brands/ormco' },
      { title: 'American Orthodontics', href: '/brands/american-orthodontics' },
      { title: 'Все бренды', href: '/brands' },
    ]
  },
  {
    title: 'О компании',
    href: '/about'
  },
  {
    title: 'Доставка и оплата',
    href: '/delivery'
  },
  {
    title: 'Контакты',
    href: '/contacts'
  }
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <div className="text-white text-lg font-bold">O</div>
          </div>
          <div>
            <div className="font-bold text-slate-900 text-lg">OrthoDent</div>
            <div className="text-sm text-slate-500">Меню навигации</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              <div className="flex items-center">
                <a
                  href={item.href}
                  className="flex-1 py-4 px-3 text-slate-900 font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {item.title}
                </a>
                {item.hasSubmenu && (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
              
              {item.hasSubmenu && expandedItems.includes(item.title) && (
                <div className="ml-6 mt-2 space-y-1 border-l-2 border-emerald-100 pl-4">
                  {item.items?.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      className="block py-3 px-3 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t border-slate-200 p-4 space-y-3 bg-slate-50">
        <a href="/profile" className="flex items-center gap-3 py-3 px-3 text-slate-700 hover:text-emerald-600 hover:bg-white rounded-lg transition-colors" onClick={onClose}>
          <User className="w-5 h-5" />
          <span className="font-medium">Мой аккаунт</span>
        </a>
        <a href="/orders" className="flex items-center gap-3 py-3 px-3 text-slate-700 hover:text-emerald-600 hover:bg-white rounded-lg transition-colors" onClick={onClose}>
          <Package className="w-5 h-5" />
          <span className="font-medium">Мои заказы</span>
        </a>
        
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600 px-3">
            <Phone className="w-4 h-4" />
            <span>+38 (044) 123-45-67</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 px-3">
            <Mail className="w-4 h-4" />
            <span>info@orthodent.pro</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold mt-4 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg">
          Получить консультацию
        </button>
      </div>
    </div>
  );
}