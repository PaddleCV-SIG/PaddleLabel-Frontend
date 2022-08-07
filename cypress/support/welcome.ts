export const welcome = {
  on: () => {
    cy.onPage('welcome');
  },
  to: () => {
    cy.visit('/');
    welcome.on();
  },
};
