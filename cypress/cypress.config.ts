/// <reference types="cypress" />

import { defineConfig } from 'cypress';

export default defineConfig({
  env: { waitAfter: 0, failFast: true },
  e2e: {
    baseUrl: 'http://localhost:17995',
    // baseUrl: 'http://localhost:4321', // shouldn't have ending /
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
    video: false,
    defaultCommandTimeout: 10000,

    supportFile: './support/e2e.{js,jsx,ts,tsx}',
    specPattern: './e2e/**/*.cy.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          // fullPage screenshot size is 1400x1200 on non-retina screens
          // and 2800x2400 on retina screens
          launchOptions.args.push('--window-size=2300,1200');

          // force screen to be non-retina (1400x1200 size)
          launchOptions.args.push('--force-device-scale-factor=1');

          // force screen to be retina (2800x2400 size)
          // launchOptions.args.push('--force-device-scale-factor=2')
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // fullPage screenshot size is 1400x1200
          launchOptions.preferences.width = 1400;
          launchOptions.preferences.height = 1200;
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          // menubars take up height on the screen
          // so fullPage screenshot size is 1400x1126
          launchOptions.args.push('--width=2300');
          launchOptions.args.push('--height=1200');
        }

        return launchOptions;
      });
    },
  },
});
