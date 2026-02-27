'use client';

import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'orthostore_splash_seen';

function isSeen(): boolean {
  if (typeof window === 'undefined') return false;
  try { return !!sessionStorage.getItem(STORAGE_KEY); } catch { return false; }
}

export function SplashScreen({ children }: { children: React.ReactNode }) {
  // Start with splash visible — prevents flash of content
  const [show, setShow] = useState(() => !isSeen());
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  const handleEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(STORAGE_KEY, '1');
      document.body.style.overflow = '';
    }, 600);
  };

  const handleSkip = () => {
    if (videoRef.current) videoRef.current.pause();
    handleEnd();
  };

  if (!show) return <>{children}</>;

  return (
    <>
      {/* Splash overlay */}
      <div
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleSkip}
        style={{ cursor: 'pointer' }}
      >
        <video
          ref={videoRef}
          src="/video/orthostore.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleEnd}
          className="w-full h-full object-cover"
        />

        {/* Skip button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleSkip(); }}
          className="absolute bottom-8 right-8 px-6 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors border border-white/30 rounded-lg"
        >
          Пропустити
        </button>
      </div>

      {/* Content hidden behind splash */}
      <div className="opacity-0 pointer-events-none" aria-hidden>
        {children}
      </div>
    </>
  );
}
