'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '@/lib/data';
import { TechLogo, getLogoMeta } from '@/components/ui/TechLogo';

// easeOutQuart counter hook
function useCountUp(target: number, decimals: number = 0, trigger: boolean) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const duration = 1400; // 1.4s as specified

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const current = easeOutQuart(progress) * target;
      setVal(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    requestAnimationFrame(step);
  }, [target, trigger]);

  if (decimals > 0) {
    return val.toFixed(decimals);
  }
  return Math.floor(val).toString();
}

interface AchievementCardProps {
  item: AchievementItem;
  isActive: boolean;
  hasTriggered: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ item, isActive, hasTriggered }) => {
  const meta = getLogoMeta(item.logoKey);
  const countText = useCountUp(item.number, item.decimals || 0, hasTriggered);

  return (
    <div
      className={`relative shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] bg-white rounded-[28px] p-7 flex flex-col justify-between transition-all duration-500 ease-(--ease) ${
        isActive
          ? '-translate-y-3 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.12)] ring-1 ring-neutral-200'
          : 'shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] ring-1 ring-neutral-100'
      }`}
      style={{
        boxShadow: isActive
          ? `0 24px 50px -15px ${meta.glow}, 0 10px 25px -10px rgba(0,0,0,0.06)`
          : undefined
      }}
    >
      {/* Top: 72px Logo Tile with Soft Brand Glow + Index */}
      <div className="flex items-center justify-between">
        <div
          className="w-18 h-18 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-3.5 transition-all duration-300"
          style={{
            boxShadow: `0 0 24px ${meta.glow}`
          }}
        >
          <TechLogo name={item.logoKey} size={44} glow />
        </div>

        <span className="font-mono text-xs font-semibold text-neutral-400">
          {item.index} / {item.total}
        </span>
      </div>

      {/* Bottom: Left Info + Right Huge Counter Number */}
      <div className="flex items-end justify-between gap-4 pt-4 border-t border-neutral-100">
        <div className="max-w-[65%]">
          <div className="font-heading text-lg sm:text-xl font-bold text-neutral-950 leading-tight">
            {item.label}
          </div>
          <div className="font-mono text-xs text-neutral-500 mt-1">
            {item.caption}
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5 truncate">
            {item.detail}
          </div>
        </div>

        {/* Huge Counter Number */}
        <div className="font-heading font-black text-[clamp(2.5rem,5.5vw,4.25rem)] text-neutral-900 leading-none tracking-tight text-right select-none">
          {item.prefix || ''}
          {countText}
          {item.suffix || ''}
        </div>
      </div>
    </div>
  );
};

export const AchievementsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTrackOffset, setMaxTrackOffset] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const p = Math.max(0, Math.min(1, current / totalScrollable));
      setScrollProgress(p);

      const track = trackRef.current;
      if (track) {
        setMaxTrackOffset(Math.max(0, track.scrollWidth - track.clientWidth));
      }

      if (p > 0.05 && !hasTriggered) {
        setHasTriggered(true);
      }

      // Calculate which card is closest to viewport center
      const index = Math.min(
        ACHIEVEMENTS.length - 1,
        Math.max(0, Math.round(p * (ACHIEVEMENTS.length - 1)))
      );
      setActiveCardIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [hasTriggered]);

  return (
    <section
      ref={containerRef}
      id="achievements"
      aria-label="Achievements"
      className="relative bg-(--paper)"
      style={{
        // Viewport height + horizontal travel distance (approx 280vh total height)
        height: '320vh'
      }}
    >
      {/* Pinned Viewport Container (sticky at top: 0, height: 100svh) */}
      <div className="sticky top-0 h-svh w-full flex flex-col justify-between py-10 overflow-hidden">
        {/* Header with Title and Progress Bar */}
        <div className="site-container w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="font-mono-tag mb-1">06 — Verified Metrics</div>
              <h2 className="font-heading text-[clamp(2rem,3.8vw,3.25rem)] tracking-tight text-neutral-950">
                Metrics that speak.
                <span className="font-serif-accent ml-3">Impact.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-neutral-500">
              HORIZONTAL SCROLL · {Math.round(scrollProgress * 100)}%
            </div>
          </div>

          {/* Thin Progress Bar in Header */}
          <div className="w-full h-0.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d0d0d] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full my-auto overflow-visible">
          <div
            ref={trackRef}
            className="flex items-center gap-6 pl-(--gutter) transition-transform duration-100 ease-out"
            style={{
              transform: `translateX(-${scrollProgress * maxTrackOffset}px)`
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => (
              <AchievementCard
                key={item.index}
                item={item}
                isActive={activeCardIndex === idx}
                hasTriggered={hasTriggered}
              />
            ))}

            {/* Ending Card: 'and counting →' */}
            <div className="shrink-0 w-[clamp(240px,28vw,360px)] h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-neutral-300 p-8 flex flex-col items-center justify-center text-center text-neutral-500 mr-(--gutter)">
              <span className="font-heading text-2xl font-bold text-neutral-800">
                and counting →
              </span>
              <p className="font-mono text-xs text-neutral-400 mt-2">
                Delivering high-throughput engineering excellence every sprint.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="site-container w-full text-right">
          <span className="font-mono text-[11px] text-neutral-400">
            Source: Verifiable production milestones in attached résumé
          </span>
        </div>
      </div>
    </section>
  );
};
