'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'orthostore_splash_seen';

/** Plays a short elegant chime via Web Audio API */
function playChime() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Two-note chime: C5 → E5
    const notes = [
      { freq: 523.25, start: 0, dur: 0.4 },
      { freq: 659.25, start: 0.15, dur: 0.5 },
    ];

    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    for (const n of notes) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = n.freq;

      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now + n.start);
      env.gain.linearRampToValueAtTime(1, now + n.start + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

      osc.connect(env).connect(master);
      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur);
    }

    // Clean up after sound ends
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // AudioContext not available — silent fallback
  }
}

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play chime on first user interaction (needed for browser autoplay policy)
  const triggerSound = useCallback(() => {
    if (soundPlayed) return;
    setSoundPlayed(true);
    playChime();
    // Also try to unmute the video in case it has its own audio
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  }, [soundPlayed]);

  // Check if splash was already seen after mount
  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setShow(true);
      }
    } catch {
      // If sessionStorage fails, don't show splash
    }
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      // Listen for any interaction to unlock audio
      const handler = () => triggerSound();
      document.addEventListener('pointerdown', handler, { once: true });
      document.addEventListener('keydown', handler, { once: true });
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('pointerdown', handler);
        document.removeEventListener('keydown', handler);
      };
    }
    return () => { document.body.style.overflow = ''; };
  }, [show, triggerSound]);

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
        onClick={() => { triggerSound(); handleSkip(); }}
        onPointerDown={triggerSound}
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
