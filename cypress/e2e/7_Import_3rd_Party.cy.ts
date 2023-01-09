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
    // {
    //   path: 'easydata/clas/single/sample-img-single-cls-annotated-folder/',
    //   category: 'classification',
    //   format: 'singleClass',
    // },

    // { path: 'easydata/det/sample-obj-dct-annotated-voc/', category: 'detection', format: 'voc' },
    // { path: 'easydata/det/sample-obj-dct-annotated-coco/', category: 'detection', format: 'coco' },
    // { path: 'easydata/insseg/seg_coco_example/', category: 'instanceSegmentation', format: 'coco' },
    { path: 'easydata/semseg/seg_coco_example/', category: 'semanticSegmentation', format: 'coco' },
    // {'path':'easydata/ocr/sample-img-paddle-ocr-txt-annotated/','category': ,'format':}
    // {'path':'labelme/rectangle/data_dataset_voc/','category': ,'format':}
    // {'path':'labelme/insseg/data_dataset_coco/','category': ,'format':}
    // {'path':'labelImg/voc/','category': ,'format':}
    // {'path':'labelImg/yolo/','category': ,'format':}
    // {'path':'eiseg/seg/coco/','category': ,'format':}
    // {'path':'eiseg/seg/gray/','category': ,'format':}
    // {'path':'eiseg/seg/eiseg_json/','category': ,'format':}
    // {'path':'eiseg/seg/pesudo/','category': ,'format':}
    // {'path':'eiseg/det/coco/','category': ,'format':}
    // {'path':'eiseg/det/voc/','category': ,'format':}
  ];

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

        let exportPath = `${config.thirdPartyDir}/export/${dataset.path}/${expFormat}`;

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
