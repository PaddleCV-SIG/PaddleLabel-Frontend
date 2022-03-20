import { message } from 'antd';
import { history } from 'umi';

import serviceUtils from '@/services/serviceUtils';
import type { Task, Project, Data } from '@/services';
import { ProjectApi, TaskApi, DataApi, AnnotationApi, LabelApi } from '@/services';
import { Configuration } from '@/services';
import { DependencyList, Dispatch, EffectCallback, SetStateAction } from 'react';
import { Label } from '@/models/Label';
import { Annotation } from '@/models/Annotation';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

const projectApi = new ProjectApi(config);
const taskApi = new TaskApi(config);
const dataApi = new DataApi(config);
const annotationApi = new AnnotationApi(config);
const labelApi = new LabelApi(config);

export type UseStateType = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
export type UseEffectType = (effect: EffectCallback, deps?: DependencyList | undefined) => void;

// TODO: all should default to undefined or []
// TODO: check create for missing xxId

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

/*
if item is
- number, return idx where arr[idx].key == item
- object, return idx where arr[idx].key == item.key
*/
export const indexOf = (item: any, arr: any[], key: string) => {
  if (!key) return undefined;
  const toFind = typeof item == 'number' ? item : item[key];
  for (let idx = 0; idx < arr.length; idx++) {
    if (toFind == arr[idx][key]) return idx;
  }
  return undefined;
};

export const ScaleUtils = (useState: UseStateType, range: number[] = [0.1, 20]) => {
  const [curr, setCurr] = useState<number>(1);

  function setScale(scale: number) {
    let s = scale;
    if (s < range[0]) {
      s = range[0];
      message.error('Smallest scale is ' + range[0]);
    }
    if (s > range[1]) {
      s = range[1];
      message.error('Largest scale is ' + range[1]);
    }
    setCurr(s);
  }

  function change(delta: number) {
    setScale(curr + delta);
  }
  return { curr, change, setScale };
};

export const ProjectUtils = (useState: UseStateType) => {
  const [all, setAll] = useState<Project[]>();
  const [currIdx, setCurrIdx] = useState<number>();

  async function getAll() {
    try {
      const projects = await projectApi.getAll();
      setAll(projects);
      return projects;
    } catch (err) {
      console.log('project getAll err', err);
      serviceUtils.parseError(err, message);
      return;
    }
  }

  async function getCurr(projectId: string) {
    if (projectId == undefined) return undefined;
    if (all && all.length > 1) {
      message.error('Currently have multiple projects stored, use turnTo instead');
      return;
    }

    const project = await projectApi.get(projectId);
    setAll([project]);
    setCurrIdx(0);
    return project;
  }

  async function turnTo(turnToIdx: number) {
    setCurrIdx(turnToIdx);
    return all[turnToIdx];
  }

  async function remove(project: Project | number) {
    console.log('remove project', project);
    const projectId = typeof project == 'number' ? project : project.projectId;
    // if (typeof project == 'number') await projectApi.remove(project);
    // else await projectApi.remove(project.projectId);
    await projectApi.remove(projectId);
    getAll();
  }

  async function create(project: Project) {
    try {
      const newProject = await projectApi.create(project);
      return newProject;
    } catch (err) {
      console.log('project create err', err);
      return serviceUtils.parseError(err, message);
    }
  }

  async function update(projectId: number, project: Project) {
    projectApi
      .update(projectId, project)
      .then((res) => {
        console.log('project update res', res);
      })
      .catch((err) => {
        console.log('project update err ', err);
        serviceUtils.parseError(err, message);
      });
  }

  return {
    all,
    getAll,
    getCurr,
    turnTo,
    remove,
    create,
    update,
    get curr() {
      if (!all) return undefined;
      return all[currIdx];
    },
  };
};

