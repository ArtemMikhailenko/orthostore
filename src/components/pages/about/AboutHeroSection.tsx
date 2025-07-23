
import React from 'react';
import { cn } from '@/lib/utils';

// Hero Section
interface AboutHeroSectionProps {
  className?: string;
}

export function AboutHeroSection({ className }: AboutHeroSectionProps) {
  return (
    <section className={cn('py-32 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-12">
            <div>
              <div className="text-sm text-stone-600 uppercase tracking-wider mb-6">
                О компании
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-8">
                OrthoDent Pro
                <br />
                <span className="font-normal">С 2015 года</span>
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed">
                Мы пришли на рынок ортодонтии с главной целью — предоставить вам 
                качественную продукцию по справедливым ценам. Сегодня мы — 
                надёжный партнёр для сотен стоматологических клиник по всей Украине.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-light text-stone-900 mb-2">2015</div>
                <div className="text-sm text-stone-600">Год основания</div>
              </div>
              <div>
                <div className="text-3xl font-light text-stone-900 mb-2">500+</div>
                <div className="text-sm text-stone-600">Довольных клиентов</div>
              </div>
            </div>
          </div>

          {/* Right - Image Placeholder */}
          <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-stone-300 rounded-full mx-auto mb-6"></div>
                <div className="text-stone-500">Фото команды OrthoDent Pro</div>
              </div>
            </div>
            
            {/* Quality Badge */}
            <div className="absolute top-8 left-8 bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-stone-900 uppercase tracking-wider">
                Сертифицировано
              </div>
              <div className="text-sm text-stone-600">ISO 13485</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}