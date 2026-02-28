'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';


// Contact Hero Section
interface ContactHeroSectionProps {
  className?: string;
}

export function ContactHeroSection({ className }: ContactHeroSectionProps) {
  const scrollToContacts = () => {
    const element = document.getElementById('contact-methods');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-8">
            Готові відповісти
            <br />
            <span className="font-normal">на усі ваші питання</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-10">
            Наша команда завжди готова надати професійну консультацію
            та підтримку у виборі ортодонтичних матеріалів.
          </p>
          <button
            onClick={scrollToContacts}
            className="inline-flex items-center gap-3 border-2 border-stone-900 bg-stone-900 text-white px-8 py-4 rounded-lg hover:shadow-[0_0_40px_rgba(56,189,248,0.9),0_0_60px_rgba(56,189,248,0.5)] transition-all duration-300 font-medium text-lg group"
          >
            Як з нами зв'язатись
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
