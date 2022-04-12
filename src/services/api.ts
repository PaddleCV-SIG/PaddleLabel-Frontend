import { message } from 'antd';
import serviceUtils from '@/services/serviceUtils';

import { Configuration } from '@/services';
import { ProjectApi } from '@/services/apis/ProjectApi';
import { LabelApi } from '@/services/apis/LabelApi';
import { LabelFromJSON } from '@/services/models/Label';
import type { Label } from '@/services/models/Label';
import { DataApi } from '@/services/apis/DataApi';
import { TaskApi } from '@/services/apis/TaskApi';
import { AnnotationApi } from '@/services/apis/AnnotationApi';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

export const projectApi = new ProjectApi(config);
export const labelApi = new LabelApi(config);
export const dataApi = new DataApi(config);
export const taskApi = new TaskApi(config);
export const annotationApi = new AnnotationApi(config);

/* helper util functions */
// TODO: a more elegent way
export function toDict(arr: any[]) {
  return JSON.parse(JSON.stringify(arr));
}
export const indexOf = (item: any, arr: any[], key: string) => {
  if (!key) return -1;
  for (let idx = 0; idx < arr.length; idx++) {
    if (item[key] == arr[idx][key]) return idx;
  }
  return -1;
};

/* project related*/
export async function getProjects(setProjects) {
  projectApi
    .getAll()
    .then((projects) => {
      console.log('get all projects', toDict(projects));
      setProjects(toDict(projects)); // TODO: get dict instead of object
    })
    .catch((err) => {
      serviceUtils.parseError(err, message);
    });
}
export async function getProject(projectId, setProject = null) {
  console.log('get project id ', projectId);
  projectApi
    .get(projectId)
    .then((project) => {
      console.log('getProject res', project);
      if (setProject) setProject(project);
      return project;
    })
    .catch((err) => {
      console.log('getProject err', err);
      serviceUtils.parseError(err, message);
    });
}
export async function deleteProject(projectId: number, setProjects) {
  console.log('delete pj, pjid', projectId);
  projectApi
    .remove(projectId)
    .then((res) => {
      console.log('delete project', res);
      getProjects(setProjects);
    })
    .catch((err) => {
      console.log(err);
      serviceUtils.parseError(err, message);
    });
}

/* task related*/
export async function getTasks(setTasks) {
  taskApi
    .getAll()
    .then((tasks) => {
      console.log('got tasks', tasks);
      if (setTasks) setTasks(tasks);
    })
    .catch((err) => {
      console.log('get tasks err', err);
      serviceUtils.parseError(err, message);
    });
}

export async function getTask(taskId: number, setTask) {
  console.log('get task id', taskId);
  taskApi.get(taskId).then((task) => {
    console.log('got task ', task);
    if (setTask) setTask(task);
  });
}

export async function getProgress(projectId: number): number {
  if (!projectId) return 0;
  // TODO: switch to getTasksStat
  try {
    const tasks = await projectApi.getTasks(projectId);
    let finished = 0;
    for (const task of tasks) {
      if (task.annotations.length != 0) finished++;
    }
    console.log('progress', Math.ceil((finished / tasks.length) * 100));
    return Math.ceil((finished / tasks.length) * 100);
  } catch (err) {
    console.log('get progress err', err);
    serviceUtils.parseError(err, message);
    return 0;
  }
}

/* label related*/

export function getLabels(projectId: number, setLabels) {
  console.log('getLabels projectid', projectId);
  if (!projectId) return;
  projectApi
    .getLabels(projectId)
    .then((res) => {
      console.log('got labels ', res);
      setLabels(toDict(res));
    })
    .catch((err) => {
      serviceUtils.parseError(err, message);
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

// /* data related */
// export async function getData(dataId:number, setData) {
//   dataApi
//     .get(dataId)
//     .then((res)=>{
//       if(setDataId)
//         setDataId(res)
//     })
// }
