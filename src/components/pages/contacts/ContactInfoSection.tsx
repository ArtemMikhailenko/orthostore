
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar,
  ArrowRight,

} from 'lucide-react';


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