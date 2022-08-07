export const label = {
  on: (projectType: string) => {
    cy.onPage(projectType);
    cy.g('pages.toolBar.zoomIn').should('be.visible');
    cy.g('prevTask').should('be.visible');
    cy.g('stage-container')
      .should('have.attr', 'data-label-length')
      .and('not.undefined')
      .and('not.eq', '0')
      .then(cy.log);
    cy.g('stage-container')
      .should('have.attr', 'data-image-src')
      .and('not.undefined')
      .and('not.equal', '')
      .then(cy.log);
  },
};
