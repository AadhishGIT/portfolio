'use client';

import React, { useRef, useState, useEffect } from 'react';
import { EXPERIENCE } from '@/lib/data';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track spine scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = rect.height;

      // Start when top enters middle of viewport, end when bottom reaches middle
      const start = windowH * 0.5;
      const current = start - rect.top;
      const progress = Math.max(0, Math.min(1, current / totalH));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience & Education"
      className="site-section bg-(--paper)"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-16 rv">
          <div className="font-mono-tag mb-3">05 — Journey & Timeline</div>
          <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-neutral-950">
            Education and experience as one path.
            <span className="font-serif-accent ml-3">Evolution.</span>
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mt-3">
            Chronological progression from engineering fundamentals to technical leadership and GenAI engineering.
          </p>
        </div>

        {/* Vertical Timeline with Drawing Spine */}
        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-10">
          {/* Static Background Spine */}
          <div
            className="absolute left-2.5 sm:left-4 top-4 bottom-12 w-0.5 bg-neutral-200"
            aria-hidden="true"
          />

          {/* Active Ink Spine drawn as user scrolls */}
          <div
            className="absolute left-2.5 sm:left-4 top-4 w-0.5 bg-[#0d0d0d] transition-all duration-75 origin-top"
            style={{ height: `${scrollProgress * 95}%` }}
            aria-hidden="true"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {EXPERIENCE.map((item, index) => {
              // Calculate threshold for lighting up
              const nodeThreshold = (index + 0.4) / (EXPERIENCE.length + 1);
              const isLit = scrollProgress >= nodeThreshold;

              return (
                <div key={index} className="relative group rv" style={{ '--i': index % 4 } as React.CSSProperties}>
                  {/* Spine Node Dot */}
                  <div
                    className={`absolute -left-6 sm:-left-10 top-1.5 w-5 h-5 rounded-full border-2 transition-all duration-400 flex items-center justify-center -translate-x-2.25 sm:-translate-x-2.25 ${
                      isLit
                        ? 'bg-[#0d0d0d] border-[#0d0d0d] shadow-sm scale-110'
                        : 'bg-white border-neutral-300 scale-90'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-400 ${
                        isLit ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`clean-card p-6 sm:p-8 transition-all duration-400 ${
                      isLit ? 'bg-white shadow-md' : 'bg-white/80 opacity-80'
                    }`}
                  >
                    {/* Period & Type Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono">
                      <span className="font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                        {item.period}
                      </span>
                      <span className="text-neutral-400 uppercase tracking-wider text-[10px]">
                        {item.type === 'work' ? 'Professional Experience' : 'Higher Education'}
                      </span>
                    </div>

                    {/* Role / Degree Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-950 mt-2">
                      {item.title}
                    </h3>

                    {/* Organization & Location */}
                    <div className="text-xs font-mono text-neutral-500 mt-1 mb-4">
                      {item.organization} · {item.location}
                    </div>

                    {/* Details */}
                    <ul className="space-y-2 text-xs text-neutral-700 leading-relaxed border-t border-neutral-100 pt-4">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-neutral-400 font-mono text-[10px] mt-0.5">▪</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* End Dashed Card: 'Next — Your team?' as required */}
            <div className="relative group rv">
              {/* Dot */}
              <div className="absolute -left-6 sm:-left-10 top-6 w-5 h-5 rounded-full border-2 border-dashed border-neutral-400 bg-white -translate-x-2.25" />

              <div className="p-8 rounded-[26px] border-2 border-dashed border-neutral-300 bg-white/40 hover:bg-white/80 transition-all duration-300 text-center">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-1">
                  FUTURE DIRECTION
                </span>
                <h3 className="font-heading text-2xl font-bold text-neutral-900">
                  Next — Your team?
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
                  Ready to lead engineering squads, architect scalable microservices, and deliver resilient full-stack platforms.
                </p>
                <div className="mt-5">
                  <a href="#contact" className="btn-pill btn-primary text-xs">
                    Start a conversation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
