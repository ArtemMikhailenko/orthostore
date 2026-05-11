'use server';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroData {
  titleI18n?: { uk?: string; en?: string };
  subtitleI18n?: { uk?: string; en?: string };
  imageUrl?: string;
  imageUrlMobile?: string;
  bullets?: string[];
  cta?: { labelI18n?: { uk?: string; en?: string }; url?: string; external?: boolean };
  cta2?: { labelI18n?: { uk?: string; en?: string }; url?: string; external?: boolean };
  isActive?: boolean;
}

async function getHero(): Promise<HeroData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text) as HeroData;
  } catch {
    return null;
  }
}

// Fallback static content
const FALLBACK: HeroData = {
  titleI18n: { uk: 'Професійні\nортодонтичні\nматеріали' },
  subtitleI18n: { uk: 'Досконала якість, індивідуальний підхід до кожного клієнта' },
  bullets: [
    'Прямі поставки від виробників',
    'Сертифікована продукція',
    'Сертифікована якість ISO 13485',
    'Персональний менеджер для кожного клієнта',
  ],
  cta: { labelI18n: { uk: 'Каталог продукції' }, url: '/catalog' },
  cta2: { labelI18n: { uk: 'Отримати консультацію' }, url: '/contacts' },
};

interface HeroSectionProps {
  className?: string;
}

export async function HeroSection({ className }: HeroSectionProps) {
  const raw = await getHero();
  const hero: HeroData = (raw?.isActive ? raw : null) ?? FALLBACK;

  const title = hero.titleI18n?.uk ?? '';
  const subtitle = hero.subtitleI18n?.uk ?? '';
  const bullets = hero.bullets ?? [];
  const cta = hero.cta;
  const cta2 = hero.cta2;
  const imageUrl = hero.imageUrl;

  const titleLines = title.split('\n');

  return (
    <section className={cn('relative bg-white overflow-hidden', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items- min-h-[65vh] py-12 lg:py-15 max-h-[95vh]">

          {/* Left Content */}
          <div className="space-y-5 lg:space-y-6">

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-stone-900 leading-[1.1]">
                {titleLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    <span className="font-light text-stone-900">{line}</span>
                  </React.Fragment>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div className="space-y-4 max-w-xl">
                <p className="text-base lg:text-lg text-stone-600 leading-relaxed">{subtitle}</p>
              </div>
            )}

            {/* Trust Points */}
            {bullets.length > 0 && (
              <div className="space-y-3 lg:space-y-4">
                {bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-stone-700 text-sm lg:text-base">{b}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {(cta?.url || cta2?.url) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {cta?.url && (
                  <Link
                    href={cta.url}
                    target={cta.external ? '_blank' : undefined}
                    className="inline-flex items-center justify-center bg-stone-900 text-white px-8 lg:px-10 py-3.5 lg:py-4 font-medium border-2 border-stone-900 hover:bg-white hover:text-stone-900 transition-all duration-300 text-sm lg:text-base rounded-lg"
                  >
                    {cta.labelI18n?.uk ?? ''}
                  </Link>
                )}
                {cta2?.url && (
                  <Link
                    href={cta2.url}
                    target={cta2.external ? '_blank' : undefined}
                    className="inline-flex items-center justify-center border-2 border-stone-900 text-stone-900 px-8 lg:px-10 py-3.5 lg:py-4 font-medium hover:bg-stone-900 hover:text-white transition-all duration-300 text-sm lg:text-base rounded-lg"
                  >
                    {cta2.labelI18n?.uk ?? ''}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Content - Banner Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] lg:h-[700px]">
              <Image
                src={imageUrl || '/images/banner.png'}
                alt="Ортодонтичне обладнання"
                fill
                className="object-contain scale-x-[-1]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}