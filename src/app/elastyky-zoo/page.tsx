"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check, Info, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProduct } from "@/lib/api/hooks";
import { productDisplayPrice } from "@/lib/api/public";
import { useCartStore } from "@/lib/cart-store";

/* ─── ZOO elastics data (Ormco) ─── */
type Size = { size: string; mm: number; colored?: boolean };
type Cell = { name: string; art: string; colorArt?: string };
type Force = { key: string; name: string; oz: string; g: string };

const SIZES: Size[] = [
  { size: '1/8"', mm: 3.18, colored: true },
  { size: '3/16"', mm: 4.76, colored: true },
  { size: '1/4"', mm: 6.35, colored: true },
  { size: '5/16"', mm: 7.94, colored: true },
  { size: '3/8"', mm: 9.35, colored: true },
  { size: '1/2"', mm: 12.7 },
  { size: '5/8"', mm: 15.9 },
  { size: '3/4"', mm: 19.1 },
];

const FORCES_INTRA: Force[] = [
  { key: "weak", name: "Слабкі", oz: "2 oz", g: "60 г" },
  { key: "medium", name: "Середні", oz: "3 oz", g: "85 г" },
  { key: "medstrong", name: "Середньо-сильні", oz: "3.5 oz", g: "100 г" },
  { key: "strong", name: "Сильні", oz: "4.5 oz", g: "130 г" },
  { key: "vstrong", name: "Дуже сильні", oz: "6 oz", g: "170 г" },
];

const FORCES_EXTRA: Force[] = [
  { key: "exweak", name: "Слабкі", oz: "8 oz", g: "230 г" },
  { key: "exstrong", name: "Сильні", oz: "14 oz", g: "400 г" },
];

// cells[group][size][forceKey]
const CELLS: Record<"intra" | "extra", Record<string, Record<string, Cell>>> = {
  intra: {
    '1/8"': {
      weak: { name: "Колібрі", art: "630-0010" },
      medstrong: { name: "Бурундук", art: "630-0030", colorArt: "636-0113" },
    },
    '3/16"': {
      weak: { name: "Перепел", art: "630-0011" },
      medium: { name: "Бобер", art: "630-0020" },
      medstrong: { name: "Кролик", art: "630-0031", colorArt: "636-0114" },
      strong: { name: "Кенгуру", art: "630-0040" },
      vstrong: { name: "Антилопа", art: "630-0050", colorArt: "636-0125" },
    },
    '1/4"': {
      weak: { name: "Сова", art: "630-0012" },
      medium: { name: "Тюлень", art: "630-0021" },
      medstrong: { name: "Лисиця", art: "630-0032", colorArt: "636-0115" },
      strong: { name: "Ведмідь", art: "630-0041", colorArt: "636-0122" },
      vstrong: { name: "Баран", art: "630-0051", colorArt: "636-0126" },
    },
    '5/16"': {
      weak: { name: "Папуга", art: "630-0013" },
      medium: { name: "Дельфін", art: "630-0022" },
      medstrong: { name: "Пінгвін", art: "630-0033", colorArt: "636-0116" },
      strong: { name: "Зебра", art: "630-0042" },
      vstrong: { name: "Лось", art: "630-0052", colorArt: "636-0127" },
    },
    '3/8"': {
      weak: { name: "Чапля", art: "630-0014" },
      medium: { name: "Черепаха", art: "630-0023" },
      medstrong: { name: "Мавпа", art: "630-0034", colorArt: "636-0117" },
      strong: { name: "Верблюд", art: "630-0043" },
      vstrong: { name: "Бик", art: "630-0053", colorArt: "636-0128" },
    },
    '1/2"': {
      weak: { name: "Павич", art: "630-0015" },
      medstrong: { name: "Осел", art: "630-0035" },
    },
    '5/8"': {
      weak: { name: "Орел", art: "630-0016" },
      medstrong: { name: "Лама", art: "630-0036" },
    },
    '3/4"': {
      weak: { name: "Страус", art: "630-0017" },
      medstrong: { name: "Жираф", art: "630-0037" },
    },
  },
  extra: {
    '3/16"': { exweak: { name: "Кугуар", art: "635-0058" } },
    '1/4"': { exweak: { name: "Леопард", art: "635-0059" } },
    '5/16"': {
      exweak: { name: "Пантера", art: "635-0060" },
      exstrong: { name: "Морж", art: "635-0065" },
    },
    '3/8"': {
      exweak: { name: "Тигр", art: "635-0061" },
      exstrong: { name: "Слон", art: "635-0066" },
    },
    '1/2"': {
      exweak: { name: "Лев", art: "635-0062" },
      exstrong: { name: "Кит", art: "635-0067" },
    },
  },
};

