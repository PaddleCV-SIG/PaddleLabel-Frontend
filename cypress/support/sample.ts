/// <reference types="cypress" />

/*
- import
- change pj settings
- split dataset
- label general
    - has annotation
    - change task
    - progress 4/4
    - zoom in and out
    - go to overview
    - move
    - save

- category
    - rm in use
    - new category
    - 
*/

import { detail } from './detail';

export const sample = {
  import: (sampleType: string) => {
    cy.onPage('welcome').then(() => {
      cy.g('pages.welcome.sampleProject').click();
    });

    cy.onPage('sample_project').then(() => {
      cy.g(`global.${sampleType}`).click();
    });

    cy.onPage('project_overview').then(() => {
      cy.get('.ant-empty-img-simple-path').should('not.exist'); // should have data
    });
  },
  toOverview: (sampleType: string) => {
    sample.import(sampleType);
    cy.get('.ant-empty-img-simple-path').should('not.exist'); // should have data
  },
};

export const sampleIt = {
  import: (sampleType: string) => {
    return {
      name: `Import ${sampleType} sample`,
      func: () => {
        sample.import(sampleType);
      },
    };
  },
  pjSettings: (sampleType: string) => {
    return {
      name: `Modify ${sampleType} sample pj setting`,
      func: () => {
        sample.toOverview(sampleType);
        cy.g('pages.projectOverview.projectSettings').click();
        detail.modify();
      },
    };
  },
};
