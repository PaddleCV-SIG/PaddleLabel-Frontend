/// <reference types="cypress" />
import { config } from '../support/config';
import { detailIt } from '../support/detail';
import { runTasks } from '../support/util';
import { welcomeIt } from '../support/welcome';

describe('Test Project Overview Page Functions on 8 Sample Datasets', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });
  if (Cypress.env('failFast'))
    afterEach(function () {
      if (this.currentTest.state === 'failed') {
        Cypress.runner.stop();
      }
    });

  const tasks = [welcomeIt.toReadme(), welcomeIt.toTrainKnoleget(), detailIt.toDoc()];

  runTasks(tasks);
});
