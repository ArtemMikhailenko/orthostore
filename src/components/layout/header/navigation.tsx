'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Каталог',
    href: '/catalog',
    hasDropdown: true,
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
    hasDropdown: true,
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

export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center space-x-1">
      {navigationItems.map((item) => (
        <div
          key={item.title}
          className="relative group"
          onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.title)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <a
            href={item.href}
            className={cn(
              'flex items-center gap-1 px-4 py-3 text-slate-700 font-medium hover:text-emerald-600 transition-colors rounded-lg hover:bg-slate-50',
              item.hasDropdown && 'cursor-pointer'
            )}
          >
            {item.title}
            {item.hasDropdown && (
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            )}
          </a>

          {/* Dropdown */}
          {item.hasDropdown && activeDropdown === item.title && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50">
              <div className="py-3">
                {item.items?.map((subItem) => (
                  <a
                    key={subItem.title}
                    href={subItem.href}
                    className="block px-4 py-3 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors font-medium"
                  >
                    {subItem.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}