'use client';

import React from 'react';
import Image from 'next/image';
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items- min-h-[65vh] py-12 lg:py-15 max-h-[95vh]">
          
          {/* Left Content */}
          <div className="space-y-5 lg:space-y-6">

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
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
            <div className="relative w-full h-[600px] lg:h-[700px]">
              
              {/* Banner Image */}
              <Image
                src="/images/banner.png"
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