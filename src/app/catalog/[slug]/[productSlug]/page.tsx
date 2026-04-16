"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  useProduct,
  useManufacturers,
  useCategories,
  useCountries,
  useProducts,
} from "@/lib/api/hooks";
import type { ProductWithDiscounts, ProductVariantWithDiscounts } from "@/lib/api/public.types";
import { pickI18n } from "@/snippets/i18n";
import { useCartStore } from "@/lib/cart-store";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Star,
  Sparkles,
  TrendingUp,
  Minus,
  Plus,
  Check,
  Copy,
  Share2,
  Zap,
} from "lucide-react";

/* ─── Same slug-name map as category page ─── */
const SLUG_NAME_MAP: Record<string, string> = {
  brekety: "Брекети",
  dugy: "Дуги",
  mikroimplanty: "Мікроімпланти",
  "propysy-breketiv": "Прописи брекетів",
  instrumenty: "Інструменти",
  "mini-plastyny": "Міні пластини",
  attachmenty: "Атачменти",
  "shichni-trubky": "Щічні трубки та молярні кільця",
  "elastychni-materialy": "Еластичні матеріали",
  "materialy-dlia-tekh": "Матеріали для техніків",
  "fiksatsiyni-materialy": "Фіксаційні матеріали",
  retraktory: "Ретрактори",
  "dzerkala-fotokontr": "Дзеркала та фотоконтрастери",
  "treynera-myobreysy": "Трейнера та миобрейси",
  zovnishnyorotovi: "Зовнішньоротові пристосування",
  "separatsiyni-instr": "Сепараційні інструменти",
  aksesuary: "Аксесуари",
};

