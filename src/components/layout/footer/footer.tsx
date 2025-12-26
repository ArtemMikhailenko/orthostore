'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FooterSectionProps {
  className?: string;
}

const footerLinks = {
  company: {
    title: 'КОМПАНІЯ',
    links: [
      { name: 'О нас', href: '/about' },
      { name: 'Наша команда', href: '/team' },
      { name: 'Контакти', href: '/contacts' },
      { name: 'CASH BACK', href: '/cashback' }
    ]
  },
  information: {
    title: 'ІНФОРМАЦІЯ',
    links: [
      { name: 'Новинки', href: '/new' },
      { name: 'Каталог', href: '/catalog' },
      { name: 'Доставка та оплата', href: '/delivery' },
      { name: 'Повернення', href: '/returns' },
      { name: 'Гарантія', href: '/warranty' },
      { name: 'Договір публічної оферти', href: '/public-offer' }
    ]
  },
  
} as const;

const certifications = [
  'ISO 13485',
  'CE MARK', 
  'FDA APPROVED',
  'МОЗ УКРАИНЫ'
];

export function FooterSection({ className }: FooterSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
  <footer className={cn('bg-gray-900 text-white', className)}>
      {/* Newsletter Section */}
   
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold tracking-wide mb-2">
              ORTHOSTORE
            </div>
            <div className="text-sm text-white-500 uppercase tracking-wider mb-8">
              ВСЕ ДЛЯ СУЧАСНОЇ ОРТОДОНТІЇ
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-sm">
              Профессиональное ортодонтическое оборудование от мировых лидеров. 
              Качество, которому доверяют.
            </p>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <div>
                <span className="text-white font-medium">+38 (044) 123-45-67</span>
                
              </div>
              <div>
                <span className="text-white font-medium">info@orthodent.pro</span>
               
              </div>
              <div>
                <span className="text-gray-400 text-sm">ул. Медицинская, 15, Киев</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
            
            <a href="/contacts" className="bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm">
              Связаться
            </a>
          </div>
        </div>
      </div>



      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>© 2024 OrthoDent Pro. Все права защищены.</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Значки соц мереж</span>
              <div className="flex gap-3">
                <a
                  href="https://viber.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  title="Viber"
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.46-.01z"/>
                  </svg>
                </a>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  title="Telegram"
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
                <a
                  href="tel:+380971979003"
                  className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  title="Телефон"
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}