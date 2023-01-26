import { detail } from './detail';
import { notGithub404, notLocal404 } from './util';

export const welcome = {
  on: () => {
    cy.onPage('welcome');
  },
  to: () => {
    cy.visit('/');
    welcome.on();
  },
  toCreate: (projectType: string) => {
    cy.g(`global.${projectType}`).click();
    detail.on();
  },
  toTrainKnowledge: (type: string) => {
    let url = undefined;
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'open', (u) => {
          url = u;
        });
      },
    });
    welcome.on();
    cy.g('pages.welcome.' + type) // paddleClas
      .click()
      .wait(500)
      .then(() => {
        notLocal404(url);
      });
  },
};

export const welcomeIt = {
  toReadme: () => {
    return {
      name: 'Test welcome page to project homepage link not 404',
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
        cy.get("[class='anticon anticon-github']")
          .click()
          .wait(500)
          .then(() => {
            notGithub404(url);
          });
      },
    };
  },
  toTrainKnoleget: function* () {
    for (const type of ['paddleClas', 'paddleDet', 'paddleSeg', 'paddleX']) {
      yield {
        name: `Test ${type} training knowledge links not 404`,
        func: () => {
          welcome.toTrainKnowledge(type);
        },
      };
    }
  },
};
