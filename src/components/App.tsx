'use client';

import React, { useState } from 'react';
import { ScrollProvider } from '@/lib/scroll';
import { siteAsset } from '@/lib/site-config';
import { useGlobalReveal } from '@/lib/hooks';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/hero/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { KeyAchievementsSection } from '@/components/sections/KeyAchievementsSection';
import { ContactSection } from '@/components/sections/ContactSection';

function AppContent() {
  useGlobalReveal();
  const [showLegacySite, setShowLegacySite] = useState(false);

  return (
    <div className="relative min-h-screen bg-(--paper) text-(--ink) selection:bg-(--ink) selection:text-(--paper)">
      {showLegacySite ? (
        <iframe
          title="Classic portfolio"
          src={siteAsset('/legacy.html')}
          className="fixed inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Navigation />
          <main id="main-content">
            <Hero />
            <AboutSection />
            <SkillsSection />
            <WorkSection />
            <CertificationsSection />
            <ExperienceSection />
            <AchievementsSection />
            <KeyAchievementsSection />
          </main>
          <ContactSection />
        </>
      )}

      <button
        type="button"
        onClick={() => setShowLegacySite((showingLegacy) => !showingLegacy)}
        aria-pressed={showLegacySite}
        aria-label={`Switch to ${showLegacySite ? 'modern' : 'classic'} portfolio`}
        className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full border border-neutral-200/80 bg-white/90 py-2 pl-4 pr-2 text-left shadow-[0_12px_36px_-12px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
      >
        <span className="min-w-20">
          <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
            Portfolio view
          </span>
          <span className="block text-xs font-semibold text-neutral-900">
            {showLegacySite ? 'Classic' : 'Modern'}
          </span>
        </span>
        <span
          className={`relative flex h-9 w-[4.25rem] items-center rounded-full p-1 transition-colors duration-300 ${
            showLegacySite ? 'bg-sky-700' : 'bg-neutral-900'
          }`}
          aria-hidden="true"
        >
          <span
            className={`absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-md transition-transform duration-300 ease-(--ease) ${
              showLegacySite ? 'translate-x-7' : 'translate-x-0'
            }`}
          >
            {showLegacySite ? '◈' : '✦'}
          </span>
          <span className="ml-auto mr-1 text-[9px] font-bold tracking-wider text-white/75">
            {showLegacySite ? 'OLD' : 'NEW'}
          </span>
        </span>
      </button>
    </div>
  );
}

export function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}
