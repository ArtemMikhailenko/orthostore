"use client";
import React, { useState } from "react";
import { ArrowRight, Search, Package, Plus, ChevronRight, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─── Inline Subcategory Tags (shown inside cards) ─── */
function SubcategoryTags({ subcategories, parentSlug, variant = "light" }: { 
  subcategories: SubCategory[]; 
  parentSlug: string;
  variant?: "light" | "dark" | "accent";
}) {
  const styles = {
    light: {
      tag: "bg-white/80 text-stone-700 hover:bg-white hover:text-[#3179cf] backdrop-blur-sm",
      count: "text-stone-400",
    },
    dark: {
      tag: "bg-white/10 text-white/80 hover:bg-white/25 hover:text-white backdrop-blur-sm",
      count: "text-white/40",
    },
    accent: {
      tag: "bg-[#3179cf]/10 text-stone-700 hover:bg-[#3179cf]/20 hover:text-[#3179cf] border border-[#3179cf]/20",
      count: "text-[#3179cf]/50",
    },
  };
  const s = styles[variant];
  
  return (
    <div className="flex flex-wrap gap-1.5 mt-3 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
      {subcategories.map((sub, idx) => (
        <Link
          key={idx}
          href={`/catalog/${parentSlug}?sub=${sub.name.toLowerCase().replace(/\s+/g, "-")}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all duration-300",
            s.tag
          )}
        >
          <span>{sub.name}</span>
          {sub.count && <span className={cn("font-mono text-[9px]", s.count)}>{sub.count}</span>}
        </Link>
      ))}
    </div>
  );
}

/* ─── Card visual variants ─── */
type CardStyle = "photo" | "dark" | "light" | "accent";

type SubCategory = {
  name: string;
  count?: number;
};

type CatItem = {
  name: string;
  slug: string;
  img: string;
  style: CardStyle;
  subcategories?: SubCategory[];
};

/*
  Layout: CSS Grid with named template areas.
  7 rows, 4 columns, each item assigned to specific cells.
  This guarantees zero gaps.
*/

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&fit=crop&sat=-100";

const ALL_CATEGORIES: CatItem[] = [
  { 
    name: "ПРОПИСИ БРЕКЕТІВ", 
    slug: "propysy-breketiv", 
    img: PLACEHOLDER_IMG, 
    style: "photo"
  },
  { 
    name: "МІКРОІМПЛАНТИ", 
    slug: "mikroimplanty", 
    img: PLACEHOLDER_IMG, 
    style: "dark"
  },
  { 
    name: "МІНІ ПЛАСТИНЫ", 
    slug: "mini-plastyny", 
    img: PLACEHOLDER_IMG, 
    style: "accent",
    subcategories: [
      { name: "міні пластини", count: 18 },
      { name: "щелепно-лицьова хірургія", count: 12 },
    ]
  },
  { 
    name: "БРЕКЕТИ", 
    slug: "brekety", 
    img: PLACEHOLDER_IMG, 
    style: "photo",
    subcategories: [
      { name: "самолігуючі", count: 28 },
      { name: "естетичні", count: 32 },
      { name: "лігатурні", count: 24 },
    ]
  },
  { 
    name: "ЩІЧНІ ТРУБКИ ТА МОЛЯРНІ КІЛЬЦЯ", 
    slug: "shchichni-molyarni", 
    img: PLACEHOLDER_IMG, 
    style: "light"
  },
  { 
    name: "АТАЧМЕНТИ", 
    slug: "atachments", 
    img: PLACEHOLDER_IMG, 
    style: "dark",
    subcategories: [
      { name: "стопори", count: 35 },
      { name: "кнопки", count: 28 },
      { name: "накусочні майданчики", count: 15 },
      { name: "пружини", count: 18 },
      { name: "металеві лігатури", count: 22 },
    ]
  },
  { 
    name: "ДУГИ", 
    slug: "duhy", 
    img: PLACEHOLDER_IMG, 
    style: "photo"
  },
  { 
    name: "ЕЛАСТИЧНІ МАТЕРІАЛИ", 
    slug: "elastychni", 
    img: PLACEHOLDER_IMG, 
    style: "accent"
  },
  { 
    name: "ФІКСАЦІЙНІ МАТЕРІАЛИ", 
    slug: "fiksatsiini", 
    img: PLACEHOLDER_IMG, 
    style: "light"
  },
  { 
    name: "РЕТРАКТОРИ", 
    slug: "retraktory", 
    img: PLACEHOLDER_IMG, 
    style: "dark"
  },
  { 
    name: "ДЗЕРКАЛА ТА ФОТОКОНТРАСТЕРИ", 
    slug: "dzerkala-foto", 
    img: PLACEHOLDER_IMG, 
    style: "photo"
  },
  { 
    name: "ЗОВНІШНЬОРОТОВІ ПРИСТОСУВАННЯ", 
    slug: "zovnishnorotovi", 
    img: PLACEHOLDER_IMG, 
    style: "accent"
  },
  { 
    name: "ТРЕЙНЕРА ТА МИОБРЕЙСИ", 
    slug: "treynera-myobreysy", 
    img: PLACEHOLDER_IMG, 
    style: "light"
  },
  { 
    name: "МАТЕРІАЛИ ДЛЯ ТЕХНІКІВ", 
    slug: "materialy-tehnikiv", 
    img: PLACEHOLDER_IMG, 
    style: "photo",
    subcategories: [
      { name: "гвинти", count: 15 },
      { name: "гвинти MSE", count: 8 },
      { name: "пластини для ретенційних кап", count: 12 },
      { name: "пластини для елайнерів", count: 18 },
      { name: "пластмасса", count: 22 },
      { name: "відбиткові ложки", count: 10 },
    ]
  },
  { 
    name: "СЕПАРАЦІЙНІ ІНСТРУМЕНТИ", 
    slug: "separatsiyni-instrumenty", 
    img: PLACEHOLDER_IMG, 
    style: "dark"
  },
  { 
    name: "АКСЕСУАРИ", 
    slug: "aksesuari", 
    img: PLACEHOLDER_IMG, 
    style: "accent"
  },
  { 
    name: "ІНСТРУМЕНТИ", 
    slug: "instrumenty", 
    img: PLACEHOLDER_IMG, 
    style: "photo",
    subcategories: [
      { name: "ORTHOSTORE", count: 45 },
      { name: "LE MED", count: 38 },
    ]
  },
];

/* Grid area assignments for each of the 17 items (desktop: 4 cols) */
const GRID_AREAS = [
  "col-span-2 row-span-2",   // 0  БРЕКЕТИ         — large 2×2
  "col-span-1 row-span-1",   // 1  ДУГИ            — 1×1
  "col-span-1 row-span-1",   // 2  МІКРОІМПЛАНТИ   — 1×1
  "col-span-1 row-span-1",   // 3  ПРОПИСИ         — 1×1
  "col-span-1 row-span-1",   // 4  ІНСТРУМЕНТИ     — 1×1
  "col-span-2 row-span-1",   // 5  МІНІ ПЛАСТИНИ   — wide 2×1
  "col-span-1 row-span-1",   // 6  ЩІЧНІ ТРУБКИ    — 1×1
  "col-span-1 row-span-2",   // 7  АТАЧМЕНТИ       — tall 1×2
  "col-span-1 row-span-1",   // 8  ЕЛАСТИЧНІ       — 1×1
  "col-span-2 row-span-1",   // 9  МАТЕРІАЛИ ТЕХН  — wide 2×1
  "col-span-1 row-span-1",   // 10 ФІКСАЦІЙНІ      — 1×1
  "col-span-1 row-span-1",   // 11 РЕТРАКТОРИ      — 1×1
  "col-span-2 row-span-1",   // 12 ДЗЕРКАЛА        — wide 2×1
  "col-span-1 row-span-1",   // 13 ТРЕЙНЕРА        — 1×1
  "col-span-1 row-span-1",   // 14 ЗОВНІШНЬОРОТОВІ — 1×1
  "col-span-1 row-span-1",   // 15 СЕПАРАЦІЙНІ     — 1×1
  "col-span-1 row-span-1",   // 16 АКСЕСУАРИ       — 1×1
];

/* ─── Photo Card — full image background ─── */
function PhotoCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  const isLarge = area.includes("col-span-2") && area.includes("row-span-2");
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block rounded-2xl overflow-hidden", area)}>
      <Image src={cat.img} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
      <div className={cn("relative z-10 flex flex-col justify-end h-full p-5", isLarge && "p-7")}>
        <span className={cn("absolute top-4 right-5 font-extralight tabular-nums text-white/[0.08] select-none", isLarge ? "text-[96px] leading-none" : "text-[56px] leading-none")}>
          {String(index + 1).padStart(2, "0")}
        </span>
        {hasSubcats && (
          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full hidden lg:flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-stone-700" />
            <span className="text-[10px] font-semibold text-stone-900">{cat.subcategories!.length}</span>
          </div>
        )}
        <h3 className={cn("font-semibold uppercase tracking-wider leading-tight text-white", isLarge ? "text-2xl" : "text-sm")}>{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-white/50 group-hover:text-white transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="dark" />
        )}
      </div>
    </Link>
  );
}

/* ─── Dark Card — stone-900 bg, small image thumbnail ─── */
function DarkCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block rounded-2xl overflow-hidden bg-stone-900", area)}>
      {/* Small circular image */}
      <div className="absolute top-5 right-5 w-16 h-16 overflow-hidden rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500">
        <Image src={cat.img} alt="" fill className="object-cover" sizes="64px" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="absolute top-4 left-5 text-[11px] font-mono text-white/20 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        {hasSubcats && (
          <div className="absolute top-4 right-24 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full hidden lg:flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-semibold text-white">{cat.subcategories!.length}</span>
          </div>
        )}
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-white text-sm">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-stone-500 group-hover:text-stone-300 transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="dark" />
        )}
      </div>
      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 bg-gradient-to-r from-[#3179cf] to-blue-400 group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Light Card — stone-100 bg, image strip on right ─── */
function LightCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  const isTall = area.includes("row-span-2");
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block rounded-2xl overflow-hidden bg-stone-100", area)}>
      {/* Right-side image strip */}
      <div className={cn("absolute top-0 right-0 h-full overflow-hidden", isTall ? "w-1/2" : "w-2/5")}>
        <Image src={cat.img} alt="" fill className="object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" sizes="200px" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="absolute top-4 left-5 text-[11px] font-mono text-stone-400/50 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        {hasSubcats && (
          <div className="absolute top-4 right-5 bg-stone-900 px-2.5 py-1 rounded-full hidden lg:flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-semibold text-white">{cat.subcategories!.length}</span>
          </div>
        )}
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-stone-800 text-sm max-w-[60%]">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-stone-400 group-hover:text-stone-700 transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="light" />
        )}
      </div>
      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 bg-gradient-to-r from-stone-900 to-stone-600 group-hover:w-full transition-all duration-500 z-20 rounded-b-2xl" />
    </Link>
  );
}

/* ─── Accent Card — bordered, minimal, with plus icon ─── */
function AccentCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-[#3179cf]/30 transition-colors duration-300", area)}>
      {/* Corner dot */}
      <div className="absolute top-5 right-5 w-8 h-8 border border-stone-300 rounded-lg group-hover:border-[#3179cf] group-hover:bg-[#3179cf] transition-all duration-300 flex items-center justify-center">
        <Plus className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors duration-300" />
      </div>
      {/* Small image at bottom-right */}
      <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-tl-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <Image src={cat.img} alt="" fill className="object-cover" sizes="96px" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="absolute top-4 left-5 text-[11px] font-mono text-stone-300 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        {hasSubcats && (
          <div className="absolute top-4 right-16 bg-[#3179cf] px-2.5 py-1 rounded-full hidden lg:flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-semibold text-white">{cat.subcategories!.length}</span>
          </div>
        )}
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-stone-900 text-sm">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-stone-400 group-hover:text-[#3179cf] transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="accent" />
        )}
      </div>
    </Link>
  );
}

/* ─── Route to correct card component ─── */
function CategoryCard({ cat, index }: { cat: CatItem; index: number }) {
  const area = GRID_AREAS[index] ?? "col-span-1 row-span-1";
  const props = { cat, index, area };
  switch (cat.style) {
    case "dark":   return <DarkCard {...props} />;
    case "light":  return <LightCard {...props} />;
    case "accent": return <AccentCard {...props} />;
    default:       return <PhotoCard {...props} />;
  }
}

/* ─── Main Catalog Page ─── */
export default function CatalogPage() {
  const [search, setSearch] = useState("");

  const filtered = React.useMemo(() => {
    if (!search.trim()) return ALL_CATEGORIES;
    const q = search.toLowerCase();
    return ALL_CATEGORIES.filter(c => c.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
          <div className="text-sm text-stone-400 mb-4 font-medium">
            <Link href="/" className="hover:text-stone-600 transition-colors">Головна</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-600">Каталог</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
                Каталог продукції
              </h1>
              <p className="text-stone-500 mt-2 text-lg font-light">
                Оберіть категорію для перегляду товарів
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Пошук категорій..."
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3179cf] focus:border-transparent transition-all placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-3 auto-rows-[180px] sm:auto-rows-[200px]">
            {filtered.map((cat, i) => (
              <CategoryCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Package className="w-10 h-10 text-stone-400" />
            </div>
            <h3 className="text-xl font-light text-stone-900 mb-2">Категорій не знайдено</h3>
            <p className="text-stone-500 text-sm">Спробуйте змінити пошуковий запит</p>
          </div>
        )}
      </div>
    </div>
  );
}
