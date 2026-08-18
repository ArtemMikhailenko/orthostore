"use client";
import React, { useMemo } from "react";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCategories, useSubcategories } from "@/lib/api/hooks";
import { pickI18n } from "@/snippets/i18n";

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
          key={sub.slug || idx}
          href={`/catalog/${parentSlug}?sub=${encodeURIComponent(sub.slug)}`}
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
  slug: string;
  count?: number;
};

type CatItem = {
  name: string;
  slug: string;
  img: string;
  style: CardStyle;
  area?: string; // explicit bento size (col-span/row-span)
  subcategories?: SubCategory[];
};

/* Explicit bento layout (order + size) per category slug — matches the design.
   Categories not listed here are appended after as 1×1. */
const BENTO: { slug: string; area: string }[] = [
  // Order chosen so the dense grid packs into the layout from the mockups.
  { slug: "brekety", area: "col-span-2 row-span-2" }, // Брекети — велика 2×2
  { slug: "propysy-breketiv", area: "col-span-1 row-span-1" }, // Прописи брекетів
  { slug: "miniplastyny", area: "col-span-1 row-span-1" }, // Мініпластини
  { slug: "shchichni-molyarni", area: "col-span-1 row-span-1" }, // Щічні трубки
  { slug: "mikroimplanty", area: "col-span-1 row-span-2" }, // Мікроімпланти — висока 1×2
  { slug: "5-shchelepno-lytsova-khirurhiia", area: "col-span-1 row-span-2" }, // Щелепно-лицьова — висока 1×2
  { slug: "instrumenty", area: "col-span-2 row-span-1" }, // Інструменти — широка 2×1
  { slug: "duhy-droty-reteinery-metaleva-lihatura", area: "col-span-1 row-span-1" }, // Дуги, дроти, ретейнери…
  { slug: "retraktory", area: "col-span-1 row-span-1" }, // Ретрактори
  { slug: "elastychni", area: "col-span-1 row-span-1" }, // Еластичні матеріали
  { slug: "atachments", area: "col-span-1 row-span-1" }, // Атачменти
  { slug: "zovnishnorotovi", area: "col-span-1 row-span-1" }, // Зовнішньоротові
  { slug: "marpe", area: "col-span-2 row-span-1" }, // MARPE — широка 2×1
  { slug: "fiksatsiini", area: "col-span-2 row-span-1" }, // Композити та фіксаційні — широка 2×1
  { slug: "aksesuari", area: "col-span-1 row-span-1" }, // Аксесуари
  { slug: "treynera-myobreysy", area: "col-span-1 row-span-2" }, // Трейнера — висока 1×2
  { slug: "separatsiyni-instrumenty", area: "col-span-1 row-span-1" }, // Сепараційні
  { slug: "typodonts", area: "col-span-1 row-span-1" }, // Демонстраційні моделі
  { slug: "materialy-tehnikiv", area: "col-span-1 row-span-1" }, // Матеріали для техніків
  { slug: "dzerkala-foto", area: "col-span-2 row-span-1" }, // Дзеркала та фотоконтрастери — широка 2×1
  {
    slug: "21-plastyny-dlia-elaineriv-ta-retentsiinykh-kap",
    area: "col-span-1 row-span-1",
  }, // Пластини для елайнерів
  { slug: "p", area: "col-span-1 row-span-1" }, // Поки пуста
];

/* Admin-controlled card size → bento area class.
   Set per category in the admin (field "Розмір картки в каталозі").
   Bound to the category itself, so it survives slug renames. */
