import { message } from 'antd';
import serviceUtils from '@/services/serviceUtils';

import { ProjectApi } from '@/services/apis/ProjectApi';
import { LabelApi } from '@/services/apis/LabelApi';
import { Configuration } from '@/services';
import { LabelFromJSON } from '@/services/models/Label';

const baseUrl = localStorage.getItem('basePath');
export const projectApi = new ProjectApi(
  new Configuration(baseUrl ? { basePath: baseUrl } : undefined),
);
export const labelApi = new LabelApi(
  new Configuration(baseUrl ? { basePath: baseUrl } : undefined),
);

// TODO: a more elegent way
export function toDict(arr) {
  return JSON.parse(JSON.stringify(arr));
}

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

// BUG: specify id type then cant use default value null, id becoms undefined
export function addLabel(projectId: number, label, callback) {
  console.log(projectId, label);
  const lab = LabelFromJSON(label);
  lab.projectId = projectId;

  lab.color = undefined;
  labelApi.create(lab).catch((err) => {
    serviceUtils.parseError(err, message); // TODO: error message has a : None?
  });
  callback();
}

export function getLabels(projectId: number, setLabels) {
  console.log(' getLabels ', projectId);
  if (!projectId) return;
  console.log('in');
  projectApi
    .getLabels(projectId)
    .then((res) => {
      console.log('getLabels ', res);
      setLabels(toDict(res));
    })
    .catch((err) => {
      serviceUtils.parseError(err, message);
    });
}
// export function updateLabel(labelId:number, name:string=undefined, color=undefined, id:number=undefined ) {
//
// }
//
// export function removeLabel(labelId:number) {
//
// }
