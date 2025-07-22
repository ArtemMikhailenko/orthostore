'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AboutExpertiseSectionProps {
  className?: string;
}

const achievements = [
  { value: '500+', label: 'Клиник-партнеров' },
  { value: '15', label: 'Лет на рынке' },
  { value: '98.7%', label: 'Удовлетворенность' },
  { value: '24/7', label: 'Поддержка' }
];

const expertise = [
  {
    title: 'Международные стандарты',
    description: 'Вся продукция соответствует стандартам ISO 13485, CE Mark, FDA. Работаем только с сертифицированными производителями мирового уровня.'
  },
  {
    title: 'Надежность и гарантии',
    description: 'Расширенная гарантия на все оборудование, быстрая замена в случае брака, полное техническое сопровождение на всех этапах.'
  },
  {
    title: 'Персональный подход',
    description: 'Каждому клиенту назначается персональный менеджер. Индивидуальные коммерческие предложения и круглосуточные консультации.'
  },
  {
    title: 'Экспертность и опыт',
    description: 'Команда экспертов с 15+ летним опытом, регулярное обучение у производителей, глубокие знания рынка ортодонтии.'
  }
];

export function AboutExpertiseSection({ className }: AboutExpertiseSectionProps) {
  return (
    <section className={cn('py-32 bg-white', className)}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-8">
              Ваш надежный
              <br />
              <span className="font-normal">партнер в ортодонтии</span>
            </h2>
            
            <div className="w-16 h-px bg-gray-900 mb-8"></div>
            
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Более 15 лет мы создаем экосистему успешной ортодонтической практики, 
              обеспечивая клиники высококачественным оборудованием от ведущих 
              мировых производителей.
            </p>
          </div>
          
          <div className="space-y-8 lg:pt-16">
            {[
              'Прямые поставки без посредников',
              'Собственный склад с постоянным наличием',
              'Техническая поддержка на всех этапах',
              'Гибкие условия для постоянных клиентов'
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-3"></div>
                <span className="text-gray-700 text-lg font-light">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {achievements.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-light text-gray-900 mb-4">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Expertise Grid */}
        <div className="grid lg:grid-cols-2 gap-20 mb-32">
          {expertise.map((item, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900">
                {item.title}
              </h3>
              <div className="w-12 h-px bg-gray-900"></div>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial + CTA */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="bg-gray-50 p-16">
            <blockquote className="text-3xl font-light text-gray-900 leading-relaxed mb-12">
              "OrthoDent Pro полностью изменил наш подход к работе. 
              Качество оборудования безупречно."
            </blockquote>
            
            <div className="space-y-2">
              <div className="font-medium text-gray-900">Др. Елена Кравченко</div>
              <div className="text-gray-600">Главный врач, "Smile Clinic"</div>
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-light text-gray-900 mb-8">
                Готовы начать сотрудничество?
              </h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Получите персональную консультацию и узнайте, как мы можем 
                улучшить эффективность вашей ортодонтической практики.
              </p>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-gray-900 text-white px-12 py-4 font-medium hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm">
                Получить консультацию
              </button>
              
              <button className="w-full border-2 border-gray-900 text-gray-900 px-12 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wider text-sm">
                Скачать презентацию
              </button>
            </div>
            
            <div className="pt-8 border-t border-gray-200 space-y-2 text-gray-500">
              <div>+38 (044) 123-45-67</div>
              <div>info@orthodent.pro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}