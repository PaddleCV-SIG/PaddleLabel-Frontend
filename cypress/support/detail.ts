import { welcome } from './welcome';
import { config } from './config';
import { overview } from './overview';
import { label } from './label';
import { runId } from './config';

export const detail = {
  on: () => {
    cy.onPage('project_detail');
  },
  to: (pjId: numbre) => {
    overview.to(pjId);
    cy.g('pages.projectOverview.projectSettings').click();
    detail.on();
  },
  modify: () => {
    const randName = (Math.random() + 1).toString(36);
    cy.onPage('project_detail').then(() => {
      cy.get('#name').clear().type(randName);
      cy.g('component.PPCreater.update').click();
    });

    cy.onPage('project_overview').then(() => {
      cy.get('.ant-empty-img-simple-path').should('not.exist');
      cy.g('pages.projectOverview.projectSettings').click();
    });

    cy.onPage('project_detail').then(() => {
      cy.get('#name').should('have.value', randName);
      cy.g('component.PPCreater.cancel').click();
    });
  },
  import: (projectType: string, labelFormat: string, datasetPath?: string) => {
    welcome.to();
    welcome.toCreate(projectType);
    const dpath =
      datasetPath != undefined
        ? datasetPath
        : `${config.sampleBaseDir}/${projectType}/${labelFormat}`;

    cy.get('#name').type(dpath);
    cy.get('#dataDir').type(dpath);
    cy.get('#description').type(dpath);
    cy.g(`global.labelFormat.${labelFormat}`).click();
    cy.g('component.PPCreater.create')
      .click()
      .wait(2000)
      .then(() =>
        cy.screenshot(
          runId + '/' + dpath.replace(config.sampleBaseDir, '').replace('/', '-').slice(1),
        ),
      );
    label.on(projectType);
  },
  changeType: (pjId: number, newType: string) => {
    detail.to(pjId);
    cy.g(`global.labelFormat.${newType}`).click().wait(500);
    cy.g('component.PPCreater.update').click();
    overview.on();
  },
};

export const detailIt = {
  import: (projectType: string, labelFormat: string, datasetPath?: string) => {
    return {
      name: `Import ${projectType} project in ${labelFormat} format`,
      func: () => detail.import(projectType, labelFormat, datasetPath),
    };
  },
  export: (projectType: string, labelFormat: string, datasetPath?: string) => {
    return {
      name: `Export ${projectType} project in ${labelFormat} format`,
      func: () => detail.export(projectId, exportFormat, exportPath),
    };
  },
};
