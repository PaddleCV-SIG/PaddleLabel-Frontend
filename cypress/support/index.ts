declare global {
  // eslint-disable-next-line
  namespace Cypress {
    interface Chainable {
      interrupt: () => void;
    }
  }
}

function abortEarly() {
  if (this.currentTest.state === 'failed') {
    return cy.task('shouldSkip', true);
  }
  cy.task('shouldSkip').then((value) => {
    if (value) return cy.interrupt();
  });
}
