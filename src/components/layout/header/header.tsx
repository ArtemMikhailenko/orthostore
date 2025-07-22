'use client'
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
      { 
        title: 'Брекет-системы', 
        href: '/catalog/braces',
        description: 'Металлические, керамические, сапфировые'
      },
      { 
        title: 'Инструменты', 
        href: '/catalog/instruments',
        description: 'Профессиональные ортодонтические инструменты'
      },
      { 
        title: 'Аксессуары', 
        href: '/catalog/accessories',
        description: 'Дуги, лигатуры, эластики'
      },
      { 
        title: 'Материалы', 
        href: '/catalog/materials',
        description: 'Расходные материалы для ортодонтии'
      }
    ]
  },
  {
    title: 'Бренды',
    href: '/brands',
    hasDropdown: true,
    items: [
      { title: '3M Unitek', href: '/brands/3m-unitek', description: 'Премиум системы США' },
      { title: 'Ormco', href: '/brands/ormco', description: 'Инновационные решения' },
      { title: 'American Orthodontics', href: '/brands/american-orthodontics', description: 'Полный спектр продукции' },
      { title: 'Все бренды', href: '/brands', description: 'Полный список партнёров' }
    ]
  },
  {
    title: 'О компании',
    href: '/about'
  },
  {
    title: 'Контакты',
    href: '/contacts'
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
            <div className="flex items-center gap-2 group cursor-pointer">
              <Mail className="w-3 h-3 transition-transform group-hover:scale-110" />
              <span className="text-stone-300 group-hover:text-white transition-colors">
                info@orthodent.pro
              </span>
            </div>
            <div className="text-stone-400 text-xs">
              ПН-ПТ: 9:00-18:00 • СБ-ВС: онлайн 24/7
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-stone-300 hover:text-white transition-all duration-300 text-sm font-medium relative group">
              Стать партнёром
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <div className="w-px h-3 bg-stone-600"></div>
            <button className="text-stone-300 hover:text-white transition-all duration-300 text-sm font-medium relative group">
              Для клиник
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className="w-10 h-10 bg-stone-900 rounded-sm flex items-center justify-center group-hover:bg-stone-800 transition-all duration-300">
        <div className="text-white text-lg font-bold tracking-wide">O</div>
      </div>
      <div className="hidden sm:block">
        <div className="font-bold text-stone-900 text-lg tracking-wide group-hover:text-stone-700 transition-colors">
          OrthoDent
        </div>
        <div className="text-xs text-stone-500 uppercase tracking-widest -mt-1">
          Professional
        </div>
      </div>
    </div>
  );
}

// Navigation Component
function Navigation() {
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
            <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-stone-200 shadow-xl z-50 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <div className="p-6">
                <div className="space-y-4">
                  {item.items?.map((subItem, index) => (
                    <a
                      key={index}
                      href={subItem.href}
                      className="block group/item"
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors">
                        <div className="flex-1">
                          <div className="font-medium text-stone-900 group-hover/item:text-stone-700 transition-colors">
                            {subItem.title}
                          </div>
                          <div className="text-sm text-stone-500 mt-1">
                            {subItem.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover/item:text-stone-600 group-hover/item:translate-x-1 transition-all duration-300" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
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
    'Металлические брекеты',
    'Керамические брекеты', 
    'Ортодонтические дуги',
    'Лигатуры эластичные'
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
          placeholder="Поиск товаров..."
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
                Результаты для "{query}"
              </div>
              <div className="text-sm text-stone-400">
                Поиск в процессе разработки...
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="text-sm font-medium text-stone-900 mb-3">
                Популярные запросы
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
  const [cartCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShoppingCart className={cn(
        "w-5 h-5 transition-transform duration-300",
        isHovered && "scale-110"
      )} />
      {cartCount > 0 && (
        <span className={cn(
          "absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-white text-xs font-bold rounded-full flex items-center justify-center transition-all duration-300",
          isHovered && "scale-110 bg-stone-700"
        )}>
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </button>
  );
}

// User Menu Component
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false);

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
                <a href="/profile" className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  Личный кабинет
                </a>
                <a href="/orders" className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  <Package className="w-4 h-4" />
                  Мои заказы
                </a>
                <a href="/favorites" className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  Избранное
                </a>
                <hr className="my-2 border-stone-200" />
                <button className="w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors">
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
                      <div className="text-xs text-stone-500">{subItem.description}</div>
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
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation />
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar 
                isOpen={isSearchOpen}
                onToggle={() => setIsSearchOpen(!isSearchOpen)}
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
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
    </>
  );
}