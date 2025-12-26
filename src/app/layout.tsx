import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header/header';
import { FooterSection } from '@/components/layout/footer/footer';
import { AIChatWidget } from '@/components/ai-chat/ai-chat-widget';
import Providers from './providers';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'OrthoDent Pro - Профессиональное ортодонтическое оборудование',
  description: 'Широкий ассортимент высококачественных брекет-систем, ортодонтических инструментов и современного оборудования для стоматологических клиник.',
  keywords: 'ортодонтия, брекеты, стоматологическое оборудование, ортодонтические инструменты, металлические брекеты, сапфировые брекеты',
  authors: [{ name: 'OrthoDent Pro Team' }],
  openGraph: {
    title: 'OrthoDent Pro - Профессиональное ортодонтическое оборудование',
    description: 'Качественные брекет-системы и оборудование для ортодонтии',
    url: 'https://orthodent.pro',
    siteName: 'OrthoDent Pro',
    locale: 'uk_UA',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Умный хедер */}
        <Header />
        
        {/* Основной контент */}
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
        
        {/* AI Chat Widget */}
        <AIChatWidget />
        
        <FooterSection/>
        {/* Дополнительные скрипты */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Определение темной темы системы
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            `,
          }}
        />
      </body>
    </html>
  );
}