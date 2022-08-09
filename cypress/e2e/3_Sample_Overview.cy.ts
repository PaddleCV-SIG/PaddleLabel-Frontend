/// <reference types="cypress" />
import { detail, detailIt } from '../support/detail';
import { overview, overviewIt } from '../support/overview';
import { config, runId } from '../support/config';

describe('Test Project Overview Page Functions on 8 Sample Datasets', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  var pjId = 2;
  var catgInfo = { ...config.catgInfo };

  const tasks = [
    // {
    //   name: 'Clear Projects',
    //   func: () => {
    //     cy.clearPjs();
    //   },
    // },
    // detailIt.import('classification', 'singleClass', `${config.sampleBaseDir}/imgs`, true),

    // create 8 pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        // yield detailIt.import(catg, labelFormat);
        catgInfo[catg][labelFormat] = pjId;
        pjId += 1;
      }
    }),

    ...Object.keys(catgInfo).map(function* (catg) {
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        const currPjId = catgInfo[catg][labelFormat];
        yield overviewIt.split50(currPjId);
        yield overviewIt.split100(currPjId);
        yield overviewIt.export(currPjId, `${config.sampleBaseDir}/export/dummy`);
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
