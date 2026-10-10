'use client';

import React from 'react';
import { PROFILE } from '@/lib/data';
import { IdCard } from '@/components/ui/IdCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" aria-label="About" className="site-section bg-(--paper)">
      <div className="site-container">
        {/* Section Tag & Heading */}
        <div className="mb-14 rv">
          <div className="font-mono-tag mb-3">01 — About me</div>
          <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-neutral-950">
            Engineered with craft and scale.
            <span className="font-serif-accent ml-3">Authentic.</span>
          </h2>
        </div>

        {/* 3-Column Grid: minmax(0,1fr) 320px minmax(0,1fr), equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Bio & Verbatim Summary */}
          <div className="clean-card p-8 md:p-10 flex flex-col justify-between rv" style={{ '--i': 1 } as React.CSSProperties}>
            <div>
              <div className="font-mono text-xs text-neutral-400 mb-2">SUMMARY</div>
              <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              {/* Résumé summary verbatim */}
              <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                {PROFILE.resumeSummary}
              </p>
              {/* Extra verbatim line from résumé */}
              <p className="text-neutral-500 text-xs leading-relaxed">
                {PROFILE.aboutExtra}
              </p>
            </div>

            {/* Professional profile links */}
            <div className="flex flex-wrap gap-2.5 pt-8 mt-auto border-t border-neutral-100">
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-secondary text-xs py-2 px-4"
                >
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-secondary text-xs py-2 px-4"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Center Column: Hanging Lanyard ID Card */}
          <div className="flex items-center justify-center py-4 lg:py-0 rv" style={{ '--i': 2 } as React.CSSProperties}>
            <IdCard />
          </div>

          {/* Right Column: Quick Facts & Résumé Quote */}
          <div className="clean-card p-8 md:p-10 flex flex-col justify-between rv" style={{ '--i': 3 } as React.CSSProperties}>
            <div>
              <div className="font-mono text-xs text-neutral-400 mb-4">QUICK FACTS</div>
              <div className="divide-y divide-neutral-100 text-xs">
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-400 font-mono">Location</span>
                  <span className="text-neutral-800 font-medium text-right">{PROFILE.location}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-400 font-mono">Education</span>
                  <span className="text-neutral-800 font-medium text-right">B.E. (CGPA 7.58) · CDAC</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-400 font-mono">Current Role</span>
                  <span className="text-neutral-800 font-medium text-right">Technical Lead @ Wipro</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-400 font-mono">Clients Served</span>
                  <span className="text-neutral-800 font-medium text-right">MRI Simmons · State Street</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-neutral-400 font-mono">Direct Email</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-neutral-900 font-medium text-right hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote from résumé */}
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <blockquote className="font-serif italic text-neutral-700 text-sm leading-relaxed">
                &ldquo;Driving velocity through trunk-based pipelines, automated TDD test gates, and disciplined GenAI integration.&rdquo;
              </blockquote>
              <div className="font-mono text-[11px] text-neutral-400 mt-2">
                — Core Engineering Principle
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
