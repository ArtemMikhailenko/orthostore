"use client";

import React, { useMemo, useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProduct } from "@/lib/api/hooks";
import { productDisplayPrice } from "@/lib/api/public";
import { useCartStore } from "@/lib/cart-store";

/* ─── ZOO elastics data (Ormco) ─── */
type Size = { size: string; mm: number };
type Cell = { name: string; art: string; colorArt?: string };
type Force = { key: string; name: string; oz: string; g: string; level: number };

/** Slug of the ORMCO elastics product this table is bound to (for price/productId). */
export const ZOO_PRODUCT_SLUG = "ormco-intermax-elastics";

const SIZES: Size[] = [
  { size: '1/8"', mm: 3.18 },
  { size: '3/16"', mm: 4.76 },
  { size: '1/4"', mm: 6.35 },
  { size: '5/16"', mm: 7.94 },
  { size: '3/8"', mm: 9.35 },
  { size: '1/2"', mm: 12.7 },
  { size: '5/8"', mm: 15.9 },
  { size: '3/4"', mm: 19.1 },
];

const FORCES_INTRA: Force[] = [
  { key: "weak", name: "Слабкі", oz: "2 oz", g: "60 г", level: 1 },
  { key: "medium", name: "Середні", oz: "3 oz", g: "85 г", level: 2 },
  { key: "medstrong", name: "Середньо-сильні", oz: "3.5 oz", g: "100 г", level: 3 },
  { key: "strong", name: "Сильні", oz: "4.5 oz", g: "130 г", level: 4 },
  { key: "vstrong", name: "Дуже сильні", oz: "6 oz", g: "170 г", level: 5 },
];

const FORCES_EXTRA: Force[] = [
  { key: "exweak", name: "Слабкі", oz: "8 oz", g: "230 г", level: 4 },
  { key: "exstrong", name: "Сильні", oz: "14 oz", g: "400 г", level: 5 },
];

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

const STRENGTH_COLORS = ["#34d399", "#a3e635", "#f59e0b", "#f97316", "#ef4444"];

function ElasticRing({ mm, size = "md" }: { mm: number; size?: "sm" | "md" }) {
  const scale = size === "sm" ? 1.4 : 2.1;
  const px = Math.round(mm * scale) + (size === "sm" ? 6 : 10);
  const border = Math.max(2, Math.round(px / 9));
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: px,
        height: px,
        border: `${border}px solid #a8a29e`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)",
      }}
      aria-hidden
    />
  );
}

function StrengthMeter({ level }: { level: number }) {
  return (
    <span className="inline-flex items-end gap-[3px] h-3.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: `${6 + i * 2}px`,
            background: i < level ? STRENGTH_COLORS[level - 1] : "#e7e5e4",
          }}
        />
      ))}
    </span>
  );
}