export const LabelUtils = (
  useState: UseStateType,
  { oneHot = true, postSetCurr }: { oneHot: boolean; postSetCurr?: (label: Label) => void },
) => {
  const [all, setAll] = useState<Label[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [isOneHot, setOneHot] = useState<boolean>(oneHot);

  const getAll = async (projectId: number) => {
    try {
      const labelsRes: Label[] = await projectApi.getLabels(projectId);
      for (const lab of labelsRes) lab.active = false;
      setAll(labelsRes);
      return labelsRes;
    } catch (err) {
      console.log('label getall err ', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const setCurr = (label: Label | number) => {
    const idx = indexOf(label, all, 'labelId');
    if (idx == undefined) throw Error('undefined label idx');
    setCurrIdx(idx);
    if (isOneHot) {
      for (const lab of all) lab.active = false;
      all[idx].active = true;
      console.log('all', all);
    } else {
      all[idx].active = !all[idx].active;
    }
    if (postSetCurr) postSetCurr(all[idx]);
    setAll([...all]);
  };

  const create = async (label: Label) => {
    try {
      const newLabel: Label = await labelApi.create(label);
      // getAll(values.projectId);
      newLabel.active = false;
      setAll([...all, newLabel]);
      return newLabel;
    } catch (err) {
      console.log('label create err', err);
      return serviceUtils.parseError(err, message);
    }
  };
  const remove = async (label: Label) => {
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
    setCurr,
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

export const TaskUtils = (useState: UseStateType) => {
  const [all, setAll] = useState<Task[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [progress, setProgress] = useState<number>();

  const turnTo = (turnToIdx: number) => {
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

  const getAll = async (projectId: number, turnToIdx?: number) => {
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
      return serviceUtils.parseError(err, message);
    }
  };

  const getProgress = async (projectId: number): Promise<number> => {
    try {
      const stat = await projectApi.getProgress(projectId);
      if (!stat || stat.finished == undefined || stat.total == undefined)
        throw Error('empty progress');
      const prog = Math.ceil((stat.finished / stat.total) * 100);
      setProgress(prog);
      return prog;
    } catch (err) {
      console.log('get progress err', err);
      serviceUtils.parseError(err, message);
      return 0;
    }
  };

  const nextTask = async () => {
    turnTo(currIdx + 1);
    console.log('all tasks', all);
  };
  const prevTask = async () => {
    turnTo(currIdx - 1);
  };

  return {
    currIdx,
    all,
    turnTo,
    getAll,
    getProgress,
    progress,
    nextTask,
    prevTask,
    get curr() {
      if (currIdx == undefined || all == undefined) return undefined;
      console.log('task.curr', all[currIdx]);
      return all[currIdx];
    },
    get finished() {
      return Math.floor((all?.length * progress) / 100);
    },
  };
};

export const AnnotationUtils = (useState: UseStateType) => {
  const [all, setAll] = useState<Annotation[]>();
  const [currIdx, setCurrIdx] = useState<number | undefined>();

  const getAll = async (dataId: number) => {
    try {
      const annRes: Annotation[] = await dataApi.getAnnotations(dataId);
      for (const ann of annRes) ann.active = false;
      setAll(annRes);
      return annRes;
    } catch (err) {
      console.log('ann getAll err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const create = async (annotation: Annotation) => {
    console.log('create', annotation);
    try {
      const newAnn = await annotationApi.create(annotation);
      if (annotation.dataId) getAll(annotation.dataId);
      return newAnn;
    } catch (err) {
      console.log('annotation create err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const remove = async (annotation: number | Annotation) => {
    console.log('typeof', typeof annotation);
    const annId = typeof annotation != 'number' ? annotation.annotationId : annotation;
    try {
      if (annId) await annotationApi.remove(annId);
      setAll(all.filter((a) => a.annotationId != annId));
    } catch (err) {
      console.log('annotation remove err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const setCurr = async (annotation: Annotation | undefined, label: any) => {
    if (annotation == undefined) {
      setCurrIdx(undefined);
      return;
    }
    for (const ann of all) ann.active = false;
    const selected = all.filter((ann) => ann.annotationId == annotation.annotationId)[0];
    selected.active = !annotation.active;
    const idx = indexOf(selected, all, 'annotationId');
    setCurrIdx(idx);
    setAll([...all]);
    console.log('ann on select label', label);
    label.setCurr(annotation.labelId);
  };

  return {
    all,
    getAll,
    create,
    remove,
    setCurr,
    get curr() {
      if (!all || !currIdx) return undefined;
      return all[currIdx];
    },
  };
};

export const DataUtils = (useState: UseStateType) => {
  const [currIdx, setCurrIdx] = useState<number>();
  const [all, setAll] = useState<Data[]>([]);

  const turnTo = async (turnToIdx: number) => {
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
      return serviceUtils.parseError(err, message);
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
    get imgSrc() {
      if (all && all[currIdx]) {
        console.log(
          'imgsrc',
          `${baseUrl}/datas/${all[currIdx].dataId}/image?sault=${all[currIdx].sault}`,
        );
        return `${baseUrl}/datas/${all[currIdx].dataId}/image?sault=${all[currIdx].sault}`;
      }
      return ``;
    },
  };
};

export const PageInit = (
  useState: UseStateType,
  useEffect: UseEffectType,
  props: {
    effectTrigger?: any;
    label: { oneHot: boolean; postSetCurr?: (label: Label) => void };
  },
) => {
  if (!props.effectTrigger) props.effectTrigger = {};

  const [loading, setLoading] = useState<boolean>(false);
  const scale = ScaleUtils(useState);
  const task = TaskUtils(useState);
  const data = DataUtils(useState);
  const project = ProjectUtils(useState);
  //FIXME: What's the type of props.label?
  //REPLY: should be the same as the second parameter of LabelUtils. Maybe declear a type to use for both places?
  const label = LabelUtils(useState, props.label);
  const annotation = AnnotationUtils(useState);

  useEffect(() => {
    // onload, get project, label, task info
    const projectIdStr = serviceUtils.getQueryVariable('projectId');
    if (projectIdStr == undefined) {
      history.push('/');
      return;
    }
    const projectId = parseInt(projectIdStr);
    project.getCurr(projectIdStr).catch((err) => {
      serviceUtils.parseError(err, message);
      history.push('/');
      return;
    });
    label.getAll(projectId);
    task.getAll(projectId);
    task.getProgress(projectId);
    // }, [label, project, task]);
  }, []);

  useEffect(() => {
    // when all task is set, set current task
    if (task.all && task.all.length != 0) task.turnTo(0);
  }, [task.all]);

  useEffect(() => {
    // when current task is set, get task's data, data's annotation, toggle label active
    if (task.currIdx == undefined) return;

    const onTaskChange = async () => {
      console.log('onTaskChange', task.curr, label.all, task.progress);
      if (task.curr?.projectId) task.getProgress(task.curr.projectId);
      if (task.curr?.taskId) {
        const [allData, currData] = await data.getAll(task.curr.taskId, 0);

        console.log(allData);
        const allAnns = await annotation.getAll(currData.dataId);
        if (label.all) for (const lab of label.all) lab.active = false;
        if (props.effectTrigger.postTaskChange)
          props.effectTrigger.postTaskChange(label.all, allAnns);
      }

      setLoading(false);
    };
    onTaskChange();
    // }, [annotation, data, label.all, props.effectTrigger, task, task.currIdx]);
  }, [task.currIdx]);

  return [loading, setLoading, scale, annotation, task, data, project, label];
};
