import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fontsDir = path.resolve(__dirname, '../src/fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

async function fetchCss(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Failed to fetch css from ${url}: ${res.status}`);
  return await res.text();
}

async function downloadFile(url, dest) {
  console.log(`Downloading ${url} -> ${dest}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${dest} (${buffer.length} bytes)`);
}

async function main() {
  console.log('Fetching Google Fonts stylesheets...');
  
  // 1. Inter Tight
  const interCss = await fetchCss('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap');
  const interMatch = interCss.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
  if (interMatch) {
    await downloadFile(interMatch[1], path.join(fontsDir, 'InterTight-VariableFont_wght.woff2'));
  }

  // 2. Instrument Serif
  const instCss = await fetchCss('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
  const instMatches = [...instCss.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)];
  if (instMatches.length >= 1) {
    await downloadFile(instMatches[0][1], path.join(fontsDir, 'InstrumentSerif-Regular.woff2'));
  }
  if (instMatches.length >= 2) {
    await downloadFile(instMatches[1][1], path.join(fontsDir, 'InstrumentSerif-Italic.woff2'));
  }

  // 3. JetBrains Mono
  const monoCss = await fetchCss('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap');
  const monoMatch = monoCss.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
  if (monoMatch) {
    await downloadFile(monoMatch[1], path.join(fontsDir, 'JetBrainsMono-VariableFont_wght.woff2'));
  }

  console.log('Fonts downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
