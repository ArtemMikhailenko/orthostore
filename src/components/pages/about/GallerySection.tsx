'use client';

import Image from 'next/image';
import { useGalleryImages } from '@/lib/api/hooks';

export function GallerySection() {
  const { data: images, isLoading } = useGalleryImages();

  // Fallback to static images if API returns nothing or is loading
  const fallbackImages = [
    { _id: 'f1', imageUrl: '/images/about/about1.jpg', altI18n: { uk: 'ORTHOSTORE офіс' }, sort: 0, isActive: true },
    { _id: 'f2', imageUrl: '/images/about/about2.jpg', altI18n: { uk: 'ORTHOSTORE команда' }, sort: 1, isActive: true },
  ];

  const displayImages = images && images.length > 0 ? images : fallbackImages;

  if (isLoading) {
    return (
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <div key={i} className="bg-white border-2 border-stone-200 rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-stone-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-stone-50 border-y border-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
        <div className={`grid gap-8 ${displayImages.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-2'}`}>
          {displayImages.map((img) => (
            <div key={img._id} className="bg-white border-2 border-stone-200 rounded-xl overflow-hidden">
              <div className="aspect-[3/4] bg-stone-100 relative">
                <Image
                  src={img.imageUrl}
                  alt={img.altI18n?.uk || 'ORTHOSTORE'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
