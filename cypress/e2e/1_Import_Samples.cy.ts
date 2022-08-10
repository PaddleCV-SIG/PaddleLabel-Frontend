/// <reference types="cypress" />
import { sampleIt } from '../support/sample';
import { config } from '../support/config';
import { detailIt } from '../support/detail';

describe('Test Import Samples', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  const projectCategories = [
    'classification',
    'detection',
    'semanticSegmentation',
    'instanceSegmentation',
  ];

  const tasks = [
    {
      name: 'Clear Projects',
      func: () => {
        cy.clearPjs();
      },
    },
    detailIt.import('classification', 'singleClass', `${config.sampleBaseDir}/img`, true),
    ...projectCategories.map((catg) => sampleIt.import(catg)), // create
  ];

  for (const task of tasks) {
    it(task.name, task.func);
  }
});
