'use client';

import React from 'react';
import Image from 'next/image';
import { KEY_ACHIEVEMENTS } from '@/lib/data';

export const KeyAchievementsSection: React.FC = () => {
  return (
    <section
      id="key-achievements"
      aria-label="Key Achievements"
      className="site-section bg-white border-y border-(--line)"
    >
      <div className="site-container">
        <div className="mb-12 rv">
          <div className="font-mono-tag mb-3">07 — Recognition</div>
          <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-neutral-950">
            Recognized for the work.
            <span className="font-serif-accent ml-3">Together.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {KEY_ACHIEVEMENTS.map((item, index) => (
            <article
              key={item.title}
              className="clean-card overflow-hidden rv"
              style={{ '--i': index } as React.CSSProperties}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus-visible:outline-none"
                aria-label={`${item.title}, ${item.period}. View LinkedIn post`}
              >
                <div className="h-[clamp(280px,42vw,420px)] bg-neutral-50 p-4 sm:p-6 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={1080}
                    height={1536}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-xs text-neutral-400">
                      0{index + 1} / 02
                    </span>
                    <span className="font-mono text-xs text-neutral-500">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-950 group-hover:underline underline-offset-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mt-3">
                    {item.description}
                  </p>
                  <span className="inline-block font-mono text-xs text-neutral-500 mt-6 group-hover:text-neutral-900 transition-colors">
                    View LinkedIn post →
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
