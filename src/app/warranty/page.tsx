import { Phone, Shield, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function WarrantyPage() {
  const warrantyTerms = [
    {
      title: 'Апарати',
      term: '12 місяців',
      description: 'Гарантійний термін з дати придбання'
    },
    {
      title: 'Інструменти',
      term: '12 місяців',
      description: 'Гарантійний термін з дати придбання'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-stone-900">
              Гарантія якості
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Ми гарантуємо якість нашої продукції та надаємо повну підтримку протягом гарантійного терміну
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
        
        {/* Warranty Definition */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-light text-stone-900 mb-8">
            Гарантійні зобов'язання
          </h2>
          <div className="bg-stone-50 p-8 lg:p-10 rounded-lg">
            <p className="text-base lg:text-lg text-stone-700 leading-relaxed">
              Під гарантійним терміном визначено зобов'язання виробника або продавця усунути дефекти, 
              що виникли не з вини покупця, протягом певного терміну, зазвичай від 12 до 36 місяців, 
              залежно від типу інструменту або апаратів згідно з номенклатурою.
            </p>
          </div>
        </div>

        {/* Warranty Terms Grid */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-light text-stone-900 mb-8">
            Гарантійні терміни
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {warrantyTerms.map((item, index) => (
              <div 
                key={index}
                className="bg-white border-2 border-stone-200 p-8 hover:border-stone-900 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-stone-900" />
                  <h3 className="text-xl font-medium text-stone-900">
                    {item.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-stone-900">
                    {item.term}
                  </div>
                  <p className="text-sm text-stone-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-16">
          <div className="bg-stone-900 text-white p-8 lg:p-10 rounded-lg">
            <div className="flex items-start gap-4 mb-6">
              <FileText className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-3">
                  Додаткова інформація
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Для більш детальної інформації дивіться розділ{' '}
                  <Link 
                    href="/returns" 
                    className="text-white underline hover:no-underline transition-all"
                  >
                    повернення та обмін
                  </Link>
                  {' '}або зв'яжіться з нашим менеджером
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-stone-200 pt-12">
          <div className="text-center space-y-6">
            <h3 className="text-xl lg:text-2xl font-light text-stone-900">
              Маєте питання?
            </h3>
            <p className="text-stone-600">
              Наші менеджери готові надати вам консультацію
            </p>
            <a 
              href="tel:+380503039494"
              className="inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 font-medium hover:bg-stone-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              +380 50 303 94 94
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