/* Proportional swatch for the elastic diameter. */
function DiameterDot({ mm }: { mm: number }) {
  const px = Math.round(mm * 1.25) + 6; // ~10px .. ~30px
  return (
    <span
      className="inline-block rounded-full border-[1.5px] border-stone-400"
      style={{ width: px, height: px }}
      aria-hidden
    />
  );
}

export default function ZooElasticsPage() {
  const [group, setGroup] = useState<"intra" | "extra">("intra");
  const { data: product } = useProduct("ormco-intermax-elastics");
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);

  const price = useMemo(
    () => (product ? productDisplayPrice(product).price : 0),
    [product]
  );

  const forces = group === "intra" ? FORCES_INTRA : FORCES_EXTRA;
  const cells = CELLS[group];
  // Only rows that have at least one cell in the active group.
  const rows = useMemo(
    () => SIZES.filter((s) => cells[s.size] && Object.keys(cells[s.size]).length),
    [cells]
  );

  // Per-cell quantity + colored choice + "added" flash.
  const [qty, setQty] = useState<Record<string, number>>({});
  const [colored, setColored] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const cellId = (size: string, fk: string) => `${group}-${size}-${fk}`;
  const getQty = (id: string) => qty[id] ?? 1;
  const bumpQty = (id: string, d: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(1, (q[id] ?? 1) + d) }));

  const add = (size: string, force: Force, cell: Cell) => {
    if (!product) return;
    const id = cellId(size, force.key);
    const isColored = !!cell.colorArt && !!colored[id];
    const sku = isColored ? (cell.colorArt as string) : cell.art;
    addItem(
      {
        id: `zoo-${sku}`,
        productId: String(product._id),
        sku,
        name: `Еластики ZOO «${cell.name}» · ${size} · ${force.name}${isColored ? " · кольорові" : ""}`,
        price,
        imageUrl: product.images?.[0],
        brand: "ORMCO",
        options: {
          Розмір: `${size} (${SIZES.find((s) => s.size === size)?.mm} мм)`,
          Сила: `${force.oz} / ${force.g}`,
          Тварина: cell.name,
          Артикул: sku,
          ...(isColored ? { Колір: "Кольорові" } : {}),
        },
      },
      getQty(id)
    );
    openCart();
    setAdded((a) => ({ ...a, [id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [id]: false })), 1500);
  };

  /* ── One cell's interactive controls (shared desktop + mobile) ── */
  const CellControls = ({
    size,
    force,
    cell,
    compact,
  }: {
    size: string;
    force: Force;
    cell: Cell;
    compact?: boolean;
  }) => {
    const id = cellId(size, force.key);
    const isColored = !!cell.colorArt && !!colored[id];
    return (
      <div className={cn("flex flex-col gap-2", compact ? "" : "h-full")}>
        <div>
          <div className="font-semibold text-stone-900 leading-tight">{cell.name}</div>
          <div className="text-[11px] font-mono text-stone-400 mt-0.5">
            {isColored ? cell.colorArt : cell.art}
          </div>
        </div>

        {cell.colorArt && (
          <div className="flex gap-1">
            <button
              onClick={() => setColored((c) => ({ ...c, [id]: false }))}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors",
                !isColored
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 text-stone-500 hover:border-stone-400"
              )}
            >
              Прозорі
            </button>
            <button
              onClick={() => setColored((c) => ({ ...c, [id]: true }))}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors inline-flex items-center gap-1",
                isColored
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-stone-300 text-stone-500 hover:border-stone-400"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 via-yellow-400 to-sky-400" />
              Кольорові
            </button>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2">
          <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden shrink-0">
            <button
              onClick={() => bumpQty(id, -1)}
              className="p-1.5 hover:bg-stone-100 text-stone-600"
              aria-label="Менше"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-xs font-semibold text-stone-900">
              {getQty(id)}
            </span>
            <button
              onClick={() => bumpQty(id, 1)}
              className="p-1.5 hover:bg-stone-100 text-stone-600"
              aria-label="Більше"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => add(size, force, cell)}
            disabled={!product}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-xs font-medium transition-all disabled:opacity-40",
              added[id]
                ? "bg-emerald-600 text-white"
                : "bg-stone-900 text-white hover:bg-stone-800"
            )}
          >
            {added[id] ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{added[id] ? "Додано" : "У кошик"}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-stone-200/60 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          <div className="text-sm text-stone-400 mb-3 font-medium">
            <Link href="/" className="hover:text-stone-600">Головна</Link>
            <span className="mx-2">/</span>
            <Link href="/catalog/elastychni" className="hover:text-stone-600">Еластичні матеріали</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-600">Еластики ZOO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
            Еластична тяга <span className="font-semibold">ZOO</span>
          </h1>
          <p className="text-stone-500 mt-2 max-w-2xl">
            Оберіть розмір (діаметр) та силу тяги — кожна комбінація має свою тварину.
            Оберіть кількість і додайте потрібні у кошик.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-stone-500">
            <span className="inline-flex items-center gap-2">
              <DiameterDot mm={11} /> діаметр = розмір тяги
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 via-yellow-400 to-sky-400" />
              доступні кольорові
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> ціна {price ? `${price} ₴ / уп.` : "за упаковку"}
            </span>
          </div>

          {/* Group tabs */}
          <div className="inline-flex mt-5 p-1 bg-stone-100 rounded-xl">
            {(
              [
                { key: "intra", label: "Внутрішньоротові" },
                { key: "extra", label: "Позаротові" },
              ] as const
            ).map((g) => (
              <button
                key={g.key}
                onClick={() => setGroup(g.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  group === g.key
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── Desktop matrix ─── */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="w-[130px]" />
                {forces.map((f) => (
                  <th key={f.key} className="align-bottom">
                    <div className="rounded-xl bg-stone-900 text-white px-3 py-2.5 text-center">
                      <div className="text-sm font-semibold leading-tight">{f.name}</div>
                      <div className="text-[11px] text-white/70 mt-0.5">
                        {f.oz} · {f.g}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.size}>
                  {/* size label */}
                  <td className="align-middle">
                    <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 flex flex-col items-center gap-1.5 text-center">
                      <DiameterDot mm={s.mm} />
                      <div className="text-sm font-semibold text-stone-900">{s.size}</div>
                      <div className="text-[11px] text-stone-500">{s.mm} мм</div>
                    </div>
                  </td>
                  {forces.map((f) => {
                    const cell = cells[s.size]?.[f.key];
                    return (
                      <td key={f.key} className="align-top">
                        {cell ? (
                          <div className="h-full rounded-xl border border-stone-200 bg-white p-3 hover:border-sky-300 hover:shadow-sm transition-all">
                            <CellControls size={s.size} force={f} cell={cell} />
                          </div>
                        ) : (
                          <div className="h-full rounded-xl border border-dashed border-stone-200/70 bg-stone-50/40 min-h-[96px]" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── Mobile: grouped by size ─── */}
        <div className="lg:hidden space-y-5">
          {rows.map((s) => (
            <div key={s.size} className="rounded-2xl border border-stone-200 overflow-hidden">
              <div className="flex items-center gap-3 bg-stone-50 px-4 py-3 border-b border-stone-200">
                <DiameterDot mm={s.mm} />
                <div>
                  <div className="font-semibold text-stone-900">{s.size}</div>
                  <div className="text-xs text-stone-500">{s.mm} мм</div>
                </div>
              </div>
              <div className="divide-y divide-stone-100">
                {forces.map((f) => {
                  const cell = cells[s.size]?.[f.key];
                  if (!cell) return null;
                  return (
                    <div key={f.key} className="p-4">
                      <div className="text-[11px] font-medium uppercase tracking-wide text-sky-600 mb-2">
                        {f.name} · {f.oz} / {f.g}
                      </div>
                      <CellControls size={s.size} force={f} cell={cell} compact />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-stone-400 mt-8">
          * Артикули 636-… — кольорові варіанти. Сила вказана в унціях (oz) та грамах.
        </p>
      </div>
    </div>
  );
}
