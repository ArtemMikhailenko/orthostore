'use client'
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Users, Award, Target, Heart, Calendar, MapPin, Phone, Mail } from 'lucide-react';

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

// Mission & Values Section
interface MissionValuesSectionProps {
  className?: string;
}

const coreValues = [
  {
    icon: Target,
    title: 'Качество превыше всего',
    description: 'Работаем только с сертифицированными производителями мирового уровня, каждая поставка проходит строгий контроль качества.'
  },
  {
    icon: Users,
    title: 'Индивидуальный подход',
    description: 'Ценим как крупные компании, так и каждого врача. Персональный менеджер и консультации для всех наших клиентов.'
  },
  {
    icon: Award,
    title: 'Профессиональная экспертиза',
    description: 'Наша команда — профессионалы, которые глубоко понимают потребности врачей-ортодонтов и следят за инновациями.'
  },
  {
    icon: Heart,
    title: 'Лояльность к клиентам',
    description: 'Гибкая ценовая политика, скидки для постоянных клиентов и продукция для любого бюджета — от базового до премиум сегмента.'
  }
];

export function MissionValuesSection({ className }: MissionValuesSectionProps) {
  return (
    <section className={cn('py-24 bg-stone-50', className)}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-8">
            Наша миссия и ценности
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Мы создаём экосистему успешной ортодонтической практики, 
            объединяя качественную продукцию с профессиональным сервисом.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {coreValues.map((value, index) => (
            <div key={index} className="bg-white p-8 group hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                    <value.icon className="w-6 h-6 text-stone-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-stone-900">
                    {value.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
          <button className="bg-stone-900 text-white px-8 py-3 hover:bg-stone-800 transition-colors">
            Посмотреть все бренды
          </button>
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section  
interface WhyChooseUsSectionProps {
  className?: string;
}

const advantages = [
  {
    title: 'Надёжность',
    description: 'С нами всегда надёжно — проверенные поставщики и качественная продукция.',
    detail: 'Работаем с 2015 года без нареканий'
  },
  {
    title: 'Выгодность',
    description: 'Справедливые цены и гибкая система скидок для постоянных клиентов.',
    detail: 'До 15% скидки для партнёров'
  },
  {
    title: 'Оперативность',
    description: 'Быстрая обработка заказов и доставка по всей Украине.',
    detail: 'Доставка 1-3 рабочих дня'
  },
  {
    title: 'Качество',
    description: 'Только сертифицированная продукция от проверенных производителей.',
    detail: 'ISO 13485, CE Mark, FDA'
  }
];

export function WhyChooseUsSection({ className }: WhyChooseUsSectionProps) {
  return (
    <section className={cn('py-24 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-12">
              Почему выбирают
              <br />
              <span className="font-normal">OrthoDent Pro</span>
            </h2>

            <div className="space-y-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-xl font-medium text-stone-900">
                    {advantage.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {advantage.description}
                  </p>
                  <p className="text-sm text-stone-500">
                    {advantage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Call to Action */}
          <div className="bg-stone-900 text-white p-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-light mb-6">
                  Стать нашим клиентом
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Покупайте ортодонтическую продукцию в OrthoDent Pro: 
                  с нами всегда надёжно, выгодно, оперативно, качественно 
                  и главное — с удовольствием!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+38 (044) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>info@orthodent.pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Киев, Украина</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button className="w-full bg-white text-stone-900 py-3 px-6 hover:bg-stone-100 transition-colors">
                  Связаться с нами
                </button>
                <button className="w-full border border-white text-white py-3 px-6 hover:bg-white hover:text-stone-900 transition-colors">
                  Посмотреть каталог
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main About Page Component
export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHeroSection />
      <MissionValuesSection />
      <ProductRangeSection />
      <BrandsPartnershipSection />
      <WhyChooseUsSection />
    </div>
  );
}