/* ─────── Image Gallery ─────── */
function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  const allImages = images.length > 0 ? images : [];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center">
        <Package className="w-24 h-24 text-stone-300" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        ref={imgRef}
        className="relative aspect-square bg-white rounded-2xl border border-stone-200/50 overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={allImages[active]}
          alt={`${name} — фото ${active + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-contain transition-transform duration-300",
            zoomed && "scale-150"
          )}
          style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
          priority
        />

        {/* Navigation arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((p) => (p === 0 ? allImages.length - 1 : p - 1)); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-stone-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((p) => (p === allImages.length - 1 ? 0 : p + 1)); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="w-5 h-5 text-stone-700" />
            </button>
          </>
        )}

        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            {active + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative w-20 h-20 shrink-0 rounded-xl border-2 overflow-hidden transition-all duration-200",
                i === active
                  ? "border-stone-900 shadow-md"
                  : "border-stone-200 hover:border-stone-400 opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────── Variant Selector ─────── */
function VariantSelector({
  variants,
  selected,
  onSelect,
  manufacturers,
  countries,
}: {
  variants: ProductVariantWithDiscounts[];
  selected: number;
  onSelect: (i: number) => void;
  manufacturers: Map<string, string>;
  countries: Map<string, string>;
}) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
        Варіант
      </h3>
      <div className="flex flex-wrap gap-2">
        {variants.filter(v => v.isActive).map((v, i) => {
          const brand = v.manufacturerId ? manufacturers.get(v.manufacturerId) : null;
          const optionStr = v.options
            ? Object.entries(v.options).map(([k, val]) => `${val}`).join(" · ")
            : null;
          const label = optionStr || v.sku;

          return (
            <button
              key={v._id || i}
              onClick={() => onSelect(i)}
              className={cn(
                "px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200",
                i === selected
                  ? "border-stone-900 bg-stone-900 text-white shadow-md"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50"
              )}
            >
              <span>{label}</span>
              {brand && <span className="text-xs opacity-70 ml-1.5">({brand})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────── Related Product Card ─────── */
function RelatedCard({
  product,
  categorySlug,
  manufacturers,
}: {
  product: ProductWithDiscounts;
  categorySlug: string;
  manufacturers: Map<string, string>;
}) {
  const title = pickI18n(product.titleI18n as any, "uk") || product.slug;
  const image = product.images?.[0];
  const price = (product as any).priceMinFinal ?? product.priceMin ?? 0;
  const originalPrice =
    product.priceMin && (product as any).priceMinFinal && (product as any).priceMinFinal < product.priceMin
      ? product.priceMin
      : undefined;
  const brand = product.manufacturerIds?.[0]
    ? manufacturers.get(product.manufacturerIds[0])
    : null;

  return (
    <Link
      href={`/catalog/${categorySlug}/${product.slug}`}
      className="group block bg-white rounded-2xl border border-stone-200/50 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-500 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
            <Package className="w-12 h-12 text-stone-300" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        {brand && <p className="text-xs text-stone-500 font-medium">{brand}</p>}
        <h4 className="text-sm font-semibold text-stone-900 line-clamp-2 leading-tight group-hover:text-stone-700 transition-colors">
          {title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-stone-900">
            {price.toLocaleString()} ₴
          </span>
          {originalPrice && (
            <span className="text-sm text-stone-400 line-through">
              {originalPrice.toLocaleString()} ₴
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const productSlug = params.productSlug as string;

  const { data: product, isLoading } = useProduct(productSlug);
  const { data: manufacturers } = useManufacturers();
  const { data: categories } = useCategories();
  const { data: countries } = useCountries();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "attributes" | "delivery">("description");

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);

  // Lookup maps
  const manufacturerMap = useMemo(() => {
    const m = new Map<string, string>();
    manufacturers?.forEach((mf) => m.set(mf._id as string, pickI18n(mf.nameI18n as any, "uk")));
    return m;
  }, [manufacturers]);

  const categoryMap = useMemo(() => {
    const m = new Map<string, string>();
    categories?.forEach((c) => m.set(c._id as string, pickI18n(c.nameI18n as any, "uk")));
    return m;
  }, [categories]);

  const countryMap = useMemo(() => {
    const m = new Map<string, string>();
    countries?.forEach((co) => m.set(co._id as string, pickI18n(co.nameI18n as any, "uk")));
    return m;
  }, [countries]);

  const categoryName =
    SLUG_NAME_MAP[categorySlug] ||
    (product?.categoryIds?.[0] ? categoryMap.get(product.categoryIds[0]) : "") ||
    categorySlug;

  // Current variant data
  const variant = product?.variants?.[selectedVariant];
  const price = variant?.priceFinal ?? variant?.price ?? (product as any)?.priceMinFinal ?? 0;
  const originalPrice =
    variant?.priceOriginal && variant.priceOriginal > price ? variant.priceOriginal : undefined;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const brandName = variant?.manufacturerId ? manufacturerMap.get(variant.manufacturerId) : null;
  const countryName = variant?.countryId ? countryMap.get(variant.countryId) : null;
  const title = product ? pickI18n(product.titleI18n as any, "uk") || product.slug : "";
  const description = product?.descriptionI18n ? pickI18n(product.descriptionI18n as any, "uk") : "";
  const images = product?.images ?? [];
  const variantImages = variant?.images ?? [];
  const allImages = [...variantImages, ...images.filter((img) => !variantImages.includes(img))];

  // Related products (same category)
  const categoryId = product?.categoryIds?.[0];
  const { data: relatedData } = useProducts({
    category: categoryId,
    limit: 8,
    sort: "-createdAt",
  });
  const relatedProducts = useMemo(
    () =>
      (relatedData?.items ?? []).filter(
        (p) => p.slug !== productSlug
      ).slice(0, 4),
    [relatedData, productSlug]
  );

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!product || !variant) return;
    addItem(
      {
        id: `${product._id}-${variant._id || selectedVariant}`,
        sku: variant.sku,
        name: title,
        price,
        imageUrl: allImages[0],
        brand: brandName || undefined,
      },
      quantity
    );
    openCart();
  };

  /* ─── Loading skeleton ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="h-5 w-48 bg-stone-200 animate-pulse rounded mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-stone-100 animate-pulse rounded-2xl" />
            <div className="space-y-6">
              <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
              <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded" />
              <div className="h-12 w-40 bg-stone-200 animate-pulse rounded" />
              <div className="h-10 w-full bg-stone-200 animate-pulse rounded-xl" />
              <div className="h-14 w-full bg-stone-200 animate-pulse rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Not found ─── */
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-stone-300 mx-auto mb-6" />
          <h2 className="text-2xl font-light text-stone-900 mb-4">Товар не знайдено</h2>
          <Link
            href={`/catalog/${categorySlug}`}
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Повернутись до каталогу
          </Link>
        </div>
      </div>
    );
  }

  const isNew = product.isNew ?? (product.createdAt
    ? Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 30
    : false);
  const isPopular = product.tags?.includes("popular");
  const isBestseller = product.tags?.includes("stock");

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <div className="text-sm text-stone-400 font-medium flex items-center gap-1 flex-wrap">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Головна
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-stone-600 transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <Link
            href={`/catalog/${categorySlug}`}
            className="hover:text-stone-600 transition-colors"
          >
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-stone-600">{title}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Gallery */}
          <ImageGallery images={allImages} name={title} />

          {/* Right — Product info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {isNew && (
                <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  NEW
                </div>
              )}
              {isBestseller && (
                <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  HIT
                </div>
              )}
              {discount > 0 && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  -{discount}%
                </div>
              )}
              {brandName && (
                <span className="text-sm text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded-full">
                  {brandName}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-light text-stone-900 tracking-tight leading-tight">
              {title}
            </h1>

            {/* SKU + actions */}
            <div className="flex items-center gap-4 text-sm text-stone-500">
              {variant && (
                <span>
                  Артикул: <span className="font-medium text-stone-700">{variant.sku}</span>
                </span>
              )}
              {countryName && (
                <span>
                  Країна: <span className="font-medium text-stone-700">{countryName}</span>
                </span>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    isFavorite
                      ? "bg-red-50 text-red-500"
                      : "bg-stone-100 text-stone-400 hover:text-red-500 hover:bg-red-50"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-all duration-200"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Variant selector */}
            <VariantSelector
              variants={product.variants}
              selected={selectedVariant}
              onSelect={setSelectedVariant}
              manufacturers={manufacturerMap}
              countries={countryMap}
            />

            {/* Price block */}
            <div className="bg-stone-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-stone-900">
                  {price.toLocaleString()} ₴
                </span>
                {originalPrice && (
                  <span className="text-xl text-stone-400 line-through mb-1">
                    {originalPrice.toLocaleString()} ₴
                  </span>
                )}
              </div>

              {/* Discount info */}
              {variant?.discountsApplied && variant.discountsApplied.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {variant.discountsApplied.map((d, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      <Zap className="w-3 h-3" />
                      {d.name}: -{d.type === "percent" ? `${d.value}%` : `${d.value}₴`}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-stone-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-stone-600" />
                  </button>
                  <span className="w-12 text-center font-medium text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-stone-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-stone-600" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-stone-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-stone-800 transition-all duration-300 shadow-lg shadow-stone-900/20 hover:shadow-xl hover:shadow-stone-900/30 active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Додати в кошик
                </button>
              </div>

              {/* Unit */}
              {variant?.unit && (
                <p className="text-xs text-stone-500">
                  Одиниця: <span className="font-medium">{variant.unit}</span>
                </p>
              )}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-stone-200/50">
                <Truck className="w-6 h-6 text-stone-600 mb-2" />
                <span className="text-xs font-medium text-stone-900">Доставка</span>
                <span className="text-[10px] text-stone-500 mt-0.5">по всій Україні</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-stone-200/50">
                <Shield className="w-6 h-6 text-stone-600 mb-2" />
                <span className="text-xs font-medium text-stone-900">Гарантія</span>
                <span className="text-[10px] text-stone-500 mt-0.5">офіційна</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-stone-200/50">
                <RotateCcw className="w-6 h-6 text-stone-600 mb-2" />
                <span className="text-xs font-medium text-stone-900">Повернення</span>
                <span className="text-[10px] text-stone-500 mt-0.5">14 днів</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description / Attributes / Delivery */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-stone-200">
            {(
              [
                { key: "description", label: "Опис" },
                { key: "attributes", label: "Характеристики" },
                { key: "delivery", label: "Доставка та оплата" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-6 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
                  activeTab === tab.key
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-3xl">
            {/* Description tab */}
            {activeTab === "description" && (
              <div className="prose prose-stone max-w-none">
                {description ? (
                  <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                ) : (
                  <p className="text-stone-400 italic">Опис товару скоро буде додано</p>
                )}

                {/* Options summary */}
                {product.optionsSummary &&
                  Object.keys(product.optionsSummary).length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-stone-900 mb-4">
                        Доступні опції
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(product.optionsSummary).map(
                          ([key, values]) => (
                            <div key={key} className="flex items-start gap-3">
                              <span className="text-sm font-medium text-stone-600 min-w-[120px] capitalize">
                                {key}:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {values.map((val, i) => (
                                  <span
                                    key={i}
                                    className="text-sm bg-stone-100 text-stone-700 px-3 py-1 rounded-lg"
                                  >
                                    {String(val)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Attributes tab */}
            {activeTab === "attributes" && (
              <div>
                {product.attributes && product.attributes.length > 0 ? (
                  <div className="divide-y divide-stone-100">
                    {product.attributes.map((attr, i) => (
                      <div
                        key={i}
                        className="flex items-center py-4 gap-4"
                      >
                        <span className="text-sm text-stone-500 min-w-[180px]">
                          {attr.key}
                        </span>
                        <span className="text-sm font-medium text-stone-900">
                          {String(attr.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-400 italic">
                    Характеристики будуть додані найближчим часом
                  </p>
                )}

                {/* Variant details */}
                {product.variants.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-stone-900 mb-4">
                      Варіанти товару
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200">
                            <th className="text-left py-3 px-3 font-medium text-stone-600">
                              SKU
                            </th>
                            <th className="text-left py-3 px-3 font-medium text-stone-600">
                              Виробник
                            </th>
                            <th className="text-left py-3 px-3 font-medium text-stone-600">
                              Ціна
                            </th>
                            {product.variants.some((v) => v.options && Object.keys(v.options).length > 0) && (
                              <th className="text-left py-3 px-3 font-medium text-stone-600">
                                Опції
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {product.variants
                            .filter((v) => v.isActive)
                            .map((v, i) => (
                              <tr
                                key={v._id || i}
                                className={cn(
                                  "hover:bg-stone-50 transition-colors",
                                  i === selectedVariant && "bg-stone-50"
                                )}
                              >
                                <td className="py-3 px-3 font-mono text-xs text-stone-600">
                                  {v.sku}
                                </td>
                                <td className="py-3 px-3">
                                  {v.manufacturerId
                                    ? manufacturerMap.get(v.manufacturerId) || "—"
                                    : "—"}
                                </td>
                                <td className="py-3 px-3 font-medium">
                                  {v.priceFinal?.toLocaleString() ??
                                    v.price?.toLocaleString()}{" "}
                                  ₴
                                  {v.priceOriginal && v.priceOriginal > (v.priceFinal ?? v.price) && (
                                    <span className="text-stone-400 line-through text-xs ml-2">
                                      {v.priceOriginal.toLocaleString()} ₴
                                    </span>
                                  )}
                                </td>
                                {product.variants.some((vr) => vr.options && Object.keys(vr.options).length > 0) && (
                                  <td className="py-3 px-3 text-xs text-stone-600">
                                    {v.options
                                      ? Object.entries(v.options)
                                          .map(([k, val]) => `${k}: ${val}`)
                                          .join(", ")
                                      : "—"}
                                  </td>
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Delivery tab */}
            {activeTab === "delivery" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5" /> Доставка
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Нова Пошта — по всій Україні (1-3 дні)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Укрпошта — по всій Україні (3-7 днів)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Самовивіз з нашого офісу — безкоштовно
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Оплата
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Оплата при отриманні (накладений платіж)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Безготівковий розрахунок (для юр. осіб)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Оплата на картку (Приват / Моно)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" /> Повернення
                  </h3>
                  <p className="text-sm text-stone-700">
                    Повернення або обмін протягом 14 днів з моменту отримання за
                    умови збереження товарного вигляду та упаковки.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light text-stone-900 tracking-tight">
                Схожі товари
              </h2>
              <Link
                href={`/catalog/${categorySlug}`}
                className="text-sm text-stone-500 hover:text-stone-700 transition-colors font-medium"
              >
                Дивитись всі →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <RelatedCard
                  key={rp.slug}
                  product={rp}
                  categorySlug={categorySlug}
                  manufacturers={manufacturerMap}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
