'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn('relative bg-white overflow-hidden', className)}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[75vh] py-12 lg:py-16">
          
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-stone-900 leading-[1.1]">
                Професійне
                <br />
                <span className="font-normal text-stone-900">ортодонтичне</span>
                <br />
                <span className="font-light text-stone-900">обладнання</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="space-y-4 max-w-xl">
              <p className="text-base lg:text-lg text-stone-600 leading-relaxed">
                Досконала якість, індивідуальний підхід до кожного клієнта
              </p>
            </div>

            {/* Trust Points */}
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-stone-700 text-sm lg:text-base">
                  Прямі поставки від виробників
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-stone-700 text-sm lg:text-base">
                  Сертифікована продукція
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-stone-700 text-sm lg:text-base">
                  Сертифікованне якість ISO 13485
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-stone-700 text-sm lg:text-base">
                  Персональний менеджер для кожного клієнта
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/catalog"
                className="inline-flex items-center justify-center bg-stone-900 text-white px-8 lg:px-10 py-3.5 lg:py-4 font-medium hover:bg-stone-800 transition-all duration-300 text-sm lg:text-base"
              >
                Каталог продукції
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <Link 
                href="/contacts"
                className="inline-flex items-center justify-center border-2 border-stone-900 text-stone-900 px-8 lg:px-10 py-3.5 lg:py-4 font-medium hover:bg-stone-900 hover:text-white transition-all duration-300 text-sm lg:text-base"
              >
                Отримати консультацію
              </Link>
            </div>
          </div>

          {/* Right Content - Braces Banner */}
          <div className="relative">
            <div className="relative bg-stone-50 rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              
              {/* Background decorative element */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50"></div>
              
              {/* Content Card */}
              <div className="relative h-full flex flex-col justify-center items-center p-8 lg:p-12">
                
                {/* Red Label */}
                <div className="mb-8 lg:mb-12">
                  <span className="text-red-600 font-medium text-sm lg:text-base uppercase tracking-wide">
                    Банер з Брекетами
                  </span>
                </div>

                {/* Icon/Image placeholder - dark box */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-stone-900 mb-8 lg:mb-12 flex items-center justify-center">
                  <div className="text-white text-4xl lg:text-5xl font-light">□</div>
                </div>

                {/* Quality Badge */}
                <div className="text-center space-y-4 max-w-xs">
                  <h3 className="text-xl lg:text-2xl font-light text-stone-900">
                    Експертне якість
                  </h3>
                  <p className="text-sm lg:text-base text-stone-600 leading-relaxed">
                    Кожний продукт проходить строгий контроль якості
                  </p>
                </div>
              </div>

              {/* ISO Badge */}
              <div className="absolute top-6 right-6 bg-white px-4 py-2 shadow-sm">
                <span className="text-xs lg:text-sm font-semibold text-stone-900 tracking-wider">
                  ISO 13485
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}