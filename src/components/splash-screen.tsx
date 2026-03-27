'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'orthostore_splash_seen';

/** Cinematic "reveal" whoosh + shimmer sound */
function playChime() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);

    // 1. Low rumble sweep (sub-bass whoosh rising)
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(60, now);
    sub.frequency.exponentialRampToValueAtTime(200, now + 0.6);
    sub.frequency.exponentialRampToValueAtTime(80, now + 1.2);
    const subEnv = ctx.createGain();
    subEnv.gain.setValueAtTime(0, now);
    subEnv.gain.linearRampToValueAtTime(0.35, now + 0.3);
    subEnv.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    sub.connect(subEnv).connect(master);
    sub.start(now);
    sub.stop(now + 1.3);

    // 2. Filtered noise burst (whoosh / air)
    const bufLen = ctx.sampleRate * 1.5;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) noiseData[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(400, now);
    bandpass.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
    bandpass.frequency.exponentialRampToValueAtTime(800, now + 1.2);
    bandpass.Q.value = 1.5;
    const noiseEnv = ctx.createGain();
    noiseEnv.gain.setValueAtTime(0, now);
    noiseEnv.gain.linearRampToValueAtTime(0.12, now + 0.15);
    noiseEnv.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    noise.connect(bandpass).connect(noiseEnv).connect(master);
    noise.start(now);
    noise.stop(now + 1.3);

    // 3. Sparkle / shimmer hits (bright tones appearing)
    const sparkles = [
      { freq: 1318.5, start: 0.25, dur: 0.6 },  // E6
      { freq: 1760,   start: 0.35, dur: 0.5 },   // A6
      { freq: 2093,   start: 0.45, dur: 0.55 },   // C7
      { freq: 2637,   start: 0.55, dur: 0.5 },   // E7
    ];
    for (const s of sparkles) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = s.freq;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now + s.start);
      env.gain.linearRampToValueAtTime(0.08, now + s.start + 0.03);
      env.gain.exponentialRampToValueAtTime(0.001, now + s.start + s.dur);
      osc.connect(env).connect(master);
      osc.start(now + s.start);
      osc.stop(now + s.start + s.dur + 0.05);
    }

    // 4. Final resolving tone (warm chord landing)
    const chord = [
      { freq: 523.25, start: 0.7, dur: 1.0 },  // C5
      { freq: 659.25, start: 0.7, dur: 1.0 },  // E5
      { freq: 783.99, start: 0.7, dur: 1.0 },  // G5
    ];
    for (const c of chord) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = c.freq;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now + c.start);
      env.gain.linearRampToValueAtTime(0.1, now + c.start + 0.08);
      env.gain.exponentialRampToValueAtTime(0.001, now + c.start + c.dur);
      osc.connect(env).connect(master);
      osc.start(now + c.start);
      osc.stop(now + c.start + c.dur + 0.05);
    }

    setTimeout(() => ctx.close(), 2500);
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
