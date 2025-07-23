
import React from 'react';
import { cn } from '@/lib/utils';
import {  Users, Award, Target, Heart } from 'lucide-react';



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