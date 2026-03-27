'use client';

import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'orthostore_splash_seen';

/** Encode an AudioBuffer as a WAV Blob */
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const ch = buffer.getChannelData(0);
  const sr = buffer.sampleRate;
  const dataSize = ch.length * 2;
  const buf = new ArrayBuffer(44 + dataSize);
  const v = new DataView(buf);
  const w = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + dataSize, true); w(8, 'WAVE');
  w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, dataSize, true);
  let off = 44;
  for (let i = 0; i < ch.length; i++, off += 2) {
    const s = Math.max(-1, Math.min(1, ch[i]));
    v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return new Blob([buf], { type: 'audio/wav' });
}

/**
 * Pre-render the cinematic chime to WAV via OfflineAudioContext,
 * then try autoplay. If blocked — play on first user interaction anywhere.
 */
async function tryAutoplayChime() {
  try {
    const sampleRate = 44100;
    const dur = 2.0;
    const ctx = new OfflineAudioContext(1, sampleRate * dur, sampleRate);
    const now = 0;

    const master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);

    // 1. Low rumble sweep
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
    sub.start(now); sub.stop(now + 1.3);

    // 2. Noise whoosh
    const noiseBuf = ctx.createBuffer(1, sampleRate * 1.5, sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(400, now);
    bp.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
    bp.frequency.exponentialRampToValueAtTime(800, now + 1.2);
    bp.Q.value = 1.5;
    const ne = ctx.createGain();
    ne.gain.setValueAtTime(0, now);
    ne.gain.linearRampToValueAtTime(0.12, now + 0.15);
    ne.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    noise.connect(bp).connect(ne).connect(master);
    noise.start(now); noise.stop(now + 1.3);

    // 3. Sparkle shimmer
    for (const s of [
      { freq: 1318.5, start: 0.25, dur: 0.6 },
      { freq: 1760, start: 0.35, dur: 0.5 },
      { freq: 2093, start: 0.45, dur: 0.55 },
      { freq: 2637, start: 0.55, dur: 0.5 },
    ]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = s.freq;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now + s.start);
      env.gain.linearRampToValueAtTime(0.08, now + s.start + 0.03);
      env.gain.exponentialRampToValueAtTime(0.001, now + s.start + s.dur);
      osc.connect(env).connect(master);
      osc.start(now + s.start); osc.stop(now + s.start + s.dur + 0.05);
    }

    // 4. Warm chord
    for (const c of [
      { freq: 523.25, start: 0.7, dur: 1.0 },
      { freq: 659.25, start: 0.7, dur: 1.0 },
      { freq: 783.99, start: 0.7, dur: 1.0 },
    ]) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = c.freq;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now + c.start);
      env.gain.linearRampToValueAtTime(0.1, now + c.start + 0.08);
      env.gain.exponentialRampToValueAtTime(0.001, now + c.start + c.dur);
      osc.connect(env).connect(master);
      osc.start(now + c.start); osc.stop(now + c.start + c.dur + 0.05);
    }

    const rendered = await ctx.startRendering();
    const wavBlob = audioBufferToWav(rendered);
    const url = URL.createObjectURL(wavBlob);

    // Try autoplay immediately
    const audio = new Audio(url);
    audio.volume = 1;
    const p = audio.play();
    if (p) {
      p.catch(() => {
        // Browser blocked — play on first click/touch anywhere (e.g. "Пропустити" button)
        const unlock = () => {
          audio.play().catch(() => {});
          document.removeEventListener('click', unlock, true);
          document.removeEventListener('touchstart', unlock, true);
        };
        document.addEventListener('click', unlock, true);
        document.addEventListener('touchstart', unlock, true);
      });
    }
  } catch {
    // Silent fallback
  }
}

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';
    tryAutoplayChime();
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

        <button
          onClick={(e) => { e.stopPropagation(); handleSkip(); }}
          className="absolute bottom-8 right-8 px-6 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors border border-white/30 rounded-lg"
        >
          Пропустити
        </button>
      </div>

      <div className="opacity-0 pointer-events-none" aria-hidden>
        {children}
      </div>
    </>
  );
}
