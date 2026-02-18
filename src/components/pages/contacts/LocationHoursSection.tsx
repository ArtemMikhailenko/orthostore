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
                      м. Київ, вул. Саксаганського, 54/56 офс. 124
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
                <div className="flex items-center gap-2"><TrainFront className="w-4 h-4 text-stone-500 flex-shrink-0" /> Метро: Університет (10 хв. пішки)</div>
                <div className="flex items-center gap-2"><Bus className="w-4 h-4 text-stone-500 flex-shrink-0" /> Громадський транспорт: 3, 69, 14, 171 (зупинка - готель Кооператор)</div>
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
                      Завантажити карту
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
                      <div className="text-xs text-stone-600">вул. Саксаганського 54/56</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Map Actions */}
            <div className="flex gap-3">
              <button className="flex-1 border border-stone-300 text-stone-700 py-3 px-4 rounded-lg hover:border-stone-400 transition-colors text-sm">
                Прокласти маршрут
              </button>
              <button className="flex-1 bg-stone-900 text-white py-3 px-4 rounded-lg hover:bg-stone-800 transition-colors text-sm">
                Відкрити в картах
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}