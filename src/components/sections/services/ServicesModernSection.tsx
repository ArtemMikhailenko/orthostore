'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Quote, Star, Mail, Phone, MessageCircle, Bot, ChevronUp } from 'lucide-react';

interface ServicesModernSectionProps {
  className?: string;
}

const testimonials = [
  {
    id: 1,
    quote: "OrthoDent Pro повністю змінив наш підхід до роботи. Якість обладнання бездоганна.",
    author: "Др. Олена Кравченко",
    position: "Головний лікар",
    clinic: "Smile Clinic",
    rating: 5,
    image: "1"
  },
  {
    id: 2,
    quote: "ORTHOSTORE рекомендує - тут ми розміщуємо фото та невеликий опис праці з нами лікарів або клінік. Професійний підхід та швидка доставка.",
    author: "Др. Андрій Петренко",
    position: "Ортодонт",
    clinic: "DentPro",
    rating: 5,
    image: "2",
    featured: true
  },
  {
    id: 3,
    quote: "Тут фото лікаря або стоматології які співпрацюють з нами та ми їх рекомендуємо для пацієнтів. Відмінний сервіс та підтримка!",
    author: "Др. Марія Іваненко",
    position: "Стоматолог",
    clinic: "Perfect Smile",
    rating: 5,
    image: "3"
  }
];

export function ServicesModernSection({ className }: ServicesModernSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);

  const contactOptions = [
    {
      id: 'phone',
      label: 'Зателефонувати',
      icon: Phone,
      action: () => window.location.href = 'tel:+380441234567',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'telegram',
      label: 'Telegram',
      icon: MessageCircle,
      action: () => window.open('https://t.me/orthodent', '_blank'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'viber',
      label: 'Viber',
      icon: MessageCircle,
      action: () => window.open('viber://chat?number=+380441234567', '_blank'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'ai',
      label: 'AI Асистент',
      icon: Bot,
      action: () => console.log('Open AI chat'),
      color: 'bg-stone-900 hover:bg-stone-800'
    }
  ];

  return (
    <section className={cn('py-32 bg-stone-50', className)}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <Quote className="w-6 h-6 text-stone-900" />
            <span className="text-stone-600 uppercase tracking-wider text-sm font-medium">
              Відгуки клієнтів
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
            Готові почати співпрацю?
          </h2>
          
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Отримайте персональну консультацію та дізнайтеся, як ми можемо покращити ефективність вашої ортодонтичної практики.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => setActiveTestimonial(index)}
              className={cn(
                'relative border-2 bg-white p-8 cursor-pointer transition-all duration-300 group',
                activeTestimonial === index 
                  ? 'border-stone-900 shadow-lg' 
                  : 'border-stone-200 hover:border-stone-400',
                testimonial.featured && 'lg:col-span-1'
              )}
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-stone-900" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-stone-900 text-stone-900" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-stone-700 leading-relaxed min-h-[120px]">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="pt-6 border-t-2 border-stone-200">
                  <div className="font-medium text-stone-900 mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-stone-600">
                    {testimonial.position}, "{testimonial.clinic}"
                  </div>
                </div>
              </div>

              {/* Active Indicator */}
              {activeTestimonial === index && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-900" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info */}
          <div className="bg-stone-900 text-white p-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 space-y-10">
              <div>
                <div className="inline-block mb-6">
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Консультація</span>
                  </div>
                </div>
                
                <h3 className="text-4xl font-light mb-6 leading-tight">
                  Потрібна<br />
                  <span className="font-normal">консультація?</span>
                </h3>
                
                <div className="w-16 h-px bg-white/30 mb-6"></div>
                
                <p className="text-stone-300 leading-relaxed text-lg">
                  Наші експерти допоможуть вибрати оптимальне рішення для вашої ортодонтичної практики
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 border-2 border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-medium mb-1">+38 (044) 123-45-67</div>
                    <div className="text-sm text-stone-400">Щодня з 9:00 до 18:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 border-2 border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg mb-1">info@orthodent.com</div>
                    <div className="text-sm text-stone-400">Відповімо протягом години</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                {/* Contact Options Menu */}
                <div className="relative">
                  {/* Dropdown Options */}
                  {isContactMenuOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-3 space-y-2">
                      {contactOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              option.action();
                              setIsContactMenuOpen(false);
                            }}
                            className={cn(
                              'w-full text-white px-6 py-3 font-medium transition-all duration-300 flex items-center justify-center gap-3',
                              option.color
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="uppercase tracking-wider text-sm">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Main Toggle Button */}
                  <button 
                    onClick={() => setIsContactMenuOpen(!isContactMenuOpen)}
                    className="w-full border-2 border-white text-white px-8 py-4 font-medium hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Зв'язатися з нами</span>
                    <ChevronUp 
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        isContactMenuOpen ? 'rotate-0' : 'rotate-180'
                      )} 
                    />
                  </button>
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-light mb-1">2 год</div>
                    <div className="text-xs text-stone-400">Час відповіді</div>
                  </div>
                  <div className="h-12 w-px bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light mb-1">24/7</div>
                    <div className="text-xs text-stone-400">Підтримка</div>
                  </div>
                  <div className="h-12 w-px bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light mb-1">500+</div>
                    <div className="text-xs text-stone-400">Клієнтів</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-16 border-2 border-stone-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-light text-stone-900 mb-4">
                  Форма зворотного зв'язку
                </h3>
                <div className="w-12 h-px bg-stone-900 mb-6"></div>
                <p className="text-stone-600 font-light leading-relaxed">
                  Залиште свої контакти і наш менеджер зв'яжеться з вами найближчим часом
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Ім'я *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="+38 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Повідомлення
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                    placeholder="Опишіть ваше питання або побажання..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 w-4 h-4 border-2 border-stone-300 focus:ring-stone-900"
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
                  className="w-full border-2 border-stone-900 bg-stone-900 text-white px-8 py-4 font-medium hover:bg-transparent hover:text-stone-900 transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  Надіслати повідомлення
                </button>
              </form>

              <div className="pt-6 border-t-2 border-stone-200">
                <p className="text-sm text-stone-500 text-center">
                  Або зателефонуйте нам: <span className="text-stone-900 font-medium">+38 (044) 123-45-67</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16">
          <button className="border-2 border-stone-900 bg-stone-900 text-white px-12 py-4 font-medium hover:bg-transparent hover:text-stone-900 transition-all duration-300 uppercase tracking-wider text-sm">
            Отримати консультацію
          </button>
          <button className="border-2 border-stone-900 text-stone-900 px-12 py-4 font-medium hover:bg-stone-900 hover:text-white transition-all duration-300 uppercase tracking-wider text-sm">
            Скачати презентацію
          </button>
        </div>

        {/* Bottom Contact Info */}
        <div className="text-center mt-12 space-y-2">
          <div className="text-stone-900 font-medium text-lg">+38 (044) 123-45-67</div>
          <div className="text-stone-600">info@orthodent.pro</div>
        </div>
      </div>
    </section>
  );
}