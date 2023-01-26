/// <reference types="cypress" />
import { sampleIt } from '../support/sample';
import { runTasks } from '../support/util';

describe('Test Import Samples', () => {
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

  const projectCategories = [
    'classification',
    'detection',
    'semanticSegmentation',
    'instanceSegmentation',
    'opticalCharacterRecognition',
  ];

  const tasks = [
    {
      name: 'Clear Projects',
      func: () => {
        cy.clearPjs();
      },
    },
    sampleIt.import('placeholder'),
    ...projectCategories.map((catg) => sampleIt.import(catg)), // create
  ];

  runTasks(tasks);
});
