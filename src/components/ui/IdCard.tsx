'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PROFILE } from '@/lib/data';
import { siteAsset } from '@/lib/site-config';

export const IdCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMouseX = useRef(0);
  const lastMouseTime = useRef(0);

  // Physics loop: damped spring pendulum + idle sway
  useEffect(() => {
    let animId: number;
    let t = 0;

    const tick = () => {
      t += 0.03;
      // Spring force returning to 0 + damping
      const k = 0.08; // spring stiffness
      const damping = 0.92; // friction
      const idle = Math.sin(t) * 1.8; // subtle idle sway (±1.8 deg)

      velocityRef.current += -k * (angleRef.current - idle);
      velocityRef.current *= damping;
      angleRef.current += velocityRef.current;

      setSwingAngle(angleRef.current);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer movement listener for realistic pendulum velocity
  const handlePointerMove = (e: React.PointerEvent) => {
    const now = performance.now();
    const dt = Math.max(16, now - lastMouseTime.current);
    const dx = e.clientX - lastMouseX.current;

    // Convert mouse velocity to angular impulse
    const v = (dx / dt) * 15;
    velocityRef.current = Math.max(-12, Math.min(12, velocityRef.current + v * 0.1));

    lastMouseX.current = e.clientX;
    lastMouseTime.current = now;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative flex flex-col items-center justify-start select-none w-full max-w-85 mx-auto"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Lanyard Strap (30 x 56 px) with scrolling text */}
      <div className="relative w-7.5 h-14.5 bg-[#1a1a1a] shadow-md flex items-center justify-center overflow-hidden z-20 rounded-t-sm border border-neutral-700">
        <div className="absolute text-[8px] tracking-widest text-neutral-400 font-mono rotate-90 whitespace-nowrap animate-marquee">
          {PROFILE.name.toUpperCase()} · {PROFILE.shortRole.toUpperCase()} ·
        </div>
      </div>

      {/* Metal clip / connector */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-4.5 h-2.5 bg-linear-to-b from-neutral-300 via-neutral-100 to-neutral-400 rounded-sm shadow-sm border border-neutral-400" />
        <div className="w-2.5 h-2 bg-neutral-600 rounded-b-sm" />
      </div>

      {/* 2. Hanging Card with Pendulum Swing and 3D Flip */}
      <div
        style={{
          transformOrigin: 'top center',
          transform: `rotate(${swingAngle}deg)`,
          transition: 'transform 0.05s linear'
        }}
        className="w-full flex justify-center pt-1"
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Interactive Developer ID Card. Press enter or click to flip."
          onKeyDown={handleKeyDown}
          onClick={() => setIsFlipped((prev) => !prev)}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          className="relative w-75 h-101 cursor-pointer focus:outline-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* FRONT FACE */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-3xl border border-neutral-200/80 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.8)] overflow-hidden flex flex-col justify-between p-5"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Top Lanyard slot hole & Header */}
            <div>
              <div className="w-8 h-2 bg-neutral-200 rounded-full mx-auto mb-3 border border-neutral-300" />
              <div className="bg-[#0d0d0d] text-white text-[11px] font-mono tracking-[0.2em] py-1 px-3 rounded-md text-center uppercase font-semibold">
                Developer ID · Wipro.
              </div>
            </div>

            {/* Portrait Photo */}
            <div className="flex flex-col items-center my-auto">
              <div className="group/photo relative w-32 h-39 rounded-xl overflow-hidden border-2 border-neutral-200 shadow-inner bg-neutral-100 transition-transform duration-300 hover:scale-105">
                <Image
                  src={siteAsset('/portrait-bust.webp')}
                  alt={`Portrait of ${PROFILE.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
              </div>

              {/* Name & Role */}
              <h3 className="mt-3 text-[17px] font-bold text-neutral-900 tracking-tight text-center leading-tight">
                {PROFILE.name}
              </h3>
              <p className="text-[12px] text-neutral-500 font-medium text-center mt-0.5">
                {PROFILE.shortRole} · Tech Lead
              </p>
            </div>

            {/* Metadata Rows */}
            <div className="border-t border-neutral-100 pt-2.5 text-[11px] font-mono space-y-1 text-neutral-600">
              <div className="flex justify-between">
                <span className="text-neutral-400">ID NO.</span>
                <span className="font-semibold text-neutral-800">{PROFILE.idCard.idNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">LOC</span>
                <span className="font-semibold text-neutral-800">{PROFILE.location}</span>
              </div>
            </div>

            {/* Bottom Barcode & Holographic Stamp */}
            <div className="flex items-center justify-between border-t border-neutral-100 pt-2.5">
              {/* Monochromatic Barcode */}
              <div className="flex items-center space-x-0.5 h-6 opacity-70">
                <div className="w-0.5 h-full bg-black" />
                <div className="w-px h-full bg-black" />
                <div className="w-0.75 h-full bg-black" />
                <div className="w-px h-full bg-black" />
                <div className="w-0.5 h-full bg-black" />
                <div className="w-1 h-full bg-black" />
                <div className="w-px h-full bg-black" />
                <div className="w-0.5 h-full bg-black" />
                <div className="w-0.75 h-full bg-black" />
                <div className="w-px h-full bg-black" />
                <div className="w-0.5 h-full bg-black" />
                <div className="w-0.75 h-full bg-black" />
              </div>

              {/* Holographic Sticker in Grayscale */}
              <div className="w-8 h-8 rounded-full border border-neutral-300 bg-linear-to-tr from-neutral-200 via-white to-neutral-300 flex items-center justify-center text-[8px] font-mono text-neutral-500 shadow-sm">
                PASS
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0 w-full h-full bg-[#0f0f0f] text-white rounded-3xl border border-neutral-800 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-between p-6"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div>
              <div className="w-8 h-2 bg-neutral-800 rounded-full mx-auto mb-3 border border-neutral-700" />
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                  What I Am
                </span>
                <span className="text-[10px] font-mono text-neutral-500">8+ YRS EXP</span>
              </div>
            </div>

            {/* Résumé bullet facts */}
            <div className="space-y-2.5 my-auto text-[11.5px] text-neutral-300 leading-snug">
              {PROFILE.idCard.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-500 font-mono text-[10px] mt-0.5">0{idx + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Signature & Return notice */}
            <div className="border-t border-neutral-800 pt-3 text-[10px] font-mono text-neutral-400">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-serif italic text-neutral-300 text-[14px]">Aadhish Dhamnikar</span>
                <span className="text-neutral-500">AUTHORIZED</span>
              </div>
              <p className="text-[9.5px] text-neutral-500 truncate">
                If found, say hello · {PROFILE.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
