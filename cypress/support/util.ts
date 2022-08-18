export function camel2snake(name: string) {
  if (!name) return undefined;
  return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function notGithub404(url) {
  cy.wrap(url).should('not.be.undefined');
  cy.request(url);
}
