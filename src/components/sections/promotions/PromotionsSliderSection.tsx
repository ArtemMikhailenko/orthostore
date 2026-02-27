'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Package, Star, ShoppingBag, Award } from 'lucide-react';
import Image from 'next/image';

interface PromotionsSectionProps {
  className?: string;
}

const products = [
  {
    id: 1,
    title: 'Преміум брекети зі знижкою',
    category: '',
    description: 'Спеціальна пропозиція на самолігуючі брекет-системи преміум класу.',
    discount: '-15%',
    oldPrice: '2 940 ₴',
    price: '2 500 ₴',
    image: '1',
    color: 'from-yellow-300 to-yellow-400',
    badge: 'Хіт продажів',
    features: [
      'Знижка діє до кінця місяця',
      'Безкоштовна доставка',
      'Додаткові аксесуари у подарунок'
    ]
  },
  {
    id: 2,
    title: 'Комплект дуг 2+1',
    category: 'СПЕЦПРОПОЗИЦІЯ',
    description: 'При покупці 2 упаковок ортодонтичних дуг - третя у подарунок',
    discount: '33%',
    oldPrice: '',
    price: '700 ₴',
    image: '2',
    color: 'from-yellow-300 to-yellow-500',
    badge: '2+1 у подарунок',
    features: [
      'Економія до 350 ₴',
      'Всі популярні розміри',
      'Обмежена пропозиція'
    ]
  },
  {
    id: 3,
    title: 'Лігатури зі знижкою',
    category: 'РОЗПРОДАЖ',
    description: 'Додаткові товари або знижка 5-8% на весь асортимент лігатур та еластиків',
    discount: 'до -8%',
    oldPrice: '130 ₴',
    price: 'від 120 ₴',
    image: '3',
    color: 'from-yellow-400 to-yellow-500',
    badge: 'Вигідно',
    features: [
      'Знижка на всі кольори',
      'Мінімальне замовлення від 5 шт',
      'Діє 14 днів'
    ]
  },
  {
    id: 4,
    title: 'Стартовий набір ортодонта',
    category: 'НОВИНКА',
    description: 'Комплексне рішення для початківців. Все необхідне в одному наборі за спеціальною ціною',
    discount: '-20%',
    oldPrice: '1 060 ₴',
    price: '850 ₴',
    image: '4',
    color: 'from-yellow-300 to-yellow-600',
    badge: 'Новинка',
    features: [
      'Економія понад 200 ₴',
      'Готове рішення "під ключ"',
      'Гарантія якості'
    ]
  }
];

