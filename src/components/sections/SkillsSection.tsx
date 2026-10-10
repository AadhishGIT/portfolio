'use client';

import React, { useState } from 'react';
import { SKILL_GROUPS, SkillItem } from '@/lib/data';
import { TechLogo, getLogoMeta } from '@/components/ui/TechLogo';

const FAMILIES = ['All', 'Frontend', 'Backend', 'DevOps', 'Testing', 'Security', 'GenAI', 'Architecture'] as const;

export const SkillsSection: React.FC = () => {
  const [activeFamily, setActiveFamily] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILL_GROUPS[0]);

  const inspectorMeta = getLogoMeta(selectedSkill.logoKey);

  return (
    <section id="skills" aria-label="Skills" className="site-section bg-(--paper)">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-10 rv">
          <div className="font-mono-tag mb-3">02 — Stack & Competencies</div>
          <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-neutral-950">
            The periodic table of my stack.
            <span className="font-serif-accent ml-3">Synthesized.</span>
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mt-3">
            Every technical competency and architectural pattern drawn directly from 8+ years of production engineering.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8 rv">
          {FAMILIES.map((fam) => (
            <button
              key={fam}
              onClick={() => setActiveFamily(fam)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeFamily === fam
                  ? 'bg-[#0d0d0d] text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Main Layout: Periodic Grid (8 columns desktop, 4 mobile) + Sticky Inspector Panel (320px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Table Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {SKILL_GROUPS.map((skill, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delayMs = (row + col) * 40;
              const matchesFilter = activeFamily === 'All' || skill.family === activeFamily;
              const isSelected = selectedSkill.atomicNumber === skill.atomicNumber;

              return (
                <button
                  key={skill.atomicNumber}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  tabIndex={0}
                  style={{
                    animationDelay: `${delayMs}ms`
                  }}
                  className={`group relative flex flex-col justify-between p-2.5 aspect-square rounded-2xl text-left border transition-all duration-300 cursor-pointer focus:outline-none ${
                    matchesFilter ? 'opacity-100 scale-100' : 'opacity-25 grayscale scale-95'
                  } ${
                    isSelected
                      ? 'bg-white border-neutral-900 shadow-md ring-2 ring-neutral-900/10 -translate-y-1'
                      : 'bg-white/90 border-neutral-200 hover:border-neutral-400 hover:bg-white hover:-translate-y-0.5 shadow-2xs'
                  }`}
                  aria-label={`${skill.name}, ${skill.family}`}
                >
                  {/* Top: Atomic Number & Family letter */}
                  <div className="flex items-center justify-between w-full text-[10px] font-mono text-neutral-400 leading-none">
                    <span>{skill.atomicNumber.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] uppercase tracking-wider">{skill.family[0]}</span>
                  </div>

                  {/* Center: 2-letter Symbol */}
                  <div className="font-heading font-black text-xl text-neutral-900 leading-none group-hover:scale-110 transition-transform">
                    {skill.symbol}
                  </div>

                  {/* Bottom: Name */}
                  <div className="text-[10px] font-medium text-neutral-600 truncate w-full leading-tight">
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <div className="sticky top-28 clean-card p-6 border border-neutral-200/80 shadow-md flex flex-col items-center text-center">
            <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-4">
              ELEMENT INSPECTOR · NO. {selectedSkill.atomicNumber.toString().padStart(2, '0')}
            </div>

            {/* 150px Logo with Pop Animation & Soft Brand Glow */}
            <div
              key={selectedSkill.logoKey}
              className="w-37.5 h-37.5 my-3 rounded-3xl bg-neutral-50 border border-neutral-200 flex items-center justify-center p-6 shadow-inner transition-transform duration-300 animate-in zoom-in-95"
              style={{
                boxShadow: `0 12px 30px -10px ${inspectorMeta.glow}`
              }}
            >
              <TechLogo name={selectedSkill.logoKey} size={100} glow />
            </div>

            {/* Title & Family Chip */}
            <h3 className="font-heading text-xl font-bold text-neutral-950 mt-3">
              {selectedSkill.name}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-neutral-100 text-neutral-700 border border-neutral-200">
              {selectedSkill.family}
            </span>

            {/* Description */}
            <p className="text-xs text-neutral-600 mt-4 leading-relaxed px-2">
              {selectedSkill.description}
            </p>

            {/* Projects Using this Skill */}
            <div className="w-full mt-6 pt-5 border-t border-neutral-100 text-left">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-2">
                VERIFIED IN PROJECTS
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-800">
                {selectedSkill.projects.map((proj, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
