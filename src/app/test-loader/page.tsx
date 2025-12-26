'use client';

import React from 'react';
import { Loader, LoaderOverlay, PageLoader } from '@/components/ui/loader';

export default function LoaderTestPage() {
  const [showOverlay, setShowOverlay] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {showOverlay && <LoaderOverlay text="Обробка запиту..." />}
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-light text-stone-900 mb-12">
          Тестування Loader компонента
        </h1>

        {/* Different sizes */}
        <section className="mb-16">
          <h2 className="text-2xl font-light text-stone-900 mb-8">Різні розміри</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-stone-50 p-8 rounded-lg">
              <h3 className="text-sm font-medium text-stone-600 mb-4 text-center">Small</h3>
              <Loader size="sm" />
            </div>
            <div className="bg-stone-50 p-8 rounded-lg">
              <h3 className="text-sm font-medium text-stone-600 mb-4 text-center">Medium</h3>
              <Loader size="md" />
            </div>
            <div className="bg-stone-50 p-8 rounded-lg">
              <h3 className="text-sm font-medium text-stone-600 mb-4 text-center">Large</h3>
              <Loader size="lg" />
            </div>
            <div className="bg-stone-50 p-8 rounded-lg">
              <h3 className="text-sm font-medium text-stone-600 mb-4 text-center">Extra Large</h3>
              <Loader size="xl" />
            </div>
          </div>
        </section>

        {/* With text */}
        <section className="mb-16">
          <h2 className="text-2xl font-light text-stone-900 mb-8">З текстом</h2>
          <div className="bg-stone-50 p-12 rounded-lg">
            <Loader size="lg" text="Завантаження даних..." />
          </div>
        </section>

        {/* Page Loader */}
        <section className="mb-16">
          <h2 className="text-2xl font-light text-stone-900 mb-8">Page Loader</h2>
          <div className="bg-stone-50 rounded-lg">
            <PageLoader text="Завантаження сторінки..." />
          </div>
        </section>

        {/* Overlay trigger */}
        <section>
          <h2 className="text-2xl font-light text-stone-900 mb-8">Overlay Loader</h2>
          <button
            onClick={() => {
              setShowOverlay(true);
              setTimeout(() => setShowOverlay(false), 3000);
            }}
            className="bg-stone-900 text-white px-8 py-3 font-medium hover:bg-stone-800 transition-all"
          >
            Показати Overlay (3 секунди)
          </button>
        </section>
      </div>
    </div>
  );
}
