/// <reference types="cypress" />
import { sampleIt } from '../support/sample';
import { detail, detailIt } from '../support/detail';
import { overview } from '../support/overview';
import { config, runId } from '../support/config';

describe('Test Import Export then Import Back', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  var pjId = 2;
  var catgInfo = { ...config.catgInfo };

  const tasks = [
    {
      name: 'Clear Projects',
      func: () => {
        cy.clearPjs();
      },
    },
    sampleIt.import('placeholder'),

    // create 8 pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      console.log('pjId', pjId);
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        yield detailIt.import(catg, labelFormat);
        catgInfo[catg][labelFormat] = pjId;
        pjId += 1;
      }
    }),
  ];

  for (const task of tasks) {
    if (Object.keys(task).includes('name')) it(task.name, task.func);
    // todo
    else for (const subtask of task) it(subtask.name, subtask.func);

    // it('Cool down', () => {
    //   cy.wait(5000);
    // });
  }
});
