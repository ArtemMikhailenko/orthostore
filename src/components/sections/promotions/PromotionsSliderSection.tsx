'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface PromotionsSectionProps {
  className?: string;
}

/* ── Top hero slider data (4 slides) ── */
const heroSlides = [
  {
    id: 1,
    title: 'Преміум брекети зі знижкою',
    description: 'Спеціальна пропозиція на самолігуючі брекет-системи преміум класу.',
    oldPrice: '2 940 ₴',
    price: '2 500 ₴',
    color: 'from-yellow-300 to-yellow-400',
    badge: 'Хіт продажів',
    features: ['Знижка діє до кінця місяця', 'Безкоштовна доставка', 'Додаткові аксесуари у подарунок'],
  },
  {
    id: 2,
    title: 'Комплект дуг 2+1',
    description: 'При покупці 2 упаковок ортодонтичних дуг - третя у подарунок',
    oldPrice: '',
    price: '700 ₴',
    color: 'from-yellow-300 to-yellow-500',
    badge: 'Хіт продажів',
    features: ['Економія до 350 ₴', 'Всі популярні розміри', 'Обмежена пропозиція'],
  },
  {
    id: 3,
    title: 'Лігатури зі знижкою',
    description: 'Додаткові товари або знижка 5-8% на весь асортимент лігатур та еластиків',
    oldPrice: '130 ₴',
    price: 'від 120 ₴',
    color: 'from-yellow-400 to-yellow-500',
    badge: 'Хіт продажів',
    features: ['Знижка на всі кольори', 'Мінімальне замовлення від 5 шт', 'Діє 14 днів'],
  },
  {
    id: 4,
    title: 'Стартовий набір ортодонта',
    description: 'Комплексне рішення для початківців. Все необхідне в одному наборі за спеціальною ціною',
    oldPrice: '1 060 ₴',
    price: '850 ₴',
    color: 'from-yellow-300 to-yellow-600',
    badge: 'Хіт продажів',
    features: ['Економія понад 200 ₴', 'Готове рішення "під ключ"', 'Гарантія якості'],
  },
];

/* ── Bottom card grid — 12 independent products ── */
const allProducts = [
  { id: 101, title: 'Преміум брекети', price: '2 500 ₴', oldPrice: '2 940 ₴', discount: '-15%', color: 'from-yellow-300 to-yellow-400' },
  { id: 102, title: 'Комплект дуг 2+1', price: '700 ₴', oldPrice: '', discount: '33%', color: 'from-yellow-300 to-yellow-500' },
  { id: 103, title: 'Лігатури', price: 'від 120 ₴', oldPrice: '130 ₴', discount: 'до -8%', color: 'from-yellow-400 to-yellow-500' },
  { id: 104, title: 'Стартовий набір', price: '850 ₴', oldPrice: '1 060 ₴', discount: '-20%', color: 'from-yellow-300 to-yellow-600' },
  { id: 105, title: 'Ортодонтичний воск', price: '480 ₴', oldPrice: '600 ₴', discount: '-20%', color: 'from-yellow-200 to-yellow-400' },
  { id: 106, title: 'Еластичні ланцюжки', price: '95 ₴', oldPrice: '120 ₴', discount: '-21%', color: 'from-yellow-300 to-yellow-400' },
  { id: 107, title: 'Щічні трубки', price: '320 ₴', oldPrice: '380 ₴', discount: '-16%', color: 'from-yellow-300 to-yellow-500' },
  { id: 108, title: 'Кільця моляні', price: '210 ₴', oldPrice: '250 ₴', discount: '-16%', color: 'from-yellow-400 to-yellow-500' },
  { id: 109, title: 'NiTi дуги .014', price: '185 ₴', oldPrice: '220 ₴', discount: '-16%', color: 'from-yellow-300 to-yellow-600' },
  { id: 110, title: 'Адгезив для брекетів', price: '540 ₴', oldPrice: '650 ₴', discount: '-17%', color: 'from-yellow-200 to-yellow-400' },
  { id: 111, title: 'Міні-імпланти', price: '390 ₴', oldPrice: '450 ₴', discount: '-13%', color: 'from-yellow-300 to-yellow-400' },
  { id: 112, title: 'Ретейнери комплект', price: '760 ₴', oldPrice: '900 ₴', discount: '-16%', color: 'from-yellow-300 to-yellow-500' },
];

const CARDS_PER_PAGE = 4;

