/// <reference types="cypress" />

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:17995',
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,

    supportFile: './support/e2e.{js,jsx,ts,tsx}',
    specPattern: './e2e/**/*.cy.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
