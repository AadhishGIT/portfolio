'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

// Letter hop component
const HoppingText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <span className={`inline-block select-none ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
          style={{ willChange: 'transform' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export const ContactSection: React.FC = () => {
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" aria-label="Contact & Footer" className="bg-white border-t border-(--line) pt-24 pb-12 relative overflow-hidden">
      <div className="site-container">
        {/* Top Tag */}
        <div className="font-mono-tag mb-4 rv">07 — Get In Touch</div>

        {/* Huge Heading with letter hop (translateY bounce on hover) */}
        <div className="mb-14 rv" style={{ '--i': 1 } as React.CSSProperties}>
          <h2 className="font-heading text-[clamp(2.75rem,7vw,6.5rem)] font-bold tracking-tight text-neutral-950 leading-[0.95]">
            <HoppingText text="Let's build" />
            <br />
            <span className="text-neutral-400">
              <HoppingText text="something together." />
            </span>
          </h2>
        </div>

        {/* Contact Links & Circular Spinning Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center pb-20 border-b border-neutral-200 rv" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="space-y-6">
            {/* Email link with Copy Chip & aria-live */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 underline decoration-neutral-300 underline-offset-8 hover:decoration-neutral-900 transition-colors"
              >
                {PROFILE.email}
              </a>

              <button
                onClick={handleCopyEmail}
                aria-live="polite"
                aria-label="Copy email address"
                className="px-3.5 py-1.5 rounded-full border border-neutral-300 font-mono text-xs text-neutral-700 hover:bg-[#0d0d0d] hover:text-white hover:border-[#0d0d0d] transition-all cursor-pointer shadow-2xs"
              >
                {copied ? 'Copied ✓' : 'Copy email'}
              </button>
            </div>

            {/* Phone & Social Links from Résumé */}
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-neutral-600">
              <a
                href={PROFILE.phoneHref}
                className="hover:text-neutral-950 transition-colors underline underline-offset-4 decoration-neutral-300"
              >
                {PROFILE.phone}
              </a>
              <span>·</span>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 transition-colors underline underline-offset-4 decoration-neutral-300"
              >
                GitHub ↗
              </a>
              <span>·</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 transition-colors underline underline-offset-4 decoration-neutral-300"
              >
                LinkedIn ↗
              </a>
              <span>·</span>
              <span className="text-neutral-400">{PROFILE.location}</span>
            </div>
          </div>

          {/* Circular Spinning 'SAY HELLO' Badge */}
          <div className="relative w-36 h-36 flex items-center justify-center mx-auto lg:mx-0">
            <svg
              className="w-full h-full animate-[spin_18s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="font-mono text-[9px] uppercase tracking-[0.24em] fill-neutral-600">
                <textPath xlinkHref="#circlePath">
                  · SAY HELLO · GET IN TOUCH · COLLABORATE
                </textPath>
              </text>
            </svg>
            <div className="absolute w-12 h-12 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-xs shadow-md">
              AD
            </div>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div>
            © {currentYear} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js & Lenis</span>
            <button
              onClick={() => scrollTo(0)}
              className="text-neutral-700 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
