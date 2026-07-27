"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* FDI (ISO 3950) two-digit tooth numbering, laid out as a dental arch.
   On screen the patient's right is on the viewer's left (dental convention). */
const UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const TYPE_BY_LAST_DIGIT: Record<string, string> = {
  "1": "Центральний різець",
  "2": "Бічний різець",
  "3": "Ікло",
  "4": "Перший премоляр",
  "5": "Другий премоляр",
  "6": "Перший моляр",
  "7": "Другий моляр",
  "8": "Третій моляр",
};

const QUADRANT_BY_FIRST_DIGIT: Record<string, string> = {
  "1": "верхній правий",
  "2": "верхній лівий",
  "3": "нижній лівий",
  "4": "нижній правий",
};

export function toothLabel(t: string): string {
  const type = TYPE_BY_LAST_DIGIT[t[1]] ?? "";
  const quad = QUADRANT_BY_FIRST_DIGIT[t[0]] ?? "";
  return `Зуб ${t}${type ? ` — ${type}` : ""}${quad ? ` (${quad})` : ""}`;
}

function ToothButton({
  n,
  selected,
  onClick,
}: {
  n: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={toothLabel(String(n))}
      className={cn(
        "flex items-center justify-center w-8 h-9 sm:w-9 sm:h-10 rounded-md border text-xs font-semibold transition-all duration-150 shrink-0",
        selected
          ? "border-stone-900 bg-stone-900 text-white shadow-md scale-105"
          : "border-stone-300 bg-white text-stone-700 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50"
      )}
    >
      {n}
    </button>
  );
}

function Arch({
  teeth,
  value,
  onChange,
}: {
  teeth: number[];
  value: string | null;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex justify-center gap-1 overflow-x-auto pb-1">
      {teeth.map((n, i) => (
        <React.Fragment key={n}>
          {/* midline gap between quadrants */}
          {i === 8 && <div className="w-2 sm:w-3 shrink-0" />}
          <ToothButton
            n={n}
            selected={value === String(n)}
            onClick={() => onChange(String(n))}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export function ToothSelector({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (t: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
          Оберіть зуб
        </h3>
        {value ? (
          <span className="text-xs font-medium text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
            {toothLabel(value)}
          </span>
        ) : (
          <span className="text-xs text-stone-400">не вибрано</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-[11px] font-medium text-stone-400 text-center uppercase tracking-wider">
          Верхня щелепа
        </div>
        <Arch teeth={UPPER} value={value} onChange={onChange} />
        <div className="h-px bg-stone-200 my-1" />
        <Arch teeth={LOWER} value={value} onChange={onChange} />
        <div className="text-[11px] font-medium text-stone-400 text-center uppercase tracking-wider">
          Нижня щелепа
        </div>
      </div>
    </div>
  );
}
