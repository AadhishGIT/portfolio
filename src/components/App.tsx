'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { siteAsset } from '@/lib/site-config';

const ModernPortfolio = dynamic(
  () => import('@/components/ModernPortfolio').then((module) => module.ModernPortfolio),
);

export function App() {
  const [isModernView, setIsModernView] = useState(false);
  return (
    <div className="relative min-h-screen bg-(--paper) text-(--ink) selection:bg-(--ink) selection:text-(--paper)">
      {!isModernView ? (
        <iframe
          title="Classic portfolio"
          src={siteAsset('/legacy.html')}
          className="fixed inset-0 h-full w-full border-0"
        />
      ) : (
        <ModernPortfolio />
      )}

      <button
        type="button"
        onClick={() => setIsModernView((showingModern) => !showingModern)}
        aria-pressed={isModernView}
        aria-label={`Switch to ${isModernView ? 'classic' : 'modern'} portfolio`}
        className="group fixed bottom-5 right-5 z-60 flex items-center gap-3 rounded-full border border-neutral-200/80 bg-white/90 py-2 pl-4 pr-2 text-left shadow-[0_12px_36px_-12px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
      >
        <span className="min-w-20">
          <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
            Portfolio view
          </span>
          <span className="block text-xs font-semibold text-neutral-900">
            {isModernView ? 'Modern' : 'Classic'}
          </span>
        </span>
        <span
          className={`relative flex h-9 w-17 items-center rounded-full p-1 transition-colors duration-300 ${
            isModernView ? 'bg-neutral-900' : 'bg-neutral-300'
          }`}
          aria-hidden="true"
        >
          <span
            className={`absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-md transition-transform duration-300 ease-(--ease) ${
              isModernView ? 'translate-x-7' : 'translate-x-0'
            }`}
          >
            {isModernView ? '✦' : '◈'}
          </span>
          <span className="ml-auto mr-1 text-[9px] font-bold tracking-wider text-neutral-500">
            {isModernView ? 'ON' : 'OFF'}
          </span>
        </span>
      </button>
    </div>
  );
}
