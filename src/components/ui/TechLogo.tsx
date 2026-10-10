'use client';

import React from 'react';

export interface LogoMeta {
  name: string;
  color: string;
  glow: string;
  isBrand: boolean;
}

export const BRAND_COLORS: Record<string, { color: string; glow: string; name: string }> = {
  react: { name: 'React.js', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.25)' },
  typescript: { name: 'TypeScript', color: '#3178C6', glow: 'rgba(49, 120, 198, 0.25)' },
  javascript: { name: 'JavaScript', color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.25)' },
  nextjs: { name: 'Next.js', color: '#000000', glow: 'rgba(0, 0, 0, 0.15)' },
  reactnative: { name: 'React Native', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.25)' },
  redux: { name: 'Redux Toolkit', color: '#764ABC', glow: 'rgba(118, 74, 188, 0.25)' },
  tailwindcss: { name: 'Tailwind CSS', color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.25)' },
  webpack: { name: 'Webpack', color: '#8DD6F9', glow: 'rgba(141, 214, 249, 0.25)' },
  vite: { name: 'Vite', color: '#646CFF', glow: 'rgba(100, 108, 255, 0.25)' },
  html5: { name: 'HTML5', color: '#E34F26', glow: 'rgba(227, 79, 38, 0.25)' },
  css3: { name: 'CSS3', color: '#1572B6', glow: 'rgba(21, 114, 182, 0.25)' },
  mui: { name: 'Material UI', color: '#007FFF', glow: 'rgba(0, 127, 255, 0.25)' },
  d3: { name: 'D3.js', color: '#F9A03C', glow: 'rgba(249, 160, 60, 0.25)' },
  java: { name: 'Java', color: '#007396', glow: 'rgba(0, 115, 150, 0.25)' },
  springboot: { name: 'Spring Boot', color: '#6DB33F', glow: 'rgba(109, 179, 63, 0.25)' },
  nodejs: { name: 'Node.js', color: '#5FA04E', glow: 'rgba(95, 160, 78, 0.25)' },
  express: { name: 'Express', color: '#000000', glow: 'rgba(0, 0, 0, 0.15)' },
  fastapi: { name: 'FastAPI', color: '#009688', glow: 'rgba(0, 150, 136, 0.25)' },
  postgresql: { name: 'PostgreSQL', color: '#4169E1', glow: 'rgba(65, 105, 225, 0.25)' },
  mysql: { name: 'MySQL', color: '#4479A1', glow: 'rgba(68, 121, 161, 0.25)' },
  git: { name: 'Git', color: '#F05032', glow: 'rgba(240, 80, 50, 0.25)' },
  jenkins: { name: 'Jenkins', color: '#D24939', glow: 'rgba(210, 73, 57, 0.25)' },
  docker: { name: 'Docker', color: '#2496ED', glow: 'rgba(36, 150, 237, 0.25)' },
  jira: { name: 'Jira', color: '#0052CC', glow: 'rgba(0, 82, 204, 0.25)' },
  vercel: { name: 'Vercel', color: '#000000', glow: 'rgba(0, 0, 0, 0.15)' },
  python: { name: 'Python', color: '#3776AB', glow: 'rgba(55, 118, 171, 0.25)' },
  langchain: { name: 'LangChain', color: '#1C3C3C', glow: 'rgba(28, 60, 60, 0.25)' },
  chromadb: { name: 'ChromaDB', color: '#E11D48', glow: 'rgba(225, 29, 72, 0.25)' },
  copilot: { name: 'GitHub Copilot', color: '#24292F', glow: 'rgba(36, 41, 47, 0.2)' },
  sonarqube: { name: 'SonarQube', color: '#4B9FD5', glow: 'rgba(75, 159, 213, 0.25)' },
  vitest: { name: 'Vitest', color: '#FCC72B', glow: 'rgba(252, 199, 43, 0.25)' },
  jest: { name: 'Jest', color: '#C21325', glow: 'rgba(194, 19, 37, 0.25)' },
  testinglibrary: { name: 'Testing Library', color: '#E33332', glow: 'rgba(227, 51, 50, 0.25)' }
};

