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
            Заповніть форму нижче, і наші менеджери зв&apos;яжуться з Вами у найближчий час
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-[0_0_0_1px_rgba(186,230,253,0.7)]">
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
                    className="w-full p-3 border-2 border-sky-300/80 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_1px_rgba(186,230,253,0.75)] focus:border-sky-500 focus:ring-2 focus:ring-sky-300/90 focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_2px_rgba(125,211,252,0.5),0_0_0_5px_rgba(125,211,252,0.18)] transition-all text-sm"
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
                    className="w-full p-3 border-2 border-sky-300/80 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_1px_rgba(186,230,253,0.75)] focus:border-sky-500 focus:ring-2 focus:ring-sky-300/90 focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_2px_rgba(125,211,252,0.5),0_0_0_5px_rgba(125,211,252,0.18)] transition-all text-sm"
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
                    className="w-full p-3 border-2 border-sky-300/80 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_1px_rgba(186,230,253,0.75)] focus:border-sky-500 focus:ring-2 focus:ring-sky-300/90 focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_2px_rgba(125,211,252,0.5),0_0_0_5px_rgba(125,211,252,0.18)] transition-all text-sm"
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
                        "w-full p-3 border-2 rounded-lg transition-all text-sm text-left bg-white flex items-center justify-between shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_1px_rgba(186,230,253,0.75)]",
                        isDropdownOpen 
                          ? "border-sky-500 ring-2 ring-sky-300/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_2px_rgba(125,211,252,0.5),0_0_0_5px_rgba(125,211,252,0.18)]" 
                          : "border-sky-300/80",
                        !formData.subject && "text-stone-500"
                      )}
                    >
                      <span>{getSelectedLabel()}</span>
                      <ChevronDown 
                        className={cn(
                          "w-5 h-5 transition-transform",
                          isDropdownOpen ? "rotate-180 text-sky-500" : "text-stone-400"
                        )} 
                      />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-sky-500 rounded-lg shadow-[0_18px_40px_rgba(56,189,248,0.18)] z-50 overflow-hidden">
                        {subjectOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelectSubject(option.value)}
                            className={cn(
                              "w-full p-3 text-sm text-left transition-colors",
                              formData.subject === option.value
                                ? "bg-sky-500 text-white"
                                : "hover:bg-sky-50 text-stone-900",
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
                  className="w-full p-3 border-2 border-sky-300/80 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_1px_rgba(186,230,253,0.75)] focus:border-sky-500 focus:ring-2 focus:ring-sky-300/90 focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.95),0_0_0_2px_rgba(125,211,252,0.5),0_0_0_5px_rgba(125,211,252,0.18)] transition-all resize-none text-sm"
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
                      : 'bg-stone-900 text-white border-2 border-stone-900 hover:bg-white hover:text-stone-900 hover:shadow-[0_0_24px_rgba(56,189,248,0.3)] hover:gap-3'
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