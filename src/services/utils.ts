import { message } from 'antd';

import serviceUtils from '@/services/serviceUtils';
import type { Task, Project, Data } from '@/services';
import { ProjectApi, TaskApi } from '@/services';
import { Configuration } from '@/services';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

const projectApi = new ProjectApi(config);
const taskApi = new TaskApi(config);

/* helper functions */
// TODO: a more elegent way
export const toDict = (arr: any[]) => {
  return JSON.parse(JSON.stringify(arr));
};

export function snake2camel(name: string) {
  if (!name) return name;
  name
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
  return name;
}

export const indexOf = (item: any, arr: any[], key: string) => {
  if (!key) return undefined;
  for (let idx = 0; idx < arr.length; idx++) {
    if (item[key] == arr[idx][key]) return idx;
  }
  return undefined;
};

export const ScaleUtils = (useState, range: number[] = [0.1, 3]) => {
  const [curr, setCurr] = useState<number>(1);

  const change = (delta: number) => {
    let scale = curr;
    scale += delta;
    if (scale < range[0]) {
      scale = range[0];
      message.error('Smallest scale is ' + range[0]);
    }
    if (scale > range[1]) {
      scale = range[1];
      message.error('Largest scale is ' + range[1]);
    }
    setCurr(scale);
  };

  return {
    change,
    get scale() {
      return curr;
    },
  };
};

export const ProjectUtils = (useState) => {
  const [all, setAll] = useState<Project[]>([]);
  const [currIdx, setCurrIdx] = useState<number>();

  const getAll = async () => {
    try {
      const projectsRes = await projectApi.getAll();
      setAll(projectsRes);
      return projectsRes;
    } catch (err) {
      console.log('project getAll err', err);
      serviceUtils.parseError(err, message);
    }
  };

  const getCurr = async (projectId) => {
    if (projectId == undefined) return undefined;
    if (all.length > 1) {
      message.error('Currently have multiple projects stored, use turnTo instead');
      return;
    }

    try {
      const projectRes = await projectApi.get(projectId);
      setAll([projectRes]);
      setCurrIdx(0);
      return projectRes;
    } catch (err) {
      console.log('prject getcurr err', err);
      serviceUtils.parseError(err, message);
    }
  };

  const remove = async (project: Project | number) => {
    if (typeof project == 'number') projectApi.remove(project);
    else projectApi.remove(project.projectId);
    getAll();
  };

  const create = async (values) => {
    try {
      const newProject = await projectApi.create(values);
      console.log(newProject);
      return newProject;
    } catch (err) {
      console.log('project create err', err);
      serviceUtils.parseError(err, message);
    }
  };

  const update = async (projectId, values) => {
    projectApi
      .update(projectId, values)
      .then((res) => {
        console.log('project update res', res);
      })
      .catch((err) => {
        console.log('project update err ', err);
        serviceUtils.parseError(err, message);
      });
  };

  return {
    all,
    getAll,
    getCurr,
    remove,
    create,
    update,
    get curr() {
      if (currIdx == undefined) return undefined;
      return all[currIdx];
    },
  };
};

export const LabelUtils = (useState, { pageOnSelect }) => {
  const [all, setAll] = useState<Label[]>([]);
  const [currIdx, setCurrIdx] = useState<number>();

  const getAll = async (projectId: number) => {
    try {
      const labelsRes = await projectApi.getLabels(projectId);
      for (const lab of labelsRes) lab.active = false;
      setAll(labelsRes);
      return labelsRes;
    } catch (err) {
      console.log('label getall err ', err);
      serviceUtils.parseError(err, message);
    }
  };

  const onSelect = (label) => {
    setCurrIdx(idx, indexOf(lable, all, 'labelId'));
    const selected = all.filter((l) => l.labelId == label.labelId)[0];
    selected.active = !selected.active;
    pageOnSelect(selected);
    setAll([...all]);
  };

  const onAdd = () => {};
  const onDelete = () => {};
  const onModify = () => {};

  // reqLabels(projectId);
  return {
    all,
    getAll,
    onSelect,
    onAdd,
    onDelete,
    onModify,
    get curr() {
      if (currIdx == undefined) return undefined;
      return all[currIdx];
    },
  };
};

export const TaskUtils = (useState) => {
  const [all, setAll] = useState<Task[]>([]);
  const [currIdx, setCurrIdx] = useState<number>(0);

  const turnTo = (turnToIdx) => {
    console.log('turnto', all, turnToIdx);
    if (all.length == 0) return;
    if (turnToIdx == -1) {
      message.error('This is the first image. No previous image.');
      return;
    }
    if (turnToIdx == all.length) {
      message.error('This is the final image. No next image.');
      return;
    }
    setCurrIdx(turnToIdx);
  };

  const getAll = async (projectId: number, turnToIdx: number) => {
    try {
      const allRes = await projectApi.getTasks(projectId);
      setAll(allRes);
      if (turnToIdx != undefined) turnTo(turnToIdx);
      return allRes;
    } catch (err) {
      console.log('task getall err ', err);
      serviceUtils.parseError(err, message);
    }
  };

  return {
    currIdx,
    all,
    turnTo,
    getAll,
    get curr() {
      if (currIdx == undefined) return undefined;
      return all[currIdx];
    },
  };
};

export const AnnotationUtils = (useState) => {
  const [all, setAll] = useState<Annotation[]>([]);
  // const [currIdx, setCurrIdx] = useState<number>();

  const getAll = async (dataId: number) => {
    try {
      const annRes = dataApi.getAnnotations(dataId);
      setAll(annRes);
      return annRes;
    } catch (err) {
      console.log('ann getAll err', err);
      serviceUtils.parseError(err, message);
    }
  };

  return { all, getAll };
};

export const DataUtils = (useState) => {
  // const [curr, setCurr] = useState<Data>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [all, setAll] = useState<Data[]>([]);

  const turnTo = async (turnToIdx) => {
    setCurrIdx(turnToIdx);
  };

  const getAll = async (taskId: number, turnToIdx) => {
    try {
      const allRes = await taskApi.getDatas(taskId);
      if (turnToIdx != undefined) turnTo(turnToIdx);
      setAll(allRes);
      return allRes;
    } catch (err) {
      console.log('data getall err ', err);
      serviceUtils.parseError(err, message);
    }
  };

  return {
    all,
    getAll,
    turnTo,
    get curr() {
      if (all.length == 0) return undefined;
      return all[currIdx];
    },
  };
};
