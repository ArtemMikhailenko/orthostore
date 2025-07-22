'use client'
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

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

// Contact Information Cards
interface ContactInfoSectionProps {
  className?: string;
}

const contactMethods = [
  {
    icon: Phone,
    title: 'Телефон',
    primary: '+38 050 303 94 94',
    secondary: '+38 066 210 00 95',
    description: 'Звоните в рабочее время для консультаций',
    action: 'Позвонить',
    href: 'tel:+380503039494'
  },
  {
    icon: Mail,
    title: 'Email',
    primary: 'info@orthodent.pro',
    secondary: 'orthostore.com.ua@gmail.com',
    description: 'Отправьте запрос — ответим в течение 2 часов',
    action: 'Написать',
    href: 'mailto:info@orthodent.pro'
  },
  {
    icon: MessageCircle,
    title: 'Онлайн-чат',
    primary: 'Мгновенная поддержка',
    secondary: 'Рабочие часы',
    description: 'Быстрые ответы на ваши вопросы',
    action: 'Открыть чат',
    href: '#'
  },
  {
    icon: Calendar,
    title: 'Встреча',
    primary: 'Личная консультация',
    secondary: 'По предварительной записи',
    description: 'Обсудим ваши потребности лично',
    action: 'Записаться',
    href: '#'
  }
];

export function ContactInfoSection({ className }: ContactInfoSectionProps) {
  return (
    <section className={cn('py-16 bg-stone-50', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white p-6 group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-stone-900">
                    {method.title}
                  </h3>
                  <div className="text-stone-900 font-medium">
                    {method.primary}
                  </div>
                  <div className="text-sm text-stone-600">
                    {method.secondary}
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {method.description}
                  </p>
                </div>
                
                <a 
                  href={method.href}
                  className="inline-flex items-center gap-2 text-stone-900 font-medium text-sm group-hover:gap-3 transition-all duration-300"
                >
                  {method.action}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Location & Hours Section
interface LocationHoursSectionProps {
  className?: string;
}

export function LocationHoursSection({ className }: LocationHoursSectionProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const workingHours = [
    { day: 'Понедельник - Пятница', hours: '9:00 - 18:00', isToday: true },
    { day: 'Суббота - Воскресенье', hours: 'Приём заказов онлайн 24/7', isToday: false }
  ];

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Location Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light text-stone-900 mb-6">
                Наше расположение
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-stone-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-stone-900">
                      Киев, ул. Саксаганского 54/56
                    </div>
                    <div className="text-stone-600 text-sm">
                      Центральный офис и склад
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-xl font-medium text-stone-900 mb-4">
                Режим работы
              </h3>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      'flex justify-between items-center p-4 rounded-lg transition-colors',
                      schedule.isToday ? 'bg-stone-100' : 'bg-stone-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-stone-600" />
                      <span className="text-stone-900">{schedule.day}</span>
                    </div>
                    <span className={cn(
                      'font-medium',
                      schedule.isToday ? 'text-stone-900' : 'text-stone-600'
                    )}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-6 bg-stone-50 rounded-lg">
              <h4 className="font-medium text-stone-900 mb-3">
                Как добраться
              </h4>
              <div className="space-y-2 text-sm text-stone-600">
                <div>🚇 Метро: Университет (5 минут пешком)</div>
                <div>🚌 Автобусы: 24, 38, 55 (остановка "Саксаганского")</div>
                <div>🚗 Парковка: доступна возле здания</div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-stone-900">
              Интерактивная карта
            </h3>
            
            {/* Map Container */}
            <div className="relative">
              <div 
                className={cn(
                  'aspect-[4/3] bg-stone-100 rounded-lg overflow-hidden transition-all duration-500',
                  isMapLoaded ? 'opacity-100' : 'opacity-90'
                )}
              >
                {!isMapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsMapLoaded(true)}
                      className="bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Загрузить карту
                    </button>
                  </div>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.8355657498236!2d30.51573!3d50.4391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5672b7b2f7%3A0x85b7e4a0a08c3d1a!2z0YPQuy4g0KHQsNC60YHQsNCz0LDQvdGB0LrQvtCz0L4sIDU0LzU2LCDQmtC40LXQsiwg0KPQutGA0LDQuNC90LAsIDAyMDAw!5e0!3m2!1sru!2sua!4v1647856234567!5m2!1sru!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                )}
              </div>
              
              {/* Map Overlay Info */}
              {isMapLoaded && (
                <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-medium text-stone-900 text-sm">OrthoDent Pro</div>
                      <div className="text-xs text-stone-600">ул. Саксаганского 54/56</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Map Actions */}
            <div className="flex gap-3">
              <button className="flex-1 border border-stone-300 text-stone-700 py-3 px-4 rounded-lg hover:border-stone-400 transition-colors text-sm">
                Проложить маршрут
              </button>
              <button className="flex-1 bg-stone-900 text-white py-3 px-4 rounded-lg hover:bg-stone-800 transition-colors text-sm">
                Открыть в картах
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Form Section
interface ContactFormSectionProps {
  className?: string;
}

export function ContactFormSection({ className }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className={cn('py-16 bg-stone-50', className)}>
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-stone-900 mb-4">
            Отправьте нам сообщение
          </h2>
          <p className="text-stone-600">
            Заполните форму ниже, и мы свяжемся с вами в течение 2 часов
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg">
          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                    placeholder="+38 (000) 000-00-00"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">
                    Тема обращения
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                  >
                    <option value="">Выберите тему</option>
                    <option value="consultation">Консультация по продукции</option>
                    <option value="order">Заказ оборудования</option>
                    <option value="support">Техническая поддержка</option>
                    <option value="partnership">Партнёрство</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-900">
                  Сообщение *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none"
                  placeholder="Расскажите подробнее о ваших потребностях..."
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-stone-600">
                  * Обязательные поля
                </p>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={cn(
                    'px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2',
                    isSubmitting
                      ? 'bg-stone-400 text-white cursor-not-allowed'
                      : 'bg-stone-900 text-white hover:bg-stone-800 hover:gap-3'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Отправить сообщение
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-light text-stone-900 mb-4">
                Сообщение отправлено!
              </h3>
              <p className="text-stone-600">
                Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Main Contacts Page Component
export default function ContactsPage() {
  return (
    <div className="bg-white">
      <ContactHeroSection />
      <ContactInfoSection />
      <LocationHoursSection />
      <ContactFormSection />
    </div>
  );
}