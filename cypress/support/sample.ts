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
import { overview } from './overview';
import { welcome } from './welcome';
import { config } from './config';

export const sample = {
  on: () => {
    cy.onPage('sample_project');
  },
  to: () => {
    welcome.to();
    cy.g('pages.welcome.sampleProject').click();
    sample.on();
  },
  toOverview: (sampleType: string) => {
    cy.g(`global.${sampleType}`).click();
    overview.on();
  },
  import: (sampleType: string) => {
    if (sampleType == 'placeholder') {
      detail.import('classification', 'singleClass', `${config.sampleBaseDir}/placeholder`, true);
      return;
    }
    sample.to();
    sample.toOverview(sampleType);
    overview.on();
    overview.toLabel(sampleType);
    if (Cypress.env('screenshot')) {
      cy.get("canvas[id='canvasId']").first().should('have.attr', 'width').and('not.equal', '1'); // default value
      cy.get("canvas[id='canvasId']").first().should('have.attr', 'height').and('not.equal', '1'); // default value
      cy.wait(200); // TODO: remove this and find a more reliable way to wait for page is stable
      cy.screenshot({ disableTimersAndAnimations: false });
    }
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
  pjDetails: (sampleType: string) => {
    return {
      name: `Modify ${sampleType} sample pj details`,
      func: () => {
        sample.to();
        sample.toOverview(sampleType);
        overview.toDetail();
        detail.modify();
      },
    };
  },
  splitDataset: (sampleType: string) => {
    return {
      name: `Split dataset ${sampleType}`,
      func: () => {
        sample.to();
        sample.toOverview(sampleType);
        overview.toSplit();
        overview.split(50);
        overview.split(100);
      },
    };
  },
};
