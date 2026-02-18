import { Truck, CreditCard, Package, MapPin, Clock, RefreshCw, ShieldCheck } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 rounded-full mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-stone-900">
              Доставка та оплата
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Продумана до дрібниць логістика, дає можливість швидко та ефективно доставити Вам придбану продукцію ! ! !
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
        
        {/* Delivery Information */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-6 h-6 text-stone-900" />
            <h2 className="text-2xl lg:text-3xl font-light text-stone-900">
              Доставка
            </h2>
          </div>

          <div className="space-y-8">
            {/* Manager Note */}
            <div className="bg-stone-50 p-6 lg:p-8 rounded-lg border-l-4 border-stone-900">
              <p className="text-base lg:text-lg text-stone-700 leading-relaxed">
                Наші менеджери заздалегідь погодять з Вами зручний час доставки!
              </p>
            </div>

            {/* Kyiv Delivery */}
            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="w-5 h-5 text-stone-900 flex-shrink-0 mt-1" />
                <div className="space-y-3 w-full">
                  <h3 className="text-xl font-medium text-stone-900">
                    Доставка по Києву та Київській області
                  </h3>
                  
                  <div className="flex items-center gap-2 text-stone-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Здійснюється з понеділка по п'ятницю з 9.00 до 18.00</span>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-stone-200">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        <span className="font-medium">Доставка по Києву до 3000 грн оплачується!</span> Вартість доставки 100 грн.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        <span className="font-medium">Доставка по Києву від 3000 грн – БЕЗКОШТОВНА !</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        <span className="font-medium">Доставка по Київській області оплачується!</span> Вартість доставки 150 грн.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ukraine Delivery */}
            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-stone-900 flex-shrink-0 mt-1" />
                <div className="space-y-3 w-full">
                  <h3 className="text-xl font-medium text-stone-900">
                    Відправлення по Україні
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        Здійснюється кур'єрськими службами: <span className="font-medium">НОВА ПОШТА, УКРПОШТА</span> або іншою службою, погодженою з замовником.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        Відправлення по Україні <span className="font-medium">здійснюється після повної оплати.</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        Відправлення по Україні <span className="font-medium">до 3500 грн</span> відправляється за рахунок замовника.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-stone-700">
                        Відправлення по Україні <span className="font-medium">від 3500 грн</span> відправляється за рахунок відправника.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Terms */}
            <div className="bg-stone-900 text-white p-6 lg:p-8 rounded-lg">
              <div className="space-y-3">
                <p className="text-stone-200 leading-relaxed">
                  Відвантаження здійснюється в день надходження замовлення, на наступний робочий день або за графіком домовленості, погодженим із замовником.
                </p>
                <p className="text-white font-medium pt-2 border-t border-stone-700">
                  Мінімальна сума замовлення – 300 грн
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="w-6 h-6 text-stone-900" />
            <h2 className="text-2xl lg:text-3xl font-light text-stone-900">
              Варіанти оплати
            </h2>
          </div>

          <div className="bg-stone-50 p-6 lg:p-8">
            <p className="text-lg text-stone-700 mb-6">
              Оплату товару можна здійснити наступними способами:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white border border-stone-200">
                <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">1</span>
                </div>
                <p className="text-stone-900 font-medium">
                  Оплата при доставці кур'єру
                </p>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white border border-stone-200">
                <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">2</span>
                </div>
                <p className="text-stone-900 font-medium">
                  Оплата на розрахунковий рахунок
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return & Exchange */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <RefreshCw className="w-6 h-6 text-stone-900" />
            <h2 className="text-2xl lg:text-3xl font-light text-stone-900">
              Повернення та обмін
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-stone-700">
                    <span className="font-medium">ПОВЕРНЕННЯ АБО ОБМІН</span> можливі протягом 14 днів з моменту отримання замовлення
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">
                  Зв&apos;яжіться з нашим менеджером за телефоном <span className="font-medium">+380503039494</span> та повідомити про намір повернення, компанія залишає за собою право індивідуального розгляду звернення та погодження повернення
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-stone-700">
                  <span className="font-medium">Наявність рахунку</span>, що підтверджує замовлення в ORTHOSTORE
                </p>
              </div>
            </div>

            {/* Defective Product */}
            <div className="bg-stone-900 text-white p-6 lg:p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-xl font-medium">Заміна товару з браком?</h3>
              </div>
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-lg font-bold text-stone-400 shrink-0">1.</span>
                  <span className="text-stone-200">Зв&apos;яжіться з нами протягом 3 днів з моменту отримання замовлення</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-lg font-bold text-stone-400 shrink-0">2.</span>
                  <span className="text-stone-200">Надішліть фото або відео, що підтверджують дефект</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-lg font-bold text-stone-400 shrink-0">3.</span>
                  <span className="text-stone-200">Ми зробимо заміщення товару протягом 3-5 робочих днів</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
