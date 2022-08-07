import { detail } from './detail';

export const welcome = {
  on: () => {
    cy.onPage('welcome');
  },
  to: () => {
    cy.visit('/');
    welcome.on();
  },
  toCreate: (projectType: string) => {
    cy.g(`global.${projectType}`).click();
    detail.on();
  },
};
