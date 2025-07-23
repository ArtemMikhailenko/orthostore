
import React from 'react';
import { cn } from '@/lib/utils';


// Contact Hero Section
interface ContactHeroSectionProps {
  className?: string;
}

export function ContactHeroSection({ className }: ContactHeroSectionProps) {
  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm text-stone-600 uppercase tracking-wider mb-6">
            Свяжитесь с нами
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-8">
            Готовы ответить
            <br />
            <span className="font-normal">на все ваши вопросы</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Наша команда экспертов всегда готова предоставить профессиональную 
            консультацию и помочь с выбором ортодонтического оборудования.
          </p>
        </div>
      </div>
    </section>
  );
}
