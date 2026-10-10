'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NAV, PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export const Navigation: React.FC = () => {
  const { scrollTo } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure scroll progress and scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 40);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open & handle Esc key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(`#${id}`, { offset: -40, duration: 1.1 });
  };

  return (
    <>
      {/* 2px Ink Scroll-Progress Bar along the very top */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[#0d0d0d] z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* Main Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-(--ease) ${
          hasScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo(0)}
              aria-label="Back to top"
              className={`group relative w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 ease-(--ease) cursor-pointer ${
                hasScrolled
                  ? 'bg-[#0d0d0d] text-white border border-[#0d0d0d] shadow-sm'
                  : 'bg-transparent text-[#0d0d0d] border border-[#0d0d0d]/30'
              }`}
            >
              <span className="inline-block transition-transform duration-700 ease-(--ease) group-hover:rotate-360">
                {PROFILE.initials}
              </span>
            </button>

            {/* Full Name fades out after scrolling 40px */}
            <div
              className={`transition-opacity duration-300 ease-(--ease) hidden sm:block ${
                hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <span className="font-heading font-bold text-sm tracking-tight text-neutral-900 block">
                {PROFILE.name}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono block -mt-0.5">
                {PROFILE.shortRole}
              </span>
            </div>
          </div>

          {/* Desktop Nav Pill with Frosted Blur and Sliding Ink Indicator */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center p-1.5 rounded-full transition-all duration-400 ease-(--ease) ${
              hasScrolled
                ? 'bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)]'
                : 'bg-white/50 border border-neutral-200/40 backdrop-blur-sm'
            }`}
          >
            <ul className="flex items-center gap-1 relative">
              {NAV.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 inline-block focus-visible:outline-none ${
                        isActive ? 'text-white font-semibold' : 'text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      {item.label}
                    </a>
                    {/* Solid ink indicator pill sliding under active link */}
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-[#0d0d0d] rounded-full z-0 transition-all duration-300 ease-(--ease) shadow-sm"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="px-4 py-2 rounded-full bg-white/90 border border-neutral-300 text-xs font-mono font-medium text-neutral-900 shadow-sm backdrop-blur-md active:scale-95 cursor-pointer"
            >
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay with clip-path reveal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-50 bg-[#f4f2ee] md:hidden flex flex-col justify-between p-8 transition-[clip-path] duration-600 ease-(--ease) ${
          mobileMenuOpen
            ? '[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] pointer-events-auto'
            : '[clip-path:polygon(0_0,100%_0,100%_0,0_0)] pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-neutral-500 tracking-wider">
            {PROFILE.name.toUpperCase()} · PORTFOLIO
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center font-mono text-xs text-neutral-800 cursor-pointer active:scale-95"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Big numbered links that stagger in */}
        <nav className="my-auto py-6">
          <ul className="space-y-4">
            {NAV.map((item, idx) => (
              <li
                key={item.id}
                style={{
                  transitionDelay: `${mobileMenuOpen ? idx * 45 + 100 : 0}ms`,
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'var(--ease)'
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="group flex items-baseline gap-4 py-2 border-b border-neutral-300/40"
                >
                  <span className="font-mono text-xs text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    {item.number}
                  </span>
                  <span className="font-heading text-3xl font-bold tracking-tight text-neutral-900 group-hover:translate-x-2 transition-transform">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Contact info */}
        <div className="pt-4 border-t border-neutral-300/50 flex flex-col gap-1 text-xs font-mono text-neutral-500">
          <span>{PROFILE.location}</span>
          <span>{PROFILE.email}</span>
        </div>
      </div>
    </>
  );
};
