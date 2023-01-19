import { overview } from './overview';

export const label = {
  on: (projectType: string, skipAnnTest: boolean = false, allowError: boolean = false) => {
    cy.onPage(projectType, allowError);
    cy.g('pages.toolBar.zoomIn', { timeout: 6000 }).should('be.visible');
    cy.g('prevTask').should('be.visible');

    if (!skipAnnTest) {
      cy.g('stage-container', { timeout: 6000 })
        .should('have.attr', 'data-label-length')
        .and('not.undefined');
      cy.g('stage-container', { timeout: 6000 })
        .should('not.have.attr', 'data-label-length', '0')
        .then(cy.log);
    }

    cy.g('stage-container').should('have.attr', 'data-image-src').and('not.undefined');
    // cy.g('stage-container').should('not.equal', '').then(cy.log);
  },
  to: (projectId: number, projectType: string, skipAnnTest: boolean = false) => {
    overview.to(projectId);
    overview.toLabel(projectType, skipAnnTest);
  },
  next: (projectType: string, skipAnnTest: boolean = false, allowError: boolean = false) => {
    cy.g('nextTask').click();
    label.on(projectType, skipAnnTest, allowError);
  },
  prev: (projectType: string, skipAnnTest: boolean = false, allowError: boolean = false) => {
    cy.g('prevTask').click();
    label.on(projectType, skipAnnTest, allowError);
  },
  clear: () => {
    cy.g('pages.toolBar.clearMark').click();
    cy.g('stage-container', { timeout: 15000 })
      .should('have.attr', 'data-label-length')
      .and('not.undefined');
    cy.g('stage-container', { timeout: 15000 })
      .should('have.attr', 'data-label-length', '0')
      .then(cy.log);
    cy.g('pages.toolBar.saveSuccess').should('be.visible');
  },
  rmCatg: (ith: number = 0, expect: string = 'success') => {
    cy.g(`deleteCategory-${ith}`).click();
    if (expect == 'success') {
      cy.g(`component.label.deleteSuccess`).should('be.visible');
      return;
    }
    if (expect == 'inuse') {
      cy.contains("Can't delete label").should('be.visible');
      cy.contains('with annotation record').should('be.visible');
      return;
    }
    if (expect == 'supercatg') {
      cy.contains("Can't delete label").should('be.visible');
      cy.contains('which is super category to other labels').should('be.visible');
      return;
    }
  },
};

export const labelIt = {
  to: (projectId: number, projectType: string, skipAnnTest: boolean = false) => {
    return {
      name: `Go to label page of project ${projectId}`,
      func: () => label.to(projectId, projectType, skipAnnTest),
    };
  },
  rmCatg: (
    projectId: number,
    projectType: string,
    skipAnnTest: boolean = false,
    ith: number = 0,
    expect: string = 'success',
  ) => {
    return {
      name: `Remove project ${projectId} category ${ith} and expect ${expect}`,
      func: () => {
        label.to(projectId, projectType, skipAnnTest);
        label.rmCatg(ith, expect);
      },
    };
  },
  tour: (
    projectId: number,
    taskCount: number,
    projectType: string,
    clear: boolean = false,
    skipAnnTest: boolean = false,
  ) => {
    return {
      name: `Tour project ${projectId}, ${clear ? 'clear' : 'wont clear'} anns`,
      func: () => {
        label.to(projectId, projectType, skipAnnTest);
        // cy.wait(1000);
        for (var idx = 1; idx < taskCount; idx++) {
          if (clear) label.clear();
          console.log('asdf', skipAnnTest, idx, taskCount - 1, skipAnnTest || idx != taskCount - 1);
          label.next(projectType, skipAnnTest || idx == taskCount - 1);
        }
        if (clear) label.clear();
        cy.wait(2000);
        label.next(projectType, true, true);
        cy.g('pages.toolBar.task.noNext').should('be.visible');
        cy.wait(2000);
        for (var idx = 1; idx < taskCount; idx++) {
          label.prev(projectType, true);
        }
        cy.wait(2000);
        label.prev(projectType, true, true);
        cy.g('pages.toolBar.task.noPrev').should('be.visible');
      },
    };
  },
};
