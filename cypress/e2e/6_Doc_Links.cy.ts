/// <reference types="cypress" />
import { config } from '../support/config';
import { detailIt } from '../support/detail';
import { welcomeIt } from '../support/welcome';

describe('Test Project Overview Page Functions on 8 Sample Datasets', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  var pjId = 2;
  var catgInfo = { ...config.catgInfo };

  const tasks = [welcomeIt.toReadme(), welcomeIt.toTrainKnoleget(), detailIt.toDoc()];

  for (const task of tasks) {
    if (Object.keys(task).includes('name')) it(task.name, task.func);
    else for (const subtask of task) it(subtask.name, subtask.func);
  }
});
