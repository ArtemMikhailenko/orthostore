'use client';

import React, { useState } from 'react';
import { ChevronDown, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryItem {
  name: string;
  count: number;
  subcategories?: CategoryItem[];
}

const catalogData: CategoryItem[] = [
  {
    name: 'ПРОПИСИ БРЕКЕТІВ',
    count: 5,
  },
  {
    name: 'МІКРОІМПЛАНТИ',
    count: 5,
  },
  {
    name: 'МІНІ ПЛАСТИНИ',
    count: 5,
    subcategories: [
      { name: 'міні пластини', count: 5 },
      { name: 'щелепно-лицьова хірургія', count: 5 },
    ],
  },
  {
    name: 'БРЕКЕТИ',
    count: 5,
    subcategories: [
      { name: 'самолігуючі', count: 5 },
      { name: 'естетичні', count: 5 },
      { name: 'лігатурні', count: 5 },
    ],
  },
  {
    name: 'ЩІЧНІ ТРУБКИ ТА МОЛЯРНІ КІЛЬЦЯ',
    count: 5,
  },
  {
    name: 'АТАЧМЕНТИ',
    count: 5,
    subcategories: [
      { name: 'стопори', count: 5 },
      { name: 'кнопки', count: 5 },
      { name: 'накусочні майданчики', count: 5 },
      { name: 'пружини', count: 5 },
      { name: 'металеві лігатури', count: 5 },
    ],
  },
  {
    name: 'ДУГИ',
    count: 5,
  },
  {
    name: 'ЕЛАСТИЧНІ МАТЕРІАЛИ',
    count: 5,
  },
  {
    name: 'ФІКСАЦІЙНІ МАТІРІАЛИ',
    count: 5,
  },
  {
    name: 'РЕТРАКТОРИ',
    count: 5,
  },
  {
    name: 'ДЗЕРКАЛА ТА ФОТОКОНТРАСТЕРИ',
    count: 5,
  },
  {
    name: 'ЗОВНІШНЬОРОТОВІ ПРИСТОСУВАННЯ',
    count: 5,
  },
  {
    name: 'ТРЕЙНЕРА ТА МИОБРЕЙСИ',
    count: 5,
  },
  {
    name: 'МАТЕРІАЛИ ДЛЯ ТЕХНІКІВ',
    count: 5,
    subcategories: [
      { name: 'гвинти', count: 5 },
      { name: 'гвинти MSE', count: 5 },
      { name: 'пластини для ретенційних кап', count: 5 },
      { name: 'пластини для елайнерів', count: 5 },
      { name: 'пластмасса', count: 5 },
      { name: 'відбиткові ложки', count: 5 },
    ],
  },
  {
    name: 'СЕПАРАЦІЙНІ ІНСТРУМЕНТИ',
    count: 5,
  },
  {
    name: 'АКСЕСУАРИ',
    count: 5,
  },
  {
    name: 'ІНСТРУМЕНТИ',
    count: 5,
    subcategories: [
      { name: 'ORTHOSTORE', count: 5 },
      { name: 'LE MED', count: 5 },
    ],
  },
];

interface CategoryRowProps {
  item: CategoryItem;
  isSubcategory?: boolean;
}

function CategoryRow({ item, isSubcategory = false }: CategoryRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubcategories = item.subcategories && item.subcategories.length > 0;

  return (
    <div className="border-b border-stone-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between py-4 px-6 hover:bg-stone-50 transition-colors',
          isSubcategory && 'pl-12 bg-stone-50'
        )}
      >
        <span
          className={cn(
            'text-left font-medium transition-colors',
            isSubcategory
              ? 'text-stone-700 text-sm italic'
              : 'text-stone-900 text-base uppercase tracking-wider'
          )}
        >
          {item.name}
        </span>

        <div className="flex items-center gap-4">
          <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-medium text-sm">
            {item.count}
          </span>
          {hasSubcategories && (
            <ChevronDown
              className={cn(
                'w-5 h-5 text-stone-600 transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
            />
          )}
        </div>
      </button>

      {/* Subcategories */}
      {hasSubcategories && isExpanded && (
        <div className="bg-stone-50">
          {item.subcategories!.map((subitem, index) => (
            <CategoryRow
              key={index}
              item={subitem}
              isSubcategory={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CatalogStructure() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <h2 className="text-4xl lg:text-5xl font-light text-stone-900">
              ОРТОДОНТИЧНІ ВИРОБИ ТА ІНСТРУМЕНТИ
            </h2>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-transparent mb-4"></div>
          <p className="text-stone-600 text-lg">
            Повний каталог професійного обладнання для ортодонтії
          </p>
        </div>

        {/* Catalog Structure */}
        <div className="border-2 border-stone-200 bg-white rounded-2xl overflow-hidden shadow-sm">
          {catalogData.map((item, index) => (
            <CategoryRow key={index} item={item} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <Package className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-stone-900 mb-2">Великий вибір</h4>
              <p className="text-stone-600 text-sm">
                Понад 500+ товарів від провідних світових виробників
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Package className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-stone-900 mb-2">Якість гарантована</h4>
              <p className="text-stone-600 text-sm">
                Вся продукція сертифікована ISO 13485 та CE Mark
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Package className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-stone-900 mb-2">Швидка доставка</h4>
              <p className="text-stone-600 text-sm">
                Доставимо ваше замовлення протягом 24-48 годин
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
