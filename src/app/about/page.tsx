import { GallerySection } from '@/components/pages/about/GallerySection';
import { getPageContent } from '@/lib/api/public';

type Segment = { number: string; title: string; desc: string };

export default async function AboutPage() {
  const data = await getPageContent('about').catch(() => ({} as Record<string, unknown>));

  const heroTitle = (data.heroTitle as string) ?? 'ORTHOSTORE – ВСЕ ДЛЯ СУЧАСНОЇ ОРТОДОНТІЇ';
  const heroSubtitle =
    (data.heroSubtitle as string) ??
    'Ваш надійний партнер у сфері ортодонтичної продукції з 2015 року';
  const story = (data.story as string[]) ?? [];
  const pricingIntro = (data.pricingIntro as string) ?? '';
  const segments = (data.segments as Segment[]) ?? [];
  const ctaTitle = (data.ctaTitle as string) ?? 'З нами зручно, легко та швидко!';
  const ctaSubtitle =
    (data.ctaSubtitle as string) ?? 'Щиро дякуємо за довіру до ORTHOSTORE!';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-3xl lg:text-5xl font-light text-stone-900">{heroTitle}</h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      {story.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-12">
            <div className="space-y-6 text-base lg:text-lg text-stone-700 leading-relaxed">
              {story.map((para, i) => (
                <p key={i} className={i === 0 ? 'text-xl lg:text-2xl font-light text-stone-900' : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery Section */}
      <GallerySection />

      {/* Pricing Philosophy Section */}
      {(pricingIntro || segments.length > 0) && (
        <section className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-12">
            {pricingIntro && (
              <div className="space-y-6 text-base lg:text-lg text-stone-700 leading-relaxed">
                <p>{pricingIntro}</p>
              </div>
            )}

            {segments.length > 0 && (
              <div className="space-y-6">
                {segments.map((seg, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 border-2 border-stone-200 rounded-xl transition-all duration-300 hover:border-sky-300/50 hover:shadow-[0_0_12px_rgba(56,189,248,0.5),0_0_30px_rgba(56,189,248,0.2)]"
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-5xl font-light text-stone-400">{seg.number}</span>
                      <div className="space-y-2">
                        <h3 className="text-xl font-medium text-stone-900">{seg.title}</h3>
                        <p className="text-stone-600 leading-relaxed">{seg.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-stone-100">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-light text-stone-900">{ctaTitle}</h2>
            <p className="text-xl text-stone-600 font-medium">{ctaSubtitle}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

