'use client';

import React from 'react';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const stats = [
    { number: '15+', label: 'лет опыта' },
    { number: '5000+', label: 'довольных клиентов' },
    { number: '24/7', label: 'поддержка' },
    { number: '98%', label: 'рекомендуют нас' }
  ];

  const trustPoints = [
    'Прямые поставки от производителей',
    'Сертифицированное качество ISO 13485',
    'Персональный менеджер для каждого клиента'
  ];

  return (
    <section className={cn('relative bg-white', className)}>
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center min-h-[80vh] py-5">
          
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Main Headline */}
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-light text-gray-900 leading-[0.9]">
                Профессиональное
                <br />
                <span className="font-normal">ортодонтическое</span>
                <br />
                <span className="font-light">оборудование</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                Превосходное качество и индивидуальный подход для вашей 
                ортодонтической практики.
              </p>
            </div>

            {/* Trust Points */}
            <div className="space-y-4">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-900 text-white px-12 py-4 font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-sm">
                  Получить консультацию
                </button>
                
                <button className="border-2 border-gray-900 text-gray-900 px-12 py-4 font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider text-sm">
                  Каталог продукции
                </button>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-8 text-sm text-gray-500 pt-4">
                <span>+38 (044) 123-45-67</span>
                <span>info@orthodent.pro</span>
                <span>Киев, Украина</span>
              </div>
            </div>
          </div>

          {/* Right Content - 5 columns */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Visual */}
              <div className="aspect-[3/4] bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-8 p-12">
                    <div className="w-24 h-24 bg-gray-900 mx-auto"></div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-gray-900">
                        Экспертное качество
                      </h3>
                      <p className="text-gray-600 font-light max-w-xs">
                        Каждый продукт проходит строгий контроль качества
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quality Badge */}
                <div className="absolute top-8 right-8 bg-white px-4 py-2 text-xs font-medium text-gray-900 uppercase tracking-wider">
                  ISO 13485
                </div>
              </div>
              
              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">500+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">Клиник доверяют нам</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Preview */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8">
              Наша продукция
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Всё необходимое для современной ортодонтической практики
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Брекет-системы',
                description: 'Металлические, керамические и сапфировые брекеты премиум класса'
              },
              {
                title: 'Инструменты',
                description: 'Профессиональные ортодонтические инструменты высшего качества'
              },
              {
                title: 'Аксессуары',
                description: 'Дуги, лигатуры, эластики и расходные материалы'
              }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-all duration-500"></div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-light text-gray-900">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed font-light">
                    {category.description}
                  </p>
                  
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
        </div>
      </div>
    </section>
  );
}