export function PromotionsSliderSection({ className }: PromotionsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  // Countdown timer - end of month
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

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < products.length) {
      setPage([page + newDirection, newDirection]);
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    setPage([index, index > currentIndex ? 1 : -1]);
    setCurrentIndex(index);
  };

  const currentProduct = products[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
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
          
          
          <p className="text-stone-600 max-w-3xl mx-auto border-2 border-stone-900 rounded-xl px-6 py-3">
            Вигідні пропозиції на професійну ортодонтичну продукцію. Обмежена кількість!
          </p>
        </motion.div>

        {/* Main Slider */}
        <div className="relative mb-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            
            {/* Left: Visual Card with Animation */}
            <div className="relative h-[450px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <div 
                    className={cn(
                      'h-full border-2 border-stone-900 bg-gradient-to-br relative overflow-hidden rounded-2xl',
                      currentProduct.color
                    )}
                  >
                    {/* Product Image */}
                    <div className="absolute inset-0">
                      <Image
                        src="/images/Screenshot_2.png"
                        alt={currentProduct.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    </div>

                    {/* Decorative Shapes */}
                    
                    
                    <motion.div
                      animate={{ 
                        rotate: [360, 0],
                      }}
                      transition={{ 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="absolute bottom-20 left-20 w-24 h-24 rounded-full border-2 border-stone-900/20"
                    />

                    {/* Top Badge */}
                    
                    {/* Discount Badge */}
                    <div className="absolute top-8 right-8 bg-white border-2 border-stone-900 px-6 py-3 rounded-xl">
                      <div className="text-3xl font-bold text-stone-900">{currentProduct.discount}</div>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium">{currentProduct.title}</h3>
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

            {/* Right: Content with Stagger Animation */}
            <motion.div
              key={currentIndex}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div custom={0} variants={cardVariants}>
                
                <h3 className="text-2xl font-light text-stone-900 mb-2">
                  {currentProduct.title}
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm">
                  {currentProduct.description}
                </p>
              </motion.div>

              {/* Features List */}
              <motion.div custom={1} variants={cardVariants} className="space-y-2">
                {currentProduct.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 p-2 border border-stone-200 bg-white rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-stone-900 rounded-full flex-shrink-0"></div>
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
              <motion.div 
                custom={2} 
                variants={cardVariants}
                className="pt-3 border-t-2 border-stone-200"
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <div>
                    <span className="text-lg text-stone-600 block mb-2 font-medium">Акційна ціна</span>
                    <span className="text-4xl font-bold text-red-600">
                      {currentProduct.price}
                    </span>
                  </div>
                  {currentProduct.oldPrice && (
                    <div className="translate-y-2">
                      <span className="text-xl text-stone-500 line-through">
                        {currentProduct.oldPrice}
                      </span>
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

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className={cn(
                "w-12 h-12 border-2 flex items-center justify-center transition-all duration-300 rounded-xl",
                currentIndex === 0
                  ? "border-stone-300 text-stone-300 cursor-not-allowed"
                  : "border-stone-900 bg-white hover:bg-stone-900 hover:text-white hover:shadow-[0_0_40px_rgba(56,189,248,0.9),0_0_60px_rgba(56,189,248,0.5)]"
              )}
              aria-label="Попередній товар"
            >
              <motion.div animate={{ x: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronLeft className="w-6 h-6" />
              </motion.div>
            </motion.button>

            {/* Dots Navigation */}
            <div className="flex gap-3">
              {products.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  className={cn(
                    'h-2 transition-all duration-300 rounded-full',
                    currentIndex === index 
                      ? 'w-12 bg-stone-900' 
                      : 'w-2 bg-stone-300 hover:bg-stone-500'
                  )}
                  aria-label={`Перейти до товару ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              disabled={currentIndex === products.length - 1}
              className={cn(
                "w-12 h-12 border-2 flex items-center justify-center transition-all duration-300 rounded-xl",
                currentIndex === products.length - 1
                  ? "border-stone-300 text-stone-300 cursor-not-allowed"
                  : "border-stone-900 bg-white hover:bg-stone-900 hover:text-white hover:shadow-[0_0_40px_rgba(56,189,248,0.9),0_0_60px_rgba(56,189,248,0.5)]"
              )}
              aria-label="Наступний товар"
            >
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* All Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => goToSlide(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={cn(
                'text-left border-2 p-6 transition-all duration-300 bg-white group rounded-xl',
                currentIndex === index 
                  ? 'border-stone-900 shadow-lg' 
                  : 'border-stone-300 hover:border-stone-600 hover:shadow-md'
              )}
            >
              <div 
                className={cn(
                  'w-full aspect-square mb-4 border-2 bg-gradient-to-br relative overflow-hidden rounded-lg',
                  product.color,
                  currentIndex === index ? 'border-stone-900' : 'border-stone-300'
                )}
              >
                <Image
                  src="/images/Screenshot_2.png"
                  alt={product.title}
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                
                {/* Discount Badge on Mini Card */}
                <div className="absolute top-2 right-2 bg-stone-900 text-white px-2 py-1 text-xs font-bold z-10 rounded">
                  {product.discount}
                </div>
                
                {currentIndex === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-2 left-2 w-6 h-6 bg-stone-900 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  
                </div>
                <h4 className="font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                  {product.title}
                </h4>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-bold text-red-600">
                    {product.price}
                  </p>
                  {product.oldPrice && (
                    <p className="text-[11px] text-stone-400 line-through -translate-y-1">
                      {product.oldPrice}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-stone-900 px-12 py-4 hover:bg-stone-900 hover:text-white transition-all duration-300 font-medium inline-flex items-center gap-3 rounded-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Усі акційні пропозиції
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