/** The interactive ZOO elastics selector (legend + tabs + size×force matrix). */
export function ZooElasticsTable() {
  const [group, setGroup] = useState<"intra" | "extra">("intra");
  const { data: product } = useProduct(ZOO_PRODUCT_SLUG);

  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const openCart = useCartStore((s) => s.open);

  const price = useMemo(
    () => (product ? productDisplayPrice(product).price : 0),
    [product]
  );

  const forces = group === "intra" ? FORCES_INTRA : FORCES_EXTRA;
  const cells = CELLS[group];
  const rows = useMemo(
    () => SIZES.filter((s) => cells[s.size] && Object.keys(cells[s.size]).length),
    [cells]
  );

  const [colored, setColored] = useState<Record<string, boolean>>({});
  const cellKey = (size: string, fk: string) => `${group}-${size}-${fk}`;
  const skuFor = (id: string, cell: Cell) =>
    cell.colorArt && colored[id] ? (cell.colorArt as string) : cell.art;

  const add = (size: string, force: Force, cell: Cell) => {
    if (!product) return;
    const id = cellKey(size, force.key);
    const isColored = !!cell.colorArt && !!colored[id];
    const sku = skuFor(id, cell);
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
      1
    );
    openCart();
  };

  const CellBody = ({ size, force, cell }: { size: string; force: Force; cell: Cell }) => {
    const id = cellKey(size, force.key);
    const isColored = !!cell.colorArt && !!colored[id];
    const sku = skuFor(id, cell);
    const inCart = items.find((it) => it.id === `zoo-${sku}`);

    return (
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-stone-900 leading-tight truncate">{cell.name}</div>
            <div className="text-[11px] font-mono text-stone-400 mt-0.5">{sku}</div>
          </div>
          {cell.colorArt && (
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 via-amber-300 to-sky-400 shrink-0 ring-2 ring-white shadow-sm" title="Доступні кольорові" />
          )}
        </div>

        {cell.colorArt && (
          <div className="mt-2 inline-flex rounded-full bg-stone-100 p-0.5 text-[10px] font-medium w-fit">
            <button
              onClick={() => setColored((c) => ({ ...c, [id]: false }))}
              className={cn(
                "px-2 py-0.5 rounded-full transition-colors",
                !isColored ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
              )}
            >
              Прозорі
            </button>
            <button
              onClick={() => setColored((c) => ({ ...c, [id]: true }))}
              className={cn(
                "px-2 py-0.5 rounded-full transition-colors",
                isColored ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
              )}
            >
              Кольорові
            </button>
          </div>
        )}

        <div className="mt-auto pt-3">
          {inCart ? (
            <div className="flex items-center justify-between rounded-xl bg-stone-900 text-white pl-1 pr-1 py-1">
              <button onClick={() => decrease(`zoo-${sku}`)} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Менше">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold tabular-nums">{inCart.quantity} уп.</span>
              <button onClick={() => increase(`zoo-${sku}`)} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Більше">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => add(size, force, cell)}
              disabled={!product}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white py-2 text-sm font-medium text-stone-800 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all disabled:opacity-40"
            >
              <ShoppingCart className="w-4 h-4" />
              Додати
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Legend + price */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-stone-400" />
          коло = реальний діаметр тяги
        </span>
        <span className="inline-flex items-center gap-2">
          <StrengthMeter level={4} /> сила тяги
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-400 via-amber-300 to-sky-400" />
          доступні кольорові
        </span>
        {price > 0 && (
          <span className="inline-flex items-center gap-1.5 font-medium text-stone-600">
            ціна {price} ₴ / упаковка
          </span>
        )}
      </div>

      {/* Group tabs */}
      <div className="inline-flex mt-4 p-1 bg-stone-100 rounded-full">
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
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              group === g.key ? "bg-stone-900 text-white shadow-sm" : "text-stone-500 hover:text-stone-800"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* ─── Desktop matrix ─── */}
      <div className="hidden lg:block mt-5">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <th className="w-[120px]" />
              {forces.map((f) => (
                <th key={f.key} className="align-bottom">
                  <div className="rounded-2xl bg-white border border-stone-200 shadow-sm px-3 py-3 text-center">
                    <div className="mx-auto mb-2 h-1 w-10 rounded-full" style={{ background: STRENGTH_COLORS[f.level - 1] }} />
                    <div className="text-sm font-semibold text-stone-900 leading-tight">{f.name}</div>
                    <div className="text-[11px] text-stone-400 mt-0.5">{f.oz} · {f.g}</div>
                    <div className="flex justify-center mt-1.5">
                      <StrengthMeter level={f.level} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.size}>
                <td className="align-middle">
                  <div className="rounded-2xl border border-stone-200 bg-white px-2 py-4 flex flex-col items-center gap-2 text-center">
                    <span className="flex items-center justify-center h-[52px]">
                      <ElasticRing mm={s.mm} />
                    </span>
                    <div className="text-base font-semibold text-stone-900">{s.size}</div>
                    <div className="text-[11px] text-stone-500 -mt-1">{s.mm} мм</div>
                  </div>
                </td>
                {forces.map((f) => {
                  const cell = cells[s.size]?.[f.key];
                  return (
                    <td key={f.key} className="align-top">
                      {cell ? (
                        <div className="h-full rounded-2xl border border-stone-200 bg-white p-3.5 hover:border-stone-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <CellBody size={s.size} force={f} cell={cell} />
                        </div>
                      ) : (
                        <div className="h-full min-h-[120px] rounded-2xl border border-dashed border-stone-200 bg-stone-50/50 flex items-center justify-center">
                          <span className="text-stone-300 text-xl">·</span>
                        </div>
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
      <div className="lg:hidden space-y-5 mt-5">
        {rows.map((s) => (
          <div key={s.size} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
            <div className="flex items-center gap-3 bg-stone-50 px-4 py-3 border-b border-stone-200">
              <ElasticRing mm={s.mm} size="sm" />
              <div>
                <div className="font-semibold text-stone-900 leading-none">{s.size}</div>
                <div className="text-xs text-stone-500 mt-1">{s.mm} мм</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3">
              {forces.map((f) => {
                const cell = cells[s.size]?.[f.key];
                if (!cell) return null;
                return (
                  <div key={f.key} className="rounded-xl border border-stone-200 p-3 flex flex-col">
                    <div className="flex items-center gap-1.5 mb-2">
                      <StrengthMeter level={f.level} />
                      <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500 truncate">{f.name}</span>
                    </div>
                    <CellBody size={s.size} force={f} cell={cell} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400 mt-6 max-w-2xl">
        Артикули 636-… — кольорові варіанти. Сила тяги вказана в унціях (oz) та
        грамах; ціна — за упаковку.
      </p>
    </div>
  );
}

export default ZooElasticsTable;
