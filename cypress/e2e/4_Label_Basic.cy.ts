/// <reference types="cypress" />
import { detailIt } from '../support/detail';
import { config } from '../support/config';
import { labelIt } from '../support/label';
import { sampleIt } from '../support/sample';

describe('Test Project Overview Page Functions on 8 Sample Datasets', () => {
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
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        yield detailIt.import(catg, labelFormat);
        catgInfo[catg][labelFormat] = pjId;
        pjId += 1;
      }
    }),

    ...Object.keys(catgInfo).map(function* (catg) {
      for (const labelFormat of Object.keys(catgInfo[catg])) {
        const currPjId = catgInfo[catg][labelFormat];

        if (labelFormat != 'coco' && labelFormat != 'polygon')
          yield labelIt.rmCatg(currPjId, catg, false, 0, 'inuse');
        else yield labelIt.rmCatg(currPjId, catg, false, 0, 'supercatg');

        yield labelIt.tour(currPjId, 4, catg, true, false);

        if (labelFormat != 'coco' && labelFormat != 'polygon')
          yield labelIt.rmCatg(currPjId, catg, true, 0, 'success');
        else {
          yield labelIt.rmCatg(currPjId, catg, true, 0, 'supercatg');
          yield labelIt.rmCatg(currPjId, catg, true, 1, 'success');
          yield labelIt.rmCatg(currPjId, catg, true, 0, 'success');
        }
      }
    }),
  ];

  for (const task of tasks) {
    if (Object.keys(task).includes('name')) it(task.name, task.func);
    else for (const subtask of task) it(subtask.name, subtask.func);
  }
});
