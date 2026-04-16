"use client";
import React from "react";
import { ArrowRight, Package } from "lucide-react";
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
      tag: "bg-white/80 text-stone-700 hover:bg-white hover:text-[#0ea5e9] backdrop-blur-sm",
      count: "text-stone-400",
    },
    dark: {
      tag: "bg-white/10 text-white/80 hover:bg-white/25 hover:text-white backdrop-blur-sm",
      count: "text-white/40",
    },
    accent: {
      tag: "bg-[#0ea5e9]/10 text-stone-700 hover:bg-[#0ea5e9]/20 hover:text-[#0ea5e9] border border-[#0ea5e9]/20",
      count: "text-[#0ea5e9]/50",
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

function catImg(filename: string) {
  return `/images/${encodeURIComponent('Фото для каталога на головну')}/${encodeURIComponent(filename)}`;
}

const ALL_CATEGORIES: CatItem[] = [
  { 
    name: "БРЕКЕТИ", 
    slug: "brekety", 
    img: catImg("Атачменти - кнопки 1.jpg"), 
    style: "photo",
    subcategories: [
      { name: "самолігуючі", count: 28 },
      { name: "естетичні", count: 32 },
      { name: "лігатурні", count: 24 },
    ]
  },
  { 
    name: "МІКРОІМПЛАНТИ", 
    slug: "mikroimplanty", 
    img: catImg("Микроімпланти - тільки розверніть її горизонтально.png"), 
    style: "dark"
  },
  { 
    name: "МІНІ ПЛАСТИНЫ", 
    slug: "mini-plastyny", 
    img: catImg("Міні пластини.png"), 
    style: "accent",
    subcategories: [
      { name: "міні пластини", count: 18 },
      { name: "щелепно-лицьова хірургія", count: 12 },
    ]
  },
  { 
    name: "ПРОПИСИ БРЕКЕТІВ", 
    slug: "propysy-breketiv", 
    img: catImg("Атачменти - стопори.JPG"), 
    style: "photo"
  },
  { 
    name: "ЩІЧНІ ТРУБКИ ТА МОЛЯРНІ КІЛЬЦЯ", 
    slug: "shchichni-molyarni", 
    img: catImg("Щічні трубки.jpeg"), 
    style: "light"
  },
  { 
    name: "АТАЧМЕНТИ", 
    slug: "atachments", 
    img: catImg("Атачменти 1.jpg"), 
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
    img: catImg("Дуги.JPG"), 
    style: "photo"
  },
  { 
    name: "ЕЛАСТИЧНІ МАТЕРІАЛИ", 
    slug: "elastychni", 
    img: catImg("Трейнера та миобрайс (2).jpg"), 
    style: "accent"
  },
  { 
    name: "ФІКСАЦІЙНІ МАТЕРІАЛИ", 
    slug: "fiksatsiini", 
    img: catImg("Матеріали Для техників 1.jpg"), 
    style: "light"
  },
  { 
    name: "РЕТРАКТОРИ", 
    slug: "retraktory", 
    img: catImg("Ретрактори.jpg"), 
    style: "dark"
  },
  { 
    name: "ДЗЕРКАЛА ТА ФОТОКОНТРАСТЕРИ", 
    slug: "dzerkala-foto", 
    img: catImg("Дзеркала та фотоконтрастори.jpg"), 
    style: "photo"
  },
  { 
    name: "ЗОВНІШНЬОРОТОВІ ПРИСТОСУВАННЯ", 
    slug: "zovnishnorotovi", 
    img: catImg("Зовнішньоротові пристосування.jpg"), 
    style: "accent"
  },
  { 
    name: "ТРЕЙНЕРА ТА МИОБРЕЙСИ", 
    slug: "treynera-myobreysy", 
    img: catImg("Трейнера та миобрайс.jpg"), 
    style: "light"
  },
  { 
    name: "МАТЕРІАЛИ ДЛЯ ТЕХНІКІВ", 
    slug: "materialy-tehnikiv", 
    img: catImg("Матеріали Для техників.JPG"), 
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
    img: catImg("Сепараційні інструменти.jpg"), 
    style: "dark"
  },
  { 
    name: "АКСЕСУАРИ", 
    slug: "aksesuari", 
    img: catImg("Атачменти - кнопки.jpg"), 
    style: "accent"
  },
  { 
    name: "ІНСТРУМЕНТИ", 
    slug: "instrumenty", 
    img: catImg("Інструменти.jpg"), 
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
  "col-span-2 row-span-1",   // 1  МІКРОІМПЛАНТИ   — wide 2×1
  "col-span-1 row-span-1",   // 2  МІНІ ПЛАСТИНИ   — 1×1
  "col-span-1 row-span-1",   // 3  ПРОПИСИ         — 1×1
  "col-span-1 row-span-1",   // 4  ЩІЧНІ ТРУБКИ    — 1×1
  "col-span-1 row-span-1",   // 5  АТАЧМЕНТИ       — 1×1
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
function PhotoCard({ cat, area }: { cat: CatItem; area: string }) {
  const isLarge = area.includes("col-span-2") && area.includes("row-span-2");
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={hasSubcats ? '#' : `/catalog/${cat.slug}`} onClick={hasSubcats ? (e: React.MouseEvent) => e.preventDefault() : undefined} className={cn("group relative block rounded-2xl overflow-hidden border border-stone-200 hover:border-[#0ea5e9]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300", area)}>
      <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-all duration-700" sizes="(max-width:768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-500" />
      <div className={cn("relative z-10 flex flex-col justify-end h-full p-5", isLarge && "p-7")}>
        <h3 className={cn("font-semibold uppercase tracking-wider leading-tight text-white line-clamp-2", isLarge ? "text-2xl" : "text-sm")}>{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-white/70 group-hover:text-sky-300 transition-colors duration-300">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="dark" />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 bg-gradient-to-r from-[#0ea5e9] to-sky-300 group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Dark Card — full image, dark overlay ─── */
function DarkCard({ cat, area }: { cat: CatItem; area: string }) {
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={hasSubcats ? '#' : `/catalog/${cat.slug}`} onClick={hasSubcats ? (e: React.MouseEvent) => e.preventDefault() : undefined} className={cn("group relative block rounded-2xl overflow-hidden bg-stone-900 border border-stone-700 hover:border-[#0ea5e9]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300", area)}>
      <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-all duration-700 opacity-55 group-hover:opacity-75" sizes="(max-width:768px) 100vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-white text-sm line-clamp-2">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-white/70 group-hover:text-sky-300 transition-colors duration-300">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="dark" />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 bg-gradient-to-r from-[#0ea5e9] to-sky-300 group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Light Card — full image, soft overlay ─── */
function LightCard({ cat, area }: { cat: CatItem; area: string }) {
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={hasSubcats ? '#' : `/catalog/${cat.slug}`} onClick={hasSubcats ? (e: React.MouseEvent) => e.preventDefault() : undefined} className={cn("group relative block rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 hover:border-[#0ea5e9]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300", area)}>
      <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-85" sizes="(max-width:768px) 100vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/15 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-white text-sm line-clamp-2">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-white/70 group-hover:text-sky-300 transition-colors duration-300">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="dark" />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 bg-gradient-to-r from-[#0ea5e9] to-sky-300 group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Accent Card — full image, sky-tinted overlay ─── */
function AccentCard({ cat, area }: { cat: CatItem; area: string }) {
  const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
  return (
    <Link href={hasSubcats ? '#' : `/catalog/${cat.slug}`} onClick={hasSubcats ? (e: React.MouseEvent) => e.preventDefault() : undefined} className={cn("group relative block rounded-2xl overflow-hidden bg-stone-900 border border-stone-700 hover:border-[#0ea5e9]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300", area)}>
      <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-all duration-700 opacity-55 group-hover:opacity-80" sizes="(max-width:768px) 100vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/25 to-transparent group-hover:from-stone-900/70 transition-all duration-500" />
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-white text-sm line-clamp-2">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-white/70 group-hover:text-sky-300 transition-colors duration-300">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <SubcategoryTags subcategories={cat.subcategories!} parentSlug={cat.slug} variant="dark" />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 bg-gradient-to-r from-[#0ea5e9] to-sky-300 group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Route to correct card component ─── */
function CategoryCard({ cat, index }: { cat: CatItem; index: number }) {
  const area = GRID_AREAS[index] ?? "col-span-1 row-span-1";
  const props = { cat, area };
  switch (cat.style) {
    case "dark":   return <DarkCard {...props} />;
    case "light":  return <LightCard {...props} />;
    case "accent": return <AccentCard {...props} />;
    default:       return <PhotoCard {...props} />;
  }
}

/* ─── Main Catalog Page ─── */
export default function CatalogPage() {
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

          <div>
            <h1 className="text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
              Каталог продукції
            </h1>
            <p className="text-stone-500 mt-2 text-lg font-light">
              Оберіть категорію для перегляду товарів
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-3 auto-rows-[180px] sm:auto-rows-[200px]">
          {ALL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