export function PromotionsSliderSection({ className }: PromotionsSectionProps) {
  /* ── Hero slider state ── */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  /* ── Card mini-slider state (independent) ── */
  const [cardPage, setCardPage] = useState(0);
  const totalCardPages = Math.ceil(allProducts.length / CARDS_PER_PAGE);
  const visibleCards = allProducts.slice(cardPage * CARDS_PER_PAGE, cardPage * CARDS_PER_PAGE + CARDS_PER_PAGE);

  /* ── Expand/collapse all 12 ── */
  const [showAll, setShowAll] = useState(false);

  /* ── Countdown timer ── */
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── Hero slider navigation ── */
  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < heroSlides.length) {
      setPage([page + newDirection, newDirection]);
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    setPage([index, index > currentIndex ? 1 : -1]);
    setCurrentIndex(index);
  };

  const currentProduct = heroSlides[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 40 : -40,
      scale: 0.96,
      filter: 'blur(6px)',
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      zIndex: 0,
      opacity: 0,
      y: dir < 0 ? 40 : -40,
      scale: 0.96,
      filter: 'blur(6px)',
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <section className={cn('py-16 bg-stone-50 relative overflow-hidden', className)}>
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-3">
            Акційні пропозиції
          </h2>
        </motion.div>

        {/* ─── Hero Slider ─── */}
        <div className="relative mb-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center">

            {/* Left: Animated image */}
            <div className="relative h-[450px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <div className={cn('h-full border-2 border-stone-900 bg-gradient-to-br relative overflow-hidden rounded-2xl', currentProduct.color)}>
                    <div className="absolute inset-0">
                      <Image src="/images/Screenshot_2.png" alt={currentProduct.title} fill className="object-cover opacity-80" priority />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    </div>
                    <motion.div
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute bottom-20 left-20 w-24 h-24 rounded-full border-2 border-stone-900/20"
                    />
                    {/* Bottom Info Bar — only badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white p-6">
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-2 bg-yellow-400 text-stone-900 px-3 py-1 rounded-lg">
                          <Star className="w-4 h-4 fill-stone-900" />
                          <span className="text-sm font-medium">{currentProduct.badge}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Content */}
            <motion.div key={currentIndex} initial="hidden" animate="visible" className="space-y-4">
              <motion.div custom={0} variants={cardVariants}>
                <h3 className="text-2xl font-light text-stone-900 mb-2">{currentProduct.title}</h3>
                <p className="text-stone-700 leading-relaxed text-sm">{currentProduct.description}</p>
              </motion.div>

              <motion.div custom={1} variants={cardVariants} className="space-y-2">
                {currentProduct.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 p-2 border border-stone-200 bg-white rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-stone-900 rounded-full flex-shrink-0" />
                    <span className="text-stone-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                custom={1.5}
                variants={cardVariants}
                className="border-2 border-red-500 bg-white p-3 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-stone-600 uppercase tracking-wider mb-1 font-medium">До кінця акції</div>
                    <div className="text-[10px] text-stone-500">Встигніть замовити!</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { value: timeLeft.days, label: 'дні' },
                      { value: timeLeft.hours, label: 'год' },
                      { value: timeLeft.minutes, label: 'хв' },
                      { value: timeLeft.seconds, label: 'сек' },
                    ].map((unit, i) => (
                      <React.Fragment key={i}>
                        <div className="text-center">
                          <motion.div
                            key={unit.value}
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-3xl font-bold text-red-600 tabular-nums min-w-[2ch]"
                          >
                            {String(unit.value).padStart(2, '0')}
                          </motion.div>
                          <div className="text-[9px] text-stone-500 uppercase">{unit.label}</div>
                        </div>
                        {i < 3 && <span className="text-red-400 text-xl font-light -mt-3">:</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Price & CTA */}
              <motion.div custom={2} variants={cardVariants} className="pt-3 border-t-2 border-stone-200">
                <div className="flex items-baseline gap-4 mb-3">
                  <div>
                    <span className="text-lg text-stone-600 block mb-2 font-medium">Акційна ціна</span>
                    <span className="text-4xl font-bold text-red-600">{currentProduct.price}</span>
                  </div>
                  {currentProduct.oldPrice && (
                    <div className="translate-y-2">
                      <span className="text-xl text-stone-500 line-through">{currentProduct.oldPrice}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border-2 border-stone-900 bg-stone-900 text-white px-4 py-4 hover:bg-transparent hover:text-stone-900 transition-colors duration-300 font-medium rounded-lg text-sm"
                  >
                    Замовити зараз
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-stone-300 px-4 py-4 hover:border-stone-900 transition-colors duration-300 font-medium rounded-lg text-sm"
                  >
                    Деталі
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className={cn(
                'w-12 h-12 border-2 flex items-center justify-center transition-all duration-300 rounded-xl',
                currentIndex === 0
                  ? 'border-stone-300 text-stone-300 cursor-not-allowed'
                  : 'border-stone-900 bg-white hover:bg-stone-900 hover:text-white hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.7),0_0_40px_rgba(56,189,248,0.35)] hover:ring-[3px] hover:ring-sky-400/60'
              )}
              aria-label="Попередній слайд"
            >
              <motion.div animate={{ x: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronLeft className="w-6 h-6" />
              </motion.div>
            </motion.button>

            <div className="flex gap-3">
              {heroSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  className={cn('h-2 transition-all duration-300 rounded-full', currentIndex === index ? 'w-12 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-500')}
                  aria-label={`Слайд ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              disabled={currentIndex === heroSlides.length - 1}
              className={cn(
                'w-12 h-12 border-2 flex items-center justify-center transition-all duration-300 rounded-xl',
                currentIndex === heroSlides.length - 1
                  ? 'border-stone-300 text-stone-300 cursor-not-allowed'
                  : 'border-stone-900 bg-white hover:bg-stone-900 hover:text-white hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.7),0_0_40px_rgba(56,189,248,0.35)] hover:ring-[3px] hover:ring-sky-400/60'
              )}
              aria-label="Наступний слайд"
            >
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* ─── Independent Card Section ─── */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {showAll ? (
              /* All 12 cards grid */
              <motion.div
                key="all"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {allProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="text-left border-2 border-stone-300 p-6 bg-white group cursor-pointer hover:border-sky-400/70 hover:ring-[2px] hover:ring-sky-400/50 hover:shadow-[0_0_12px_rgba(56,189,248,0.5),0_0_28px_rgba(56,189,248,0.2)] transition-all duration-300 rounded-xl"
                  >
                    <div className={cn('w-full aspect-square mb-4 border-2 border-stone-300 bg-gradient-to-br relative overflow-hidden rounded-lg', product.color)}>
                      <Image src="/images/Screenshot_2.png" alt={product.title} fill className="object-cover opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                      <div className="absolute top-2 right-2 bg-stone-900 text-white px-2 py-1 text-xs font-bold z-10 rounded">
                        {product.discount}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-stone-900 group-hover:text-stone-700 transition-colors">{product.title}</h4>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-red-600">{product.price}</p>
                        {product.oldPrice && <p className="text-[11px] text-stone-400 line-through -translate-y-1">{product.oldPrice}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Mini card slider — 4 per page */
              <motion.div key="slider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {visibleCards.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="text-left border-2 border-stone-300 p-6 bg-white group cursor-pointer hover:border-sky-400/70 hover:ring-[2px] hover:ring-sky-400/50 hover:shadow-[0_0_12px_rgba(56,189,248,0.5),0_0_28px_rgba(56,189,248,0.2)] transition-all duration-300 rounded-xl"
                    >
                      <div className={cn('w-full aspect-square mb-4 border-2 border-stone-300 bg-gradient-to-br relative overflow-hidden rounded-lg', product.color)}>
                        <Image src="/images/Screenshot_2.png" alt={product.title} fill className="object-cover opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                        <div className="absolute top-2 right-2 bg-stone-900 text-white px-2 py-1 text-xs font-bold z-10 rounded">
                          {product.discount}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium text-stone-900 group-hover:text-stone-700 transition-colors">{product.title}</h4>
                        <div className="flex items-baseline gap-2">
                          <p className="text-xl font-bold text-red-600">{product.price}</p>
                          {product.oldPrice && <p className="text-[11px] text-stone-400 line-through -translate-y-1">{product.oldPrice}</p>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Card slider navigation */}
                <div className="flex items-center justify-center gap-4 mt-5">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCardPage((p) => Math.max(0, p - 1))}
                    disabled={cardPage === 0}
                    className={cn(
                      'w-10 h-10 border-2 flex items-center justify-center transition-all duration-300 rounded-xl',
                      cardPage === 0
                        ? 'border-stone-300 text-stone-300 cursor-not-allowed'
                        : 'border-stone-900 bg-white hover:bg-stone-900 hover:text-white'
                    )}
                    aria-label="Попередня сторінка карток"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalCardPages }).map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setCardPage(i)}
                        whileHover={{ scale: 1.2 }}
                        className={cn('h-2 rounded-full transition-all duration-300', cardPage === i ? 'w-8 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-500')}
                        aria-label={`Сторінка карток ${i + 1}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCardPage((p) => Math.min(totalCardPages - 1, p + 1))}
                    disabled={cardPage === totalCardPages - 1}
                    className={cn(
                      'w-10 h-10 border-2 flex items-center justify-center transition-all duration-300 rounded-xl',
                      cardPage === totalCardPages - 1
                        ? 'border-stone-300 text-stone-300 cursor-not-allowed'
                        : 'border-stone-900 bg-white hover:bg-stone-900 hover:text-white'
                    )}
                    aria-label="Наступна сторінка карток"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA — expand / collapse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll((v) => !v)}
            className="border-2 border-stone-900 px-12 py-4 hover:bg-stone-900 hover:text-white transition-all duration-300 font-medium inline-flex items-center gap-3 rounded-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            {showAll ? 'Згорнути' : 'Усі акційні пропозиції'}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
