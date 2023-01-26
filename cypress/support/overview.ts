import { detail } from './detail';
import { label } from './label';

export const overview = {
  on: () => {
    cy.onPage('project_overview');
    // cy.get('.ant-empty-img-simple-path', { timeout: 20000 }).should('not.exist'); // should have data
    // cy.wait(1000);
    cy.g('test-overview', { timeout: 6000 })
      .should('have.attr', 'data-task-count')
      .and('not.undefined');
    cy.g('test-overview', { timeout: 6000 }).should('not.have.attr', 'data-task-count', '0');
  },
  to: (pjId: number) => {
    cy.visit(`/static/index.html#/static/project_overview?projectId=${pjId}`);
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
  toLabel: (projectType: string, skipAnnTest: boolean = false) => {
    cy.g('pages.projectOverview.label').first().click();
    label.on(projectType, skipAnnTest);
  },
  toExport: () => {
    cy.g('component.PPExportModal.title').click();
    cy.g('component.PPExportModal.export').should('be.visible');
  },
  split: (pjId: number, total: number) => {
    overview.to(pjId);
    overview.toSplit();
    cy.get('#basic_train')
      .clear()
      .type((total - 40).toString());
    cy.g('global.ok').click();
    if (total == 100) {
      cy.g('component.PPSplitDataset.success').should('be.visible');
    } else {
      cy.g('component.PPSplitDataset.fail').should('be.visible');
      cy.g('global.cancel').click();
    }
  },
  // export: (pjId: number, exportPath: string) => {
  //   overview.to(pjId);
  //   overview.toExport();

  //   // empty export path
  //   cy.g('component.PPExportModal.export').click();
  //   cy.g('component.PPExportModal.pathNotNull').should('be.visible');
  //   cy.g('component.PPExportModal.export').should('be.visible'); // modal shouldn't close

  //   // type not absolute path
  //   cy.get('#basic_path')
  //     .clear()
  //     .type('./' + exportPath);
  //   cy.g('component.PPExportModal.export').click();
  //   cy.contains('Only supports absolute path').should('be.visible');
  //   cy.g('component.PPExportModal.export').should('be.visible'); // modal shouldn't close

  //   // correct path, should success
  //   cy.get('#basic_path').clear().type(exportPath);
  //   cy.g('component.PPExportModal.export').click();
  //   cy.g('component.PPExportModal.exportSuccess').should('be.visible'); // should show success message
  //   cy.g('component.PPExportModal.export').should('not.be.visible'); // modal should close
  // },
  export: (pjId: number, exportPath: string, exportFormat: string) => {
    overview.to(pjId);
    overview.toExport();

    // empty export path
    cy.g('component.PPExportModal.export').click();
    cy.g('component.PPExportModal.nullPath').should('be.visible');
    cy.g('component.PPExportModal.export').should('be.visible'); // modal shouldn't close

    // input correct path
    cy.get('#basic_exportDir').clear().type(exportPath, { delay: 0 });

    // omit choosing export format
    cy.g('component.PPExportModal.nullLabelFormat').should('be.visible');
    cy.g('component.PPExportModal.export').should('be.visible'); // modal shouldn't close

    // choose format
    cy.g('global.labelFormat.' + exportFormat).click();

    if (exportPath.includes('semanticSegmentation') && exportFormat == 'mask')
      cy.g('global.segMaskType.grayscale').click();

    cy.g('component.PPExportModal.export').click();
    cy.g('component.PPExportModal.exportSuccess', { timeout: 10000 }).should('be.visible'); // should show success message
    cy.g('component.PPExportModal.export').should('not.be.visible'); // modal should close
  },
};

// todo: additional import

export const overviewIt = {
  split50: (pjId: number) => {
    return {
      name: `Test split sum to 50`,
      func: () => overview.split(pjId, 50),
    };
  },
  split100: (pjId: number) => {
    return {
      name: `Test split sum to 100`,
      func: () => overview.split(pjId, 100),
    };
  },
  to: (pjId: number) => {
    return {
      name: `Open overview of project ${pjId}`,
      func: () => overview.to(pjId),
    };
  },
  export: (pjId: number, exportPath: string, labelFormat: string) => {
    return {
      name: `Export pj ${pjId} to ${exportPath}`,
      func: () => {
        overview.export(pjId, exportPath, labelFormat);
      },
    };
  },
};
