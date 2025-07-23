'use client'
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Send, 
  CheckCircle
} from 'lucide-react';

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