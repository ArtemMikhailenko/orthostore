
import React from 'react';
import { cn } from '@/lib/utils';
import {  MapPin, Phone, Mail } from 'lucide-react';



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