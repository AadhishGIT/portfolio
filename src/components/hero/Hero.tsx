'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';
import { siteAsset } from '@/lib/site-config';

export const Hero: React.FC = () => {
  const { scrollTo } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Video autoplay & sound management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Initial attempt: try playing unmuted
    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video is playing muted initially
          // If browser allows unmuted audio, we can try, but standard browsers block sound autoplay
          setAutoplayBlocked(true);
        })
        .catch(() => {
          // Play was completely blocked; retry muted
          video.muted = true;
          video.play().catch(() => {});
          setAutoplayBlocked(true);
        });
    }

    // 2. Unlock sound on visitor's first interaction
    const unlockSound = () => {
      if (videoRef.current && videoRef.current.muted) {
        // Try unmuting if user hasn't explicitly muted
        videoRef.current.muted = false;
        videoRef.current.play().then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
        }).catch(() => {
          // Keep muted if blocked
          videoRef.current!.muted = true;
        });
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchend', unlockSound, { once: true });

    // 3. Pause video when less than 35% visible, resume when back
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.intersectionRatio < 0.35) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      },
      {
        threshold: [0, 0.35, 1.0]
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      cleanupListeners();
      observer.disconnect();
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = 1;
      video.play().then(() => {
        setIsPlayingSound(true);
        setAutoplayBlocked(false);
      }).catch(() => {});
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-svh w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* 1. Giant Outlined Ghost Word behind the person (First Name in Uppercase) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full text-center"
        aria-hidden="true"
      >
        <span
          className="font-heading font-black text-[clamp(90px,20vw,310px)] tracking-tighter leading-none block uppercase"
          style={{
            WebkitTextStroke: '1.5px rgba(13, 13, 13, 0.1)',
            color: 'transparent'
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* 2. Central Video Layer blended into the page background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative h-[min(62svh,640px)] md:h-[min(94svh,1020px)] aspect-768/960 flex items-center justify-center">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-auto mix-blend-multiply"
          >
            <source src={siteAsset('/hero/hero.webm')} type="video/webm" />
            <source src={siteAsset('/hero/hero.mp4')} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* 3. Floating Sound Control: 46px Solid Ink button with ping ring when blocked */}
      <div className="absolute top-28 right-(--gutter) z-30">
        <div className="relative">
          {autoplayBlocked && !isPlayingSound && (
            <span
              className="absolute -inset-1 rounded-full bg-neutral-900/20 animate-ping pointer-events-none"
              aria-hidden="true"
            />
          )}
          <button
            onClick={toggleSound}
            aria-label={isPlayingSound ? 'Mute video audio' : 'Unmute video audio'}
            className="relative w-11.5 h-11.5 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ease-(--ease) cursor-pointer"
          >
            {isPlayingSound ? (
              // ❚❚ Two bars icon
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // ▶ Triangle icon
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 4. Foreground Content: Heading & CTAs */}
      <div className="site-container relative z-20 flex flex-col justify-between h-full flex-1 pointer-events-none">
        {/* Top Tag */}
        <div className="pt-4">
          <span className="font-mono-tag inline-block py-1 px-3 rounded-full bg-white/70 border border-neutral-300/60 backdrop-blur-sm pointer-events-auto shadow-xs">
            00 — {PROFILE.location} · 8+ YRS EXP
          </span>
        </div>

        {/* Bottom Heading & Action Buttons */}
        <div className="mt-auto pt-16">
          <div className="max-w-3xl pointer-events-auto">
            <h1 className="text-[clamp(0rem,2vw,3rem)] text-neutral-950 font-bold leading-[0.98] mb-6">
              {PROFILE.shortRole}
            </h1>

            <p className="text-neutral-600 text-[clamp(1rem,1.4vw,1.25rem)] max-w-xl font-normal leading-relaxed mb-8">
              Lead Software Engineer with 8+ years crafting secure, scalable enterprise architectures, micro-frontends, and AI-powered systems.
            </p>

            {/* CTAs: Explore work and Let's talk */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('#work')}
                className="btn-pill btn-primary"
              >
                Explore work
                <span className="text-xs">→</span>
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="btn-pill btn-secondary"
              >
                Let&apos;s talk
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
