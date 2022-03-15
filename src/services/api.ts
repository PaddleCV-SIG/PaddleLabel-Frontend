import { message } from 'antd';
import serviceUtils from '@/services/serviceUtils';

import { Configuration } from '@/services';
import { ProjectApi } from '@/services/apis/ProjectApi';
import { LabelApi } from '@/services/apis/LabelApi';
import { LabelFromJSON } from '@/services/models/Label';
import type { Label } from '@/services/models/Label';
import { DataApi } from '@/services/apis/DataApi';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

export const projectApi = new ProjectApi(config);
export const labelApi = new LabelApi(config);
export const dataApi = new DataApi(config);

/* helper functions */
// TODO: a more elegent way
export function toDict(arr: any[]) {
  return JSON.parse(JSON.stringify(arr));
}

/* task related*/

export function getProgress(projectId: number, setProgress): number {
  if (projectId == undefined) setProgress(0);
  // TODO: switch to getTasksStat
  projectApi
    .getTasks(projectId)
    .then((tasks) => {
      console.log(tasks);
      let finished = 0;
      for (const task of tasks) {
        if (task.annotations.length != 0) finished++;
      }
      console.log('res', finished, tasks.length, Math.ceil((finished / tasks.length) * 100));
      setProgress(Math.ceil((finished / tasks.length) * 100));
    })
    .catch((err) => {
      console.log(err);
      setProgress(0);
    });
}

export function addLabel(projectId: number, label, setLabels) {
  const lab = LabelFromJSON(label);
  lab.projectId = projectId;
  labelApi
    .create(lab)
    .then(() => {
      getLabels(projectId, setLabels);
    })
    .catch((err) => {
      serviceUtils.parseError(err, message); // TODO: error message has a : None?
    });
}

// export function updateLabel(labelId:number, name:string=undefined, color=undefined, id:number=undefined ) {
//
// }
//

// TODO: refresh is in pplabel onLabelDelete
export function deleteLabel(label: Label, setLabels) {
  console.log('delete label', label);
  labelApi
    .remove(label.labelId)
    .then(() => {
      message.error('Label ' + label.name + ' is deleted!');
      getLabels(label.projectId, setLabels);
    })
    .catch((err) => {
      serviceUtils.parseError(err, message);
    });
}

// export function getImgSrc(dataId:number, setImgSrc) {
//   console.log("getImages", dataId);
//   dataApi
//     .getImage(dataId)
//     .then((res) => {
//       console.log("get image", res);
//       setImgSrc();
//     })
//     .catch((err) => {
//       console.log("get image err", err);
//       serviceUtils.parseError(err, message);
//     });
// }
