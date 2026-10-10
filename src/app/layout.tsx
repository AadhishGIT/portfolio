import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PROFILE } from '@/lib/data';
import { siteAsset } from '@/lib/site-config';

const interTight = localFont({
  src: '../fonts/InterTight-VariableFont_wght.woff2',
  variable: '--font-inter-tight',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic'
    }
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif']
});

const jetbrainsMono = localFont({
  src: '../fonts/JetBrainsMono-VariableFont_wght.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.shortRole}`,
  description: PROFILE.resumeSummary,
  keywords: [
    'Aadhish Dhamnikar',
    'Full Stack Developer',
    'Technical Lead',
    'Lead Software Engineer',
    'React',
    'TypeScript',
    'Java Spring Boot',
    'Micro Frontends',
    'Generative AI',
    'RAG Systems'
  ],
  authors: [{ name: PROFILE.name }],
  metadataBase: new URL('https://aadhishgit.github.io'),
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.shortRole}`,
    description: PROFILE.resumeSummary,
    url: 'https://aadhishgit.github.io/portfolio',
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: siteAsset('/og.jpg'),
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — ${PROFILE.shortRole}`
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.shortRole}`,
    description: PROFILE.resumeSummary,
    images: [siteAsset('/og.jpg')]
  },
  icons: {
    icon: siteAsset('/portrait-bust.webp')
  }
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-(--paper) text-(--ink)">
        {children}
      </body>
    </html>
  );
}
