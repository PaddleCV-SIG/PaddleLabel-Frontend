import { welcome } from './welcome';
import { config } from './config';
import { overview } from './overview';
import { label } from './label';
import { runId } from './config';
import { notGithub404 } from './util';

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
  import: (
    projectType: string,
    labelFormat: string,
    datasetPath?: string,
    skipAnnTest: boolean = false,
    screenshot: boolean = false,
  ) => {
    welcome.to();
    welcome.toCreate(projectType);
    const dpath =
      datasetPath != undefined
        ? datasetPath
        : `${config.sampleBaseDir}/${projectType}/${labelFormat}`;
    const name = dpath.replace(config.sampleBaseDir, '');
    cy.get('#name').type(name);
    cy.get('#dataDir').type(dpath);
    cy.get('#description').type(name);
    cy.g(`global.labelFormat.${labelFormat}`).click();
    // if (projectType == 'semanticSegmentation' && labelFormat == 'mask')
    //   cy.g('global.segMaskType.pesudo').should('be.visible');
    cy.g('component.PPCreater.create')
      .click()
      .wait(2000)
      .then(() =>
        cy.screenshot(
          runId +
            '/' +
            dpath.replace(config.sampleBaseDir, '').replace('/', '-').slice(1) +
            '_afterImport',
        ),
      );
    if (!dpath.includes('polygon2mask')) label.on(projectType, skipAnnTest); // polygon2mask will be empty pj
    cy.wait(1000).then(() =>
      cy.screenshot(
        runId + '/' + dpath.replace(config.sampleBaseDir, '').replace('/', '-').slice(1) + '_label',
      ),
    );
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
              // notGithub404(url);
              cy.get('This site uses Just the Docs, a documentation theme for Jekyll.');
            });
        },
      };
    }
  },
};
