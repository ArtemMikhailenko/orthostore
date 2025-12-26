'use client';

import React from 'react';
import Lottie from 'lottie-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

export function Loader({ size = 'md', className, text }: LoaderProps) {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Завантажуємо анімацію
    fetch('/tooth-animation.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  if (!animationData) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
        <div className={cn('animate-spin rounded-full border-4 border-stone-200 border-t-stone-900', sizeClasses[size])} />
        {text && <p className="text-stone-600 text-sm font-medium">{text}</p>}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className={cn(sizeClasses[size])}>
        <Lottie 
          animationData={animationData} 
          loop={true}
          autoplay={true}
        />
      </div>
      {text && <p className="text-stone-600 text-sm font-medium">{text}</p>}
    </div>
  );
}

// Full-screen loader overlay
export function LoaderOverlay({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loader size="xl" text={text} />
    </div>
  );
}

// Page loader
export function PageLoader({ text = "Завантаження..." }: { text?: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  );
}
