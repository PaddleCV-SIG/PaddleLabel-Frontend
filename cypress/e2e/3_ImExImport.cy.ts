/// <reference types="cypress" />
import { sampleIt } from '../support/sample';
import { detail, detailIt } from '../support/detail';
import { overview } from '../support/overview';
import { config, runId } from '../support/config';
import { runTasks } from '../support/util';

describe('Test Import Export then Import Back', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });
  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      Cypress.runner.stop();
    }
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

    // create all pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      console.log('pjId', pjId);
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        yield detailIt.import(catg, labelFormat);
        catgInfo[catg][labelFormat] = pjId;
        pjId += 1;
      }
    }),

    // export all pjs in every format
    ...Object.keys(catgInfo).map(function* (catg) {
      for (const impFormat of Object.keys(catgInfo[catg]))
        for (const expFormat of Object.keys(catgInfo[catg])) {
          if (expFormat == 'eiseg') continue;
          const currPjId = catgInfo[catg][impFormat];
          const exportPath = `${config.sampleBaseDir}/export/${runId}/${catg}/${impFormat}2${expFormat}`;
          yield {
            name: `Export ${catg} ${impFormat} pj to ${expFormat}`,
            func: () => {
              overview.export(currPjId, exportPath, expFormat);
            },
          };
        }
    }),

    // import 16 pjs
    ...Object.keys(catgInfo).map(function* (catg) {
      for (const impFormat of Object.keys(catgInfo[catg]))
        for (const expFormat of Object.keys(catgInfo[catg])) {
          if (expFormat == 'eiseg') continue;
          pjId += 1;
          const dataPath = `${config.sampleBaseDir}/export/${runId}/${catg}/${impFormat}2${expFormat}`;
          yield {
            name: `Import ${catg} ${expFormat} pj`,
            func: () => detail.import(catg, expFormat, dataPath, expFormat != 'mask'),
          };
        }
    }),
  ];
  runTasks(tasks);
});
