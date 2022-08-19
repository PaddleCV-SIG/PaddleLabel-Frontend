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
  runTasks(tasks);
});
