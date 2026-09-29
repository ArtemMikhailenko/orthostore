"use client";

import React, { useMemo, useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { productDisplayPrice } from "@/lib/api/public";
import type { ProductWithDiscounts } from "@/lib/api/public.types";
import { useCartStore } from "@/lib/cart-store";

/** Slug of the reference ORMCO elastics product (used by the standalone page). */
export const ZOO_PRODUCT_SLUG = "ormco-intermax-elastics";

export type ElasticEntry = {
  group: "intra" | "extra";
  size: string;
  mm: number;
  forceName: string;
  oz: string;
  g: string;
  level: number;
  animal: string;
  art: string;
  colorArt?: string;
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
  const lv = Math.min(5, Math.max(1, level || 1));
  return (
    <span className="inline-flex items-end gap-[3px] h-3.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: `${6 + i * 2}px`,
            background: i < lv ? STRENGTH_COLORS[lv - 1] : "#e7e5e4",
          }}
        />
      ))}
    </span>
  );
}

/** Interactive elastics matrix (size × force) rendered from a product's entries. */
export function ZooElasticsTable({
  product,
  entries,
}: {
  product?: ProductWithDiscounts;
  entries: ElasticEntry[];
}) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const openCart = useCartStore((s) => s.open);

  const price = useMemo(
    () => (product ? productDisplayPrice(product).price : 0),
    [product]
  );

  const hasIntra = entries.some((e) => e.group === "intra");
  const hasExtra = entries.some((e) => e.group === "extra");
  const [group, setGroup] = useState<"intra" | "extra">(hasIntra ? "intra" : "extra");
  const activeGroup = group === "extra" && !hasExtra ? "intra" : group;

  const groupEntries = useMemo(
    () => entries.filter((e) => e.group === activeGroup),
    [entries, activeGroup]
  );

  // Rows (sizes) sorted by diameter.
  const sizes = useMemo(() => {
    const map = new Map<string, { size: string; mm: number }>();
    groupEntries.forEach((e) => map.set(e.size, { size: e.size, mm: e.mm }));
    return [...map.values()].sort((a, b) => a.mm - b.mm);
  }, [groupEntries]);

  // Columns (forces) sorted by strength level.
  const forces = useMemo(() => {
    const map = new Map<
      string,
      { name: string; oz: string; g: string; level: number }
    >();
    groupEntries.forEach((e) =>
      map.set(e.forceName, { name: e.forceName, oz: e.oz, g: e.g, level: e.level })
    );
    return [...map.values()].sort((a, b) => a.level - b.level);
  }, [groupEntries]);

  // cells[size][forceName]
  const cells = useMemo(() => {
    const m: Record<string, Record<string, ElasticEntry>> = {};
    groupEntries.forEach((e) => {
      (m[e.size] ||= {})[e.forceName] = e;
    });
    return m;
  }, [groupEntries]);

  const [colored, setColored] = useState<Record<string, boolean>>({});
  const cellKey = (size: string, fn: string) => `${activeGroup}-${size}-${fn}`;
  const skuFor = (id: string, e: ElasticEntry) =>
    e.colorArt && colored[id] ? (e.colorArt as string) : e.art;

  const add = (e: ElasticEntry) => {
    if (!product) return;
    const id = cellKey(e.size, e.forceName);
    const isColored = !!e.colorArt && !!colored[id];
    const sku = skuFor(id, e);
    addItem(
      {
        id: `el-${sku}`,
        productId: String(product._id),
        sku,
        name: `${product.titleI18n?.uk || "Еластики"} «${e.animal}» · ${e.size} · ${e.forceName}${isColored ? " · кольорові" : ""}`,
        price,
        imageUrl: product.images?.[0],
        options: {
          Розмір: `${e.size} (${e.mm} мм)`,
          Сила: `${e.oz} / ${e.g}`,
          Тварина: e.animal,
          Артикул: sku,
          ...(isColored ? { Колір: "Кольорові" } : {}),
        },
      },
      1
    );
    openCart();
  };

  const CellBody = ({ e }: { e: ElasticEntry }) => {
    const id = cellKey(e.size, e.forceName);
    const isColored = !!e.colorArt && !!colored[id];
    const sku = skuFor(id, e);
    const inCart = items.find((it) => it.id === `el-${sku}`);
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-stone-900 leading-tight truncate">{e.animal}</div>
            {sku && <div className="text-[11px] font-mono text-stone-400 mt-0.5">{sku}</div>}
          </div>
          {e.colorArt && (
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 via-amber-300 to-sky-400 shrink-0 ring-2 ring-white shadow-sm" title="Доступні кольорові" />
          )}
        </div>

        {e.colorArt && (
          <div className="mt-2 inline-flex rounded-full bg-stone-100 p-0.5 text-[10px] font-medium w-fit">
            <button
              onClick={() => setColored((c) => ({ ...c, [id]: false }))}
              className={cn("px-2 py-0.5 rounded-full transition-colors", !isColored ? "bg-white text-stone-900 shadow-sm" : "text-stone-500")}
            >
              Прозорі
            </button>
            <button
              onClick={() => setColored((c) => ({ ...c, [id]: true }))}
              className={cn("px-2 py-0.5 rounded-full transition-colors", isColored ? "bg-white text-stone-900 shadow-sm" : "text-stone-500")}
            >
              Кольорові
            </button>
          </div>
        )}

        <div className="mt-auto pt-3">
          {inCart ? (
            <div className="flex items-center justify-between rounded-xl bg-stone-900 text-white pl-1 pr-1 py-1">
              <button onClick={() => decrease(`el-${sku}`)} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Менше">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold tabular-nums">{inCart.quantity} уп.</span>
              <button onClick={() => increase(`el-${sku}`)} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Більше">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => add(e)}
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

  if (!entries.length) return null;

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-stone-400" />
          коло = реальний діаметр тяги
        </span>
        <span className="inline-flex items-center gap-2">
          <StrengthMeter level={4} /> сила тяги
        </span>
        {entries.some((e) => e.colorArt) && (
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-400 via-amber-300 to-sky-400" />
            доступні кольорові
          </span>
        )}
        {price > 0 && (
          <span className="inline-flex items-center gap-1.5 font-medium text-stone-600">
            ціна {price} ₴ / упаковка
          </span>
        )}
      </div>

      {/* Group tabs (only if both groups present) */}
      {hasIntra && hasExtra && (
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
                activeGroup === g.key ? "bg-stone-900 text-white shadow-sm" : "text-stone-500 hover:text-stone-800"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop matrix */}
      <div className="hidden lg:block mt-5 overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <th className="w-[120px]" />
              {forces.map((f) => (
                <th key={f.name} className="align-bottom">
                  <div className="rounded-2xl bg-white border border-stone-200 shadow-sm px-3 py-3 text-center">
                    <div className="mx-auto mb-2 h-1 w-10 rounded-full" style={{ background: STRENGTH_COLORS[Math.min(5, Math.max(1, f.level)) - 1] }} />
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
            {sizes.map((s) => (
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
                  const e = cells[s.size]?.[f.name];
                  return (
                    <td key={f.name} className="align-top">
                      {e ? (
                        <div className="h-full rounded-2xl border border-stone-200 bg-white p-3.5 hover:border-stone-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <CellBody e={e} />
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

      {/* Mobile: grouped by size */}
      <div className="lg:hidden space-y-5 mt-5">
        {sizes.map((s) => (
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
                const e = cells[s.size]?.[f.name];
                if (!e) return null;
                return (
                  <div key={f.name} className="rounded-xl border border-stone-200 p-3 flex flex-col">
                    <div className="flex items-center gap-1.5 mb-2">
                      <StrengthMeter level={f.level} />
                      <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500 truncate">{f.name}</span>
                    </div>
                    <CellBody e={e} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {entries.some((e) => e.colorArt) && (
        <p className="text-xs text-stone-400 mt-6 max-w-2xl">
          Артикули кольорових варіантів позначені окремо. Сила тяги вказана в
          унціях (oz) та грамах; ціна — за упаковку.
        </p>
      )}
    </div>
  );
}

export default ZooElasticsTable;
