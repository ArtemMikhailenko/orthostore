import { FileText, Download, CheckCircle, Scale, Shield, FileCheck } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    { id: '1', title: 'Загальні положення' },
    { id: '2', title: 'Визначення термінів' },
    { id: '3', title: 'Предмет договору' },
    { id: '4', title: 'Ціна та порядок розрахунків' },
    { id: '5', title: 'Доставка та приймання товару' },
    { id: '6', title: 'Упаковка товару' },
    { id: '7', title: 'Права та обов\'язки сторін' },
    { id: '8', title: 'Обмін або повернення товару' },
    { id: '9', title: 'Конфіденційність та персональні дані' },
    { id: '10', title: 'Відповідальність' },
    { id: '11', title: 'Форс-мажор' },
    { id: '12', title: 'Інші умови' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b-2 border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 px-4 py-2 text-sm">
              <Scale className="w-4 h-4" />
              <span>Юридичний документ</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-light">
              Публічний договір<br />
              <span className="font-medium">(Оферта)</span>
            </h1>
            
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              на замовлення, купівлю-продаж і доставку товарів
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 border-2 border-stone-900 hover:bg-white hover:text-stone-900 transition-colors">
                <Download className="w-5 h-5" />
                Завантажити PDF
              </button>
              <button className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 border-2 border-stone-200 hover:border-stone-900 transition-colors">
                <FileText className="w-5 h-5" />
                Версія для друку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="border-b-2 border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-stone-200 bg-stone-50">
              <Shield className="w-8 h-8 mx-auto mb-3 text-stone-900" />
              <div className="font-medium mb-1">Захист прав</div>
              <div className="text-sm text-stone-600">Відповідно до ЦКУ</div>
            </div>
            <div className="text-center p-6 border-2 border-stone-200 bg-stone-50">
              <FileCheck className="w-8 h-8 mx-auto mb-3 text-stone-900" />
              <div className="font-medium mb-1">Електронна форма</div>
              <div className="text-sm text-stone-600">Юридична сила</div>
            </div>
            <div className="text-center p-6 border-2 border-stone-200 bg-stone-50">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-stone-900" />
              <div className="font-medium mb-1">Публічний характер</div>
              <div className="text-sm text-stone-600">Однакові умови</div>
            </div>
          </div>
          
          <div className="mt-8 p-6 border-2 border-stone-900 bg-stone-50">
            <p className="text-sm text-stone-700 leading-relaxed">
              <span className="font-medium text-stone-900">Шановний Користувачу!</span> Перед здійсненням замовлення товарів на даному сайті та в соціальних мережах Продавця, просимо уважно ознайомитись з умовами цього Договору. Здійснюючи замовлення, Ви підтверджуєте свою повну згоду з усіма положеннями цієї оферти.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-b-2 border-stone-200 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-light mb-8">Зміст договору</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                className="flex items-start gap-3 p-4 border-2 border-stone-200 bg-white hover:border-stone-900 transition-colors group"
              >
                <span className="text-2xl font-light text-stone-400 group-hover:text-stone-900 transition-colors">
                  {section.id}
                </span>
                <span className="text-stone-700 group-hover:text-stone-900 transition-colors">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          
          {/* Section 1 */}
          <div id="section-1" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">01</span>
              <h2 className="text-3xl font-light">Загальні положення</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p><span className="font-medium">1.1.</span> Цей Договір є офіційною публічною пропозицією (офертою) Продавця укласти договір купівлі-продажу Товару між Продавцем і Покупцем на умовах, викладених у цьому документі.</p>
              <p><span className="font-medium">1.2.</span> Текст даного Договору та його чинна редакція представлена на сайті за посиланням __________________ і доступні для ознайомлення будь-якому Користувачу в будь-який час.</p>
              <p><span className="font-medium">1.3.</span> Договір є публічним у розумінні ст. 633, 634, 641 Цивільного кодексу України та Закону України «Про електронну комерцію»: його умови є однаковими для всіх покупців незалежно від їх статусу (фізична особа, юридична особа, фізична особа-підприємець).</p>
              <p><span className="font-medium">1.4.</span> Цей Договір укладається шляхом його акцепту у відповідності до Закону України «Про електронну комерцію» та не потребує підписання в паперовій формі. За бажанням Покупця Сторони можуть оформити Договір в письмовій формі з умовами, що викладені в даному Договорі. У разі розбіжності між версією договору в документах Покупця та на сайті — чинною є версія, погоджена Сторонами у письмовій формі та скріплена підписами сторін.</p>
              <p><span className="font-medium">1.5.</span> Акцептом оферти є будь-яка з наведених дій: а) оформлення замовлення на Сайті та натискання кнопки «все вірно, зробити замовлення»; б) оформлення замовлення на Сторінці Продавця в Instagram чи Facebook; б) підписання документа за допомогою кваліфікованого електронного підпису (за запитом Покупця); в) здійснення оплати вартості Товару згідно замовлення; г) оформлення замовлення телефоном із фіксацією оператором у системі обліку.</p>
              <p><span className="font-medium">1.7.</span> Акцептуючи умови даного Договору, Покупець підтверджує, що:</p>
              <ul className="list-none space-y-2 ml-6">
                <li>а) повністю ознайомлений та погоджується з умовами цієї Оферти;</li>
                <li>б) надає згоду на обробку своїх персональних даних відповідно до розділу «персональні дані» цього Договору;</li>
                <li>в) отримав від Продавця вичерпну інформацію про основні споживчі властивості товару, умови придбання, оплати, доставки, гарантії, повернення, а також інформацію про Продавця відповідно до ст. 15 Закону України "Про захист прав споживачів";</li>
                <li>г) своє розуміння, що Товар призначений для використання в ортодонтії та потребує спеціальних знань та вмінь. Продавець не надає медичних консультацій, пов'язаних з вибором та використанням Товару.</li>
              </ul>
              <p><span className="font-medium">1.8.</span> Дата публікації дійсної редакції Договору є: _______.</p>
              <p><span className="font-medium">1.9.</span> Ця Оферта розповсюджується як на Товари, що розміщені на Сайті, так і в соціальних мережах Продавця.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">02</span>
              <h2 className="text-3xl font-light">Визначення термінів</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p><span className="font-medium">2.1.</span> Товар – це ортодонтичні вироби, призначені для використання в стоматології.</p>
              <p><span className="font-medium">2.2.</span> Сайт – це вебсайт за адресою: ________, створений як інтернет-магазин з метою замовлення Товарів на підставі ознайомлення Користувача з описом Товару, представленого на сайті.</p>
              <p><span className="font-medium">2.3.</span> Покупець — дієздатна фізична особа від 18 років, юридична особа або ФОП, що оформлює замовлення.</p>
              <p><span className="font-medium">2.4.</span> Продавець – це ТОВ «___», код ЄДРПОУ _, зареєстрований за адресою: _______, в особі директора ____, який діє на підставі Статуту.</p>
              <p><span className="font-medium">2.5.</span> Користувач – будь-яка особа, що відвідує або використовує Сайт.</p>
              <p><span className="font-medium">2.6.</span> Володілець персональних даних – ТОВ «___», код ЄДРПОУ _, зареєстрований за адресою: _______, в особі директора ____, який діє на підставі Статуту, яке визначає мету та способи обробки персональних даних, а також забезпечує їх захист відповідно до Закону України «Про захист персональних даних».</p>
              <p><span className="font-medium">2.7.</span> Замовлення – волевиявлення Користувача щодо придбання Товару.</p>
              <p><span className="font-medium">2.8.</span> Сторінка Продавця в Instagram — офіційний обліковий запис Продавця у соціальній мережі Instagram, розміщений за посиланням: ______, що використовується для інформування Покупців про товари (послуги) та комунікації з ними.</p>
              <p><span className="font-medium">2.9.</span> Сторінка Продавця у Facebook — офіційна бізнес-сторінка Продавця у соціальній мережі Facebook, розміщена за посиланням: ______, яка використовується для інформування Покупців та взаємодії з ними.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-stone-200">
              <span className="text-4xl font-light text-stone-300">03</span>
              <h2 className="text-3xl font-light">Предмет договору</h2>
            </div>
            <div className="p-6 border-2 border-stone-200 bg-stone-50 mb-6">
              <p className="text-sm text-stone-700">
                Продавець зобов'язується передати у власність Покупця Товари, а Покупець — прийняти та оплатити їх згідно з умовами договору.
              </p>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">3.2.</span> Покупець має право оформити будь-який Товар, представлений на Сайті, у межах доступної кількості, наявної на складі Продавця.</p>
              <p><span className="font-medium">3.3.</span> Замовлення може оформлюватись одним із засобів: а) на сайті за допомогою натискання кнопки «всі дані вірні, оформити замовлення»; б) шляхом замовлення телефоном в робочі години Продавця, зазначені на Сайті.</p>
              <p><span className="font-medium">3.4.</span> В замовленні Покупець обов'язково зазначає наступні дані: 1) прізвище, ім'я та по-батькові; 2) контактні дані: е-мейл та номер телефону; 3) адреса доставки: місто, вулицю та номер будинку; 4) найменування товару, розміри та кількість.</p>
              <p><span className="font-medium">3.5.</span> Обробка замовлення відбувається протягом 1 (одного) робочого дня згідно графіку роботи Продавця. Після обробки замовлення і з метою уточнення замовлення оператор Продавця зв'язується з Покупцем за даними, які Покупець вказав при оформленні замовлення.</p>
              
              <div className="p-4 border-2 border-stone-300 bg-stone-50 my-4">
                <p className="font-medium text-stone-900 mb-2">Важливо:</p>
                <p className="text-sm">Замовлення вважається прийнятим Продавцем у випадку отримання SMS-повідомлення від Продавця на номер телефону або е-мейл, що зазначені покупцем при замовленні. В такому повідомленні буде вказано номер замовлення.</p>
              </div>

              <p><span className="font-medium">3.6.</span> Продавець має право відмовити у виконанні замовлення, якщо: дані, надані Покупцем, неповні; порушення умов даної Оферти Покупцем; покупець не підтвердив замовлення; не підтверджено особу/повноваження Покупця; Продавцем не отримано оплату за Товар; наявна заборгованість Покупця за попередніми замовленнями; Покупець безпідставно відмовився від отримання Товару за попереднім замовленням.</p>
              
              <p><span className="font-medium">3.7.</span> У разі відсутності товару Продавець інформує Покупця та пропонує: а) необхідність очікування та приблизні терміни; б) заміну; в) скасування Замовлення.</p>
              
              <p><span className="font-medium">3.8.</span> Зображення Товарів на Сайті можуть дещо відрізнятися від фактичного кольору чи відтінку через технічні особливості відображення; це не є підставою для автоматичного повернення та відшкодування вартості Товару з урахуванням вимог Закону України «Про захист прав споживача».</p>
              
              <p><span className="font-medium">3.10.</span> Контент Сайту (дизайн, логотип) є об'єктом інтелектуальної власності Продавця. Забороняється копіювання інформації із сайту без письмової згоди Продавця.</p>
              
              <p><span className="font-medium">3.14.</span> Продавець підтверджує, що Товар зареєстрований на території України та дозволений до його реалізації та використання.</p>
              
              <p><span className="font-medium">3.15.</span> Оскільки Товар має спеціальне призначення і застосовується в ортодонтії, то перед оформленням замовлення Продавець рекомендує Покупцю отримати консультацію у лікаря, що має відповідну спеціалізацію.</p>
            </div>
          </div>

          {/* Section 4 - Pricing */}
          <div id="section-4" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">04</span>
              <h2 className="text-3xl font-light">Ціна та порядок розрахунків</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">4.1.</span> Вартість Товару вказується Продавцем в національній валюті (гривні, UAH) з урахуванням ПДВ та без вартості доставки. Ціни, вказані на сайті на момент оформлення замовлення, є остаточними для такого замовлення.</p>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Способи оплати:</div>
                  <ul className="space-y-1 text-sm">
                    <li>• Безготівковий розрахунок</li>
                    <li>• Оплата при доставці</li>
                    <li>• Банківський переказ</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Термін оплати:</div>
                  <p className="text-sm">До 3 банківських днів від дати виставлення рахунку</p>
                </div>
              </div>

              <p><span className="font-medium">4.4.</span> Оплата може здійснюватися одним із способів: 1) безготівково шляхом перерахування коштів на банківський рахунок Продавця протягом трьох банківських днів від дати виставлення рахунку Продавцем; 2) оплата готівкою при доставці перевізникам (комісію перевізника за грошовий переказ сплачує Покупець).</p>
              
              <div className="p-6 border-2 border-stone-900 bg-stone-50 my-6">
                <h3 className="font-medium text-lg mb-4">Програма КЕШБЕК</h3>
                <p className="text-sm mb-3"><span className="font-medium">4.6.</span> Продавець може визначати перелік товарів, під час придбання яких Покупцю нараховується КЕШБЕК у вигляді бонусних балів. Розмір КЕШБЕКУ встановлюється у відсотковому співвідношенні від вартості відповідного товару.</p>
                <p className="text-sm mb-3">КЕШБЕК нараховується після успішного оформлення та оплати замовлення на 15 день, що слідує за днем отримання Покупцем Товару.</p>
                <div className="bg-white border-2 border-stone-200 p-4 mt-3">
                  <p className="text-xs font-medium mb-2">Приклад нарахування:</p>
                  <p className="text-xs">Продавець визначає 10 товарів з КЕШБЕКОМ 10%. Якщо вартість кожного товару 2000 грн, то загальна сума КЕШБЕКУ: 2000 грн × 10 товарів × 10% = 2000 грн</p>
                </div>
                <p className="text-sm mt-3"><span className="font-medium">4.7.</span> КЕШБЕК є знижкою на наступну покупку та не може бути конвертований у грошові кошти. КЕШБЕК не підлягає поверненню або виплаті готівкою.</p>
                <p className="text-sm mt-2"><span className="font-medium">4.9.</span> КЕШБЕК може бути використано протягом 6 місяців з моменту його нарахування. Після анулювання КЕШБЕК не поновлюється.</p>
              </div>
            </div>
          </div>

          {/* Section 5 - Delivery */}
          <div id="section-5" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">05</span>
              <h2 className="text-3xl font-light">Доставка та приймання товару</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">5.1.</span> Після здійснення обробки замовлення оператор зв'язується з Покупцем протягом 1 (одного) робочого дня та погоджує спосіб та зручний час для доставки.</p>
              <p><span className="font-medium">5.2.</span> Доставка Товару здійснюється у строк від 1 до 7 робочих днів від дня надходження SMS-повідомлення про підтвердження Товару залежно від перевізника, наявності Товару на складі та місцезнаходження Покупця.</p>
              
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Самовивіз</div>
                  <p className="text-xs">Зі складу Продавця в робочі години</p>
                </div>
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Нова Пошта</div>
                  <p className="text-xs">По всій Україні</p>
                </div>
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Кур'єр</div>
                  <p className="text-xs">Київ та Київська область</p>
                </div>
              </div>

              <div className="p-4 border-2 border-stone-300 bg-stone-50 my-4">
                <p className="font-medium mb-2">Умови безкоштовної доставки:</p>
                <p className="text-xs mb-1">• По Києву: від 2 500 грн</p>
                <p className="text-xs">• По Україні: від 3 000 грн</p>
              </div>

              <p><span className="font-medium">5.10.</span> Право власності та ризик випадкової втрати або пошкодження Товару переходять до Покупця з моменту фактичної передачі Товару Покупцю або його уповноваженому представнику.</p>
              <p><span className="font-medium">5.11.</span> Покупець зобов'язаний перевірити упаковку і товар при його отриманні і в разі наявності зовнішніх пошкоджень зафіксувати їх при отриманні.</p>
            </div>
          </div>

          {/* Section 8 - Returns */}
          <div id="section-8" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">08</span>
              <h2 className="text-3xl font-light">Обмін або повернення товару</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">8.1.</span> Обмін або повернення товару здійснюється за попереднім погодженням з Продавцем. Для ініціювання обміну або повернення Покупець подає письмову заяву на e-mail або усну заявку оператору за телефоном із зазначенням номера замовлення та причини повернення.</p>
              
              <div className="p-6 border-2 border-red-300 bg-red-50 my-6">
                <h3 className="font-medium text-red-900 mb-3">Підстави для відмови у поверненні:</h3>
                <ul className="space-y-1 text-xs text-red-900">
                  <li>• Минуло понад 14 календарних днів від дати отримання Товару</li>
                  <li>• Товар був у використанні (незалежно від строку)</li>
                  <li>• Порушена цілісність упаковки виробника</li>
                  <li>• Наявні механічні пошкодження</li>
                  <li>• Відсутні супровідні документи</li>
                  <li>• Товар зіпсований внаслідок порушення умов зберігання</li>
                  <li>• Товар має індивідуально-визначені властивості</li>
                </ul>
              </div>

              <p><span className="font-medium">8.3.</span> Покупець має право повернути або обміняти Товар належної якості протягом 14 календарних днів з моменту його отримання, за умови, що Товар не використовувався, збережено його товарний вигляд, упаковку, ярлики та наявний розрахунковий документ.</p>
              <p><span className="font-medium">8.4.</span> Повернення коштів здійснюється шляхом банківського переказу на рахунок Покупця протягом 7 банківських днів з моменту отримання Товару на склад Продавця.</p>
              <p><span className="font-medium">8.7.</span> Гарантійний строк на Товари встановлюються їхніми виробниками і зазначаються на упаковці Товару як термін придатності. Гарантія поширюється виключно на Товар з дефектом, який виник з вини виробника/Продавця.</p>
            </div>
          </div>

          {/* Section 9 - Privacy */}
          <div id="section-9" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">09</span>
              <h2 className="text-3xl font-light">Конфіденційність та персональні дані</h2>
            </div>
            <div className="p-6 border-2 border-stone-900 bg-stone-50 mb-6">
              <p className="text-sm">
                Контролером персональних даних є Продавець. Обробка персональних даних здійснюється відповідно до Закону України «Про захист персональних даних».
              </p>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">9.2.</span> Категорії персональних даних: ідентифікаційні дані (ПІБ), контактні дані (телефон, email, адреса), платіжні дані, дані замовлень та історія взаємодій, технічні дані (IP-адреса, cookies).</p>
              <p><span className="font-medium">9.3.</span> Цілі обробки: оформлення та виконання замовлень, здійснення оплати, гарантійне обслуговування, попередження шахрайства, надання доступу до особистого кабінету, інформування про статус замовлення.</p>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Строки зберігання</div>
                  <p className="text-xs">Дані зберігаються протягом необхідного для досягнення цілей обробки строку або до отримання вимоги про видалення</p>
                </div>
                <div className="p-4 border-2 border-stone-200">
                  <div className="font-medium mb-2">Передача третім особам</div>
                  <p className="text-xs">Лише логістичним партнерам, банкам, IT-провайдерам для виконання договору</p>
                </div>
              </div>

              <p><span className="font-medium">9.9.</span> Права суб'єкта персональних даних: знати про наявність своїх даних, отримувати інформацію про умови доступу, вимагати доповнення або знищення даних, відкликати згоду на обробку, подавати скаргу до Уповноваженого органу.</p>
              <p><span className="font-medium">9.11.</span> Покупець має право відкликати згоду на обробку персональних даних шляхом надсилання запиту або видалення особистого кабінету.</p>
            </div>
          </div>

          {/* Section 11 - Force Majeure */}
          <div id="section-11" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">11</span>
              <h2 className="text-3xl font-light">Форс-мажор</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">11.1.</span> Сторони звільняються від відповідальності за невиконання зобов'язань, якщо воно є наслідком обставин непереборної сили: пожежі, повені, землетрусу, військових дій, зміни законодавства, блокади, страйки, блекаути тощо.</p>
              <p><span className="font-medium">11.2.</span> Якщо обставини непереборної сили тривають більше 30 календарних днів, кожна зі Сторін має право розірвати Договір в односторонньому порядку. При розірванні гроші, сплачені за Товар, повертаються Покупцю.</p>
              <p><span className="font-medium">11.3.</span> Сторона зобов'язана письмово повідомити іншу Сторону про початок і припинення дії форс-мажорних обставин не пізніше 10 календарних днів з дня їх виникнення.</p>
            </div>
          </div>

          {/* Section 12 - Other */}
          <div id="section-12" className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-stone-200">
              <span className="text-4xl font-light text-stone-300">12</span>
              <h2 className="text-3xl font-light">Інші умови</h2>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
              <p><span className="font-medium">12.1.</span> Цей Договір укладено в місті Києві і діє на території України. Цей договір регулюється законодавством України.</p>
              <p><span className="font-medium">12.2.</span> Усі спори вирішуються шляхом переговорів. Якщо сторонам не вдасться досягти згоди, спір підлягає вирішенню в судовому порядку відповідно до чинного законодавства України.</p>
              <p><span className="font-medium">12.3.</span> Продавець має право вносити зміни до цього Договору шляхом опублікування нової редакції на Сайті. Нові умови набувають чинності з моменту публікації, але не застосовуються до вже акцептованих Замовлень.</p>
              <p><span className="font-medium">12.4.</span> Строк розгляду заяв та претензій – 30 днів з моменту їхнього надходження. Претензії мають містити ПІБ заявника, паспортні дані та контактні дані. Продавець не розглядає анонімні заяви.</p>
              <p><span className="font-medium">12.6.</span> Недійсність окремих положень не тягне недійсності Договору в цілому.</p>
              <p><span className="font-medium">12.9.</span> Листування по е-мейл та SMS має юридичну силу.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t-2 border-stone-200 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-light mb-6">Є питання щодо договору?</h2>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
            Наша команда готова відповісти на будь-які питання та надати додаткову інформацію щодо умов співпраці
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contacts" className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 border-2 border-stone-900 hover:bg-white hover:text-stone-900 transition-colors">
              Зв'язатись з нами
            </a>
            <button className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 border-2 border-stone-200 hover:border-stone-900 transition-colors">
              <Download className="w-5 h-5" />
              Завантажити договір
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
