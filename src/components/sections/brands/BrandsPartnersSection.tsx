'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Star } from 'lucide-react';

interface BrandsPartnersSectionProps {
  className?: string;
}

const brandCategories = [
  {
    id: 'premium',
    name: 'Премиум бренды',
    description: 'Лидеры мирового рынка ортодонтии'
  },
  {
    id: 'popular',
    name: 'Популярные бренды',
    description: 'Проверенное качество по доступным ценам'
  },
  {
    id: 'specialized',
    name: 'Специализированные',
    description: 'Узкоспециализированные решения'
  }
];

const brands = {
  premium: [
    {
      name: '3M Unitek',
      country: 'США',
      specialization: 'Брекет-системы премиум класса',
      established: '1962',
      products: 'Clarity, SmartClip',
      featured: true
    },
    {
      name: 'Ormco',
      country: 'США',
      specialization: 'Инновационные ортодонтические решения',
      established: '1960',
      products: 'Damon, Spark',
      featured: true
    },
    {
      name: 'American Orthodontics',
      country: 'США',
      specialization: 'Полный спектр ортодонтической продукции',
      established: '1968',
      products: 'Empower, Radiance',
      featured: false
    }
  ],
  popular: [
    {
      name: 'Forestadent',
      country: 'Германия',
      specialization: 'Европейское качество и надежность',
      established: '1965',
      products: 'QuicKlear, BioQuick',
      featured: true
    },
    {
      name: 'Dentaurum',
      country: 'Германия',
      specialization: 'Ортодонтические материалы и инструменты',
      established: '1886',
      products: 'Discovery, Equilibrium',
      featured: false
    },
    {
      name: 'GAC',
      country: 'США',
      specialization: 'Доступные ортодонтические решения',
      established: '1967',
      products: 'In-Ovation, Allure',
      featured: false
    }
  ],
  specialized: [
    {
      name: 'Ortho Technology',
      country: 'США',
      specialization: 'Специализированные ортодонтические решения',
      established: '1991',
      products: 'Ice, Accuvu',
      featured: false
    },
    {
      name: 'Rocky Mountain',
      country: 'США',
      specialization: 'Инструменты и аксессуары',
      established: '1978',
      products: 'RMO, Titanium',
      featured: false
    },
    {
      name: 'TP Orthodontics',
      country: 'США',
      specialization: 'Проволочные изделия и аксессуары',
      established: '1956',
      products: 'Bioforce, Knotless',
      featured: false
    }
  ]
};

const achievements = [
  {
    title: 'Официальные дистрибьюторы',
    description: 'Работаем напрямую с производителями',
    metric: '15+'
  },
  {
    title: 'Эксклюзивные партнерства',
    description: 'Единственные представители в Украине',
    metric: '5'
  },
  {
    title: 'Лет на рынке',
    description: 'Опыт работы с мировыми брендами',
    metric: '15+'
  }
];

export function BrandsPartnersSection({ className }: BrandsPartnersSectionProps) {
  const [activeCategory, setActiveCategory] = useState('premium');
  const currentBrands = brands[activeCategory as keyof typeof brands];

  return (
    <section className={cn('py-32 bg-white', className)}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-12">
            Мировые
            <br />
            <span className="font-normal">лидеры ортодонтии</span>
          </h2>
          
          <div className="w-16 h-px bg-gray-900 mx-auto mb-12"></div>
          
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Партнерство с ведущими производителями позволяет нам предлагать 
            самые современные и надежные ортодонтические решения
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-20">
          <div className="flex gap-8">
            {brandCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'text-center p-6 transition-all duration-300 border-b-2',
                  activeCategory === category.id
                    ? 'border-b-gray-900'
                    : 'border-b-transparent hover:border-b-gray-300'
                )}
              >
                <div className="space-y-2">
                  <h3 className={cn(
                    'text-lg font-medium transition-colors',
                    activeCategory === category.id ? 'text-gray-900' : 'text-gray-600'
                  )}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-light">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          {currentBrands.map((brand, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              {/* Brand Logo Area */}
              <div className="aspect-video bg-gray-100 mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="text-2xl font-light text-gray-600 mb-2">
                    {brand.name}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {brand.country}
                  </div>
                </div>
                
                {brand.featured && (
                  <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 text-xs uppercase tracking-wider">
                    <Star className="w-3 h-3 inline mr-1" />
                    Топ
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-all duration-500"></div>
              </div>
              
              {/* Brand Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 font-light text-sm">
                    {brand.specialization}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Основан:</span>
                    <span className="text-gray-700">{brand.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Продукты:</span>
                    <span className="text-gray-700">{brand.products}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <span className="text-gray-900 font-medium inline-flex items-center gap-3 group-hover:gap-4 transition-all duration-300 uppercase tracking-wider text-sm">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Achievements */}
        <div className="bg-gray-50 p-16 mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-light text-gray-900 mb-8">
              Наши партнерские достижения
            </h3>
            <div className="w-12 h-px bg-gray-900 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-4">
                  {achievement.metric}
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 font-light">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Brands */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h3 className="text-4xl font-light text-gray-900 mb-8">
              Почему именно
              <br />
              <span className="font-normal">эти бренды?</span>
            </h3>
            
            <div className="w-12 h-px bg-gray-900 mb-8"></div>
            
            <div className="space-y-8">
              {[
                {
                  title: 'Проверенное качество',
                  description: 'Каждый бренд имеет многолетнюю историю и безупречную репутацию в мировой ортодонтии'
                },
                {
                  title: 'Инновационные технологии',
                  description: 'Постоянные инвестиции в исследования и разработки новых решений для ортодонтии'
                },
                {
                  title: 'Глобальная поддержка',
                  description: 'Международная сеть поддержки, обучения и технического сервиса'
                }
              ].map((item, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-xl font-light text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 text-white p-16">
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-light mb-6">
                  Стать официальным партнером
                </h4>
                <div className="w-12 h-px bg-white mb-6"></div>
                <p className="text-gray-300 font-light leading-relaxed">
                  Получите эксклюзивные условия сотрудничества, 
                  приоритетную поддержку и доступ к новинкам первыми
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-3"></div>
                  <span className="text-gray-300 font-light">Специальные цены для партнеров</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-3"></div>
                  <span className="text-gray-300 font-light">Приоритетные поставки</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-3"></div>
                  <span className="text-gray-300 font-light">Маркетинговая поддержка</span>
                </div>
              </div>
              
              <button className="bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm rounded-lg">
                Стать партнером
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}