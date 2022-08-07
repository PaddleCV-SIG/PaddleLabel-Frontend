/// <reference types="cypress" />

import cypress from 'cypress';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// common funxs

Cypress.Commands.add('spyAllApiCalls', () => {
  cy.intercept('http://localhost:17995/api/**').as('apicalls');
});

Cypress.Commands.add('g', (testId) => {
  //   cy.wait(1000).then(() => {
  //     cy.get(`[data-test-id='${testId}']`);
  //   });
  cy.get(`[data-test-id='${testId}']`);
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
  cy.url().should('contain', urlPart).wait('@apicalls').wait(500);
  // .screenshot(`${screenshotFolder}/${urlPart}`);
});

// project overview

// project detail
// Cypress.Commands.add('detailModify', (sampleType: string) => {
//   const randName = (Math.random() + 1).toString(36).substring(7);
//   cy.onPage('project_detail').then(() => {
//     cy.get('#name').clear().type(randName);
//     cy.g('component.PPCreater.update').click();
//   });

//   cy.onPage('project_overview').then(() => {
//     cy.get('.ant-empty-img-simple-path').should('not.exist');
//     cy.g('pages.projectOverview.projectSettings').click();
//   });

//   cy.onPage('project_detail').then(() => {
//     cy.get('#name').should('have.value', randName);
//     cy.g('component.PPCreater.cancel').click();
//   });
// });

Cypress.Commands.add('asdf', (sampleType: string) => {
  cy.onPage('project_overview').then(() => {
    cy.get('.ant-empty-img-simple-path').should('not.exist'); // should have data
    cy.g('component.PPSplitDataset.title').click();
    cy.g('global.ok').should('be.visible');
    cy.g('basic_train').clear().type('30');
    cy.g('global.ok');

    // component.PPSplitDataset.success;
  });
});
