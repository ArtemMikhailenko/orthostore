"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useProducts, useManufacturers, useCategories, useCountries } from '@/lib/api/hooks';
import type { ProductWithDiscounts } from '@/lib/api/public.types';
import { pickI18n } from '@/snippets/i18n';
import {
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  X,
  ChevronDown,
  ChevronLeft,
  ArrowUpDown,
  Sparkles,
  TrendingUp,
  Zap,
  Shield,
  Package,
  Clock,
  CheckCircle2,
  LayoutGrid,
  List,
} from 'lucide-react';

/* ─── Hardcoded slug→name map (always resolves) ─── */
const SLUG_NAME_MAP: Record<string, string> = {
  brekety: 'Брекети',
  dugy: 'Дуги',
  mikroimplanty: 'Мікроімпланти',
  'propysy-breketiv': 'Прописи брекетів',
  instrumenty: 'Інструменти',
  'mini-plastyny': 'Міні пластини',
  attachmenty: 'Атачменти',
  'shichni-trubky': 'Щічні трубки та молярні кільця',
  'elastychni-materialy': 'Еластичні матеріали',
  'materialy-dlia-tekh': 'Матеріали для техніків',
  'fiksatsiyni-materialy': 'Фіксаційні матеріали',
  retraktory: 'Ретрактори',
  'dzerkala-fotokontr': 'Дзеркала та фотоконтрастери',
  'treynera-myobreysy': 'Трейнера та миобрейси',
  zovnishnyorotovi: 'Зовнішньоротові пристосування',
  'separatsiyni-instr': 'Сепараційні інструменти',
  aksesuary: 'Аксесуари',
};
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';

/* ─────── UiProduct type ─────── */
interface UiProduct {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isNew: boolean;
  isPopular: boolean;
  isBestseller: boolean;
  origin: string;
  features: string[];
  tags: string[];
  inStock: boolean;
  stockLevel: 'high' | 'medium' | 'low';
  certification: string[];
  imageUrl: string;
}

function mapApiToUi(
  p: ProductWithDiscounts,
  lookups: {
    manufacturers: Map<string, string>;
    categories: Map<string, string>;
    countries: Map<string, string>;
  },
  lang: 'uk' | 'en' = 'uk',
): UiProduct {
  const title = pickI18n(p.titleI18n as any, lang) || p.slug;
  const price = (p as any).priceMinFinal ?? p.priceMin ?? 0;
  const originalPrice =
    p.priceMin && (p as any).priceMinFinal && (p as any).priceMinFinal < p.priceMin ? p.priceMin : undefined;
  const isNew = p.createdAt ? Date.now() - new Date(p.createdAt).getTime() < 1000 * 60 * 60 * 24 * 30 : false;
  const image = p.images?.[0] ?? '';
  const mId = p.manufacturerIds?.[0];
  const brandName = (mId && lookups.manufacturers.get(mId)) || '';
  const cId = p.categoryIds?.[0];
  const categoryName = (cId && lookups.categories.get(cId)) || '';
  const coId = p.countryIds?.[0];
  const countryName = (coId && lookups.countries.get(coId)) || '';
  const firstVariant = p.variants?.[0];
  return {
    id: (p._id as string) || p.slug,
    sku: firstVariant?.sku || (p._id as string) || p.slug,
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
    features: p.attributes?.map(a => `${a.key}: ${String(a.value)}`) ?? [],
    tags: p.tags ?? [],
    inStock: !!p.isActive,
    stockLevel: 'high',
    certification: [],
    imageUrl: image,
  };
}

/* ─────── Filters type ─────── */
type CatalogFilters = {
  manufacturerId?: string[];
  countryId?: string[];
  priceFrom?: number;
  priceTo?: number;
  tags?: string[];
};

