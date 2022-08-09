/// <reference types="cypress" />

import cypress from 'cypress';
import { camel2snake } from './util.ts';

Cypress.Commands.add('spyAllApiCalls', () => {
  cy.intercept('http://localhost:17995/api/**').as('apicalls');
});

Cypress.Commands.add('g', (testId, params = {}) => {
  cy.get(`[data-test-id='${testId}']`, params);
});

Cypress.Commands.add('clearPjs', () => {
  cy.request('GET', 'http://localhost:17995/api/projects').then((res) => {
    console.log('res', res.body);
    for (const pj of res.body) {
      console.log('pj', pj);
      cy.request('DELETE', `http://localhost:17995/api/projects/${pj.project_id}`);
    }
  });
});

Cypress.Commands.add('onPage', (urlPart, screenshotFolder) => {
  const url_part = camel2snake(urlPart);
  cy.get('[data-icon="close-circle"]').should('not.exist');
  cy.url({ timeout: 15000 }).should('contain', url_part);
  cy.get('[data-icon="close-circle"]').should('not.exist');
  cy.wait('@apicalls', { timeout: 15000 });
  cy.get('[data-icon="close-circle"]').should('not.exist');
  cy.wait(500);
});