export const CONCEPT_META: Record<string, { color: string; glow: string; name: string }> = {
  microfrontends: { name: 'Micro Frontends', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  wcag: { name: 'WCAG 2.1 AA', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  restapi: { name: 'RESTful APIs', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  apigateway: { name: 'API Gateway', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  eventdriven: { name: 'Event-Driven Arch', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  microservices: { name: 'Microservices', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  trunkbased: { name: 'Trunk-Based Dev', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  gitflow: { name: 'Gitflow', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  owasp: { name: 'OWASP Top 10', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  securecoding: { name: 'Secure Coding', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  nfr: { name: 'Non-Functional Req', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  rca: { name: 'Root-Cause Analysis', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  tdd: { name: 'Test-Driven Dev', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  bdd: { name: 'Behavior-Driven Dev', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  contracttesting: { name: 'Contract Testing', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  designpatterns: { name: 'Design Patterns', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  responsibleai: { name: 'Responsible AI', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  experience: { name: 'Enterprise Experience', color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.12)' },
  performance: { name: 'Performance Optimization', color: '#005a9c', glow: 'rgba(0, 90, 156, 0.2)' },
  testing: { name: 'Automated Testing', color: '#15c213', glow: 'rgba(21, 194, 19, 0.2)' },
  leadership: { name: 'Engineering Leadership', color: '#ff6600', glow: 'rgba(255, 102, 0, 0.2)' },
  education: { name: 'Academic Honours', color: '#4f46e5', glow: 'rgba(79, 70, 229, 0.2)' }
};

export function isBrand(key: string): boolean {
  return key in BRAND_COLORS;
}

export function getLogoMeta(key: string): LogoMeta {
  if (key in BRAND_COLORS) {
    const b = BRAND_COLORS[key];
    return { name: b.name, color: b.color, glow: b.glow, isBrand: true };
  }
  if (key in CONCEPT_META) {
    const c = CONCEPT_META[key];
    return { name: c.name, color: c.color, glow: c.glow, isBrand: false };
  }
  return { name: key, color: '#0d0d0d', glow: 'rgba(13, 13, 13, 0.1)', isBrand: false };
}

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, size = 32, className = '', glow = false }) => {
  const meta = getLogoMeta(name);
  const strokeColor = meta.isBrand ? meta.color : '#0d0d0d';
  const fillColor = meta.isBrand ? meta.color : 'currentColor';

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: glow ? `drop-shadow(0 0 16px ${meta.glow})` : undefined
  };

  // SVGs for Brands & Concepts
  const renderSvg = () => {
    switch (name) {
      case 'react':
      case 'reactnative':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke={meta.color} strokeWidth="3.5" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke={meta.color} strokeWidth="3.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke={meta.color} strokeWidth="3.5" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="7" fill={meta.color} />
          </svg>
        );

      case 'typescript':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <rect width="100" height="100" rx="16" fill={meta.color} />
            <path d="M26 44h22v9h-6.5v27h-9V53H26v-9zm28 22c2.5 3 5.5 5 10 5 3.5 0 6-1.5 6-4.5 0-8-19.5-3.5-19.5-16.5 0-6.5 5.5-11 14.5-11 5.5 0 9.5 2 12.5 5l-4.5 6.5c-2.5-2-4.5-3-8-3-3.5 0-5.5 1.5-5.5 3.5 0 7 19.5 3 19.5 16.5 0 7-5.5 12-15 12-7 0-12-2.5-15.5-6.5L54 66z" fill="#ffffff" />
          </svg>
        );

      case 'javascript':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <rect width="100" height="100" rx="16" fill={meta.color} />
            <path d="M30 48h9v23c0 8-4.5 11-11.5 11-3 0-6.5-1-8.5-2.5l2-6.5c1.5 1 3.5 1.5 5.5 1.5 3.5 0 4.5-2 4.5-6V48zm27 18c2.5 3 5.5 5 10 5 3.5 0 6-1.5 6-4.5 0-8-19.5-3.5-19.5-16.5 0-6.5 5.5-11 14.5-11 5.5 0 9.5 2 12.5 5l-4.5 6.5c-2.5-2-4.5-3-8-3-3.5 0-5.5 1.5-5.5 3.5 0 7 19.5 3 19.5 16.5 0 7-5.5 12-15 12-7 0-12-2.5-15.5-6.5L57 66z" fill="#000000" />
          </svg>
        );

      case 'nextjs':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <circle cx="50" cy="50" r="48" fill="#000000" />
            <path d="M68 76L35 34h-6v32h6V43l30 38c1-.8 2-1.7 3-2.6zM65 34h6v24h-6z" fill="#ffffff" />
          </svg>
        );

      case 'python':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <path d="M49 14c-17 0-16 7-16 7l.02 8h16.98v2.4H28c-12 0-14 8-14 16 0 9.5 6 16 14 16h3v-7.5c0-4.5 4-8.5 8.5-8.5H57c4.5 0 8-3.5 8-8V22c0-5-3.5-8-16-8zm-5 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" fill="#3776AB" />
            <path d="M51 86c17 0 16-7 16-7l-.02-8H50V68.6h22c12 0 14-8 14-16 0-9.5-6-16-14-16h-3v7.5c0 4.5-4 8.5-8.5 8.5H43c-4.5 0-8 3.5-8 8V78c0 5 3.5 8 16 8zm5-5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#FFD43B" />
          </svg>
        );

      case 'java':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <path d="M40 78c18 2 34-4 35-10-1-3-9-4-19-4-15 0-25 3-25 6 0 5 1 6 9 8z" stroke="#007396" strokeWidth="3" />
            <path d="M33 66c14 1 29-2 36-6-2-2-9-3-18-3-13 0-24 2-24 5 0 3 1 3 6 4z" stroke="#EA2D2E" strokeWidth="3" />
            <path d="M53 18c5 10-2 15-8 23 9-4 17-10 13-20-1-3-3-4-5-3zm-9 11c3 7-1 12-5 18 7-3 13-7 10-15-1-2-3-3-5-3z" fill="#EA2D2E" />
          </svg>
        );

      case 'springboot':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <path d="M48 10a4 4 0 014 0l34 20a4 4 0 012 3.5v39a4 4 0 01-2 3.5L52 96a4 4 0 01-4 0L14 76a4 4 0 01-2-3.5v-39a4 4 0 012-3.5L48 10z" fill="#6DB33F" />
            <path d="M49 32c-12 0-21 9-21 21 0 10 7 19 17 21 8 1 18-3 21-11l-6-3c-2 5-9 7-14 5-7-2-10-8-9-15 1-8 7-12 14-12 5 0 8 2 11 5l6-5c-5-4-9-6-15-6z" fill="#ffffff" />
          </svg>
        );

      case 'nodejs':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <path d="M50 12l38 22v44L50 100 12 78V34L50 12z" fill="#5FA04E" />
            <path d="M50 32v36M34 50l16 18 16-18" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'docker':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <rect x="20" y="42" width="10" height="9" rx="1.5" fill="#2496ED" />
            <rect x="33" y="42" width="10" height="9" rx="1.5" fill="#2496ED" />
            <rect x="46" y="42" width="10" height="9" rx="1.5" fill="#2496ED" />
            <rect x="33" y="30" width="10" height="9" rx="1.5" fill="#2496ED" />
            <rect x="46" y="30" width="10" height="9" rx="1.5" fill="#2496ED" />
            <rect x="59" y="42" width="10" height="9" rx="1.5" fill="#2496ED" />
            <path d="M12 56c0 18 14 26 38 26 23 0 38-10 40-24 0-1-6-3-12-1-2 1-7 2-12 1-5-1-12-5-14-11-13-1-36 0-40 9z" fill="#2496ED" />
          </svg>
        );

      case 'jenkins':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <circle cx="50" cy="50" r="44" fill="#D24939" />
            <path d="M34 40c0-9 7-16 16-16s16 7 16 16v10H34V40z" fill="#ffffff" />
            <path d="M30 50h40v22c0 8-9 14-20 14s-20-6-20-14V50z" fill="#F0D6B2" />
            <circle cx="43" cy="46" r="2.5" fill="#000000" />
            <circle cx="57" cy="46" r="2.5" fill="#000000" />
            <path d="M47 54h6v4h-6z" fill="#D24939" />
          </svg>
        );

      case 'git':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <rect x="15" y="15" width="70" height="70" rx="16" transform="rotate(45 50 50)" fill="#F05032" />
            <path d="M36 64l28-28M42 58l16 16M64 36a5 5 0 100-10 5 5 0 000 10zM36 64a5 5 0 100-10 5 5 0 000 10zM58 74a5 5 0 100-10 5 5 0 000 10z" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case 'copilot':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <rect width="100" height="100" rx="22" fill="#0D1117" />
            <path d="M50 28c14 0 24 9 24 20v6c0 10-10 18-24 18s-24-8-24-18v-6c0-11 10-20 24-20z" stroke="#58A6FF" strokeWidth="4" />
            <circle cx="41" cy="50" r="4.5" fill="#58A6FF" />
            <circle cx="59" cy="50" r="4.5" fill="#58A6FF" />
            <path d="M44 60c2 2 10 2 12 0" stroke="#58A6FF" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'tailwindcss':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <path d="M28 44c4-12 12-16 20-14 9 2 13 10 18 13 5 4 10 4 16 0-4 12-12 16-20 14-9-2-13-10-18-13-5-4-10-4-16 0zm-14 24c4-12 12-16 20-14 9 2 13 10 18 13 5 4 10 4 16 0-4 12-12 16-20 14-9-2-13-10-18-13-5-4-10-4-16 0z" fill="#06B6D4" />
          </svg>
        );

      case 'fastapi':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <circle cx="50" cy="50" r="46" fill="#009688" />
            <path d="M54 22L32 54h14l-4 24 26-32H54l4-24z" fill="#ffffff" />
          </svg>
        );

      case 'langchain':
      case 'chromadb':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
            <circle cx="50" cy="50" r="46" fill="#1C3C3C" />
            <path d="M35 50a15 15 0 0115-15h6a15 15 0 010 30h-6a15 15 0 01-15-15z" stroke="#22C55E" strokeWidth="5" />
            <path d="M65 50a15 15 0 01-15 15h-6a15 15 0 010-30h6a15 15 0 0115 15z" stroke="#38BDF8" strokeWidth="5" />
          </svg>
        );

      // Custom Clean Line Icons for Architecture / Concepts
      default:
        return (
          <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#0d0d0d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            {name === 'microfrontends' && (
              <>
                <rect x="18" y="18" width="28" height="28" rx="6" />
                <rect x="54" y="18" width="28" height="28" rx="6" />
                <rect x="18" y="54" width="28" height="28" rx="6" />
                <circle cx="68" cy="68" r="14" />
              </>
            )}
            {name === 'microservices' && (
              <>
                <circle cx="30" cy="30" r="12" />
                <circle cx="70" cy="30" r="12" />
                <circle cx="50" cy="70" r="12" />
                <path d="M38 38l16 24M62 38L46 62M42 30h16" strokeDasharray="3 3" />
              </>
            )}
            {name === 'wcag' && (
              <>
                <circle cx="50" cy="24" r="9" />
                <path d="M22 42h56M50 42v24l16 20M50 66l-16 20" />
              </>
            )}
            {name === 'owasp' && (
              <>
                <path d="M50 16l30 12v22c0 22-30 36-30 36S20 72 20 50V28l30-12z" />
                <path d="M42 50l6 6 12-12" />
              </>
            )}
            {name === 'tdd' && (
              <>
                <circle cx="50" cy="50" r="32" strokeDasharray="5 5" />
                <path d="M38 52l8 8 18-18" />
              </>
            )}
            {name === 'designpatterns' && (
              <>
                <rect x="22" y="22" width="26" height="26" rx="4" />
                <rect x="52" y="52" width="26" height="26" rx="4" />
                <path d="M48 35h17v17" />
              </>
            )}
            {name === 'experience' && (
              <>
                <rect x="20" y="28" width="60" height="50" rx="8" />
                <path d="M36 28V20a4 4 0 014-4h20a4 4 0 014 4v8" />
                <path d="M20 46h60" />
              </>
            )}
            {name === 'leadership' && (
              <>
                <circle cx="50" cy="32" r="12" />
                <path d="M28 72c0-12 10-20 22-20s22 8 22 20" />
              </>
            )}
            {name === 'education' && (
              <>
                <path d="M16 38l34-16 34 16-34 16-34-16z" />
                <path d="M30 50v18c0 8 9 14 20 14s20-6 20-14V50" />
                <path d="M84 40v24" />
              </>
            )}
            {name === 'performance' && (
              <>
                <path d="M24 68a32 32 0 1152 0" />
                <path d="M50 50l14-14" />
                <circle cx="50" cy="50" r="4" fill="#0d0d0d" />
              </>
            )}
            {name === 'testing' && (
              <>
                <rect x="24" y="20" width="52" height="60" rx="6" />
                <path d="M36 40l6 6 16-16M36 58h28" />
              </>
            )}
            {/* Fallback code bracket */}
            {!['microfrontends', 'microservices', 'wcag', 'owasp', 'tdd', 'designpatterns', 'experience', 'leadership', 'education', 'performance', 'testing'].includes(name) && (
              <>
                <rect x="18" y="18" width="64" height="64" rx="12" />
                <path d="M40 38l-10 12 10 12M60 38l10 12-10 12" />
              </>
            )}
          </svg>
        );
    }
  };

  return (
    <span style={containerStyle} className={className} aria-hidden="true">
      {renderSvg()}
    </span>
  );
};
