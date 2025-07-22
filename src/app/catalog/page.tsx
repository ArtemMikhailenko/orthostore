'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
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

// Enhanced Types
interface Product {
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

// Enhanced Mock Data
const products: Product[] = [
  {
    id: '1',
    name: 'Clarity ADVANCED Ceramic Brackets',
    brand: '3M Unitek',
    category: 'Брекет-системы',
    subcategory: 'Керамические',
    price: 24500,
    originalPrice: 28000,
    rating: 4.8,
    reviews: 127,
    isNew: true,
    isPopular: true,
    isBestseller: false,
    origin: 'США',
    material: 'Керамика',
    certification: ['ISO 13485', 'CE Mark', 'FDA'],
    features: ['Self-ligating', 'Aesthetic', 'Low friction', 'Stain resistant'],
    tags: ['premium', 'aesthetic', 'self-ligating'],
    inStock: true,
    stockLevel: 'high',
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '2',
    name: 'Damon Q Self-Ligating System',
    brand: 'Ormco',
    category: 'Брекет-системы',
    subcategory: 'Металлические',
    price: 32000,
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isPopular: true,
    isBestseller: true,
    origin: 'США',
    material: 'Нержавеющая сталь',
    certification: ['ISO 13485', 'CE Mark'],
    features: ['Passive self-ligating', 'SpinTek', 'Reduced friction', 'Predictable'],
    tags: ['bestseller', 'professional', 'efficient'],
    inStock: true,
    stockLevel: 'medium',
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '3',
    name: 'Spark Clear Aligners',
    brand: 'Ormco',
    category: 'Элайнеры',
    subcategory: 'Прозрачные каппы',
    price: 45000,
    rating: 4.7,
    reviews: 203,
    isNew: true,
    isPopular: false,
    isBestseller: false,
    origin: 'США',
    material: 'TruGEN',
    certification: ['ISO 13485', 'FDA'],
    features: ['Invisible', 'Removable', 'Comfortable', 'Precise'],
    tags: ['innovative', 'invisible', 'modern'],
    inStock: true,
    stockLevel: 'low',
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '4',
    name: 'NiTi Copper Archwires',
    brand: 'Ormco',
    category: 'Дуги',
    subcategory: 'NiTi дуги',
    price: 1850,
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isPopular: true,
    isBestseller: false,
    origin: 'США',
    material: 'NiTi + Copper',
    certification: ['ISO 13485'],
    features: ['Shape memory', 'Heat activated', 'Biocompatible', 'Flexible'],
    tags: ['advanced', 'temperature-activated'],
    inStock: true,
    stockLevel: 'high',
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '5',
    name: 'Professional Orthodontic Kit',
    brand: 'Hu-Friedy',
    category: 'Инструменты',
    subcategory: 'Наборы инструментов',
    price: 28500,
    rating: 4.9,
    reviews: 78,
    isNew: false,
    isPopular: false,
    isBestseller: true,
    origin: 'США',
    material: 'Нержавеющая сталь',
    certification: ['ISO 13485', 'CE Mark'],
    features: ['Ergonomic', 'Autoclavable', 'Precision', 'Durable'],
    tags: ['professional', 'complete-set', 'ergonomic'],
    inStock: true,
    stockLevel: 'medium',
    imageUrl: '/api/placeholder/400/400'
  },
  {
    id: '6',
    name: 'Elastic Power Chain',
    brand: 'American Orthodontics',
    category: 'Эластики',
    subcategory: 'Цепочки',
    price: 650,
    originalPrice: 750,
    rating: 4.4,
    reviews: 289,
    isNew: false,
    isPopular: true,
    isBestseller: false,
    origin: 'США',
    material: 'Латекс',
    certification: ['ISO 13485'],
    features: ['High force', 'Color coded', 'Consistent', 'Biocompatible'],
    tags: ['essential', 'color-variety'],
    colors: ['clear', 'silver', 'blue', 'red', 'green'],
    inStock: true,
    stockLevel: 'high',
    imageUrl: '/api/placeholder/400/400'
  }
];

// Smart Filter Component with Floating UI
function SmartFilters({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Smart filter suggestions based on popular combinations
  const smartSuggestions = [
    { id: 'premium', label: 'Премиум', filters: { certification: ['ISO 13485', 'FDA'], price: [20000, 50000] } },
    { id: 'bestsellers', label: 'Хиты продаж', filters: { isBestseller: true } },
    { id: 'new-arrivals', label: ' Новинки', filters: { isNew: true } },
    { id: 'budget', label: 'Бюджетные', filters: { price: [0, 5000] } },
    { id: 'american', label: 'США', filters: { origin: 'США' } },
    { id: 'self-ligating', label: 'Самолигирующие', filters: { tags: 'self-ligating' } }
  ];

  const filterCategories = [
    {
      id: 'category',
      name: 'Категория',
      type: 'pills',
      options: [
        { value: 'Брекет-системы', label: 'Брекеты', icon: '🦷', count: 2 },
        { value: 'Элайнеры', label: 'Элайнеры', icon: '👁️', count: 1 },
        { value: 'Дуги', label: 'Дуги', icon: '〰️', count: 1 },
        { value: 'Инструменты', label: 'Инструменты', icon: '🔧', count: 1 },
        { value: 'Эластики', label: 'Эластики', icon: '🔗', count: 1 }
      ]
    },
    {
      id: 'brand',
      name: 'Бренд',
      type: 'checkbox',
      options: [
        { value: '3M Unitek', label: '3M Unitek', count: 1 },
        { value: 'Ormco', label: 'Ormco', count: 3 },
        { value: 'Hu-Friedy', label: 'Hu-Friedy', count: 1 },
        { value: 'American Orthodontics', label: 'American Orthodontics', count: 1 }
      ]
    },
    {
      id: 'price',
      name: 'Цена',
      type: 'range',
      min: 0,
      max: 50000,
      step: 1000
    },
    {
      id: 'features',
      name: 'Особенности',
      type: 'tags',
      options: [
        { value: 'aesthetic', label: 'Эстетичные', color: 'bg-pink-100 text-pink-800' },
        { value: 'self-ligating', label: 'Самолигирующие', color: 'bg-blue-100 text-blue-800' },
        { value: 'biocompatible', label: 'Биосовместимые', color: 'bg-green-100 text-green-800' },
        { value: 'autoclavable', label: 'Автоклавируемые', color: 'bg-purple-100 text-purple-800' }
      ]
    }
  ];

  const applySmartSuggestion = (suggestion: any) => {
    setActiveFilters(prev => ({ ...prev, ...suggestion.filters }));
    onFiltersChange({ ...activeFilters, ...suggestion.filters });
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFiltersChange({});
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="relative">
      {/* Filter Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-xl hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md",
          isOpen && "border-stone-900 shadow-md"
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">Фильтры</span>
        {activeFilterCount > 0 && (
          <span className="bg-stone-900 text-white text-xs px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Floating Filter Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute -top-40 left-0 z-50 mt-2 w-96 bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-stone-900">Умные фильтры</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Search in filters */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Поиск по фильтрам..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              
              {/* Smart Suggestions */}
              <div className="p-6 border-b border-stone-100">
                <h4 className="text-sm font-medium text-stone-900 mb-3">Быстрый выбор</h4>
                <div className="grid grid-cols-2 gap-2">
                  {smartSuggestions.map(suggestion => (
                    <button
                      key={suggestion.id}
                      onClick={() => applySmartSuggestion(suggestion)}
                      className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors text-sm"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Categories */}
              <div className="p-6 space-y-6">
                {filterCategories.map(category => (
                  <div key={category.id}>
                    <h4 className="text-sm font-medium text-stone-900 mb-3">
                      {category.name}
                    </h4>
                    
                    {category.type === 'pills' && (
                      <div className="flex flex-wrap gap-2">
                        {category.options?.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              const current = activeFilters[category.id] || [];
                              const newValue = current.includes(option.value)
                                ? current.filter((v: string) => v !== option.value)
                                : [...current, option.value];
                              
                              const newFilters = { ...activeFilters, [category.id]: newValue };
                              setActiveFilters(newFilters);
                              onFiltersChange(newFilters);
                            }}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                              activeFilters[category.id]?.includes(option.value)
                                ? "bg-stone-900 text-white"
                                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                            )}
                          >
                            {/*@ts-ignore*/}
                            <span>{option.icon}</span>
                            <span>{option.label}</span> {/*@ts-ignore*/}
                            <span className="text-xs opacity-60">({option.count})</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {category.type === 'range' && (
                      <div className="space-y-4">
                        <input
                          type="range"
                          min={category.min}
                          max={category.max}
                          step={category.step}
                          value={activeFilters[category.id] || category.max}
                          onChange={(e) => {
                            const newFilters = { ...activeFilters, [category.id]: parseInt(e.target.value) };
                            setActiveFilters(newFilters);
                            onFiltersChange(newFilters);
                          }}
                          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-stone-600">
                          <span>{category.min?.toLocaleString()} ₴</span>
                          <span className="font-medium">
                            {(activeFilters[category.id] || category.max)?.toLocaleString()} ₴
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                Очистить
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                Применить
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Advanced Product Card with Magnetic Hover
function ProductCard({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
          <Package className="w-16 h-16 text-stone-400" />
        </div>

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
          <button className="w-full bg-stone-900 text-white py-2.5 rounded-xl font-medium hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2">
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
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !product.brand.toLowerCase().includes(searchLower) &&
            !product.category.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Category filter
      //@ts-ignore
      if (filters.category && filters.category.length > 0) {
        //@ts-ignore
        if (!filters.category.includes(product.category)) return false;
      }

      // Brand filter
      //@ts-ignore
      if (filters.brand && filters.brand.length > 0) {
         //@ts-ignore
        if (!filters.brand.includes(product.brand)) return false;
      }

      // Price filter
       //@ts-ignore
      if (filters.price && product.price > filters.price) {
        return false;
      }

      // Features filter
       //@ts-ignore
      if (filters.features && filters.features.length > 0) {
         //@ts-ignore
        const hasFeature = filters.features.some((feature: string) => 
          product.tags.includes(feature) || 
          product.features.some(f => f.toLowerCase().includes(feature))
        );
        if (!hasFeature) return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'new':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // popular
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return filtered;
  }, [filters, searchTerm, sortBy]);

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
                {filteredProducts.length} из {products.length} товаров
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
            <SmartFilters onFiltersChange={setFilters} />
            
            {/* Active Filters Display */}
            {Object.keys(filters).length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-stone-600">Активные фильтры:</span>
                {Object.entries(filters).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">{key}:</span>
                    <span className="text-stone-600">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </span>
                    <button
                      onClick={() => {
                        const newFilters = { ...filters };
                         //@ts-ignore
                        delete newFilters[key];
                        setFilters(newFilters);
                      }}
                      className="ml-1 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
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
          
          {filteredProducts.length === 0 && (
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
        {filteredProducts.length > 0 ? (
          <div className={cn(
            "gap-8 mb-12",
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-6"
          )}>
            {filteredProducts.map(product => (
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
        {filteredProducts.length > 0 && filteredProducts.length >= 6 && (
          <div className="text-center">
            <button className="bg-white border border-stone-300 text-stone-900 px-8 py-3 rounded-xl hover:bg-stone-50 hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md">
              Загрузить ещё товары
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