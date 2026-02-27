'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Quote, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface AboutExpertiseSectionProps {
  className?: string;
}

const testimonials = [
  {
    id: 1,
    // Left side - ORTHOSTORE recommends doctors
    doctorName: "Др. Олена Кравченко",
    doctorPosition: "Головний лікар, ортодонт",
    doctorClinic: "Smile Clinic, Київ",
    doctorDescription: "Працюємо з ORTHOSTORE більше 5 років. Завжди якісна продукція, швидка доставка та професійна підтримка. Рекомендуємо як надійного партнера.",
    doctorImage: "1",
    
    // Right side - Recommended for patients
    clinicName: "Smile Clinic",
    clinicLocation: "вул. Хрещатик, 25, Київ",
    clinicDescription: "Сучасна стоматологічна клініка з повним циклом ортодонтичного лікування. Використовують найсучасніше обладнання та матеріали.",
    clinicServices: ["Брекет-системи", "Елайнери", "Дитяча ортодонтія"],
    clinicImage: "1"
  },
  {
    id: 2,
    doctorName: "Др. Андрій Петренко",
    doctorPosition: "Ортодонт-практик",
    doctorClinic: "DentPro, Львів",
    doctorDescription: "ORTHOSTORE - це гарантія якості. Замовляю у них всі матеріали для своєї практики. Особливо вражає асортимент преміум-брендів.",
    doctorImage: "2",
    
    clinicName: "DentPro",
    clinicLocation: "пр. Свободи, 12, Львів",
    clinicDescription: "Клініка європейського рівня з фокусом на естетичній стоматології та ортодонтії. Індивідуальний підхід до кожного пацієнта.",
    clinicServices: ["Естетична ортодонтія", "Invisalign", "3D-діагностика"],
    clinicImage: "2"
  },
  {
    id: 3,
    doctorName: "Др. Марія Іваненко",
    doctorPosition: "Стоматолог-ортодонт",
    doctorClinic: "Perfect Smile, Одеса",
    doctorDescription: "Співпраця з ORTHOSTORE дозволила нам вийти на новий рівень обслуговування. Завжди актуальні новинки ринку та конкурентні ціни.",
    doctorImage: "3",
    
    clinicName: "Perfect Smile",
    clinicLocation: "Дерибасівська, 8, Одеса",
    clinicDescription: "Провідний центр ортодонтичного лікування на півдні України. Застосовуємо інноваційні методики та сучасні технології.",
    clinicServices: ["Лінгвальні брекети", "Швидка ортодонтія", "Консультації онлайн"],
    clinicImage: "3"
  }
];

const achievements = [
  { value: '500+', label: 'Клиник-партнеров' },
  { value: '15', label: 'Лет на рынке' },
  { value: '98.7%', label: 'Удовлетворенность' },
  { value: '24/7', label: 'Поддержка' }
];

const expertise = [
  {
    title: 'Международные стандарты',
    description: 'Вся продукция соответствует стандартам ISO 13485, CE Mark, FDA. Работаем только с сертифицированными производителями мирового уровня.'
  },
  {
    title: 'Надежность и гарантии',
    description: 'Расширенная гарантия на все оборудование, быстрая замена в случае брака, полное техническое сопровождение на всех этапах.'
  },
  {
    title: 'Персональный подход',
    description: 'Каждому клиенту назначается персональный менеджер. Индивидуальные коммерческие предложения и круглосуточные консультации.'
  },
  {
    title: 'Экспертность и опыт',
    description: 'Команда экспертов с 15+ летним опытом, регулярное обучение у производителей, глубокие знания рынка ортодонтии.'
  }
];

