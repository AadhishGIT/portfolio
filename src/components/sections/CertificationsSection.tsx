'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/lib/data';

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="bg-white border-y border-(--line) py-20 md:py-28 relative"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-32 rv">
            <div className="font-mono-tag mb-3">04 — Certifications</div>
            <h2 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] tracking-tight text-neutral-950">
              Always learning.
              <span className="font-serif-accent ml-3">Verified.</span>
            </h2>
            <div className="mt-4 font-mono text-xs text-neutral-500">
              0{CERTIFICATIONS.length} ACCREDITATIONS FROM INDUSTRY LEADERS
            </div>
          </div>

          {/* Right: Numbered List with Ink-Flood Hover (scaleX 0 -> 1 on ::before) */}
          <div className="divide-y divide-neutral-200 border-y border-neutral-200 rv" style={{ '--i': 1 } as React.CSSProperties}>
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-6 sm:p-8 transition-colors duration-400 overflow-hidden text-neutral-900 focus-visible:outline-none"
              >
                {/* Ink Flood Background Layer: floods from left to right on hover/focus */}
                <span
                  className="absolute inset-0 bg-[#0d0d0d] z-0 origin-left scale-x-0 transition-transform duration-500 ease-(--ease) group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  aria-hidden="true"
                />

                {/* Content: Number + Title & Issuer */}
                <div className="relative z-10 flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-sm text-neutral-400 group-hover:text-neutral-400 transition-colors">
                    {cert.index}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold tracking-tight group-hover:text-white transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 mt-1">
                      {cert.issuer} {cert.date ? `· ${cert.date}` : ''}
                    </p>
                  </div>
                </div>

                {/* Sliding Arrow ↗ */}
                <div className="relative z-10 flex items-center">
                  <span className="font-mono text-xl sm:text-2xl text-neutral-400 group-hover:text-white transition-all duration-300 transform translate-x-1 group-hover:translate-x-0 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
