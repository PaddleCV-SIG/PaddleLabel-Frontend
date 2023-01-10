/// <reference types="cypress" />
import { sampleIt } from '../support/sample';
import { detail, detailIt } from '../support/detail';
import { overview } from '../support/overview';
import { config } from '../support/config';
import { runTasks } from '../support/util';

describe('Test Import Export then Import Back', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  var datasets = [
    {
      path: '3rd_party/easydata/clas/single/sample-img-single-cls-annotated-folder/',
      category: 'classification',
      format: 'singleClass',
    },
    {
      path: '3rd_party/easydata/det/sample-obj-dct-annotated-voc/',
      category: 'detection',
      format: 'voc',
    },
    {
      path: '3rd_party/easydata/det/sample-obj-dct-annotated-coco/',
      category: 'detection',
      format: 'coco',
    },
    {
      path: '3rd_party/easydata/insseg/seg_coco_example/',
      category: 'instanceSegmentation',
      format: 'coco',
    },
    {
      path: '3rd_party/easydata/semseg/seg_coco_example/',
      category: 'semanticSegmentation',
      format: 'coco',
    },
    {
      path: '3rd_party/easydata/ocr/sample-img-paddle-ocr-txt-annotated/',
      category: 'opticalCharacterRecognition',
      format: 'txt',
    },
    { path: '3rd_party/labelme/rectangle/data_dataset_voc/', category: 'detection', format: 'voc' },
    {
      path: '3rd_party/labelme/insseg/data_dataset_coco/',
      category: 'instanceSegmentation',
      format: 'coco',
    },
    { path: '3rd_party/labelImg/voc/', category: 'detection', format: 'voc' },
    { path: '3rd_party/labelImg/yolo/', category: 'detection', format: 'yolo' },
    { path: '3rd_party/eiseg/insseg/coco/', category: 'instanceSegmentation', format: 'coco' },
    { path: '3rd_party/eiseg/semseg/coco/', category: 'semanticSegmentation', format: 'coco' },
    { path: '3rd_party/eiseg/semseg/gray/', category: 'semanticSegmentation', format: 'mask' },
    { path: '3rd_party/eiseg/semseg/pseudo/', category: 'semanticSegmentation', format: 'mask' },
    {
      path: '3rd_party/eiseg/semseg/eiseg_json/',
      category: 'semanticSegmentation',
      format: 'eiseg',
    },
    { path: '3rd_party/eiseg/det/coco/', category: 'detection', format: 'coco' },
    { path: '3rd_party/eiseg/det/voc/', category: 'detection', format: 'voc' },
    // { path: , category: , format: },
  ];
  console.log('asdf', Cypress.env('os'));
  if (Cypress.env('os') != undefined && Cypress.env('os').includes('windows'))
    for (const idx in datasets) datasets[idx].path = datasets[idx].path.replace('/', '\\');

  var pjId = 2;

  function* imports() {
    for (const [idx, dataset] of datasets.entries()) {
      yield detailIt.import(
        dataset.category,
        dataset.format,
        `${config.thirdPartyDir}/${dataset.path}`,
      );
      datasets[idx]['pjId'] = pjId;
      pjId += 1;
    }
  }

  function* exports() {
    for (const [idx, dataset] of datasets.entries()) {
      for (const expFormat of Object.keys(config.catgInfo[dataset.category])) {
        if (expFormat == 'eiseg') continue; // NOTE: This format doesn't support export

        let exportPath = `${config.thirdPartyDir}/export/${dataset.path}${expFormat}`;

        if (datasets[idx]['exports'] === undefined) datasets[idx]['exports'] = [];
        datasets[idx].exports.push({
          category: dataset.category,
          format: expFormat,
          path: exportPath,
        });

        yield {
          name: `Export ${dataset.path} ${dataset.category} pj to ${expFormat}`,
          func: () => {
            overview.export(dataset.pjId, exportPath, expFormat);
          },
        };
      }
    }
  }

  function* reImports() {
    for (const [idx, dataset] of datasets.entries())
      for (const exp of dataset.exports) {
        yield detailIt.import(exp.category, exp.format, exp.path);
      }
  }

  const tasks = [
    {
      name: 'Clear Projects',
      func: () => {
        cy.clearPjs();
      },
    },
    sampleIt.import('placeholder'),

    ...imports(),
    ...exports(),
    ...reImports(),
  ];
  runTasks(tasks);
});
