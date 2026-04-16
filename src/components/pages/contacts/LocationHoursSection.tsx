'use client'
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Clock,
  TrainFront,
  Bus,
  Car,
} from 'lucide-react';



// Location & Hours Section
interface LocationHoursSectionProps {
  className?: string;
}

export function LocationHoursSection({ className }: LocationHoursSectionProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const destinationUrl = 'https://www.google.com/maps/dir/?api=1&destination=50.4391,30.51573';
  const openMapUrl = 'https://www.google.com/maps/search/?api=1&query=%D0%B2%D1%83%D0%BB.%20%D0%A1%D0%B0%D0%BA%D1%81%D0%B0%D0%B3%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%2054%2F56%2C%20%D0%9A%D0%B8%D1%97%D0%B2';
  const embedMapUrl = 'https://maps.google.com/maps?q=%D0%B2%D1%83%D0%BB.+%D0%A1%D0%B0%D0%BA%D1%81%D0%B0%D0%B3%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE+54/56,+%D0%9A%D0%B8%D1%97%D0%B2&z=17&output=embed';

  const workingHours = [
    { day: 'Понеділок-П\'ятниця', hours: '9:00 - 18:00', isToday: true },
    { day: 'Субота-Неділя', hours: 'Замовлення онлайн', isToday: false }
  ];

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Location Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light text-stone-900 mb-6">
                Наша локація
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-stone-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-stone-900">
                      м. Київ, вул. Саксаганського, 54/56
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-xl font-medium text-stone-900 mb-4">
                Години роботи
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
                Як добратись
              </h4>
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex items-center gap-2"><TrainFront className="w-4 h-4 text-stone-500 flex-shrink-0" /> Метро: Університет (10 хв), Палац Спорту (10 хв), Площа Українських Героїв (10 хв)</div>
                <div className="flex items-center gap-2"><Bus className="w-4 h-4 text-stone-500 flex-shrink-0" /> Громадський транспорт: 3, 69, 14, 171 (зупинка - готель Кооператор) від метро Палац Спорту</div>
                <div className="flex items-center gap-2"><Car className="w-4 h-4 text-stone-500 flex-shrink-0" /> Парковка: доступна біля офісу</div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-stone-900">
              Мапа
            </h3>
            
            {/* Map Container */}
            <div className="relative">
              <div className="text-xs font-light text-stone-500 tracking-widest uppercase mb-2">ORTHOSTORE</div>
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
                      className="bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-stone-900 border-2 border-stone-900 transition-all duration-300 flex items-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Завантажити карту
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={embedMapUrl}
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
            </div>

            {/* Map Actions */}
            <div className="flex gap-3">
              <a href={destinationUrl} target="_blank" rel="noreferrer" className="flex-1 border-2 border-stone-300 bg-white text-stone-700 py-3 px-4 rounded-lg hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all text-sm text-center">
                Прокласти маршрут
              </a>
              <a href={openMapUrl} target="_blank" rel="noreferrer" className="flex-1 border-2 border-stone-900 bg-stone-900 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-stone-900 transition-all text-sm text-center">
                Відкрити в картах
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}