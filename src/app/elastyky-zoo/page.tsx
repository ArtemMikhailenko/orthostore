"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ZooElasticsTable, ZOO_PRODUCT_SLUG } from "@/components/sections/ZooElasticsTable";
import { useProduct } from "@/lib/api/hooks";

export default function ZooElasticsPage() {
  const { data: product } = useProduct(ZOO_PRODUCT_SLUG);
  const entries = ((product as any)?.elasticsTable?.entries ?? []) as any[];

  return (
    <div className="min-h-screen bg-stone-50/40">
      <div className="relative overflow-hidden border-b border-stone-200/60 bg-white">
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-sky-100 via-amber-50 to-transparent blur-2xl opacity-70" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          <div className="text-sm text-stone-400 mb-3 font-medium">
            <Link href="/" className="hover:text-stone-600">Головна</Link>
            <span className="mx-2">/</span>
            <Link href="/catalog/elastychni" className="hover:text-stone-600">Еластичні матеріали</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-600">Еластики ZOO</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1">
            <Sparkles className="w-3 h-3" /> ORMCO
          </span>
          <h1 className="text-3xl sm:text-[2.75rem] leading-tight font-light text-stone-900 tracking-tight mt-3">
            Еластична тяга <span className="font-semibold">ZOO</span>
          </h1>
          <p className="text-stone-500 mt-2 max-w-2xl">
            Кожна комбінація розміру та сили має свою тварину. Оберіть потрібні —
            і додайте у кошик у пару кліків.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {entries.length > 0 ? (
          <ZooElasticsTable product={product} entries={entries} />
        ) : (
          <p className="text-stone-500">Таблиця тимчасово недоступна.</p>
        )}
      </div>
    </div>
  );
}
