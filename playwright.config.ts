import fs from 'node:fs'
import { defineConfig, devices } from '@playwright/test'

// Cloud dev containers ship one Chromium at a fixed path and block browser
// downloads; use it when present. CI and laptops use Playwright's own browsers.
const preinstalled = '/opt/pw-browsers/chromium'
const launchOptions = fs.existsSync(preinstalled) ? { executablePath: preinstalled, args: ['--no-sandbox'] } : {}

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    launchOptions,
  },
  webServer: {
    command: 'pnpm build && pnpm start',
    port: 3000,
    reuseExistingServer: true,
    timeout: 180_000,
  },
  projects: [
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
  ],
})
