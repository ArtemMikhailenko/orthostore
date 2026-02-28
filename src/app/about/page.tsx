import { Award, Target, Users, Shield, TrendingUp, Heart } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-3xl lg:text-5xl font-light text-stone-900">
              ORTHOSTORE – ВСЕ ДЛЯ СУЧАСНОЇ ОРТОДОНТІЇ
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Ваш надійний партнер у сфері ортодонтичної продукції з 2015 року
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
        <div className="space-y-12">
          <div className="space-y-6 text-base lg:text-lg text-stone-700 leading-relaxed">
            <p className="text-xl lg:text-2xl font-light text-stone-900">
              ORTHOSTORE – ЦЕ НАДІЙНИЙ ПАРТНЕР З ГАЛУЗІ ОРТОДОНТИЧНОЇ ПРОДУКЦІЇ.
            </p>
            <p>
              Ми вийшли на цей ринок в 2015 році з головною метою – задовільнити Ваші потреби в якісній ортодонтичній продукції. Ми не просто пропонуємо товари — ми ділимося тим, у що справді віримо.
            </p>
            <p>
              Ми постійно стежимо за інноваціями в сфері ортодонтії та підберемо вам найкращий варіант з широкого асортименту ортодонтичної продукції та інструментів. Надаємо індивідуальний підхід до кожного клієнта, проконсультуємо, допоможемо в виборі ідеального варіанта.
            </p>
            <p>
              Ми з повагою ставимося як до великих компаній, цінуємо їхній досвід і готові поставити будь-яку кількість ортодонтичної продукції, так і до кожного лікаря, який бажає працювати з нами. Інтернет-магазин ортодонтичної продукції ORTHOSTORE слідкує за іноваціями у своїй сфері діяльності і пропонує продукцію високої якості від провідних світових брендів.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Photo 1 */}
            <div className="bg-white border-2 border-stone-200 rounded-xl overflow-hidden">
              <div className="aspect-[3/4] bg-stone-100 relative">
                <Image
                  src="/images/about/about1.jpg"
                  alt="ORTHOSTORE офіс"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Photo 2 */}
            <div className="bg-white border-2 border-stone-200 rounded-xl overflow-hidden">
              <div className="aspect-[3/4] bg-stone-100 relative">
                <Image
                  src="/images/about/about2.jpg"
                  alt="ORTHOSTORE команда"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
        <div className="space-y-12">
          <div className="space-y-6 text-base lg:text-lg text-stone-700 leading-relaxed">
            <p>
              Для постійних клієнтів передбачені знижки, подарунки та інші приємні сюрпризи. В умовах кризи і нестабільності наш магазин підтримує лояльну цінову політику щоб і професіонал і молодий фахівець знайшли необхідну продукцію на будь-який бюджет.
            </p>
          </div>

          <div className="space-y-6">
            {/* Budget Segment */}
            <div className="bg-blue-50/30 p-8 border-2 border-[#3179cf]/40 rounded-xl transition-all hover:border-[#3179cf]/60 hover:shadow-lg hover:shadow-[#3179cf]/10">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-light text-[#3179cf]/60">01</span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-stone-900">
                    Бюджетний сегмент
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Товари з достатніми для роботи характеристиками за доступними цінами.
                  </p>
                </div>
              </div>
            </div>

            {/* Mid Segment */}
            <div className="bg-blue-50/30 p-8 border-2 border-[#3179cf]/40 rounded-xl transition-all hover:border-[#3179cf]/60 hover:shadow-lg hover:shadow-[#3179cf]/10">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-light text-[#3179cf]/60">02</span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-stone-900">
                    Середній ціновий клас
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Оптимальне співвідношенням ціна-якість для щоденної практики.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Segment */}
            <div className="bg-blue-50/30 p-8 border-2 border-[#3179cf]/40 rounded-xl transition-all hover:border-[#3179cf]/60 hover:shadow-lg hover:shadow-[#3179cf]/10">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-light text-[#3179cf]/60">03</span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-stone-900">
                    Преміум сегмент
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Для фахівців найвищого рівня, які мають високі вимоги до функціоналу і надійності матеріалів і інструментів.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20 text-center">
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-3xl font-light">
              З нами зручно, легко та швидко!
            </h2>
            <p className="text-xl text-stone-200 font-medium">
              Щиро дякуємо за довіру до ORTHOSTORE!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
