export function camel2snake(name: string) {
  if (!name) return undefined;
  return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function notGithub404(url) {
  cy.wrap(url).should('not.be.undefined');
  cy.request(url);
}

export function notLocal404(url) {
  cy.wrap(url).should('not.be.undefined');
  cy.request(url).its('body').should('not.include', '404');
}

export function runTasks(tasks) {
  var flat = [];

  for (const task of tasks) {
    if (Object.keys(task).includes('name')) flat.push(task);
    else for (const subtask of task) flat.push(subtask);
  }
  console.log('flat.length', flat.length);

  const debugId = Date.now();
  for (let idx = 0; idx < flat.length; idx++) {
    const task = flat[idx];
    const name = `${task.name} ${debugId + idx}`;
    it(name, () => {
      cy.printDebugId(name);
      task.func();
      cy.wait(Cypress.env('waitAfter'));
    });
  }
}
