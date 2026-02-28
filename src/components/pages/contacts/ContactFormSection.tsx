'use client'
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Send, 
  CheckCircle,
  ChevronDown
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjectOptions = [
    { value: '', label: 'Оберіть тему' },
    { value: 'consultation', label: 'Консультація з продукції' },
    { value: 'order', label: 'Замовлення матеріалів' },
    { value: 'partnership', label: 'Партнерство' },
    { value: 'other', label: 'Інше' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleSelectSubject = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
    setIsDropdownOpen(false);
  };

  const getSelectedLabel = () => {
    return subjectOptions.find(opt => opt.value === formData.subject)?.label || 'Оберіть тему';
  };

  return (
    <section className={cn('py-12 bg-stone-50', className)}>
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-stone-900 mb-3">
            Надішліть нам повідомлення
          </h2>
          <p className="text-stone-600 text-sm">
            Заповніть форму нижче, і ми зв&apos;яжемося з вами протягом 2 годин
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg">
          {!isSubmitted ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-900">
                    Ваше ім&apos;я *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all text-sm"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-900">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all text-sm"
                    placeholder="+38 (000) 000-00-00"
                  />
                </div>
                
                <div className="space-y-1.5 relative" ref={dropdownRef}>
                  <label className="text-xs font-medium text-stone-900">
                    Тема звернення
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={cn(
                        "w-full p-3 border rounded-lg transition-all text-sm text-left bg-white flex items-center justify-between",
                        isDropdownOpen 
                          ? "border-[#3179cf] ring-2 ring-[#3179cf]" 
                          : "border-stone-300",
                        !formData.subject && "text-stone-500"
                      )}
                    >
                      <span>{getSelectedLabel()}</span>
                      <ChevronDown 
                        className={cn(
                          "w-5 h-5 transition-transform",
                          isDropdownOpen ? "rotate-180 text-[#3179cf]" : "text-stone-400"
                        )} 
                      />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#3179cf] rounded-lg shadow-lg z-50 overflow-hidden">
                        {subjectOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelectSubject(option.value)}
                            className={cn(
                              "w-full p-3 text-sm text-left transition-colors",
                              formData.subject === option.value
                                ? "bg-[#3179cf] text-white"
                                : "hover:bg-blue-50 text-stone-900",
                              option.value === "" && "text-stone-500"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-900">
                  Повідомлення *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none text-sm"
                  placeholder="Розкажіть детальніше про ваші потреби..."
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <p className="text-xs text-stone-600">
                  * Обов&apos;язкові поля
                </p>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={cn(
                    'px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm',
                    isSubmitting
                      ? 'bg-stone-400 text-white cursor-not-allowed'
                      : 'bg-stone-900 text-white hover:bg-stone-800 hover:gap-3'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Надсилаємо...
                    </>
                  ) : (
                    <>
                      Надіслати повідомлення
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-light text-stone-900 mb-4">
                Повідомлення надіслано!
              </h3>
              <p className="text-stone-600">
                Дякуємо за звернення. Ми зв&apos;яжемося з вами найближчим часом.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}