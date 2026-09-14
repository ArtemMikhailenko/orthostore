"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type ProductColor = { name: string; hex?: string };

/** Colour swatch picker (e.g. elastic ligatures/chains). The customer picks one
 *  colour; the choice is carried into the cart and order. */
export function ColorSelector({
  colors,
  value,
  onChange,
}: {
  colors: ProductColor[];
  value: string | null;
  onChange: (name: string) => void;
}) {
  if (!colors?.length) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-900">Колір</span>
        {value && (
          <span className="text-sm text-stone-500">
            Обрано: <span className="font-medium text-stone-700">{value}</span>
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((c) => {
          const selected = value === c.name;
          const hex = c.hex?.trim();
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(c.name)}
              title={c.name}
              className={cn(
                "group flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition-all duration-200",
                selected
                  ? "border-stone-900 bg-stone-900 text-white shadow-sm"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
              )}
            >
              <span
                className={cn(
                  "relative inline-flex items-center justify-center w-5 h-5 rounded-full border shrink-0",
                  selected ? "border-white/40" : "border-stone-300"
                )}
                style={hex ? { backgroundColor: hex } : undefined}
              >
                {!hex && (
                  <span className="text-[9px] font-semibold uppercase text-stone-400">
                    {c.name.charAt(0)}
                  </span>
                )}
                {selected && (
                  <Check
                    className="w-3 h-3 drop-shadow"
                    style={{ color: hex ? contrastColor(hex) : "#0c0a09" }}
                  />
                )}
              </span>
              <span className="text-sm font-medium pr-1">{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Pick black/white check mark for legibility over a swatch colour. */
function contrastColor(hex: string): string {
  const m = hex.replace("#", "");
  if (m.length !== 3 && m.length !== 6) return "#0c0a09";
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0c0a09" : "#ffffff";
}