const CARD_SIZE_AREA: Record<string, string> = {
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  normal: "col-span-1 row-span-1",
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
  },
  { 
    name: "МІКРОІМПЛАНТИ", 
    slug: "mikroimplanty", 
    img: catImg("Микроімпланти - тільки розверніть її горизонтально.png"), 
    style: "dark"
  },
  { 
    name: "МІНІ ПЛАСТИНЫ", 
    slug: "miniplastyny", 
    img: catImg("Міні пластини.png"), 
    style: "accent",
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
  },
  { 
    name: "ДУГИ", 
    slug: "duhy-droty-reteinery-metaleva-lihatura", 
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

/* ─── Per-style visual config ─── */
const CARD_STYLES: Record<CardStyle, { container: string; img: string; overlay: string }> = {
  photo: {
    container: "border border-stone-200",
    img: "",
    overlay: "bg-gradient-to-t from-black/75 via-black/15 to-transparent",
  },
  dark: {
    container: "bg-stone-900 border border-stone-700",
    img: "opacity-55 group-hover:opacity-75",
    overlay: "bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent",
  },
  light: {
    container: "bg-stone-200 border border-stone-300",
    img: "opacity-60 group-hover:opacity-85",
    overlay: "bg-gradient-to-t from-stone-900/70 via-stone-900/15 to-transparent",
  },
  accent: {
    container: "bg-stone-900 border border-stone-700",
    img: "opacity-55 group-hover:opacity-80",
    overlay:
      "bg-gradient-to-t from-stone-900/90 via-stone-900/25 to-transparent group-hover:from-stone-900/70 transition-all duration-500",
  },
};

/* ─── Category card ─── */
function CategoryCard({
  cat,
  index,
  subcats,
}: {
  cat: CatItem;
  index: number;
  subcats: SubCategory[];
}) {
  const area = cat.area ?? GRID_AREAS[index] ?? "col-span-1 row-span-1";
  const isLarge = area.includes("col-span-2") && area.includes("row-span-2");
  const st = CARD_STYLES[cat.style];
  const hasSubcats = subcats.length > 0;

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden hover:border-sky-400 hover:ring-[3px] hover:ring-sky-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(56,189,248,0.25)] transition-all duration-300",
        st.container,
        area
      )}
    >
      {cat.img ? (
        <Image
          src={cat.img}
          alt={cat.name}
          fill
          className={cn("object-cover group-hover:scale-105 transition-all duration-700", st.img)}
          sizes="(max-width:768px) 100vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
          <Package className="w-10 h-10 text-stone-400" />
        </div>
      )}
      <div className={cn("absolute inset-0", st.overlay)} />

      {/* Full-card link → category */}
      <Link
        href={`/catalog/${cat.slug}`}
        aria-label={cat.name}
        className="absolute inset-0 z-[1]"
      />

      {/* Content overlay (click-through, except subcategory tags) */}
      <div
        className={cn(
          "relative z-[2] flex flex-col justify-end h-full p-5 pointer-events-none",
          isLarge && "p-7"
        )}
      >
        <h3
          className={cn(
            "font-semibold uppercase tracking-wider leading-tight text-white line-clamp-2",
            isLarge ? "text-2xl" : "text-sm"
          )}
        >
          {cat.name}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-white/70 group-hover:text-sky-300 transition-colors duration-300">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        {hasSubcats && (
          <div className="pointer-events-auto">
            <SubcategoryTags subcategories={subcats} parentSlug={cat.slug} variant="dark" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Catalog Page ─── */
export default function CatalogPage() {
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories();

  // Map category slug → its real subcategories (from the backend)
  const subcatsByCatSlug = useMemo(() => {
    const catIdToSlug = new Map<string, string>();
    (categories ?? []).forEach((c) => catIdToSlug.set(c._id as string, c.slug));
    const map = new Map<string, SubCategory[]>();
    (subcategories ?? [])
      .filter((s) => s.isActive !== false && !(s as any).parentSubcategoryId)
      .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
      .forEach((s) => {
        const catSlug = catIdToSlug.get(s.categoryId);
        if (!catSlug) return;
        const arr = map.get(catSlug) ?? [];
        arr.push({ name: pickI18n(s.nameI18n as any, "uk"), slug: s.slug });
        map.set(catSlug, arr);
      });
    return map;
  }, [categories, subcategories]);

  // Catalog cards are driven ENTIRELY by the backend categories (names, which
  // ones exist, order). The curated list only supplies nice local images,
  // card styles and the bento sizes for known slugs.
  const displayCategories = useMemo<CatItem[]>(() => {
    const curated = new Map<string, { img: string; style: CardStyle }>();
    ALL_CATEGORIES.forEach((c) =>
      curated.set(c.slug, { img: c.img, style: c.style }),
    );
    const bento = new Map<string, { area: string; order: number }>();
    BENTO.forEach((b, i) => bento.set(b.slug, { area: b.area, order: i }));
    const fallbackStyles: CardStyle[] = ["light", "dark", "accent", "photo"];
    const list = (categories ?? [])
      .filter((c) => (c as any).isActive !== false)
      .map((c, i) => {
        const cur = curated.get(c.slug);
        const bn = bento.get(c.slug);
        // Admin-set size wins over the hardcoded bento map (survives renames).
        const adminArea = CARD_SIZE_AREA[(c as any).cardSize as string];
        return {
          name: (pickI18n(c.nameI18n as any, "uk") || c.slug).toUpperCase(),
          slug: c.slug,
          // Admin-uploaded photo wins; fall back to the curated local image.
          img: ((c as any).imageUrl as string) || cur?.img || "",
          style: cur?.style || fallbackStyles[i % fallbackStyles.length],
          area: adminArea ?? bn?.area,
          // Bento order first (matches the design), the rest appended.
          _order: bn ? bn.order : 1000 + ((c as any).sort ?? i),
        };
      });
    list.sort((a, b) => a._order - b._order);
    return list.map(({ _order: _drop, ...rest }) => rest);
  }, [categories]);

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
          {displayCategories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              cat={cat}
              index={i}
              subcats={subcatsByCatSlug.get(cat.slug) ?? []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
