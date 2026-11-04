"use client";

import React from "react";
import Image from "next/image";
import { usePageContent } from "@/lib/api/hooks";

/** Per-category landing content: a full-width hero image on top, then any
 *  number of "image left + description right" blocks. Edited in the admin
 *  (category editor) and stored in the page-content store under the key
 *  `cat-content-<slug>`. Renders nothing when empty. */
type Block = { img?: string; text?: string };
type Content = { hero?: string; blocks?: Block[] };

export function CategoryContent({ slug }: { slug: string }) {
  const { data } = usePageContent(`cat-content-${slug}`);
  const content = (data || {}) as Content;
  const hero = content.hero?.trim();
  const blocks = (content.blocks || []).filter(
    (b) => (b?.img && b.img.trim()) || (b?.text && b.text.trim()),
  );

  if (!hero && blocks.length === 0) return null;

  return (
    <div className="mb-10 space-y-8">
      {hero && (
        <Image
          src={hero}
          alt=""
          width={1600}
          height={700}
          sizes="100vw"
          className="w-full h-auto rounded-2xl border border-stone-200/60"
          priority
        />
      )}

      {blocks.length > 0 && (
        <div className="max-w-5xl mx-auto space-y-5">
          {blocks.map((b, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center rounded-2xl border border-stone-200/70 bg-white p-5 sm:p-6"
            >
              {b.img && b.img.trim() && (
                <Image
                  src={b.img.trim()}
                  alt=""
                  width={400}
                  height={400}
                  sizes="(max-width:640px) 100vw, 224px"
                  className="w-full sm:w-56 h-auto rounded-xl border border-stone-200/60 shrink-0 bg-stone-50 self-center"
                />
              )}
              {b.text && b.text.trim() && (
                <p className="flex-1 text-stone-600 leading-relaxed whitespace-pre-line">
                  {b.text.trim()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
