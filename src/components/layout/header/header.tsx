'use client'
import React, { useState, useEffect } from 'react';
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
const navigationItems = [
  {
    title: 'Каталог',
    href: '/catalog',
    hasDropdown: true,
    items: [
      { title: 'ПРОПИСИ БРЕКЕТІВ', href: '/catalog?category=propysy-breketiv' },
      { title: 'МІКРОІМПЛАНТИ', href: '/catalog?category=mikroimplanty' },
      { 
        title: 'МІНІ ПЛАСТИНИ', 
        href: '/catalog?category=mini-plastyny',
        subcategories: [
          { title: 'міні пластини', href: '/catalog?category=mini-plastyny-mini' },
          { title: 'щелепно-лицьова хірургія', href: '/catalog?category=shchelepno-lytsova' },
        ]
      },
      { 
        title: 'БРЕКЕТИ', 
        href: '/catalog?category=brekety',
        subcategories: [
          { title: 'самолігуючі', href: '/catalog?category=samolihuyuchi' },
          { title: 'естетичні', href: '/catalog?category=estetychni' },
          { title: 'лігатурні', href: '/catalog?category=lihaturni' },
        ]
      },
      { title: 'ЩІЧНІ ТРУБКИ ТА МОЛЯРНІ КІЛЬЦЯ', href: '/catalog?category=shchichni-molyarni' },
      { 
        title: 'АТАЧМЕНТИ', 
        href: '/catalog?category=atachments',
        subcategories: [
          { title: 'стопори', href: '/catalog?category=stopory' },
          { title: 'кнопки', href: '/catalog?category=knopky' },
          { title: 'накусочні майданчики', href: '/catalog?category=nakusochni' },
          { title: 'пружини', href: '/catalog?category=pruzhyny' },
          { title: 'металеві лігатури', href: '/catalog?category=metalevi-lihatury' },
        ]
      },
      { title: 'ДУГИ', href: '/catalog?category=duhy' },
      { title: 'ЕЛАСТИЧНІ МАТЕРІАЛИ', href: '/catalog?category=elastychni' },
      { title: 'ФІКСАЦІЙНІ МАТІРІАЛИ', href: '/catalog?category=fiksatsiini' },
      { title: 'РЕТРАКТОРИ', href: '/catalog?category=retraktory' },
      { title: 'ДЗЕРКАЛА ТА ФОТОКОНТРАСТЕРИ', href: '/catalog?category=dzerkala-foto' },
      { title: 'ЗОВНІШНЬОРОТОВІ ПРИСТОСУВАННЯ', href: '/catalog?category=zovnishnorotovi' },
      { title: 'ТРЕЙНЕРА ТА МИОБРЕЙСИ', href: '/catalog?category=treynera-myobreysy' },
      { 
        title: 'МАТЕРІАЛИ ДЛЯ ТЕХНІКІВ', 
        href: '/catalog?category=materialy-tehnikiv',
        subcategories: [
          { title: 'гвинти', href: '/catalog?category=hvynty' },
          { title: 'гвинти MSE', href: '/catalog?category=hvynty-mse' },
          { title: 'пластини для ретенційних кап', href: '/catalog?category=plastyny-retentsiyni' },
          { title: 'пластини для елайнерів', href: '/catalog?category=plastyny-elayneriv' },
          { title: 'пластмасса', href: '/catalog?category=plastmassa' },
          { title: 'відбиткові ложки', href: '/catalog?category=vidbytkovi' },
        ]
      },
      { title: 'СЕПАРАЦІЙНІ ІНСТРУМЕНТИ', href: '/catalog?category=separatsiyni-instrumenty' },
      { title: 'АКСЕСУАРИ', href: '/catalog?category=aksesuari' },
      { 
        title: 'ІНСТРУМЕНТИ', 
        href: '/catalog?category=instrumenty',
        subcategories: [
          { title: 'ORTHOSTORE', href: '/catalog?category=orthostore' },
          { title: 'LE MED', href: '/catalog?category=le-med' },
        ]
      },
    ]
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
    <div className="hidden lg:block bg-stone-900 text-white">
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
              ПН-ПТ: 9:00-18:00 • СБ-НД: онлайн 24/7
            </div>
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
                        className={cn(
                          "flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-stone-50 transition-colors"
                        )}
                      >
                        <span className="text-xs font-medium text-stone-900 hover:text-stone-700 transition-colors">
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
  const count = useCartStore((s) => s.totalItems());
  const open = useCartStore((s) => s.open);

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
      {count > 0 && (
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
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const phone = useAuthStore((s) => s.phone);
  const name = useAuthStore((s) => s.name);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 text-stone-600 hover:text-stone-900 transition-colors group"
      >
        <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        <ChevronDown className={cn(
          "w-3 h-3 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-stone-200 shadow-xl z-50 rounded-lg overflow-hidden">
          <div className="p-2">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 text-stone-700">
                  <div className="font-medium">{name || 'Профиль'}</div>
                  {phone ? <div className="text-sm text-stone-500">{phone}</div> : null}
                </div>
                <a href="/orders" className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  Мои заказы
                </a>
                <a href="/favorites" className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  Избранное
                </a>
                <hr className="my-2 border-stone-200" />
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  Выйти
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  Войти
                </a>
                <a href="/register" className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  Регистрация
                </a>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
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
      <TopBar />
      
      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-white transition-all duration-300',
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
            <div className="hidden lg:block ml-auto mr-6">
              <Navigation />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
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