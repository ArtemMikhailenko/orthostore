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
            <a href="https://wa.me/380503039494" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300"
              title="WhatsApp">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.46-.01z"/>
              </svg>
            </a>
            <a href="https://t.me/orthostore" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all duration-300"
              title="Telegram">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
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