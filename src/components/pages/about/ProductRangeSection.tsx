
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight} from 'lucide-react';

// Product Range Section
interface ProductRangeSectionProps {
  className?: string;
}

const productCategories = [
  {
    title: 'Брекет-системы',
    description: 'Различные виды брекетов, материалы и средства гигиены',
    imageAlt: 'Современные брекет-системы'
  },
  {
    title: 'Инструменты',
    description: 'Профессиональные ортодонтические и сепарационные инструменты',
    imageAlt: 'Ортодонтические инструменты'
  },
  {
    title: 'Аппараты',
    description: 'Ретейнеры, трейнеры, капы и пластины',
    imageAlt: 'Ортодонтические аппараты'
  },
  {
    title: 'Аксессуары',
    description: 'Ортодонтические винты, микроимпланты и аксессуары',
    imageAlt: 'Ортодонтические аксессуары'
  }
];

export function ProductRangeSection({ className }: ProductRangeSectionProps) {
  return (
    <section className={cn('py-24 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-8">
            Полный ассортимент ортодонтической продукции
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Номенклатура товаров постоянно обновляется и дополняется, 
            соблюдая все требования индустрии ортодонтии.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Placeholder */}
              <div className="aspect-square bg-stone-100 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-300 rounded-full mx-auto mb-4"></div>
                    <div className="text-sm text-stone-500">{category.imageAlt}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-stone-900">
                  {category.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="pt-2">
                  <span className="text-stone-900 text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}