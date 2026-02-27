
import React from 'react';
import { cn } from '@/lib/utils';


// Brands Partnership Section
interface BrandsPartnershipSectionProps {
  className?: string;
}

const partnerBrands = [
  'Biodinamica', 'Bisco', 'Hubit', 'ID-Logical', 'IMD', 'Lancer Orthodontics',
  'Lewa Dental', 'Mico One', 'MRC', 'Opro', 'Ormco', 'Ortho Classic',
  'Ortho-Direct', 'Speed Dental', 'OrthoStore', '3B'
];

export function BrandsPartnershipSection({ className }: BrandsPartnershipSectionProps) {
  return (
    <section className={cn('py-24 bg-stone-50', className)}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-8">
            Партнёрство с ведущими брендами
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Весь ассортимент представлен продукцией от проверенных 
            мировых производителей ортодонтического оборудования.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16">
          {partnerBrands.map((brand, index) => (
            <div 
              key={index} 
              className="aspect-square bg-white flex items-center justify-center p-4 hover:shadow-sm transition-shadow"
            >
              <div className="text-center">
                <div className="text-sm font-medium text-stone-900">{brand}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-stone-600 mb-8">
            Мы следуем инновациям в ортодонтии и предлагаем продукцию 
            высокого качества от ведущих мировых брендов.
          </p>
          <button className="bg-stone-900 text-white px-8 py-3 hover:bg-stone-800 transition-colors rounded-lg">
            Посмотреть все бренды
          </button>
        </div>
      </div>
    </section>
  );
}
