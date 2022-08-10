export const config = {
  sampleBaseDir: '~/.paddlelabel/sample/bear', // should not have ending /, don't forget to \\ on windows
  catgInfo: {
    classification: { singleClass: 0, multiClass: 0 },
    detection: { coco: 0, voc: 0 },
    semanticSegmentation: { mask: 0, polygon: 0 },
    instanceSegmentation: { mask: 0, polygon: 0 },
  },
};

export const runId = new Date().getTime().toString().slice(5, -3);
