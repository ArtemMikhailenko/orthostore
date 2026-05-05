'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FaTelegramPlane, FaViber, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

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

          {/* Logo */}
          <div className="flex flex-col items-center justify-center lg:justify-end">
            <img
              src="/LOGO-text (1).png"
              alt="ORTHOSTORE"
              className="w-72 h-auto object-contain"
            />
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
                <span className="text-gray-400 text-sm">ПН-ПТ: 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>© 2024 ORTHOSTORE. Всі права захищені.</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Політика конфіденційності
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Умови використання
              </a>
            </div>

            {/* Social icons — same as header */}
            <div className="flex items-center gap-3 mr-20">
              <a href="https://t.me/orthostore" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all duration-300"
                title="Telegram">
                <FaTelegramPlane className="w-4 h-4 text-white" />
              </a>
              <a href="viber://chat?number=%2B380503039494" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300"
                title="Viber">
                <FaViber className="w-4 h-4 text-white" />
              </a>
              <a href="https://instagram.com/orthostore.ua" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300"
                title="Instagram">
                <FaInstagram className="w-4 h-4 text-white" />
              </a>
              <a href="https://facebook.com/orthostore.ua" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                title="Facebook">
                <FaFacebookF className="w-4 h-4 text-white" />
              </a>
              <a href="https://tiktok.com/@orthostore.ua" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-stone-600 transition-all duration-300"
                title="TikTok">
                <FaTiktok className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}