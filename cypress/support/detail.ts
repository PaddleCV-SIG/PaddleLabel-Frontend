import { welcome } from './welcome';
import { config } from './config';
import { overview } from './overview';
import { label } from './label';
import { notLocal404 } from './util';

export const detail = {
  on: () => {
    cy.onPage('project_detail');
  },
  to: (pjId: numbre) => {
    overview.to(pjId);
    cy.g('pages.projectOverview.projectSettings').click();
    detail.on();
  },
  // DEPCRATED:
  modify: () => {
    const randName = (Math.random() + 1).toString(36);
    cy.onPage('project_detail').then(() => {
      cy.get('#name').clear().type(randName, { delay: 0 });
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
  import: (
    projectType: string,
    labelFormat: string,
    datasetPath?: string,
    skipAnnTest: boolean = false,
    screenshot: boolean = false,
  ) => {
    welcome.to();
    welcome.toCreate(projectType);
    cy.g('component.PPCreater.create', { timeout: 10000 }).should('exist');
    var dpath =
      datasetPath != undefined
        ? datasetPath
        : `${config.sampleBaseDir}/${projectType}/${labelFormat}`;
    if (Cypress.env('os') != undefined && Cypress.env('os').includes('win'))
      dpath = dpath.replaceAll('/', '\\\\');

    const name = dpath.replace(config.sampleBaseDir, '').replace(config.thirdPartyDir, '3rd_party');
    cy.get('#name').type(name, { delay: 0 });
    cy.get('#dataDir').type(dpath, { delay: 0 });
    cy.get('#description').type(name, { delay: 0 });
    cy.g(`global.labelFormat.${labelFormat}`).click();
    cy.g('component.PPCreater.create').click();
    cy.onPage(projectType, false);

    label.on(
      projectType,
      dpath.includes('mask_out_coco_in') ||
        dpath.includes('semseg/pseudo/coco') ||
        dpath.includes('semseg/gray/coco'),
    ); // mask to polygon will be empty pj

    if (Cypress.env('screenshot')) {
      cy.wait(200); // TODO: remove this and find a more reliable way to wait for page is stable
      cy.screenshot({ disableTimersAndAnimations: false });
    }
  },
  changeType: (pjId: number, newType: string) => {
    detail.to(pjId);
    cy.g(`global.labelFormat.${newType}`).click().wait(500);
    cy.g('component.PPCreater.update').click();
    overview.on();
  },
};

export const detailIt = {
  import: (
    projectType: string,
    labelFormat: string,
    datasetPath?: string,
    skipAnnTest: boolean = false,
  ) => {
    return {
      name: `Import ${projectType} project in ${labelFormat} format`,
      func: () => detail.import(projectType, labelFormat, datasetPath, skipAnnTest),
    };
  },

  toDoc: function* () {
    for (const type of [
      'classification',
      'detection',
      'semanticSegmentation',
      'instanceSegmentation',
    ]) {
      yield {
        name: `Test ${type} doc not 404`,
        func: () => {
          let url = undefined;
          cy.visit('/', {
            onBeforeLoad(win) {
              cy.stub(win, 'open', (u) => {
                url = u;
              });
            },
          });
          welcome.on();
          welcome.toCreate(type);
          cy.g('projectDetailDoc').find('svg').click().wait(200);
          cy.g('component.PPCreater.titleContent')
            .click()
            .then(() => {
              notLocal404(url);
            });
        },
      };
    }
  },
};
