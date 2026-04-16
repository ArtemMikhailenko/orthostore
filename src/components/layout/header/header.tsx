'use client'
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  User, 
  Phone, 
  Mail,
  ChevronDown,
  ArrowRight,
  Heart,
  Package
} from 'lucide-react';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { useCartStore } from '@/lib/cart-store';
import { useAuthStore } from '@/lib/auth-store';

interface HeaderProps {
  className?: string;
}

// Navigation Data
interface NavSubItem {
  title: string;
  href: string;
  subcategories?: { title: string; href: string }[];
}
interface NavItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  items?: NavSubItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Каталог',
    href: '/catalog',
  },
  {
    title: 'Про нас',
    href: '/about'
  },
  {
    title: 'Контакти',
    href: '/contacts'
  },
  {
    title: 'Доставка',
    href: '/delivery'
  }
];

// Top Bar Component
function TopBar() {
  return (
    <div className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-2 text-sm">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Phone className="w-3 h-3 transition-transform group-hover:scale-110" />
              <span className="text-stone-300 group-hover:text-white transition-colors">
                +38 (050) 303-94-94
              </span>
            </div>
            <div className="text-stone-400 text-xs">
              ПН-ПТ: 9:00-18:00
            </div>
          </div>
          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a href="https://t.me/orthostore" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all duration-300"
              title="Telegram">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            <a href="viber://chat?number=%2B380503039494" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300"
              title="Viber">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M11.4 1.02C7.77 1.2 4.9 2.6 3.28 5.14 1.94 7.2 1.5 9.81 1.45 13.07c-.02 1.48.22 2.93.71 4.28.71 1.96 2.18 3.4 4.07 4.11l.16.06v2.28c0 .14.09.22.2.17l2.33-1.09c.31-.14.65-.2.99-.16.93.1 1.87.14 2.81.1 3.63-.18 6.5-1.58 8.12-4.12 1.34-2.06 1.78-4.67 1.83-7.93-.06-3.33-.5-5.87-1.87-7.93C19.17 2.53 16.2 1.1 12.57 1c-.39-.01-.78 0-1.17.02zm.76 1.98c3.07.14 5.37 1.26 6.64 3.22 1.08 1.67 1.48 3.89 1.52 6.75-.04 2.93-.44 5.08-1.55 6.75-1.27 1.9-3.57 3.02-6.57 3.18-.82.04-1.65 0-2.47-.09a2.86 2.86 0 0 0-1.57.25l-1.39.66v-1.41c0-.55-.32-1.04-.82-1.27-1.53-.69-2.65-1.82-3.2-3.34a9.97 9.97 0 0 1-.57-3.53c.04-2.86.44-5.08 1.52-6.75C5.07 4.28 7.44 3.14 10.5 3h1.66zM12.22 5.3c-.25.01-.25.38 0 .4 1.95.14 3.6.96 4.58 2.53.55.88.84 1.88.94 2.98.02.25.4.24.38-.01-.1-1.22-.43-2.32-1.05-3.3-1.08-1.74-2.9-2.62-5.03-2.77a.25.25 0 0 0-.17.02l.35.15zm.06 1.62c-.25-.02-.28.35-.03.39 1.3.2 2.3.74 2.92 1.72.37.58.57 1.25.63 2 .02.25.4.23.38-.02-.07-.85-.3-1.61-.73-2.27-.7-1.08-1.78-1.67-3.17-1.82zm-.03 1.6c-.24-.04-.3.32-.07.38.7.16 1.2.5 1.47 1.07.18.38.27.78.3 1.2.01.26.39.24.38-.01-.03-.49-.14-.96-.35-1.4-.36-.73-.96-1.12-1.73-1.24zm-1.73 1.41c-.42-.02-.87.11-1.25.45l-.1.09c-.3.28-.52.6-.58.98-.1.57.12 1.07.44 1.54l.04.05c.82 1.14 1.8 2.1 2.9 2.93.2.15.4.31.62.45l.04.03c.48.32.97.57 1.55.46.38-.07.7-.3.98-.6l.08-.1c.43-.48.52-1.04.21-1.6-.31-.55-.75-.97-1.27-1.3a.87.87 0 0 0-1.04.07l-.47.44c-.15.14-.37.16-.54.05-.4-.26-.77-.56-1.1-.89-.33-.33-.63-.7-.89-1.1a.38.38 0 0 1 .05-.54l.43-.47a.87.87 0 0 0 .07-1.04c-.33-.52-.75-.96-1.3-1.27-.11-.06-.22-.08-.27-.08z"/>
              </svg>
            </a>
            <a href="https://instagram.com/orthostore.ua" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300"
              title="Instagram">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://facebook.com/orthostore.ua" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
              title="Facebook">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://tiktok.com/@orthostore.ua" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-600 transition-all duration-300"
              title="TikTok">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <Link href="/" className="flex items-center group cursor-pointer" aria-label="На головну">
      <span className="text-2xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
        ORTHOSTORE
      </span>
    </Link>
  );
}

