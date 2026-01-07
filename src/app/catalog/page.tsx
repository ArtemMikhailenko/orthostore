"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CatalogStructure } from '@/components/sections/catalog/CatalogStructure';
import { useProducts, useManufacturers, useCategories, useCountries } from '@/lib/api/hooks';
import type { ProductWithDiscounts } from '@/lib/api/public.types';
import { pickI18n } from '@/snippets/i18n';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutList, 
  Star, 
  Heart, 
  ShoppingCart,
  Eye,
  Filter,
  X,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Shield,
  Package,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart-store';

// UI product used by ProductCard
interface UiProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isNew: boolean;
  isPopular: boolean;
  isBestseller: boolean;
  origin: string;
  material: string;
  certification: string[];
  features: string[];
  tags: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  stockLevel: 'high' | 'medium' | 'low';
  imageUrl: string;
  gallery?: string[];
}

function mapApiToUi(
  p: ProductWithDiscounts,
  lookups: {
    manufacturers: Map<string, string>;
    categories: Map<string, string>;
    countries: Map<string, string>;
  },
  lang: 'uk' | 'en' = 'uk'
): UiProduct {
  const title = pickI18n(p.titleI18n as any, lang) || p.slug;
  const price = (p as any).priceMinFinal ?? p.priceMin ?? 0;
  const originalPrice = p.priceMin && (p as any).priceMinFinal && (p as any).priceMinFinal < p.priceMin ? p.priceMin : undefined;
  const isNew = p.createdAt ? Date.now() - new Date(p.createdAt).getTime() < 1000 * 60 * 60 * 24 * 30 : false;
  const image = p.images && p.images[0] ? p.images[0] : '';
  const mId = p.manufacturerIds?.[0];
  const brandName = (mId && lookups.manufacturers.get(mId)) || '';
  const cId = p.categoryIds?.[0];
  const categoryName = (cId && lookups.categories.get(cId)) || '';
  const coId = p.countryIds?.[0];
  const countryName = (coId && lookups.countries.get(coId)) || '';
  return {
    id: (p._id as string) || p.slug,
    name: title,
    brand: brandName || p.slug,
    category: categoryName || 'Каталог',
    price,
    originalPrice,
    rating: 0,
    reviews: 0,
    isNew,
    isPopular: p.tags?.includes('popular') ?? false,
    isBestseller: p.tags?.includes('stock') ?? false,
    origin: countryName,
    material: '',
    certification: [],
    features: p.attributes?.map(a => `${a.key}: ${String(a.value)}`) ?? [],
    tags: p.tags ?? [],
    inStock: !!p.isActive,
    stockLevel: 'high',
    imageUrl: image,
  };
}

// Backend-aware filters per API docs
type CatalogFilters = {
  category?: string; // ObjectId
  manufacturerId?: string[];
  countryId?: string[];
  priceFrom?: number;
  priceTo?: number;
  tags?: string[];
};

