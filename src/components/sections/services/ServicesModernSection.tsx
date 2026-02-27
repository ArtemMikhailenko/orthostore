'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Quote, Star, Mail, Phone } from 'lucide-react';

interface ServicesModernSectionProps {
  className?: string;
}



export function ServicesModernSection({ className }: ServicesModernSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className={cn('py-12 bg-stone-50', className)}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-6">
         
          <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-3">
            Бажаєте почати співпрацювати?
          </h2>
          
          <p className="text-stone-600 max-w-2xl mx-auto text-base">
            Отримайте персональну консультацію та дізнайтесь за новинки в нашому інтернет магазині.
          </p>
        </div>

 

        {/* CTA Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left: Contact Info */}
          <div className="bg-stone-900 text-white p-6 relative overflow-hidden rounded-xl h-full">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-4">
                
                
                <h3 className="text-4xl font-light mb-3 leading-tight">
                  Потрібна<br />
                  <span className="font-normal">консультація?</span>
                </h3>
                
                <div className="w-16 h-px bg-white/30 mb-3"></div>
                
                <p className="text-stone-300 leading-relaxed text-md">
                  Ми з задоволенням допоможемо відібрати більш привабливі пропозиції та товари для вашої практики
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-12 h-12 border-2 border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-medium mb-1">+38 (050) 303 94 94</div>
                    <div className="text-sm text-stone-400">ПН-ПТ: 9:00-18:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-12 h-12 border-2 border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base mb-1">orthostore.com.ua@gmail.com</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <button className="w-full border-2 border-white text-white px-4 py-3 font-medium hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase tracking-wider text-sm rounded-lg">
                  Замовити дзвінок
                </button>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-6 border-2 border-stone-200 rounded-xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-light text-stone-900 mb-2">
                  Форма зворотного зв'язку
                </h3>
                <div className="w-12 h-px bg-stone-900 mb-3"></div>
                <p className="text-stone-600 font-light leading-relaxed text-sm">
                  Залиште свої контакти і наш менеджер зв'яжеться з вами найближчим часом
                </p>
              </div>
              
              <form className="space-y-2.5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-stone-700 mb-1">
                    Ім'я *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors rounded-lg text-sm"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-stone-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors rounded-lg text-sm"
                    placeholder="+38 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-stone-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors rounded-lg text-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-700 mb-1">
                    Повідомлення
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors resize-none rounded-lg text-sm"
                    placeholder="Опишіть ваше питання або побажання..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 w-4 h-4 border-2 border-stone-300 focus:ring-stone-900 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-stone-600">
                    Я погоджуюся з{' '}
                    <a href="/terms" className="text-stone-900 underline hover:no-underline">
                      політикою конфіденційності
                    </a>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full border-2 border-stone-900 bg-stone-900 text-white px-4 py-4 font-medium hover:bg-transparent hover:text-stone-900 transition-all duration-300 uppercase tracking-wider text-xs rounded-lg"
                >
                  Надіслати повідомлення
                </button>
              </form>

              <div className="pt-3 border-t-2 border-stone-200">
                <p className="text-sm text-stone-500 text-center">
                  Або зателефонуйте нам: <span className="text-stone-900 font-medium">+38 (050) 303-94-94</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}