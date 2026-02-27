import { Wallet, TrendingUp, Gift, CreditCard, Calculator, CheckCircle, Sparkles, Coins, Receipt, ArrowRight, Percent, DollarSign, Zap } from 'lucide-react';

export default function CashbackPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm border border-white/20">
              <Zap className="w-4 h-4" />
              <span>Заощаджуйте на кожній покупці</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-light">
              Програма кешбеку
            </h1>
            
            <p className="text-xl lg:text-2xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
              Повертайте <span className="font-bold text-white">від 2% до 10%</span> коштів з кожної покупки
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
                <Percent className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-light mb-1">до 10%</div>
                <div className="text-sm text-stone-300">Максимальний кешбек</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
                <Wallet className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-light mb-1">0 грн</div>
                <div className="text-sm text-stone-300">Вартість підключення</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-light mb-1">Миттєво</div>
                <div className="text-sm text-stone-300">Активація при реєстрації</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Cashback Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-stone-900 text-white text-sm px-4 py-1 mb-4">
                CASH BACK
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-6 leading-tight">
                Що таке кешбек та як він працює
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
              <p>
                То що ж таке кешбек та як він працює? Дослівно з англійської це слово перекладається як <span className="font-bold text-stone-900">«готівку назад»</span>. 
              </p>
              <p>
                Механізм дії простий: магазин платить частину коштів за залучення клієнтів кешбек-сервісу, а він, у свою чергу, повертає покупцеві встановлений відсоток з покупки.
              </p>
            </div>

            <div className="bg-stone-50 border-l-4 border-stone-900 p-6">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-stone-900 flex-shrink-0 mt-1" />
                <p className="text-stone-700">
                  Повернення частини коштів можливе під час здійснення покупки на сайті інтернет-магазина <span className="font-bold text-stone-900">ORTHOSTORE</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Cards/Money Section */}
          <div className="space-y-6">
            <div className="relative bg-stone-50 border-2 border-stone-200 overflow-hidden group hover:border-stone-900 transition-all">
              <div className="aspect-[16/10] bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 flex items-center justify-center p-8">
                <div className="text-center space-y-4 text-white">
                  <Coins className="w-20 h-20 mx-auto opacity-90" />
                  <p className="text-2xl font-light">Готівка назад</p>
                  <p className="text-sm text-stone-300">Cash Back System</p>
                </div>
              </div>
            </div>

            <div className="relative bg-stone-50 border-2 border-stone-200 overflow-hidden group hover:border-stone-900 transition-all">
              <div className="aspect-[16/10] bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <CreditCard className="w-20 h-20 text-stone-900 mx-auto" />
                  <p className="text-2xl font-light text-stone-900">Накопичуйте бонуси</p>
                  <p className="text-sm text-stone-600">На кожній покупці</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Percentage Section */}
      <section className="bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-4">
              Як працює кешбек?
            </h2>
            <p className="text-xl text-stone-600">
              Заробляйте з кожної покупки
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 2% Card */}
            <div className="bg-white border-2 border-stone-200 p-10 text-center hover:border-stone-900 transition-all group">
              <div className="text-8xl font-light text-stone-900 mb-4 group-hover:scale-110 transition-transform">2%</div>
              <div className="text-2xl font-light text-stone-900 mb-2">Мінімальний кешбек</div>
              <p className="text-stone-600">На більшість товарів у каталозі</p>
            </div>

            {/* 10% Card */}
            <div className="bg-stone-900 text-white p-10 text-center hover:bg-stone-800 transition-all group">
              <div className="text-8xl font-light mb-4 group-hover:scale-110 transition-transform">10%</div>
              <div className="text-2xl font-light mb-2">Максимальний кешбек</div>
              <p className="text-stone-300">На спеціальні товари з підвищеним кешбеком</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-2 border-stone-200">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-stone-900 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-stone-900">
                    За рік — відчутна сума
                  </h3>
                  <p className="text-stone-700 leading-relaxed">
                    На перший погляд замало, але за рік утворюється сума, яка вас в будь-якому випадку порадує.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <Calculator className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone-700 leading-relaxed">
                    <span className="font-bold text-stone-900">Важливо:</span> Варто пам'ятати, що, згідно із законом, кешбек вважається видом заробітку і оподатковується <span className="font-bold text-red-600">19,5%</span> (ПДФО + військовий збір).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Connect Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-4">
            Як підключити кешбек
          </h2>
          <p className="text-xl text-stone-600">
            Просто, швидко, автоматично
          </p>
        </div>

        <div className="space-y-12">
          {/* Auto Activation Banner */}
          <div className="bg-stone-900 text-white p-10 text-center">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-light mb-4">
              Автоматична активація
            </h3>
            <p className="text-xl text-stone-200 leading-relaxed max-w-2xl mx-auto">
              Під час реєстрації в особистому кабінеті, функція <span className="font-bold text-white">КЕШБЕК</span> вмикається автоматично.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-stone-50 p-8 border-2 border-stone-200 hover:border-stone-900 transition-all">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-light">1</span>
              </div>
              <div className="pt-6">
                <CheckCircle className="w-10 h-10 text-stone-900 mb-4" />
                <h4 className="text-2xl font-light text-stone-900 mb-3">Зареєструйтесь</h4>
                <p className="text-stone-600 leading-relaxed">
                  Кешбек активується автоматично при створенні особистого кабінету
                </p>
              </div>
            </div>

            <div className="relative bg-stone-50 p-8 border-2 border-stone-200 hover:border-stone-900 transition-all">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-light">2</span>
              </div>
              <div className="pt-6">
                <Receipt className="w-10 h-10 text-stone-900 mb-4" />
                <h4 className="text-2xl font-light text-stone-900 mb-3">Робіть покупки</h4>
                <p className="text-stone-600 leading-relaxed">
                  Під час оформлення замовлення, Вам буде нараховуватись КЕШБЕК згідно умов на сайті
                </p>
              </div>
            </div>

            <div className="relative bg-stone-50 p-8 border-2 border-stone-200 hover:border-stone-900 transition-all">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-light">3</span>
              </div>
              <div className="pt-6">
                <Wallet className="w-10 h-10 text-stone-900 mb-4" />
                <h4 className="text-2xl font-light text-stone-900 mb-3">Використовуйте</h4>
                <p className="text-stone-600 leading-relaxed">
                  Ви зможете бачити суму нарахування під час входу в особистий кабінет
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Examples */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light mb-4">
              Приклади розрахунків
            </h2>
            <p className="text-xl text-stone-300">
              Виходячи з цих даних, розрахуємо, скільки грошей повернеться у вигляді бонусів
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Example 1 - Standard */}
            <div className="bg-white text-stone-900 p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-stone-900 text-white text-xs px-3 py-1 mb-4">
                  СТАНДАРТНИЙ
                </div>
                <Receipt className="w-12 h-12 mx-auto mb-4 text-stone-900" />
                <h3 className="text-2xl font-light mb-2">
                  Кешбек 7%
                </h3>
              </div>
              <div className="bg-stone-50 p-6 text-center space-y-3">
                <p className="text-stone-600 text-sm">Ви робите замовлення:</p>
                <p className="text-3xl font-light text-stone-900">10 000 грн</p>
                <div className="text-stone-400">×</div>
                <p className="text-2xl font-light text-stone-900">7%</p>
                <div className="border-t-2 border-stone-200 pt-3 mt-3">
                  <p className="text-sm text-stone-600 mb-1">Ваш кешбек:</p>
                  <p className="text-4xl font-light text-stone-900">700 грн</p>
                </div>
              </div>
            </div>

            {/* Example 2 - Special 10% */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-white text-stone-900 text-xs px-3 py-1 mb-4">
                  СПЕЦІАЛЬНА ПРОПОЗИЦІЯ
                </div>
                <Sparkles className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-light mb-2">
                  Підвищений кешбек 10%
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-stone-200 text-center leading-relaxed">
                  При замовленні конкретного товару, людині нараховується КЕШБЕК залежно від встановленого відсотка.
                </p>
                <div className="bg-white/5 p-4 text-center rounded">
                  <p className="text-white">
                    Наприклад, ми визначили <span className="font-bold">10 товарів</span> на які при купівлі нараховується КЕШБЕК <span className="font-bold text-2xl">10%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3 - Using Cashback */}
            <div className="bg-white text-stone-900 p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-stone-900 text-white text-xs px-3 py-1 mb-4">
                  СПИСАННЯ
                </div>
                <ArrowRight className="w-12 h-12 mx-auto mb-4 text-stone-900" />
                <h3 className="text-2xl font-light mb-2">
                  Використання кешбеку
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-stone-600 text-sm text-center mb-4">
                  При створенні замовлення, людина може списати суму КЕШБЕКу самостійно
                </p>
                <div className="bg-stone-50 p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Нове замовлення:</span>
                    <span className="font-medium">2000 грн</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Накопичений кешбек:</span>
                    <span className="font-medium">- 1500 грн</span>
                  </div>
                  <div className="border-t-2 border-stone-200 pt-2 flex justify-between items-center">
                    <span className="font-bold">До сплати:</span>
                    <span className="text-3xl font-light text-stone-900">500 грн</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Cashback */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-4">
            Як можна використати Кешбек?
          </h2>
          <p className="text-xl text-stone-600">
            Широкі можливості для ваших бонусів
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-50 p-8 border-2 border-stone-200 text-center hover:border-stone-900 transition-all group">
            <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-medium text-stone-900 mb-3">Майбутні покупки</h4>
            <p className="text-stone-600 leading-relaxed">
              Зменшення витрат на наступні замовлення
            </p>
          </div>

          <div className="bg-stone-50 p-8 border-2 border-stone-200 text-center hover:border-stone-900 transition-all group">
            <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-medium text-stone-900 mb-3">Оплата послуг</h4>
            <p className="text-stone-600 leading-relaxed">
              Комунальні послуги та інше
            </p>
          </div>

          <div className="bg-stone-50 p-8 border-2 border-stone-200 text-center hover:border-stone-900 transition-all group">
            <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-medium text-stone-900 mb-3">Авіаквитки</h4>
            <p className="text-stone-600 leading-relaxed">
              Придбання квитків на подорожі
            </p>
          </div>

          <div className="bg-stone-50 p-8 border-2 border-stone-200 text-center hover:border-stone-900 transition-all group">
            <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-medium text-stone-900 mb-3">Накопичення бонусів</h4>
            <p className="text-stone-600 leading-relaxed">
              Обмін на різноманітні товари та послуги
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-stone-50 border-t border-stone-200 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-900 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-stone-900 rounded-full mb-4">
              <Gift className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-light text-stone-900">
              Почніть заощаджувати<br />вже сьогодні!
            </h2>
            
            <p className="text-xl lg:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Зареєструйтесь та отримуйте кешбек з кожної покупки в ORTHOSTORE
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="bg-stone-900 text-white px-10 py-4 text-lg font-medium hover:bg-stone-800 transition-colors rounded-lg">
                Зареєструватись
              </button>
              <button className="bg-white text-stone-900 px-10 py-4 text-lg font-medium border-2 border-stone-900 hover:bg-stone-900 hover:text-white transition-all rounded-lg">
                Дізнатись більше
              </button>
            </div>

            {/* Mini Features */}
            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <Zap className="w-8 h-8 text-stone-900 mx-auto mb-2" />
                <p className="text-stone-600">Миттєва активація</p>
              </div>
              <div className="text-center">
                <Percent className="w-8 h-8 text-stone-900 mx-auto mb-2" />
                <p className="text-stone-600">До 10% повернення</p>
              </div>
              <div className="text-center">
                <Wallet className="w-8 h-8 text-stone-900 mx-auto mb-2" />
                <p className="text-stone-600">Безкоштовно назавжди</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