function SmartFilters({
  categories,
  manufacturers,
  countries,
  value,
  onChange,
}: {
  categories: { _id?: string; slug: string; nameI18n: any }[] | undefined;
  manufacturers: { _id?: string; nameI18n: any }[] | undefined;
  countries: { _id?: string; nameI18n: any }[] | undefined;
  value: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const categoryId = value.category;
  const manufacturerIds = Array.isArray(value.manufacturerId) ? value.manufacturerId : (value.manufacturerId ? [value.manufacturerId] : []);
  const countryIds = Array.isArray(value.countryId) ? value.countryId : (value.countryId ? [value.countryId] : []);
  const priceTo = value.priceTo ?? 50000;

  const setFilter = (patch: Partial<CatalogFilters>) => onChange({ ...value, ...patch });
  const clear = () => onChange({});

  const toggleCategory = (idx: number) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-xl hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md',
          isOpen && 'border-stone-900 shadow-md'
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">Фильтры</span>
        {(categoryId || manufacturerIds.length || countryIds.length || value.priceFrom || value.priceTo) && (
          <span className="bg-stone-900 text-white text-xs px-2 py-0.5 rounded-full">
            {[
              categoryId ? 1 : 0,
              manufacturerIds.length ? 1 : 0,
              countryIds.length ? 1 : 0,
              value.priceFrom || value.priceTo ? 1 : 0,
            ].reduce((a, b) => a + b, 0)}
          </span>
        )}
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 h-screen min-h-screen w-screen z-[100] bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 z-[101] h-screen w-96 bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-stone-900">Фільтри</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-6 space-y-6">
              {/* Catalog Categories */}
              <div>
                <h4 className="text-sm font-medium text-stone-900 mb-3">Категорії</h4>
                <div className="space-y-1">
                  {[
                    { name: 'ПРОПИШИ БРЕКЕТІВ' },
                    { name: 'БРЕКЕТИ', sub: ['самолігуючі', 'естетичні', 'металеві'] },
                    { name: 'ЩІЧНІ ТРУБКИ' },
                    { name: 'МОЛЯРНІ КІЛЬЦЯ' },
                    { name: 'АТАЧМЕНТИ', sub: ['стопи', 'кнопки', 'накусочні майданчики', 'пружини'] },
                    { name: 'ДУГИ' },
                    { name: 'ЕЛАСТИЧНИЙ МАТЕРІАЛ' },
                    { name: 'ФІКСАЦІЙНИЙ МАТЕРІАЛ' },
                    { name: 'РЕТРАКТОРИ' },
                    { name: 'ДЗЕРКАЛА ТА КОНТРАСТЕРИ' },
                    { name: 'ЗОВНІШНЬОРОТОВІ ПРИСТОСУВАННЯ' },
                    { name: 'АКСЕСУАРИ ДЛЯ ПАЦІЄНТА' },
                    { name: 'МАТЕРІАЛ ДЛЯ ТЕХНІКІВ', sub: ['гвинти', 'пластини', 'пластмаса', 'відбиткові ложки'] },
                    { name: 'СЕПАРЦІЙНІ ПРИЛАДИ' },
                    { name: 'МІКРОІМПЛАНТИ' },
                    { name: 'ІНСТРУМЕНТ' },
                  ].map((cat, idx) => (
                    <div key={idx}>
                      <button 
                        onClick={() => cat.sub && toggleCategory(idx)}
                        className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-between group"
                      >
                        <span className="font-medium">{cat.name}</span>
                        {cat.sub && (
                          <ChevronDown className={cn(
                            "w-4 h-4 text-stone-400 transition-transform duration-200",
                            expandedCategories.has(idx) && "rotate-180"
                          )} />
                        )}
                      </button>
                      {cat.sub && expandedCategories.has(idx) && (
                        <div className="ml-4 mt-1 space-y-1">
                          {cat.sub.map((subcat, subIdx) => (
                            <button key={subIdx} className="w-full text-left px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-50 rounded-lg transition-colors italic">
                              {subcat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category (single) */}
              <div>
                <h4 className="text-sm font-medium text-stone-900 mb-3">Категория</h4>
                <div className="flex flex-wrap gap-2">
                  {categories?.map(c => {
                    const id = c._id as string;
                    const label = pickI18n(c.nameI18n as any, 'uk');
                    const selected = categoryId === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setFilter({ category: selected ? undefined : id })}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                          selected ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Manufacturers (multi) */}
              <div>
                <h4 className="text-sm font-medium text-stone-900 mb-3">Бренды</h4>
                <div className="grid grid-cols-2 gap-2">
                  {manufacturers?.map(m => {
                    const id = m._id as string;
                    const label = pickI18n(m.nameI18n as any, 'uk');
                    const selected = manufacturerIds.includes(id);
                    return (
                      <label key={id} className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border', selected ? 'border-stone-900 bg-stone-50' : 'border-stone-200')}> 
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...manufacturerIds, id]
                              : manufacturerIds.filter((x: string) => x !== id);
                            setFilter({ manufacturerId: next.length ? next : undefined });
                          }}
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Countries (multi) */}
              <div>
                <h4 className="text-sm font-medium text-stone-900 mb-3">Страны</h4>
                <div className="grid grid-cols-2 gap-2">
                  {countries?.map(co => {
                    const id = co._id as string;
                    const label = pickI18n(co.nameI18n as any, 'uk');
                    const selected = countryIds.includes(id);
                    return (
                      <label key={id} className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border', selected ? 'border-stone-900 bg-stone-50' : 'border-stone-200')}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...countryIds, id]
                              : countryIds.filter((x: string) => x !== id);
                            setFilter({ countryId: next.length ? next : undefined });
                          }}
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price To */}
              <div>
                <h4 className="text-sm font-medium text-stone-900 mb-3">Цена до</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    step={500}
                    value={priceTo}
                    onChange={(e) => setFilter({ priceTo: parseInt(e.target.value, 10) || undefined })}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>0 ₴</span>
                    <span className="font-medium">{priceTo.toLocaleString()} ₴</span>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-4 border-t border-stone-200 bg-stone-50 flex gap-3">
              <button onClick={clear} className="flex-1 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors font-medium">Очистити</button>
              <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium">Застосувати</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Advanced Product Card with Magnetic Hover
function ProductCard({ product, viewMode }: { product: UiProduct; viewMode: 'grid' | 'list' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const stockColor = {
    high: 'text-green-600',
    medium: 'text-yellow-600', 
    low: 'text-red-600'
  }[product.stockLevel];

  const stockIcon = {
    high: CheckCircle2,
    medium: Clock,
    low: Zap
  }[product.stockLevel];

  const StockIcon = stockIcon;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
        "hover:shadow-2xl hover:shadow-stone-900/10",
        "border border-stone-200/50 hover:border-stone-300",
        viewMode === 'list' ? "flex" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)` : 'none'
      }}
    >
      
      {/* Magnetic Glow Effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
          "bg-gradient-to-br from-stone-900/5 via-transparent to-stone-900/5",
          isHovered && "opacity-100"
        )}
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${((mousePosition.x + 20) / 40) * 100}% ${((mousePosition.y + 20) / 40) * 100}%, rgba(0,0,0,0.1) 0%, transparent 50%)`
            : undefined
        }}
      />

      {/* Image Section */}
      <div className={cn(
        "relative overflow-hidden",
        viewMode === 'list' ? "w-48 h-48" : "aspect-square"
      )}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes={viewMode === 'list' ? '(max-width: 768px) 12rem, 12rem' : '(max-width: 1280px) 50vw, 25vw'}
            className="object-contain"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
            <Package className="w-16 h-16 text-stone-400" />
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              NEW
            </div>
          )}
          {product.isBestseller && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              HIT
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Floating Actions */}
        <div className={cn(
          "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        )}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={cn(
              "p-2 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg",
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-stone-600 hover:bg-white hover:text-red-500"
            )}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </button>
          
          <button className="p-2 bg-white/80 backdrop-blur-md text-stone-600 hover:bg-white hover:text-stone-900 rounded-full transition-all duration-300 shadow-lg">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        )}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, brand: product.brand }, 1);
              openCart();
            }}
            className="w-full bg-stone-900 text-white py-2.5 rounded-xl font-medium hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Добавить в корзину
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        
        {/* Brand & Name */}
        <div>
          <div className="text-sm text-stone-500 font-medium">{product.brand}</div>
          <h3 className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  i < Math.floor(product.rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-stone-300"
                )} 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-stone-700">{product.rating}</span>
          <span className="text-sm text-stone-400">({product.reviews})</span>
        </div>

        {/* Features Tags */}
        <div className="flex flex-wrap gap-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index} 
              className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price & Stock */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-stone-900">
              {product.price.toLocaleString()} ₴
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through">
                {product.originalPrice.toLocaleString()} ₴
              </span>
            )}
          </div>
          
          <div className={cn("flex items-center gap-1 text-sm font-medium", stockColor)}>
            <StockIcon className="w-4 h-4" />
            <span>
              {product.stockLevel === 'high' && 'В наличии'}
              {product.stockLevel === 'medium' && 'Заканчивается'}
              {product.stockLevel === 'low' && 'Последние экземпляры'}
            </span>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex items-center gap-1 pt-2 border-t border-stone-100">
          {product.certification.slice(0, 2).map((cert, index) => (
            <div key={index} className="flex items-center gap-1 text-xs text-stone-600">
              <Shield className="w-3 h-3" />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Modern Search with AI Suggestions
function SmartSearch({ onSearch }: { onSearch: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    'Самолигирующие брекеты',
    'Керамические брекеты',
    'Элайнеры прозрачные',
    'Ортодонтические дуги',
    'Набор инструментов'
  ];

  useEffect(() => {
    if (searchTerm.length > 2) {
      // Simulate AI-powered search suggestions
      const filtered = popularSearches.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  return (
    <div className="relative flex-1 max-w-lg">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(searchTerm.length > 2)}
          placeholder="Поиск товаров..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-300 shadow-sm focus:shadow-md"
        />
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            <div className="text-sm font-medium text-stone-900 mb-3">Предложения</div>
            <div className="space-y-2">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      onSearch(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left p-2 text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))
              ) : (
                <div className="text-sm text-stone-500">Ничего не найдено</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Catalog Component
export default function ModernCatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<CatalogFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);
  const limit = 24;

  const sortParam = useMemo(() => {
    switch (sortBy) {
      case 'price-low':
        return 'priceMinFinal';
      case 'price-high':
        return '-priceMinFinal';
      case 'name':
        return 'titleI18n.uk';
      case 'new':
        return '-createdAt';
      case 'rating':
        return undefined; // нет рейтинга на бэке — оставим сортировку по умолчанию
      default:
        return '-createdAt';
    }
  }, [sortBy]);

  const { data, isLoading, isFetching, error } = useProducts({
    qLike: searchTerm || undefined,
    sort: sortParam,
    page,
    limit,
    category: filters.category,
    manufacturerId: filters.manufacturerId,
    countryId: filters.countryId,
    priceFrom: filters.priceFrom,
    priceTo: filters.priceTo,
    tags: filters.tags,
  });
  const { data: manufacturers } = useManufacturers();
  const { data: categories } = useCategories();
  const { data: countries } = useCountries();

  const manufacturerMap = useMemo(() => {
    const map = new Map<string, string>();
    manufacturers?.forEach(m => map.set(m._id as string, pickI18n(m.nameI18n as any, 'uk')));
    return map;
  }, [manufacturers]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories?.forEach(c => map.set(c._id as string, pickI18n(c.nameI18n as any, 'uk')));
    return map;
  }, [categories]);

  const countryMap = useMemo(() => {
    const map = new Map<string, string>();
    countries?.forEach(co => map.set(co._id as string, pickI18n(co.nameI18n as any, 'uk')));
    return map;
  }, [countries]);

  // агрегируем страницы для кнопки "Загрузить ещё"
  const [items, setItems] = useState<ProductWithDiscounts[]>([]);
  const total = data?.total ?? 0;

  // сброс при изменении поиска/фильтров/сортировки
  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [searchTerm, JSON.stringify(filters), sortBy]);

  // добавляем текущую страницу
  useEffect(() => {
    if (data?.items) {
      setItems(prev => (page === 1 ? data.items : [...prev, ...data.items]));
    }
  }, [data, page]);

  const uiProducts: UiProduct[] = useMemo(
    () => items.map(p => mapApiToUi(p, { manufacturers: manufacturerMap, categories: categoryMap, countries: countryMap })),
    [items, manufacturerMap, categoryMap, countryMap]
  );

  const sortOptions = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price-low', label: 'Цена ↑' },
    { value: 'price-high', label: 'Цена ↓' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'name', label: 'По алфавиту' },
    { value: 'new', label: 'Новинки первыми' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white">
      
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-stone-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left: Title & Breadcrumbs */}
            <div className="flex-1">
              <div className="text-sm text-stone-500 mb-2 font-medium">
                Главная / Каталог
              </div>
              <h1 className="text-4xl font-light text-stone-900 tracking-tight">
                Каталог продукции
              </h1>
              <p className="text-stone-600 mt-2">
                {uiProducts.length} из {total} товаров
              </p>
            </div>

            {/* Right: Search & Controls */}
            <div className="flex items-center gap-4 lg:w-auto w-full">
              
              {/* Smart Search */}
              <SmartSearch onSearch={setSearchTerm} />

              {/* Sort Selector */}
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-stone-300 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex border border-stone-300 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-3 transition-all duration-300',
                    viewMode === 'grid' 
                      ? 'bg-stone-900 text-white shadow-lg' 
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-3 transition-all duration-300',
                    viewMode === 'list' 
                      ? 'bg-stone-900 text-white shadow-lg' 
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  )}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Filters */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-200/50">
            <SmartFilters 
              categories={categories}
              manufacturers={manufacturers}
              countries={countries}
              value={filters}
              onChange={setFilters}
            />
            
            {/* Active Filters Display */}
            {Object.keys(filters).length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-stone-600">Активные фильтры:</span>
                {filters.category && (
                  <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">Категория:</span>
                    <span className="text-stone-600">{pickI18n(categories?.find((c: any) => c._id === filters.category)?.nameI18n as any, 'uk')}</span>
                    <button onClick={() => setFilters({ ...filters, category: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                  </div>
                )}
                {filters.manufacturerId?.length ? (
                  <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">Бренды:</span>
                    <span className="text-stone-600">{filters.manufacturerId.map((id: string) => pickI18n(manufacturers?.find((m: any) => m._id === id)?.nameI18n as any, 'uk')).join(', ')}</span>
                    <button onClick={() => setFilters({ ...filters, manufacturerId: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                  </div>
                ) : null}
                {filters.countryId?.length ? (
                  <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">Страны:</span>
                    <span className="text-stone-600">{filters.countryId.map((id: string) => pickI18n(countries?.find((co: any) => co._id === id)?.nameI18n as any, 'uk')).join(', ')}</span>
                    <button onClick={() => setFilters({ ...filters, countryId: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                  </div>
                ) : null}
                {(filters.priceFrom || filters.priceTo) && (
                  <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">Цена:</span>
                    <span className="text-stone-600">{filters.priceFrom ? `${filters.priceFrom.toLocaleString()}₴` : ''}{filters.priceFrom && filters.priceTo ? ' — ' : ''}{filters.priceTo ? `до ${filters.priceTo.toLocaleString()}₴` : ''}</span>
                    <button onClick={() => setFilters({ ...filters, priceFrom: undefined, priceTo: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-light text-stone-900">
              Результаты поиска
            </h2>
            {searchTerm && (
              <span className="text-stone-600">
                по запросу "{searchTerm}"
              </span>
            )}
          </div>
          
          {uiProducts.length === 0 && (
            <button 
              onClick={() => {
                setFilters({});
                setSearchTerm('');
              }}
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              Сбросить фильтры
            </button>
          )}
        </div>

        {/* Products */}
        {isLoading && uiProducts.length === 0 ? (
          <div className="text-center py-20 text-stone-600">Загрузка…</div>
        ) : uiProducts.length > 0 ? (
          <div className={cn(
            "gap-8 mb-12",
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-6"
          )}>
            {uiProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-stone-400" />
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-4">
              Товары не найдены
            </h3>
            <p className="text-stone-600 mb-8">
              Попробуйте изменить параметры поиска или фильтры
            </p>
            <button 
              onClick={() => {
                setFilters({});
                setSearchTerm('');
              }}
              className="bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}

        {/* Load More */}
        {uiProducts.length > 0 && (page * limit < total) && (
          <div className="text-center">
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={isFetching}
              className="bg-white border border-stone-300 text-stone-900 px-8 py-3 rounded-xl hover:bg-stone-50 hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetching ? 'Загрузка…' : 'Загрузить ещё товары'}
            </button>
          </div>
        )}
      </div>

      {/* Floating Quick Actions */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button className="w-12 h-12 bg-stone-900 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-white border border-stone-300 text-stone-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Custom Styles for Range Slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1c1917;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1c1917;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}