/// <reference types="cypress" />
import { sampleIt } from '../support/sample';
import { detail, detailIt } from '../support/detail';
import { overview, overviewIt } from '../support/overview';
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
    detailIt.import('classification', 'singleClass', `${config.sampleBaseDir}/img`, true),

    // create 8 pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      console.log('pjId', pjId);
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        yield detailIt.import(catg, labelFormat);
        catgInfo[catg][labelFormat] = pjId;
        pjId += 1;
      }
    }),

    // export 16 pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      for (const impFormat of Object.keys(catgInfo[catg]))
        for (const expFormat of Object.keys(catgInfo[catg])) {
          const currPjId = catgInfo[catg][impFormat];
          const exportPath = `${config.sampleBaseDir}/export/${runId}/${catg}/${impFormat}2${expFormat}`;
          yield {
            name: `Export ${catg} ${impFormat} pj to ${expFormat}`,
            func: () => {
              detail.changeType(currPjId, expFormat);
              overview.export(currPjId, exportPath);
            },
          };
        }
    }),

    // import 16 pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      for (const impFormat of Object.keys(catgInfo[catg]))
        for (const expFormat of Object.keys(catgInfo[catg])) {
          pjId += 1;
          const dataPath = `${config.sampleBaseDir}/export/${runId}/${catg}/${impFormat}2${expFormat}`;
          yield {
            name: `Import ${catg} ${expFormat} pj`,
            func: () => detail.import(catg, expFormat, dataPath, expFormat != 'mask'),
          };
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
