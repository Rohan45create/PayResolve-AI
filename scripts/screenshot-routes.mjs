import { chromium } from '../frontend/node_modules/playwright/index.mjs';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const frontendDir = path.resolve(projectRoot, 'frontend');

// Routes mapping to design PNGs
const ROUTES = [
  { name: 'landing', path: '/' },
  { name: 'signin', path: '/signin' },
  { name: 'forgot-password', path: '/forgot-password' },
  { name: 'check-email', path: '/check-email' },
  { name: 'reset-password', path: '/reset-password' },
  { name: 'password-updated', path: '/password-updated' },
  { name: 'signed-out', path: '/signed-out' },
  { name: 'queue', path: '/queue' },
  { name: 'case-workspace', path: '/case/PR-0142' },
  { name: 'events', path: '/events' },
  { name: 'demo-shop', path: '/shop' },
  { name: 'actions-audit', path: '/actions' },
  { name: 'benchmark', path: '/benchmark' },
  { name: 'sandbox-unreachable', path: '/status' },
  { name: 'empty-error-feedback-states', path: '/ui-states' },
  { name: 'loading-states', path: '/ui-states?tab=loading' },
  { name: '403-viewer-access', path: '/403' },
  { name: '404-not-found', path: '/404' },
  { name: '500-server-error', path: '/500' },
  { name: 'redirecting', path: '/redirecting' },
];

// Target directory for screenshots: /tmp/shots
const outputDir = process.platform === 'win32' ? 'C:\\tmp\\shots' : '/tmp/shots';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Saving screenshots to: ${outputDir}`);

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return true;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server failed to start at ${url} within ${timeoutMs}ms`);
}

async function run() {
  const PORT = 5173;
  const baseUrl = `http://localhost:${PORT}`;

  console.log('Starting Vite preview server...');
  const devServer = spawn('npm', ['run', 'preview', '--', '--port', String(PORT)], {
    cwd: frontendDir,
    shell: true,
    stdio: 'pipe',
  });

  devServer.stderr.on('data', (d) => process.stderr.write(d));

  try {
    await waitForServer(baseUrl);
    console.log(`Vite server running at ${baseUrl}`);

    const browser = await chromium.launch({ headless: true });

    for (const mode of ['light', 'dark']) {
      console.log(`\nCapturing [${mode.toUpperCase()}] mode screenshots at 1440px wide...`);
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: mode,
      });

      // Preset localStorage auth and theme
      await context.addInitScript((m) => {
        const user = {
          username: 'operator',
          role: 'operator',
          email: 'operator@payresolve.dev',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('payresolve_current_user', JSON.stringify(user));
        localStorage.setItem('payresolve_theme', m);
        localStorage.setItem('payresolve-theme', m);
        if (m === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, mode);

      const page = await context.newPage();

      for (const route of ROUTES) {
        const url = `${baseUrl}${route.path}`;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

          // Apply theme explicitly
          await page.evaluate((m) => {
            if (m === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }, mode);

          await page.waitForTimeout(400);

          const shotPath = path.join(outputDir, `${route.name}-${mode}.png`);
          await page.screenshot({ path: shotPath, fullPage: true });
          console.log(`  ✓ Saved: ${route.name}-${mode}.png`);
        } catch (err) {
          console.error(`  ✗ Failed route ${route.path}:`, err.message);
        }
      }

      await context.close();
    }

    await browser.close();
    console.log(`\nAll screenshots successfully saved to ${outputDir}`);
  } finally {
    devServer.kill();
  }
}

run().catch((err) => {
  console.error('Fatal error during screenshot generation:', err);
  process.exit(1);
});
