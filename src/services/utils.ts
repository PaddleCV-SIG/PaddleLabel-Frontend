import { message } from 'antd';

import serviceUtils from '@/services/serviceUtils';
import type { Task, Project, Data } from '@/services';
import { ProjectApi, TaskApi, DataApi, AnnotationApi, LabelApi } from '@/services';
import { Configuration } from '@/services';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

const projectApi = new ProjectApi(config);
const taskApi = new TaskApi(config);
const dataApi = new DataApi(config);
const annotationApi = new AnnotationApi(config);
const labelApi = new LabelApi(config);

// TODO: all should default to undefined or []

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

  return { curr, change };
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
    console.log('remove project', project);
    if (typeof project == 'number') await projectApi.remove(project);
    else await projectApi.remove(project.projectId);
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

export const LabelUtils = (useState, { oneHot = true, pageOnSelect }) => {
  const [all, setAll] = useState<Label[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [isOneHot, setOneHot] = useState<bool>(oneHot);

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
    const idx = indexOf(label, all, 'labelId');
    setCurrIdx(idx);
    console.log('onehot', isOneHot);
    if (isOneHot) {
      for (const lab of all) lab.active = false;
      all[idx].active = true;
      console.log('all', all);
    } else {
      all[idx].active = !all[idx].active;
    }
    pageOnSelect(all[idx]);
    setAll([...all]);
  };

  const create = async (values) => {
    try {
      const newLabel = await labelApi.create(values);
      // getAll(values.projectId);
      newLabel.active = false;
      setAll([...all, newLabel]);
      return newLabel;
    } catch (err) {
      console.log('label create err', err);
      serviceUtils.parseError(err, message);
    }
  };
  const remove = async (label) => {
    console.log('remove label', label);
    try {
      await labelApi.remove(label.labelId);
      setAll(all.filter((lab) => lab.labelId != label.labelId));
    } catch (err) {
      console.log('label remove err', err);
      serviceUtils.parseError(err, message);
    }
  };

  const onModify = () => {};
  const toggleOneHot = () => {
    setOneHot(!isOneHot);
  };
  return {
    all,
    getAll,
    setAll,
    onSelect,
    create,
    remove,
    onModify,
    toggleOneHot,
    get curr() {
      if (currIdx == undefined) return undefined;
      return all[currIdx];
    },
  };
};

export const TaskUtils = (useState) => {
  const [all, setAll] = useState<Task[]>();
  const [currIdx, setCurrIdx] = useState<number>();

  const turnTo = (turnToIdx) => {
    // if (!all) {console.log("no all");return;}
    if (turnToIdx < 0) {
      message.error('This is the first image. No previous image.');
      return;
    }
    if (turnToIdx == all.length) {
      message.error('This is the final image. No next image.');
      return;
    }
    console.log('turning to', turnToIdx);
    setCurrIdx(turnToIdx);
  };

  const getAll = async (projectId: number, turnToIdx: number) => {
    try {
      const allRes = await projectApi.getTasks(projectId);
      setAll(allRes);
      if (turnToIdx != undefined) {
        console.log('getall turnto');
        turnTo(turnToIdx);
        return [allRes, allRes[turnToIdx]];
      }
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
      if (currIdx == undefined || all == undefined) return undefined;
      console.log('task.curr', all[currIdx]);
      return all[currIdx];
    },
  };
};

export const AnnotationUtils = (useState) => {
  const [all, setAll] = useState<Annotation[]>();
  // const [currIdx, setCurrIdx] = useState<number>();

  const getAll = async (dataId: number) => {
    try {
      const annRes = await dataApi.getAnnotations(dataId);
      await setAll(annRes);
      return annRes;
    } catch (err) {
      console.log('ann getAll err', err);
      serviceUtils.parseError(err, message);
    }
  };

  const create = async (values) => {
    console.log('create', values);
    try {
      const newAnn = await annotationApi.create(values);
      getAll(values.dataId);
      return newAnn;
    } catch (err) {
      console.log('annotation create err', err);
      serviceUtils.parseError(err, message);
    }
  };
  const remove = async (annotationId: number) => {
    try {
      annotationApi.remove(annotationId);
    } catch (err) {
      console.log('annotation remove err', err);
      serviceUtils.parseError(err, message);
    }
  };

  return { all, getAll, create, remove };
};

export const DataUtils = (useState) => {
  // const [curr, setCurr] = useState<Data>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [all, setAll] = useState<Data[]>([]);

  const turnTo = async (turnToIdx) => {
    setCurrIdx(turnToIdx);
  };

  const getAll = async (taskId: number, turnToIdx: number | undefined) => {
    try {
      const allRes = await taskApi.getDatas(taskId);
      setAll(allRes);
      if (turnToIdx != undefined) {
        turnTo(turnToIdx);
        return [allRes, allRes[turnToIdx]];
      }
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
      if (currIdx == undefined || all == undefined) return undefined;
      return all[currIdx];
    },
  };
};
