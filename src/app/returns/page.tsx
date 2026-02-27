import { RefreshCw, AlertCircle, CheckCircle, Phone, FileText, Package } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 rounded-full mb-4">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-stone-900">
              Повернення та обмін
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Ми прагнемо забезпечити Вас якісною продукцією, і з розумінням ставимось до того, що товар не підійшов
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
        
        {/* Legal Information */}
        <div className="mb-16">
          <div className="flex items-start gap-4 mb-8">
            <FileText className="w-6 h-6 text-stone-900 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-light text-stone-900 mb-4">
                Законодавча база
              </h2>
            </div>
          </div>
          
          <div className="bg-stone-50 p-6 lg:p-8 rounded-lg">
            <p className="text-base text-stone-700 leading-relaxed mb-4">
              Згідно з чинним законодавством України (згідно з додатком №3 постанови Кабінету Міністрів України від 19.03.1994 № 172 «Про реалізацію окремих положень Закону України «Про захист прав споживачів», п. 16 наказу Міністерства охорони здоров'я України від 10.07.2005 № 360 «Порядок відпуску лікарських засобів і виробів медичного призначення з аптек та їх структурних підрозділів»), товари, придбані в інтернет-магазині ORTHOSTORE:
            </p>
            <div className="bg-white border-l-4 border-stone-900 p-4 mt-4">
              <p className="text-stone-900 font-medium">
                НЕ ПІДЛЯГАЮТЬ ОБМІНУ (ПОВЕРНЕННЮ), ЯКЩО ВОНИ НАЛЕЖНОЇ ЯКОСТІ.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white border-2 border-stone-200 p-6 lg:p-8">
            <p className="text-base text-stone-700 leading-relaxed">
              Однак, якщо товар має виробничий брак або був неправильно укомплектований з вини продавця, покупець має право на його повернення або обмін.
            </p>
            <p className="text-base text-stone-700 leading-relaxed mt-4">
              Ви можете його повернути чи обміняти згідно прав споживача передбачених ст. 9 Закону України "Про захист прав споживачів".
            </p>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="w-6 h-6 text-stone-900" />
            <h2 className="text-2xl lg:text-3xl font-light text-stone-900">
              Умови повернення
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-stone-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">
                  Товар має бути в оригінальній упаковці, без слідів використання, збережені товарний вигляд, споживчі властивості, пломби, ярлики, упаковка придбаного товару
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">
                  <span className="font-medium">ПОВЕРНЕННЯ АБО ОБМІН можливі протягом 14 днів</span> з моменту отримання замовлення
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">
                  Зв'яжіться з нашим менеджером за телефоном <span className="font-medium">+380503039494</span> та повідомити про намір повернення, компанія залишає за собою право індивідуального розгляду звернення та погодження повернення
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">
                  Наявність рахунку з нашого інтернет-магазину при відвантаженні товару
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Defective Product Exchange */}
        <div className="mb-16">
          <div className="bg-stone-900 text-white p-6 lg:p-8 rounded-lg">
            <div className="flex items-start gap-4 mb-6">
              <Package className="w-6 h-6 flex-shrink-0 mt-1" />
              <div className="space-y-4 w-full">
                <h3 className="text-xl lg:text-2xl font-light">
                  Заміна товару з браком?
                </h3>
                
                <div className="space-y-3 text-stone-200">
                  <div className="flex items-start gap-3">
                    <span className="text-white font-medium">1.</span>
                    <p>Зв'яжіться з нами протягом 3 днів з моменту отримання замовлення</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white font-medium">2.</span>
                    <p>Надішліть фото або відео, що підтверджують дефект</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white font-medium">3.</span>
                    <p>Ми зробимо заміщення товару протягом 3-5 робочіх днів</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cannot Return */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="w-6 h-6 text-stone-900" />
            <h2 className="text-2xl lg:text-3xl font-light text-stone-900">
              Ми не зможемо замінити товар або повернути Вам гроші, якщо:
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-600 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-900">
                  Пройшло більше 14 днів
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-900">
                  Товаром користувалися, тобто він вже не новий, терміни експлуатації не мають значення
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-900">
                  При поверненні і перевірці якості товару, виявлені дефекти (тріщини, подряпини, відколи, механічні ушкодження за винятком прихованих виробничих дефектів)
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-900">
                  Товар до нас повернувся в НЕ заводській упаковці або в неповній комплектації
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-900">
                  Не представлено пакет документів, який йшов разом з товаром
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-stone-200 pt-12">
          <div className="text-center space-y-6">
            <h3 className="text-xl lg:text-2xl font-light text-stone-900">
              Маєте питання щодо повернення?
            </h3>
            <p className="text-stone-600">
              Зв'яжіться з нашим менеджером для консультації
            </p>
            <a 
              href="tel:+380503039494"
              className="inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 font-medium hover:bg-stone-800 transition-all duration-300 rounded-lg"
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
