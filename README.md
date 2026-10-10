# Aadhish Dhamnikar — Personal Portfolio

A production-ready, ultra-lightweight, and calm personal portfolio website for **Aadhish Dhamnikar** (Lead Software Engineer & Technical Lead).

Crafted with an Awwwards "Site of the Day" aesthetic in a quiet palette of white, black, and grays. Features an interactive looping intro talking video with sample-accurate audio crossfade, a hanging lanyard 3D ID card with pendulum swing physics, an expandable project gallery, a periodic table stack with real-time inspector, and a pinned horizontal achievement gallery.

---

## Quick Start & Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production (TypeScript, linting & static optimization)
npm run build

# 4. Start production server
npm run start
```

The site will be running at `http://localhost:3000`.

---

## GitHub Pages Deployment

The site is configured for static export at `https://aadhishgit.github.io/portfolio/`.
Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds the site
and publishes the generated `out/` directory. The repository's GitHub Pages
source must be set to **GitHub Actions** under **Settings → Pages**.

---

## Sections Architecture

| No. | Section | Component File | Description & Animation |
|---|---|---|---|
| **00** | **Hero** | `src/components/hero/Hero.tsx` | Center talking video (`768×960`, `mix-blend-mode: multiply`), uppercase outlined ghost name, audio unlock on first interaction, mute/unmute control, and auto-pause when scrolled out of view. |
| **01** | **About** | `src/components/sections/AboutSection.tsx` | 3-column equal-height layout with verbatim résumé summary, quick facts, and an interactive hanging lanyard ID card (`IdCard.tsx`) featuring damped pendulum swing physics and 3D flip. |
| **02** | **Skills** | `src/components/sections/SkillsSection.tsx` | 8-column "Periodic Table of My Stack" with diagonal wave reveal, family filters, and a 320 px sticky Inspector panel displaying 150 px brand logos with pop animations and verified project tags. |
| **03** | **Work** | `src/components/sections/WorkSection.tsx` | Expanding accordion gallery (`min(78svh, 600px)`). Active project expands to flex-8 with 2-column feature breakdown, tech chips, GitHub link, and pure CSS grayscale illustrative mini-UIs. |
| **04** | **Certifications** | `src/components/sections/CertificationsSection.tsx` | White band layout with hairline borders. Sticky heading on the left and an ink-flood index on the right (`scaleX(0 → 1)` on hover/focus) turning text white with sliding `↗` arrows. |
| **05** | **Experience** | `src/components/sections/ExperienceSection.tsx` | Combined chronological path (Education + Experience). An ink timeline spine draws dynamically as the user scrolls, lighting up each milestone node and ending with "Next — Your team?". |
| **06** | **Achievements** | `src/components/sections/AchievementsSection.tsx` | Pinned horizontal gallery (`position: sticky`, `100svh`). Card track translates horizontally on scroll. Features 72 px glowing logo tiles, `easeOutQuart` (1.4 s) number counters, and center-card lift. |
| **07** | **Contact & Footer** | `src/components/sections/ContactSection.tsx` | Interactive heading with hover letter-hopping, direct `mailto` link with copy chip and `aria-live` feedback, phone, verified links, spinning badge, and footer. |

---

## Hero Video Pipeline

The video asset pipeline turns the uploaded source video into a seamless looping hero clip.

To rebuild the video assets:

```bash
python3 scripts/build-hero-assets.py
# or
npm run build:hero
```

### What `scripts/build-hero-assets.py` does:
1. **Person Centering & Crop:** Takes `Intro video1.mp4` (1280×720) and crops tightly around the person (`crop=576:720:352:0`), scaling to `768×960` (aspect ratio 4:5 / 768:960).
2. **Background Blending:** Brightens the neutral studio backdrop in both video exports. The hero uses CSS multiply blending so the light backdrop visually disappears against the page background in either format.
3. **Seamless Video Loop:** Uses ffmpeg `xfade=transition=fade:duration=0.5:offset=9.0` over the 10-second segment, blending the tail into the head with zero visible jump.
4. **Sample-Accurate Audio Crossfade in NumPy:** Extracts 48 kHz stereo 16-bit PCM WAV and performs sample-accurate linear cross-fade over 24,000 samples (0.5 s) directly in NumPy to prevent audio drops or clicks.
5. **Dual Codec Export:**
   - `public/hero/hero.mp4`: H.264 (yuv420p, CRF 24, preset slow, AAC 96 kbps, `+faststart`).
   - `public/hero/hero.webm`: VP9 (yuv420p, CRF 32, Opus 80 kbps).
6. **Portrait & OG Generation:** Exports `public/portrait-bust.webp` (480×600) and `public/og.jpg` (1200×630).

---

## Self-Hosted Fonts

All typography is strictly self-hosted inside `src/fonts` using `next/font/local`:
- **Inter Tight (Variable):** Display and body text (`InterTight-VariableFont_wght.woff2`).
- **Instrument Serif (Regular + Italic):** Italic accent word per section heading (`InstrumentSerif-Regular.woff2`, `InstrumentSerif-Italic.woff2`).
- **JetBrains Mono (Variable):** Numbers, indexes, and monospace badges (`JetBrainsMono-VariableFont_wght.woff2`).

Fonts were retrieved from Google Fonts via `scripts/download-fonts.mjs` and require zero external CDN requests at runtime.

---

## Brand Logo Credits & Licences

All third-party brand logos used in the skills and achievements sections are maintained in accordance with their respective open-source licenses:

- **Devicon** ([devicon.dev](https://devicon.dev)): Brand vector icons used under the MIT License (`public/logos/LICENSE-devicon.txt`).
- **Simple Icons** ([simpleicons.org](https://simpleicons.org)): Technology brand vectors used under the Creative Commons Zero (CC0 1.0 Universal) license (`public/logos/LICENSE-simpleicons.txt`).
- Official brand colors and paths are mapped in `src/components/ui/TechLogo.tsx` with soft brand-tint glows.

---

## Design System Tokens

```css
--paper: #f4f2ee;      /* Warm off-white background */
--card: #ffffff;       /* Pure white card surface */
--ink: #0d0d0d;        /* Deep ink text and active buttons */
--ink-2: #3a3a3a;      /* Secondary dark text */
--mute: #77756f;       /* Muted text and italic accents */
--faint: #a9a6a0;      /* Hairline accents and indices */
--line: rgba(13,13,13,.1); /* 1px hairline border */
--soft: #e9e6e0;
--ease: cubic-bezier(.16, 1, .3, 1);
--gutter: clamp(18px, 4vw, 64px);
```