// Navigation Component
function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [hoveredSubItem, setHoveredSubItem] = useState<number | null>(null);
  const [subItemTimeout, setSubItemTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = (title: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredSubItem(null);
    }, 200);
    setCloseTimeout(timeout);
  };

  const handleSubItemEnter = (index: number) => {
    if (subItemTimeout) {
      clearTimeout(subItemTimeout);
      setSubItemTimeout(null);
    }
    setHoveredSubItem(index);
  };

  const handleSubItemLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredSubItem(null);
    }, 300);
    setSubItemTimeout(timeout);
  };

  const toggleCategory = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };
  
  return (
    <nav className="flex items-center space-x-1">
      {navigationItems.map((item) => (
        <div
          key={item.title}
          className="relative group"
          onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href={item.href}
            className={cn(
              'flex items-center gap-1 px-4 py-3 text-stone-700 font-medium hover:text-stone-900 transition-all duration-300 relative',
              'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-stone-900 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100'
            )}
          >
            {item.title}
            {item.hasDropdown && (
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            )}
          </a>

          {/* Dropdown Menu */}
          {item.hasDropdown && activeDropdown === item.title && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-stone-200 shadow-xl z-50 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-xl">
              <div className="max-h-[500px] overflow-y-auto p-3">
                <div className="space-y-0.5">
                  {item.items?.map((subItem, index) => (
                    <div 
                      key={index} 
                      className="relative"
                      onMouseEnter={() => {
                        if (subItemTimeout) {
                          clearTimeout(subItemTimeout);
                          setSubItemTimeout(null);
                        }
                        if (subItem.subcategories) {
                          setHoveredSubItem(index);
                        }
                      }}
                      onMouseLeave={() => {
                        if (subItem.subcategories) {
                          handleSubItemLeave();
                        }
                      }}
                    >
                      <a
                        href={subItem.href}
                        className="flex items-center justify-between px-2 py-1.5 transition-colors group/link"
                      >
                        <span className="text-xs font-medium text-stone-900 group-hover/link:underline transition-all">
                          {subItem.title}
                        </span>
                        {subItem.subcategories && (
                          <ArrowRight className="w-3 h-3 text-stone-400 ml-1 flex-shrink-0" />
                        )}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Subcategories rendered outside scroll container */}
              {item.items?.map((subItem, index) => (
                subItem.subcategories && hoveredSubItem === index && (
                  <div 
                    key={`sub-${index}`}
                    className="absolute left-full top-0 w-48 bg-white border border-stone-200 shadow-xl rounded-lg p-2 z-[100]"
                    style={{ 
                      marginTop: `${(index * 28) + 12}px`,
                      marginLeft: '0px'
                    }}
                    onMouseEnter={() => {
                      if (subItemTimeout) {
                        clearTimeout(subItemTimeout);
                        setSubItemTimeout(null);
                      }
                      setHoveredSubItem(index);
                    }}
                    onMouseLeave={handleSubItemLeave}
                  >
                    <div className="space-y-0.5">
                      {subItem.subcategories.map((sub, subIdx) => (
                        <a
                          key={subIdx}
                          href={sub.href}
                          className="block px-2 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

// Search Bar Component
function SearchBar({ isOpen, onToggle, isMobile = false }: { isOpen: boolean; onToggle: () => void; isMobile?: boolean }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const popularSearches = [
    'Металеві брекети',
    'Керамічні брекети', 
    'Ортодонтичні дуги',
    'Лігатури еластичні'
  ];

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Пошук товарів..."
          className={cn(
            'w-full pl-12 pr-4 py-3 border border-stone-300 bg-stone-50 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent focus:bg-white',
            'placeholder-stone-400 transition-all duration-300',
            isMobile ? 'text-base' : 'text-sm'
          )}
        />
      </div>

      {/* Search Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 shadow-xl z-50 rounded-lg overflow-hidden">
          {query ? (
            <div className="p-4">
              <div className="text-sm text-stone-500 mb-3">
                Результати для "{query}"
              </div>
              <div className="text-sm text-stone-400">
                Пошук в процесі розробки...
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="text-sm font-medium text-stone-900 mb-3">
                Популярні запити
              </div>
              <div className="space-y-2">
                {popularSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(item)}
                    className="block w-full text-left text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 p-2 rounded transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Cart Button Component
function CartButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.totalItems());
  const open = useCartStore((s) => s.open);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={open}
      className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Открыть корзину"
    >
      <ShoppingCart
        className={cn(
          "w-5 h-5 transition-transform duration-300",
          isHovered && "scale-110"
        )}
      />
      {mounted && count > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center transition-all duration-300",
            isHovered && "scale-110 bg-stone-700"
          )}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

// User Menu Component
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const customer = useAuthStore((s) => s.customer);
  const logout = useAuthStore((s) => s.logout);

  // Close on click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 text-stone-600 hover:text-stone-900 transition-colors group"
      >
        {isLoggedIn && customer ? (
          <span className="w-7 h-7 bg-stone-900 text-white flex items-center justify-center text-xs font-medium">
            {(customer.name || customer.phone)?.[0]?.toUpperCase() || 'U'}
          </span>
        ) : (
          <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        )}
        <ChevronDown className={cn(
          "w-3 h-3 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-stone-200 shadow-xl z-50 overflow-hidden rounded-lg">
          <div className="p-2">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 text-stone-700">
                  <div className="font-medium">{customer?.name || 'Профіль'}</div>
                  {customer?.phone ? <div className="text-sm text-stone-500">{customer.phone}</div> : null}
                </div>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 transition-colors">
                  <User className="w-4 h-4" />
                  Профіль
                </Link>
                <Link href="/profile/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 transition-colors">
                  <Package className="w-4 h-4" />
                  Мої замовлення
                </Link>
                <hr className="my-2 border-stone-200" />
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 transition-colors">
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-stone-700 hover:bg-stone-50 transition-colors">
                  Увійти
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-stone-700 hover:bg-stone-50 transition-colors">
                  Реєстрація
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Menu Component
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
      <div className="p-6 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <div className="flex items-center">
                <a
                  href={item.href}
                  className="flex-1 py-3 px-4 text-stone-900 font-medium hover:text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {item.title}
                </a>
                {item.hasDropdown && (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      expandedItems.includes(item.title) && "rotate-180"
                    )} />
                  </button>
                )}
              </div>
              
              {item.hasDropdown && expandedItems.includes(item.title) && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-stone-100 pl-4">
                  {item.items?.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      className="block py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      <div className="font-medium">{subItem.title}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-stone-200 p-4">
        <div className="space-y-3">
          <a href="/profile" className="flex items-center gap-3 py-2 px-4 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
            <User className="w-5 h-5" />
            Личный кабинет
          </a>
          <div className="text-xs text-stone-500 px-4">
            <div>+38 (050) 303-94-94</div>
            <div>info@orthodent.pro</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Header Component
export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);
      if (currentY > lastScrollY.current && currentY > 80) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current) {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Scroll-hide wrapper: slides up on scroll down, reappears on scroll up */}
      <div className={cn('fixed top-0 left-0 right-0 z-50 transition-transform duration-300', isHidden ? '-translate-y-full' : 'translate-y-0')}>
        {/* TopBar — desktop only */}
        <div className="hidden lg:block">
          <TopBar />
        </div>

        {/* Main Header */}
        <header
          className={cn(
            'bg-white transition-all duration-300',
            isScrolled
              ? 'shadow-lg border-b border-stone-200 backdrop-blur-sm bg-white/95'
              : 'border-b border-stone-100',
            className
          )}
        >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-end mr-4">
              <Navigation />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3 ml-auto">
              {/* Search Bar */}
              <div className="hidden md:block w-64 lg:w-80">
                <SearchBar 
                  isOpen={isSearchOpen}
                  onToggle={() => setIsSearchOpen(!isSearchOpen)}
                />
              </div>
              {/* Mobile Search */}
              <button
                className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-all duration-300"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <CartButton />

              {/* User Menu */}
              <div className="hidden md:block">
                <UserMenu />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        </header>
      </div>

      {/* Spacer compensates for fixed header height */}
      <div className="h-14 lg:h-[100px]" aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-sm transition-all duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="bg-white w-80 h-full shadow-2xl transform transition-transform duration-300 ease-out" 
            onClick={(e) => e.stopPropagation()}
          >
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 p-4 shadow-lg">
          <SearchBar 
            isOpen={true}
            onToggle={() => setIsSearchOpen(false)}
            isMobile={true}
          />
        </div>
      )}

      {/* Cart Drawer mounted at layout root */}
      <CartDrawer />
    </>
  );
}