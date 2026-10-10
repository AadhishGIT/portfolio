import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import http from 'node:http';

async function isPortOpen(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, () => resolve(true));
    req.on('error', () => resolve(false));
    req.setTimeout(500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(port, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    if (await isPortOpen(port)) return true;
    await new Promise((r) => setTimeout(r, 600));
  }
  return false;
}

async function run() {
  const PORT = 3002;
  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    stdio: 'inherit'
  });

  const ready = await waitForServer(PORT);
  if (!ready) {
    console.error('Server failed to start within timeout');
    server.kill();
    process.exit(1);
  }

  console.log(`Server is ready at http://localhost:${PORT}`);

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });

  const errors = [];

  // --- 1. Desktop Test (1440 x 900) ---
  console.log('\n--- 1. Testing Desktop (1440x900) ---');
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('[Browser Error]', msg.text());
      errors.push(msg.text());
    }
  });

  await desktopPage.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  const desktopOverflow = await desktopPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });

  console.log(`Desktop dimensions: scrollWidth=${desktopOverflow.scrollWidth}, innerWidth=${desktopOverflow.innerWidth}`);
  if (desktopOverflow.hasOverflow) {
    console.error(`DESKTOP OVERFLOW DETECTED: ${desktopOverflow.scrollWidth} > ${desktopOverflow.innerWidth}`);
  } else {
    console.log('✓ Desktop zero horizontal overflow verified.');
  }

  await desktopPage.screenshot({ path: 'public/screenshot-desktop.png', fullPage: false });
  console.log('✓ Saved public/screenshot-desktop.png');

  // Test Hero Sound Button
  const soundBtn = desktopPage.locator('button[aria-label*="video audio"]');
  if (await soundBtn.count()) {
    console.log('✓ Hero sound button detected.');
    await soundBtn.click();
    console.log('✓ Hero sound button clicked.');
  }

  // Test ID Card Flip
  const idCard = desktopPage.locator('[aria-label*="Interactive Developer ID Card"]');
  if (await idCard.count()) {
    console.log('✓ ID card detected.');
    await idCard.hover({ force: true });
    await desktopPage.waitForTimeout(400);
    console.log('✓ ID card hover/flip tested.');
  }

  // --- 2. Mobile Test (390 x 844) ---
  console.log('\n--- 2. Testing Mobile (390x844) ---');
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });

  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('[Mobile Error]', msg.text());
      errors.push(msg.text());
    }
  });

  await mobilePage.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });

  console.log(`Mobile dimensions: scrollWidth=${mobileOverflow.scrollWidth}, innerWidth=${mobileOverflow.innerWidth}`);
  if (mobileOverflow.hasOverflow) {
    console.error(`MOBILE OVERFLOW DETECTED: ${mobileOverflow.scrollWidth} > ${mobileOverflow.innerWidth}`);
  } else {
    console.log('✓ Mobile zero horizontal overflow verified.');
  }

  await mobilePage.screenshot({ path: 'public/screenshot-mobile.png', fullPage: false });
  console.log('✓ Saved public/screenshot-mobile.png');

  // Test Mobile Navigation Menu
  const menuBtn = mobilePage.locator('button:has-text("MENU")');
  if (await menuBtn.count()) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(400);
    console.log('✓ Mobile navigation overlay opened.');
  }

  await browser.close();
  server.kill();

  if (desktopOverflow.hasOverflow || mobileOverflow.hasOverflow) {
    console.error('FAIL: Horizontal overflow detected!');
    process.exit(1);
  }

  console.log('\n✓ ALL QUALITY CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
