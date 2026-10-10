'use client';

import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '@/lib/data';
import { IllustrativeUI } from '@/components/ui/IllustrativeUI';
import { TechLogo } from '@/components/ui/TechLogo';

export const WorkSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" aria-label="Selected Work" className="site-section bg-(--paper)">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-12 rv">
          <div className="font-mono-tag mb-3">03 — Selected Work</div>
          <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-neutral-950">
            Things I&apos;ve built.
            <span className="font-serif-accent ml-3">Proven.</span>
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mt-3">
            Real enterprise and AI production architectures, drawn faithfully from technical résumé credentials.
          </p>
        </div>

        {/* Desktop: Horizontal Expanding Accordion (height: min(78svh, 600px)) */}
        {/* Mobile: Vertical Accordion */}
        <div className="hidden lg:flex gap-4 h-[min(78svh,620px)] w-full items-stretch">
          {PROJECTS.map((proj) => {
            const isOpen = activeId === proj.id;

            return (
              <div
                key={proj.id}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={`Project: ${proj.title}`}
                onClick={() => setActiveId(proj.id)}
                onMouseEnter={() => setActiveId(proj.id)}
                onFocus={() => setActiveId(proj.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(proj.id);
                  }
                }}
                className={`clean-card overflow-hidden transition-all duration-700 ease-(--ease) cursor-pointer focus:outline-none relative flex flex-col justify-between ${
                  isOpen ? 'flex-8 p-8 md:p-10 cursor-default ring-1 ring-neutral-300' : 'flex-1 p-6 hover:bg-neutral-50/80'
                }`}
              >
                {!isOpen ? (
                  /* Collapsed Spine */
                  <div className="h-full flex flex-col justify-between items-center py-2 select-none">
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      {proj.index}
                    </span>
                    <div className="[writing-mode:vertical-lr] rotate-180 font-heading text-lg font-bold text-neutral-800 tracking-tight whitespace-nowrap">
                      {proj.title}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 transition-transform duration-300 hover:rotate-90">
                      +
                    </div>
                  </div>
                ) : (
                  /* Expanded Panel: Left Details + Right Illustrative UI */
                  <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch animate-in fade-in duration-500">
                    {/* Left: Info */}
                    <div className="flex flex-col justify-between overflow-y-auto pr-2">
                      <div>
                        {/* Kicker & Number */}
                        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-2">
                          <span className="font-bold text-neutral-900">{proj.index}</span>
                          <span>—</span>
                          <span className="uppercase tracking-wider">{proj.kicker}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-neutral-950 mb-2 leading-tight">
                          {proj.title}
                        </h3>

                        {/* Subtitle / Tech overview */}
                        <div className="text-xs font-mono text-neutral-500 mb-4">
                          {proj.subtitle}
                        </div>

                        {/* Résumé Description */}
                        <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                          {proj.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                          {proj.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="font-mono text-[10px] text-neutral-400 mt-0.5">
                                0{idx + 1}
                              </span>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {proj.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[11px] border border-neutral-200/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action: GitHub link if exists */}
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        {proj.github ? (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill btn-primary text-xs"
                          >
                            View on GitHub ↗
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-neutral-400">
                            Enterprise Proprietary Repository
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-neutral-400">
                          Verified in Résumé
                        </span>
                      </div>
                    </div>

                    {/* Right: Illustrative UI */}
                    <div className="h-full flex flex-col justify-center">
                      <IllustrativeUI type={proj.illustrativeType} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical Accordion */}
        <div className="lg:hidden flex flex-col gap-4">
          {PROJECTS.map((proj) => {
            const isOpen = activeId === proj.id;
            return (
              <div
                key={proj.id}
                className="clean-card p-6 border border-neutral-200/80 overflow-hidden"
              >
                <button
                  onClick={() => setActiveId(isOpen ? '' : proj.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-neutral-400">{proj.index}</span>
                    <h3 className="font-heading text-lg font-bold text-neutral-900">{proj.title}</h3>
                  </div>
                  <span className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-6 space-y-4">
                    <p className="text-xs text-neutral-700 leading-relaxed">{proj.description}</p>
                    <div className="space-y-2 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                      {proj.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-mono text-[10px] text-neutral-400">0{i + 1}</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="py-2">
                      <IllustrativeUI type={proj.illustrativeType} />
                    </div>
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill btn-primary text-xs w-full justify-center"
                      >
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
