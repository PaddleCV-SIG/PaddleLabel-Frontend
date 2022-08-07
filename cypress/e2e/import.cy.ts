/// <reference types="cypress" />
import { sample, sampleIt } from '../support/sample';

describe('Test Import Samples', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  // it('Clear Projects', () => {
  //   cy.clearPjs();
  // });
  const projectCategories = [
    'classification',
    // 'detection',
    // 'semanticSegmentation',
    // 'instanceSegmentation',
  ];

  const tasks = [
    {
      name: 'Clear Projects',
      func: () => {
        cy.clearPjs();
      },
    },
    ...projectCategories.map((catg) => sampleIt.import(catg)),
    ...projectCategories.map((catg) => sampleIt.pjSettings(catg)),
  ];

  for (const task of tasks) {
    it(task.name, task.func);
  }
});