/* ─────── SmartFilters sidebar ─────── */
function SmartFilters({
  manufacturers,
  countries,
  value,
  onChange,
}: {
  manufacturers: { _id?: string; nameI18n: any }[] | undefined;
  countries: { _id?: string; nameI18n: any }[] | undefined;
  value: CatalogFilters;
  onChange: (f: CatalogFilters) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const manufacturerIds = Array.isArray(value.manufacturerId) ? value.manufacturerId : value.manufacturerId ? [value.manufacturerId] : [];
  const countryIds = Array.isArray(value.countryId) ? value.countryId : value.countryId ? [value.countryId] : [];
  const priceTo = value.priceTo ?? 50000;
  const setFilter = (patch: Partial<CatalogFilters>) => onChange({ ...value, ...patch });
  const clear = () => onChange({});

  const activeCount = [
    manufacturerIds.length ? 1 : 0,
    countryIds.length ? 1 : 0,
    value.priceFrom || value.priceTo ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 rounded-xl hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm',
          isOpen && 'border-stone-900 shadow-md',
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">Фільтри</span>
        {activeCount > 0 && (
          <span className="bg-stone-900 text-white text-xs px-2 py-0.5 rounded-full">{activeCount}</span>
        )}
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      {/* Portal: overlay + panel rendered outside sticky header to avoid backdrop-filter containment */}
      {mounted && createPortal(
        <>
          {/* Overlay */}
          <div
            className={cn(
              'fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm transition-opacity duration-300',
              isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <aside
            className={cn(
              'fixed left-0 top-0 bottom-0 z-[101] w-96 max-w-[90vw] bg-white shadow-2xl border-r border-stone-200 rounded-r-2xl transition-transform duration-300 ease-out flex flex-col',
              isOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className="flex-shrink-0 p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-stone-700" />
                <h3 className="text-lg font-semibold text-stone-900">Фільтри</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-6 space-y-6">
                {/* Manufacturers */}
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-3">Бренди</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {manufacturers?.map(m => {
                      const id = m._id as string;
                      const label = pickI18n(m.nameI18n as any, 'uk');
                      const selected = manufacturerIds.includes(id);
                      return (
                        <label key={id} className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all', selected ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300')}>
                          <input type="checkbox" checked={selected} className="rounded" onChange={e => {
                            const next = e.target.checked ? [...manufacturerIds, id] : manufacturerIds.filter(x => x !== id);
                            setFilter({ manufacturerId: next.length ? next : undefined });
                          }} />
                          <span className="text-sm">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                {/* Countries */}
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-3">Країни</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {countries?.map(co => {
                      const id = co._id as string;
                      const label = pickI18n(co.nameI18n as any, 'uk');
                      const selected = countryIds.includes(id);
                      return (
                        <label key={id} className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all', selected ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300')}>
                          <input type="checkbox" checked={selected} className="rounded" onChange={e => {
                            const next = e.target.checked ? [...countryIds, id] : countryIds.filter(x => x !== id);
                            setFilter({ countryId: next.length ? next : undefined });
                          }} />
                          <span className="text-sm">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-3">Ціна до</h4>
                  <input
                    type="range"
                    min={0} max={100000} step={500}
                    value={priceTo}
                    onChange={e => setFilter({ priceTo: parseInt(e.target.value, 10) || undefined })}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-stone-600 mt-2">
                    <span>0 ₴</span>
                    <span className="font-medium">{priceTo.toLocaleString()} ₴</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 p-4 border-t border-stone-200 bg-stone-50 rounded-br-2xl flex gap-3">
              <button onClick={clear} className="flex-1 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors font-medium rounded-xl">Очистити</button>
              <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors font-medium">Застосувати</button>
            </div>
          </aside>
        </>,
        document.body
      )}
    </div>
  );
}

/* ─────── Product Card ─────── */
function ProductCard({ product }: { product: UiProduct }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.open);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const stockColor = { high: 'text-green-600', medium: 'text-yellow-600', low: 'text-red-600' }[product.stockLevel];
  const StockIcon = { high: CheckCircle2, medium: Clock, low: Zap }[product.stockLevel];

  return (
    <div
      className={cn(
        'group relative bg-white overflow-hidden transition-all duration-500 cursor-pointer rounded-2xl',
        'hover:shadow-2xl hover:shadow-stone-900/10',
        'border border-stone-200/50 hover:border-stone-300',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)` : 'none',
      }}
    >
      {/* Magnetic Glow */}
      <div
        className={cn('absolute inset-0 opacity-0 transition-opacity duration-500', isHovered && 'opacity-100')}
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${((mousePosition.x + 20) / 40) * 100}% ${((mousePosition.y + 20) / 40) * 100}%, rgba(0,0,0,0.1) 0%, transparent 50%)`
            : undefined,
        }}
      />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 1280px) 50vw, 25vw" className="object-contain" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center rounded-t-2xl">
            <Package className="w-16 h-16 text-stone-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3" />NEW
            </div>
          )}
          {product.isBestseller && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />HIT
            </div>
          )}
          {discount > 0 && <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">-{discount}%</div>}
        </div>

        {/* Floating actions */}
        <div className={cn('absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300', isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4')}>
          <button onClick={e => { e.stopPropagation(); setIsFavorite(!isFavorite); }} className={cn('p-2 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg', isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-stone-600 hover:bg-white hover:text-red-500')}>
            <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-md text-stone-600 hover:bg-white hover:text-stone-900 rounded-full transition-all duration-300 shadow-lg">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick add */}
        <div className={cn('absolute bottom-0 left-0 right-0 p-4 transition-all duration-500', isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full')}>
          <button
            onClick={e => { e.stopPropagation(); addItem({ id: product.id, sku: product.sku, name: product.name, price: product.price, imageUrl: product.imageUrl, brand: product.brand }, 1); openCart(); }}
            className="w-full bg-stone-900 text-white py-2.5 font-medium hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
          >
            <ShoppingCart className="w-4 h-4" />
            Додати в кошик
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <div className="text-sm text-stone-500 font-medium">{product.brand}</div>
          <h3 className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 leading-tight">{product.name}</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn('w-3.5 h-3.5 transition-colors', i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300')} />
            ))}
          </div>
          <span className="text-sm font-medium text-stone-700">{product.rating}</span>
          <span className="text-sm text-stone-400">({product.reviews})</span>
        </div>

        {/* {product.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((f, i) => (
              <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md font-medium">{f}</span>
            ))}
          </div>
        )} */}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-stone-900">{product.price.toLocaleString()} ₴</span>
            {product.originalPrice && <span className="text-sm text-stone-400 line-through">{product.originalPrice.toLocaleString()} ₴</span>}
          </div>
          <div className={cn('flex items-center gap-1 text-sm font-medium', stockColor)}>
            <StockIcon className="w-4 h-4" />
            <span>
              {product.stockLevel === 'high' && 'В наявності'}
              {product.stockLevel === 'medium' && 'Закінчується'}
              {product.stockLevel === 'low' && 'Останні екземпляри'}
            </span>
          </div>
        </div>

        {product.certification.length > 0 && (
          <div className="flex items-center gap-1 pt-2 border-t border-stone-100">
            {product.certification.slice(0, 2).map((cert, i) => (
              <div key={i} className="flex items-center gap-1 text-xs text-stone-600">
                <Shield className="w-3 h-3" /><span>{cert}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────── Product List Card (horizontal) ─────── */
function ProductListCard({ product }: { product: UiProduct }) {
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.open);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const stockColor = { high: 'text-green-600', medium: 'text-yellow-600', low: 'text-red-600' }[product.stockLevel];
  const StockIcon = { high: CheckCircle2, medium: Clock, low: Zap }[product.stockLevel];

  return (
    <div className="group flex bg-white border border-stone-200/50 hover:border-stone-300 hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl">
      {/* Image */}
      <div className="relative w-36 sm:w-44 shrink-0 bg-stone-50 rounded-l-2xl overflow-hidden">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-3" sizes="176px" />
        ) : (
          <div className="flex items-center justify-center h-full"><Package className="w-10 h-10 text-stone-300" /></div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-medium">
              <Sparkles className="w-2.5 h-2.5" />NEW
            </div>
          )}
          {product.isBestseller && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-medium">
              <TrendingUp className="w-2.5 h-2.5" />HIT
            </div>
          )}
          {discount > 0 && <div className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">-{discount}%</div>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 p-4">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-stone-500 font-medium">{product.brand}</div>
          <h3 className="font-semibold text-stone-900 text-sm leading-tight line-clamp-2">{product.name}</h3>
          {product.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {product.features.slice(0, 2).map((f, i) => (
                <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium">{f}</span>
              ))}
            </div>
          )}
          <div className={cn('flex items-center gap-1 text-xs font-medium mt-1.5', stockColor)}>
            <StockIcon className="w-3 h-3" />
            <span>{product.stockLevel === 'high' ? 'В наявності' : product.stockLevel === 'medium' ? 'Закінчується' : 'Останні'}</span>
          </div>
        </div>

        {/* Price + cart */}
        <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0">
            <span className="text-lg font-bold text-stone-900">{product.price.toLocaleString()} ₴</span>
            {product.originalPrice && <span className="text-xs text-stone-400 line-through">{product.originalPrice.toLocaleString()} ₴</span>}
          </div>
          <button
            onClick={() => { addItem({ id: product.id, sku: product.sku, name: product.name, price: product.price, imageUrl: product.imageUrl, brand: product.brand }, 1); openCart(); }}
            className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 hover:bg-stone-800 transition-colors text-sm font-medium rounded-xl"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">В кошик</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────── Main Category Products Page ─────── */
export default function CategoryProductsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [filters, setFilters] = useState<CatalogFilters>({});
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const limit = 24;

  // fetch categories to resolve slug → _id
  const { data: categories } = useCategories();
  const { data: manufacturers } = useManufacturers();
  const { data: countries } = useCountries();

  const currentCategory = useMemo(
    () => categories?.find(c => c.slug === slug),
    [categories, slug],
  );
  const categoryId = currentCategory?._id as string | undefined;
  const categoryName = SLUG_NAME_MAP[slug] || (currentCategory ? pickI18n(currentCategory.nameI18n as any, 'uk') : '') || slug;

  const sortParam = useMemo(() => {
    switch (sortBy) {
      case 'price-low': return 'priceMinFinal';
      case 'price-high': return '-priceMinFinal';
      case 'name': return 'titleI18n.uk';
      case 'new': return '-createdAt';
      default: return '-createdAt';
    }
  }, [sortBy]);

  const { data, isLoading, isFetching } = useProducts({
    sort: sortParam,
    page,
    limit,
    category: categoryId,
    manufacturerId: filters.manufacturerId,
    countryId: filters.countryId,
    priceFrom: filters.priceFrom,
    priceTo: filters.priceTo,
    tags: filters.tags,
  });

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

  const [items, setItems] = useState<ProductWithDiscounts[]>([]);
  const total = data?.total ?? 0;

  useEffect(() => { setPage(1); setItems([]); }, [JSON.stringify(filters), sortBy, categoryId]);
  useEffect(() => {
    if (data?.items) setItems(prev => (page === 1 ? data.items : [...prev, ...data.items]));
  }, [data, page]);

  const uiProducts: UiProduct[] = useMemo(
    () => items.map(p => mapApiToUi(p, { manufacturers: manufacturerMap, categories: categoryMap, countries: countryMap })),
    [items, manufacturerMap, categoryMap, countryMap],
  );

  const sortOptions = [
    { value: 'popular', label: 'За популярністю' },
    { value: 'price-low', label: 'Ціна ↑' },
    { value: 'price-high', label: 'Ціна ↓' },
    { value: 'name', label: 'За алфавітом' },
    { value: 'new', label: 'Новинки першими' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-stone-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">

          {/* Breadcrumbs */}
          <div className="text-sm text-stone-400 mb-3 font-medium flex items-center gap-1">
            <Link href="/" className="hover:text-stone-600 transition-colors">Головна</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-stone-600 transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-stone-600">{categoryName || slug}</span>
          </div>

          {/* Title row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Link href="/catalog" className="p-2 -ml-2 rounded-lg hover:bg-stone-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </Link>
              <h1 className="text-3xl font-light text-stone-900 tracking-tight truncate">
                {categoryName}
              </h1>
              <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full shrink-0">{total} товарів</span>
            </div>

            {/* Sort + View + Filters */}
            <div className="flex items-center gap-3">
              {/* View mode toggle */}
              <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn('p-2.5 transition-colors', viewMode === 'grid' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-600')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn('p-2.5 transition-colors', viewMode === 'list' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-600')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-stone-300 rounded-xl px-4 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all shadow-sm"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>

              {/* Filters */}
              <SmartFilters manufacturers={manufacturers} countries={countries} value={filters} onChange={setFilters} />
            </div>
          </div>

          {/* Active filters */}
          {Object.keys(filters).length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-stone-200/50">
              <span className="text-sm text-stone-500">Фільтри:</span>
              {filters.manufacturerId?.length ? (
                <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">Бренди:</span>
                  <span className="text-stone-600">{filters.manufacturerId.map(id => manufacturerMap.get(id) || id).join(', ')}</span>
                  <button onClick={() => setFilters({ ...filters, manufacturerId: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                </div>
              ) : null}
              {filters.countryId?.length ? (
                <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">Країни:</span>
                  <span className="text-stone-600">{filters.countryId.map(id => countryMap.get(id) || id).join(', ')}</span>
                  <button onClick={() => setFilters({ ...filters, countryId: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                </div>
              ) : null}
              {(filters.priceFrom || filters.priceTo) && (
                <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">Ціна:</span>
                  <span className="text-stone-600">до {(filters.priceTo ?? 0).toLocaleString()}₴</span>
                  <button onClick={() => setFilters({ ...filters, priceFrom: undefined, priceTo: undefined })} className="ml-1 text-stone-400 hover:text-stone-600"><X className="w-3 h-3" /></button>
                </div>
              )}
              <button onClick={() => setFilters({})} className="text-sm text-stone-500 hover:text-stone-700 underline underline-offset-2">Скинути все</button>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading && uiProducts.length === 0 ? (
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'flex flex-col gap-4',
          )}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={cn('bg-stone-100 animate-pulse', viewMode === 'grid' ? 'rounded-2xl h-96' : 'rounded-xl h-32')} />
            ))}
          </div>
        ) : uiProducts.length > 0 ? (
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12'
              : 'flex flex-col gap-4 mb-12',
          )}>
            {uiProducts.map(product =>
              viewMode === 'grid'
                ? <ProductCard key={product.id} product={product} />
                : <ProductListCard key={product.id} product={product} />
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-stone-400" />
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-4">Товари не знайдено</h3>
            <p className="text-stone-600 mb-8">Спробуйте змінити параметри фільтрів</p>
            <button
              onClick={() => { setFilters({}); }}
              className="bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Скинути фільтри
            </button>
          </div>
        )}

        {/* Load More */}
        {uiProducts.length > 0 && page * limit < total && (
          <div className="text-center">
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={isFetching}
              className="bg-white border border-stone-300 text-stone-900 px-8 py-3 rounded-xl hover:bg-stone-50 hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetching ? 'Завантаження…' : 'Завантажити ще'}
            </button>
          </div>
        )}
      </div>

      {/* Range slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none; height: 20px; width: 20px; border-radius: 50%;
          background: #1c1917; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px; width: 20px; border-radius: 50%;
          background: #1c1917; cursor: pointer; border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
