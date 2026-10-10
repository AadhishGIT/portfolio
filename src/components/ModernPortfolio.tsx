'use client';

import { ScrollProvider } from '@/lib/scroll';
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

export function ModernPortfolio() {
  useGlobalReveal();

  return (
    <ScrollProvider>
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
    </ScrollProvider>
  );
}
