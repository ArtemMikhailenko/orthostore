'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface FooterSectionProps {
  className?: string;
}

const footerLinks = {
  company: {
    title: 'Компания',
    links: [
      { name: 'О нас', href: '/about' },
      { name: 'Наша команда', href: '/team' },
      { name: 'Карьера', href: '/careers' },
      { name: 'Новости', href: '/news' },
      { name: 'Контакты', href: '/contacts' }
    ]
  },
  products: {
    title: 'Продукция',
    links: [
      { name: 'Брекет-системы', href: '/braces' },
      { name: 'Инструменты', href: '/instruments' },
      { name: 'Аксессуары', href: '/accessories' },
      { name: 'Новинки', href: '/new-products' },
      { name: 'Каталог', href: '/catalog' }
    ]
  },
  services: {
    title: 'Услуги',
    links: [
      { name: 'Доставка', href: '/delivery' },
      { name: 'Техподдержка', href: '/support' },
      { name: 'Обучение', href: '/training' },
      { name: 'Сервис', href: '/service' },
      { name: 'Гарантия', href: '/warranty' }
    ]
  },
  support: {
    title: 'Поддержка',
    links: [
      { name: 'Центр помощи', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Документация', href: '/docs' },
      { name: 'Загрузки', href: '/downloads' },
      { name: 'Обратная связь', href: '/feedback' }
    ]
  }
};

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
        <div className="grid lg:grid-cols-6 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold tracking-wide mb-2">
              ORTHODENT
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-8">
              MADE FOR YOU
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-sm">
              Профессиональное ортодонтическое оборудование от мировых лидеров. 
              Качество, которому доверяют.
            </p>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-6 text-white">
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
            
            <button className="bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm">
              Связаться
            </button>
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
              <span className="text-sm text-gray-400">Следите за нами:</span>
              <div className="flex gap-2">
                {['FB', 'IG', 'LI', 'YT'].map((social, index) => (
                  <a
                    key={index}
                    href={`#${social.toLowerCase()}`}
                    className="w-8 h-8 border border-gray-700 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs font-medium"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}