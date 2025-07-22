'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ServicesModernSectionProps {
  className?: string;
}

const services = [
  {
    id: 'logistics',
    title: 'Логистика',
    subtitle: 'Быстрая доставка по всей Украине',
    description: 'Собственная логистическая сеть обеспечивает надежную доставку медицинского оборудования с полным отслеживанием и гарантией сохранности.',
    features: [
      'Доставка 1-3 рабочих дня',
      'Отслеживание в реальном времени',
      'Специальная упаковка для медоборудования',
      'Бесплатная доставка от 10 000 ₴'
    ],
    metric: '24-48ч'
  },
  {
    id: 'support',
    title: 'Поддержка',
    subtitle: 'Экспертные консультации 24/7',
    description: 'Команда сертифицированных специалистов предоставляет круглосуточную поддержку и консультации по всем техническим вопросам.',
    features: [
      'Персональный менеджер',
      'Техническая поддержка 24/7',
      'Видео-консультации',
      'База знаний и обучающие материалы'
    ],
    metric: '< 2ч'
  },
  {
    id: 'service',
    title: 'Сервис',
    subtitle: 'Техническое обслуживание',
    description: 'Полный цикл технического обслуживания от профилактики до капитального ремонта с использованием оригинальных запчастей.',
    features: [
      'Плановое техническое обслуживание',
      'Ремонт и настройка оборудования',
      'Оригинальные запасные части',
      'Выездной сервис по всей Украине'
    ],
    metric: '99.8%'
  },
  {
    id: 'training',
    title: 'Обучение',
    subtitle: 'Развитие персонала',
    description: 'Комплексные образовательные программы для медицинского персонала от базового до экспертного уровня подготовки.',
    features: [
      'Сертифицированные курсы обучения',
      'Практические семинары и воркшопы',
      'Онлайн-платформа обучения',
      'Библиотека учебных материалов'
    ],
    metric: '500+'
  }
];

const serviceMetrics = [
  { value: '< 2 часа', label: 'Время отклика на запросы' },
  { value: '99.8%', label: 'Выполнение SLA обязательств' },
  { value: '24/7', label: 'Техническая поддержка' },
  { value: '500+', label: 'Обслуживаемых клиентов' }
];

export function ServicesModernSection({ className }: ServicesModernSectionProps) {
  const [activeService, setActiveService] = useState('logistics');
  const currentService = services.find(s => s.id === activeService);

  return (
    <section className={cn('py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-12">
            Полный спектр
            <br />
            <span className="font-normal">профессиональных услуг</span>
          </h2>
          
          <div className="w-16 h-px bg-gray-900 mx-auto mb-12"></div>
          
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            От поставки оборудования до полного технического сопровождения — 
            обеспечиваем успех вашей ортодонтической практики на каждом этапе
          </p>
        </div>

        {/* Services */}
        <div className="grid lg:grid-cols-2 gap-20 mb-32">
          
          {/* Service Navigation */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={cn(
                  'w-full text-left p-8 transition-all duration-300 border-l-2',
                  activeService === service.id
                    ? 'bg-white border-l-gray-900'
                    : 'bg-transparent border-l-gray-200 hover:border-l-gray-400'
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-light text-gray-900">
                      {service.title}
                    </h3>
                    {activeService === service.id && (
                      <div className="text-right">
                        <div className="text-2xl font-light text-gray-900">
                          {service.metric}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 font-light">
                    {service.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Service Details */}
          <div className="bg-white p-12">
            {currentService && (
              <div className="space-y-12">
                <div>
                  <h3 className="text-3xl font-light text-gray-900 mb-8">
                    {currentService.title}
                  </h3>
                  <div className="w-12 h-px bg-gray-900 mb-8"></div>
                  <p className="text-xl text-gray-600 font-light leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-3"></div>
                      <span className="text-gray-700 font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-8">
                  <button className="bg-gray-900 text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm">
                    Подробнее
                  </button>
                  <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 font-medium hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wider text-sm">
                    Связаться
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white p-16 mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-light text-gray-900 mb-8">
              Показатели качества наших услуг
            </h3>
            <div className="w-12 h-px bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {serviceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-4">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Resources */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact */}
          <div className="bg-gray-900 text-white p-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-light mb-8">
                  Нужна консультация?
                </h3>
                <div className="w-12 h-px bg-white mb-8"></div>
                <p className="text-gray-300 font-light leading-relaxed text-lg">
                  Наши эксперты помогут выбрать оптимальное решение 
                  для вашей ортодонтической практики
                </p>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div>+38 (044) 123-45-67</div>
                <div className="text-sm text-gray-400">Ежедневно с 9:00 до 18:00</div>
              </div>
              
              <button className="bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm">
                Заказать звонок
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white p-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-8">
                  Полезные материалы
                </h3>
                <div className="w-12 h-px bg-gray-900 mb-8"></div>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  Скачайте каталоги, сертификаты и документацию
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  'Каталог продукции 2024',
                  'Сертификаты качества',
                  'Инструкции по эксплуатации',
                  'Прайс-лист оборудования'
                ].map((item, index) => (
                  <button key={index} className="w-full text-left py-4 border-b border-gray-200 hover:border-gray-900 transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
              
              <button className="w-full border-2 border-gray-900 text-gray-900 px-8 py-3 font-medium hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wider text-sm">
                Все материалы
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}