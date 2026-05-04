import { Truck, CreditCard, Package, MapPin, Clock, RefreshCw, ShieldCheck } from 'lucide-react';
import { getPageContent } from '@/lib/api/public';

export default async function DeliveryPage() {
  const data = await getPageContent('delivery').catch(() => ({} as Record<string, unknown>));

  const heroTitle = (data.heroTitle as string) ?? 'Доставка та оплата';
  const heroSubtitle = (data.heroSubtitle as string) ?? '';
  const managerNote = (data.managerNote as string) ?? '';
  const kyivTitle = (data.kyivTitle as string) ?? 'Доставка по Києву та Київській області';
  const kyivHours = (data.kyivHours as string) ?? '';
  const kyivItems = (data.kyivItems as string[]) ?? [];
  const ukraineTitle = (data.ukraineTitle as string) ?? 'Відправлення по Україні';
  const ukraineItems = (data.ukraineItems as string[]) ?? [];
  const shippingNote = (data.shippingNote as string) ?? '';
  const minOrder = (data.minOrder as string) ?? '';
  const paymentIntro = (data.paymentIntro as string) ?? '';
  const paymentMethods = (data.paymentMethods as string[]) ?? [];
  const returnItems = (data.returnItems as string[]) ?? [];
  const defectSteps = (data.defectSteps as string[]) ?? [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 rounded-xl mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-stone-900">{heroTitle}</h1>
            {heroSubtitle && (
              <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                {heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-20">

        {/* Delivery Information */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-6 h-6 text-stone-900" />
            <h2 className="text-2xl lg:text-3xl font-light text-stone-900">Доставка</h2>
          </div>

          <div className="space-y-8">
            {/* Manager Note */}
            {managerNote && (
              <div className="bg-stone-50 p-6 lg:p-8 rounded-lg border-l-4 border-stone-900">
                <p className="text-base lg:text-lg text-stone-700 leading-relaxed">{managerNote}</p>
              </div>
            )}

            {/* Kyiv Delivery */}
            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="w-5 h-5 text-stone-900 flex-shrink-0 mt-1" />
                <div className="space-y-3 w-full">
                  <h3 className="text-xl font-medium text-stone-900">{kyivTitle}</h3>
                  {kyivHours && (
                    <div className="flex items-center gap-2 text-stone-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{kyivHours}</span>
                    </div>
                  )}
                  {kyivItems.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-stone-200">
                      {kyivItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-stone-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ukraine Delivery */}
            <div className="bg-white border-2 border-stone-200 p-6 lg:p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-stone-900 flex-shrink-0 mt-1" />
                <div className="space-y-3 w-full">
                  <h3 className="text-xl font-medium text-stone-900">{ukraineTitle}</h3>
                  {ukraineItems.length > 0 && (
                    <div className="space-y-2">
                      {ukraineItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-stone-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Terms */}
            {(shippingNote || minOrder) && (
              <div className="bg-stone-900 text-white p-6 lg:p-8 rounded-lg">
                <div className="space-y-3">
                  {shippingNote && (
                    <p className="text-stone-200 leading-relaxed">{shippingNote}</p>
                  )}
                  {minOrder && (
                    <p className="text-white font-medium pt-2 border-t border-stone-700">{minOrder}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        {(paymentIntro || paymentMethods.length > 0) && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="w-6 h-6 text-stone-900" />
              <h2 className="text-2xl lg:text-3xl font-light text-stone-900">Варіанти оплати</h2>
            </div>
            <div className="bg-stone-50 p-6 lg:p-8 rounded-lg">
              {paymentIntro && (
                <p className="text-lg text-stone-700 mb-6">{paymentIntro}</p>
              )}
              <div className="space-y-4">
                {paymentMethods.map((method, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-lg">
                    <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">{i + 1}</span>
                    </div>
                    <p className="text-stone-900 font-medium">{method}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Return & Exchange */}
        {(returnItems.length > 0 || defectSteps.length > 0) && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <RefreshCw className="w-6 h-6 text-stone-900" />
              <h2 className="text-2xl lg:text-3xl font-light text-stone-900">Повернення та обмін</h2>
            </div>
            <div className="space-y-6">
              {returnItems.map((item, i) => (
                <div key={i} className="bg-white border-2 border-stone-200 p-6 lg:p-8 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-stone-700">{item}</p>
                  </div>
                </div>
              ))}
              {defectSteps.length > 0 && (
                <div className="bg-stone-900 text-white p-6 lg:p-8 rounded-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-6 h-6" />
                    <h3 className="text-xl font-medium">Заміна товару з браком</h3>
                  </div>
                  <ol className="space-y-4">
                    {defectSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-lg font-bold text-stone-400 shrink-0">{i + 1}.</span>
                        <span className="text-stone-200">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
