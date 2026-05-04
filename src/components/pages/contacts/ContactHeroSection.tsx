'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';


// Contact Hero Section
interface ContactHeroSectionProps {
  className?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  buttonText?: string;
}

export function ContactHeroSection({
  className,
  heroTitle = 'Готові відповісти\nна усі ваші питання',
  heroSubtitle = 'Наша команда завжди готова надати професійну консультацію та підтримку у виборі ортодонтичних матеріалів.',
  buttonText = "Як з нами зв'язатись",
}: ContactHeroSectionProps) {
  const scrollToContacts = () => {
    const element = document.getElementById('contact-methods');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Support "\n" as line break in heroTitle
  const titleLines = heroTitle.split('\n');

  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-8">
            {titleLines[0]}
            {titleLines.length > 1 && (
              <>
                <br />
                <span className="font-normal">{titleLines.slice(1).join(' ')}</span>
              </>
            )}
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-10">
            {heroSubtitle}
          </p>
          <button
            onClick={scrollToContacts}
            className="inline-flex items-center gap-3 border-2 border-stone-900 bg-white text-stone-900 px-8 py-4 rounded-xl hover:bg-stone-900 hover:text-white hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.7),0_0_40px_rgba(56,189,248,0.35)] hover:ring-[3px] hover:ring-sky-400/60 transition-all duration-300 font-medium text-lg group"
          >
            {buttonText}
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

