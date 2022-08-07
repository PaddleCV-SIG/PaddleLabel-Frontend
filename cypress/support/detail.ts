export const detail = {
  on: () => {
    cy.onPage('project_detail');
  },
  to: () => {},
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
};
