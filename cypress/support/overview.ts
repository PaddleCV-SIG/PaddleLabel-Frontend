import { detail } from './detail';

export const overview = {
  on: () => {
    cy.onPage('sample_project').then(() =>
      cy.get('.ant-empty-img-simple-path').should('not.exist'),
    ); // should have data})
  },
  to: () => {},
  toDetail: () => {
    cy.g('pages.projectOverview.projectSettings').click();
    detail.on();
  },
  toSplit: () => {
    cy.g('component.PPSplitDataset.title').click();
    cy.g('global.ok').should('be.visible');
  },
  split: (total: number) => {
    cy.get('#basic_train')
      .clear()
      .type((total - 40).toString());
    cy.g('global.ok').click();
    if (total == 100) {
      cy.g('component.PPSplitDataset.success').should('be.visible');
    } else {
      cy.g('component.PPSplitDataset.fail').should('be.visible');
    }
  },
};

export const overviewIt = {
  split50: () => {
    return {
      name: `Test split sum to 50`,
      func: () => {},
    };
  },
  // split100:
};

// <div>
//   <div class="ant-message-notice">
//     <div class="ant-message-notice-content">
//       <div class="ant-message-custom-content ant-message-error">
//         <span role="img" aria-label="close-circle" class="anticon anticon-close-circle">
//           <svg
//             viewBox="64 64 896 896"
//             focusable="false"
//             data-icon="close-circle"
//             width="1em"
//             height="1em"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
//           </svg>
//         </span>
//         <span>
//           <p
//             data-inspector-line="8"
//             data-inspector-column="6"
//             data-inspector-relative-path="src/components/PPIntl/index.tsx"
//             data-test-id="component.PPSplitDataset.success"
//             style="display: inline;"
//           >
//             Dataset is randomly splitted
//           </p>
//         </span>
//       </div>
//     </div>
//   </div>
// </div>;
