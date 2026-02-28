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
      { name: 'Про нас', href: '/about' },
      { name: 'Контакти', href: '/contacts' },
      { name: 'CASH BACK', href: '/cashback' }
    ]
  },
  information: {
    title: 'ІНФОРМАЦІЯ',
    links: [
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
    <footer className={cn('bg-black text-white', className)}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div>
            <div className="text-2xl font-bold tracking-wide mb-2">
              ORTHOSTORE
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-6">
              ВСЕ ДЛЯ СУЧАСНОЇ ОРТОДОНТІЇ
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-sm">
              Професійні ортодонтичні матеріали від світових виробників.
              Якість, якій довіряють...
            </p>
          </div>

          {/* КОМПАНІЯ */}
          <div className='lg:ml-20'>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ІНФОРМАЦІЯ */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {footerLinks.information.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.information.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo with balls */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative group">
              {/* Decorative glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-sky-500/20 via-transparent to-sky-400/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Border frame */}
              <div className="relative px-6 py-10 rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm shadow-lg shadow-sky-900/10">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-sky-400/60 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-sky-400/60 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-sky-400/60 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-sky-400/60 rounded-br-2xl" />
                <img
                  src="/logo-balls.png"
                  alt="OrthoDent Pro"
                  className="w-78 h-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <div>
                <span className="text-white font-medium">+38 (050) 303 94 94</span>
              </div>
              <div>
                <span className="text-white font-medium">orthostore.com.ua@gmail.com</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">м. Київ, вул. Саксаганського, 54/56 офіс, 124</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">ПН-ПТ: 9:00-18:00</span>
              </div>
            </div>

            <a
              href="/contacts"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-3 font-semibold hover:from-sky-400 hover:to-sky-500 transition-all duration-300 uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Зв'язок
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>© 2024 OrthoDent Pro. Всі права захищені.</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Політика конфіденційності
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Умови використання
              </a>
            </div>

            {/* Social icons — shifted left with mr-20 to avoid chat widget overlap */}
            <div className="flex items-center gap-4 mr-20">
              <span className="text-sm text-gray-400">Соц мережі</span>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/380503039494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 hover:border-green-500 transition-all duration-300"
                  title="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.46-.01z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/orthostore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-sky-500 hover:border-sky-400 transition-all duration-300"
                  title="Telegram"
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
                <a
                  href="tel:+380503039494"
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300"
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