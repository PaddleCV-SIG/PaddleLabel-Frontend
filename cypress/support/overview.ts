import { detail } from './detail';
import { label } from './label';

export const overview = {
  on: () => {
    cy.onPage('project_overview');

    cy.get('.ant-empty-img-simple-path', { timeout: 20000 }).should('not.exist'); // should have data
  },
  to: (pjId: number) => {
    cy.visit(`/#/static/project_overview?projectId=${pjId}`);
    overview.on();
  },
  toDetail: () => {
    cy.g('pages.projectOverview.projectSettings').click();
    detail.on();
  },
  toSplit: () => {
    cy.g('component.PPSplitDataset.title').click();
    cy.g('global.ok').should('be.visible');
  },
  toLabel: (projectType: string) => {
    cy.g('pages.projectOverview.label').first().click();
    label.on(projectType);
  },
  toExport: () => {
    cy.g('component.PPExportModal.title').click();
    cy.g('component.PPExportModal.export').should('be.visible');
  },
  split: (total: number) => {
    cy.get('#basic_train')
      .clear()
      .type((total - 40).toString());
    cy.g('global.ok').click();
    if (total == 100) {
      cy.g('component.PPSplitDataset.success').should('be.visible');
    } else {
      cy.g('component.PPSplitDataset.fail').should('be.visible');
    }
  },
  export: (pjId: number, exportPath: string) => {
    overview.to(pjId);
    overview.toExport();
    cy.get('#basic_path').type(exportPath);
    cy.g('component.PPExportModal.export').click();
    cy.g('component.PPExportModal.exportSuccess').should('be.visible');
  },
};

export const overviewIt = {
  split50: () => {
    return {
      name: `Test split sum to 50`,
      func: () => overview.split(50),
    };
  },
  split100: () => {
    return {
      name: `Test split sum to 50`,
      func: () => overview.split(100),
    };
  },
  to: (pjId: number) => {
    return {
      name: `Open overview of project ${pjId}`,
      func: () => overview.to(pjId),
    };
  },
  export: (pjId: number, exportPath: string) => {
    return {
      name: `Export pj ${pjId} to ${exportPath}`,
      func: () => {
        overviewIt.export(pjId, exportPath);
      },
    };
  },
};
