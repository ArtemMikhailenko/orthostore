"use client";
import React, { useState } from "react";
import { ArrowRight, Search, Package, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─── Card visual variants ─── */
type CardStyle = "photo" | "dark" | "light" | "accent";

type CatItem = {
  name: string;
  slug: string;
  img: string;
  style: CardStyle;
};

/*
  Layout: CSS Grid with named template areas.
  7 rows, 4 columns, each item assigned to specific cells.
  This guarantees zero gaps.
*/

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&fit=crop&sat=-100";

const ALL_CATEGORIES: CatItem[] = [
  { name: "БРЕКЕТИ",                         slug: "brekety",                img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "ДУГИ",                            slug: "dugy",                  img: PLACEHOLDER_IMG,  style: "dark" },
  { name: "МІКРОІМПЛАНТИ",                   slug: "mikroimplanty",         img: PLACEHOLDER_IMG,  style: "light" },
  { name: "ПРОПИСИ БРЕКЕТІВ",               slug: "propysy-breketiv",      img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "ІНСТРУМЕНТИ",                     slug: "instrumenty",           img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "МІНІ ПЛАСТИНИ",                  slug: "mini-plastyny",         img: PLACEHOLDER_IMG,  style: "accent" },
  { name: "ЩІЧНІ ТРУБКИ ТА МОЛЯРНІ КІЛЬЦЯ", slug: "shichni-trubky",       img: PLACEHOLDER_IMG,  style: "dark" },
  { name: "АТАЧМЕНТИ",                       slug: "attachmenty",           img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "ЕЛАСТИЧНІ МАТЕРІАЛИ",             slug: "elastychni-materialy",  img: PLACEHOLDER_IMG,  style: "light" },
  { name: "МАТЕРІАЛИ ДЛЯ ТЕХНІКІВ",         slug: "materialy-dlia-tekh",   img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "ФІКСАЦІЙНІ МАТЕРІАЛИ",           slug: "fiksatsiyni-materialy", img: PLACEHOLDER_IMG,  style: "accent" },
  { name: "РЕТРАКТОРИ",                      slug: "retraktory",            img: PLACEHOLDER_IMG,  style: "dark" },
  { name: "ДЗЕРКАЛА ТА ФОТОКОНТРАСТЕРИ",    slug: "dzerkala-fotokontr",    img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "ТРЕЙНЕРА ТА МИОБРЕЙСИ",          slug: "treynera-myobreysy",    img: PLACEHOLDER_IMG,  style: "light" },
  { name: "ЗОВНІШНЬОРОТОВІ ПРИСТОСУВАННЯ",   slug: "zovnishnyorotovi",      img: PLACEHOLDER_IMG,  style: "photo" },
  { name: "СЕПАРАЦІЙНІ ІНСТРУМЕНТИ",         slug: "separatsiyni-instr",    img: PLACEHOLDER_IMG,  style: "dark" },
  { name: "АКСЕСУАРИ",                       slug: "aksesuary",             img: PLACEHOLDER_IMG,  style: "accent" },
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
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block overflow-hidden", area)}>
      <Image src={cat.img} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
      <div className={cn("relative z-10 flex flex-col justify-end h-full p-5", isLarge && "p-7")}>
        <span className={cn("absolute top-4 right-5 font-extralight tabular-nums text-white/[0.08] select-none", isLarge ? "text-[96px] leading-none" : "text-[56px] leading-none")}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className={cn("font-semibold uppercase tracking-wider leading-tight text-white", isLarge ? "text-2xl" : "text-sm")}>{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-white/50 group-hover:text-white transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Dark Card — stone-900 bg, small image thumbnail ─── */
function DarkCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block overflow-hidden bg-stone-900", area)}>
      {/* Small circular image */}
      <div className="absolute top-5 right-5 w-16 h-16 overflow-hidden rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500">
        <Image src={cat.img} alt="" fill className="object-cover" sizes="64px" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="absolute top-4 left-5 text-[11px] font-mono text-white/20 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-white text-sm">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-stone-500 group-hover:text-stone-300 transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Light Card — stone-100 bg, image strip on right ─── */
function LightCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  const isTall = area.includes("row-span-2");
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block overflow-hidden bg-stone-100", area)}>
      {/* Right-side image strip */}
      <div className={cn("absolute top-0 right-0 h-full overflow-hidden", isTall ? "w-1/2" : "w-2/5")}>
        <Image src={cat.img} alt="" fill className="object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" sizes="200px" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="absolute top-4 left-5 text-[11px] font-mono text-stone-400/50 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-stone-800 text-sm max-w-[60%]">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-stone-400 group-hover:text-stone-700 transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-stone-900 group-hover:w-full transition-all duration-500 z-20" />
    </Link>
  );
}

/* ─── Accent Card — bordered, minimal, with plus icon ─── */
function AccentCard({ cat, index, area }: { cat: CatItem; index: number; area: string }) {
  return (
    <Link href={`/catalog/${cat.slug}`} className={cn("group relative block overflow-hidden bg-white border border-stone-200", area)}>
      {/* Corner dot */}
      <div className="absolute top-5 right-5 w-8 h-8 border border-stone-300 group-hover:border-stone-900 group-hover:bg-stone-900 transition-all duration-300 flex items-center justify-center">
        <Plus className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors duration-300" />
      </div>
      {/* Small image at bottom-right */}
      <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <Image src={cat.img} alt="" fill className="object-cover" sizes="96px" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="absolute top-4 left-5 text-[11px] font-mono text-stone-300 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="font-semibold uppercase tracking-wider leading-tight text-stone-900 text-sm">{cat.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-stone-400 group-hover:text-stone-800 transition-colors duration-300">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Переглянути</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
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
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-1 auto-rows-[180px] sm:auto-rows-[200px]">
            {filtered.map((cat, i) => (
              <CategoryCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-stone-100 flex items-center justify-center mx-auto mb-5">
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