export function AboutExpertiseSection({ className }: AboutExpertiseSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20
    }
  };

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        {/* <div className="grid lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-8">
              Ваш надежный
              <br />
              <span className="font-normal">партнер в ортодонтии</span>
            </h2>
            
            <div className="w-16 h-px bg-gray-900 mb-8"></div>
            
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Более 15 лет мы создаем экосистему успешной ортодонтической практики, 
              обеспечивая клиники высококачественным оборудованием от ведущих 
              мировых производителей.
            </p>
          </div>
          
          <div className="space-y-8 lg:pt-16">
            {[
              'Прямые поставки без посредников',
              'Собственный склад с постоянным наличием',
              'Техническая поддержка на всех этапах',
              'Гибкие условия для постоянных клиентов'
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-3"></div>
                <span className="text-gray-700 text-lg font-light">{point}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Metrics */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {achievements.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-light text-gray-900 mb-4">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div> */}

        {/* Expertise Grid */}
        {/* <div className="grid lg:grid-cols-2 gap-20 mb-32">
          {expertise.map((item, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900">
                {item.title}
              </h3>
              <div className="w-12 h-px bg-gray-900"></div>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div> */}

        {/* Recommendations Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: ORTHOSTORE рекомендує - Doctors */}
          <div className="border-2 border-stone-200 bg-white h-full flex flex-col rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-stone-900 text-white px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium uppercase tracking-wider">
                  ORTHOSTORE рекомендує
                </h3>
                <Quote className="w-4 h-4 opacity-50" />
              </div>
              <p className="text-stone-400 text-xs mt-1">
                Лікарі та клініки, які працюють з нами
              </p>
            </div>

            {/* Doctor Card - with fixed height */}
            <div className="p-4 flex-1 flex flex-col min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="flex-1 flex flex-col"
                >
                  {/* Doctor Photo */}
                  <div className="aspect-video border-2 border-stone-200 bg-stone-50 flex items-center justify-center relative overflow-hidden mb-3 rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 border-2 border-stone-900 bg-white mx-auto flex items-center justify-center rounded-lg">
                        <span className="text-xl font-bold text-stone-900">
                          {currentTestimonial.doctorName.split(' ')[1]?.[0] || 'О'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="space-y-2 flex-1">
                    <div>
                      <h4 className="text-lg font-medium text-stone-900 mb-1">
                        {currentTestimonial.doctorName}
                      </h4>
                      <p className="text-stone-600 text-sm">
                        {currentTestimonial.doctorPosition}
                      </p>
                      <p className="text-stone-500 text-xs mt-1">
                        {currentTestimonial.doctorClinic}
                      </p>
                    </div>

                    <div className="w-8 h-px bg-stone-300"></div>

                    <p className="text-stone-700 leading-relaxed text-sm">
                      {currentTestimonial.doctorDescription}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 mt-auto border-t-2 border-stone-200">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > activeTestimonial ? 1 : -1);
                        setActiveTestimonial(index);
                      }}
                      className={cn(
                        'h-1 transition-all duration-300 rounded-full',
                        activeTestimonial === index 
                          ? 'w-8 bg-stone-900' 
                          : 'w-1 bg-stone-300 hover:bg-stone-500'
                      )}
                      aria-label={`Перейти до лікаря ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className="w-8 h-8 border-2 border-stone-900 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all rounded-lg"
                    aria-label="Попередній"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className="w-8 h-8 border-2 border-stone-900 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all rounded-lg"
                    aria-label="Наступний"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Рекомендовані клініки */}
          <div className="border-2 border-stone-200 bg-white h-full flex flex-col rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-stone-50 border-b-2 border-stone-200 px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-stone-900 uppercase tracking-wider">
                  Рекомендовані клініки
                </h3>
                <Star className="w-4 h-4 fill-stone-900 text-stone-900" />
              </div>
              <p className="text-stone-600 text-xs mt-1">
                Для найкращого лікування наших пацієнтів
              </p>
            </div>

            {/* Clinic Card - with fixed height */}
            <div className="p-4 flex-1 flex flex-col min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="flex-1 flex flex-col"
                >
                  {/* Clinic Photo */}
                  <div className="aspect-video border-2 border-stone-900 bg-stone-900 flex items-center justify-center relative overflow-hidden mb-3 rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="text-xl font-light mb-1">
                        {currentTestimonial.clinicName}
                      </div>
                      <div className="text-xs text-stone-400">
                        Стоматологічна клініка
                      </div>
                    </div>
                  </div>

                  {/* Clinic Info */}
                  <div className="space-y-2 flex-1">
                    <div>
                      <h4 className="text-lg font-medium text-stone-900 mb-2">
                        {currentTestimonial.clinicName}
                      </h4>
                      <p className="text-stone-600 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{currentTestimonial.clinicLocation}</span>
                      </p>
                    </div>

                    <div className="w-8 h-px bg-stone-300"></div>

                    <p className="text-stone-700 leading-relaxed text-sm">
                      {currentTestimonial.clinicDescription}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {currentTestimonial.clinicServices.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 border border-stone-300 text-stone-700 text-xs rounded-md"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-stone-900 bg-stone-900 text-white px-5 py-2.5 hover:bg-transparent hover:text-stone-900 transition-all duration-300 font-medium uppercase tracking-wider text-sm mt-4 rounded-lg"
                  >
                    Записатися на прийом
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}