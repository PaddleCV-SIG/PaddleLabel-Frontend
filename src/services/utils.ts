/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: remove this

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
    let s: number = scale;
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

export function LoadingUtils(useState: UseStateType) {
  const [curr, setCurr] = useState<bool>(false);
  return { curr, setCurr };
}

export const ProjectUtils = (useState: UseStateType) => {
  const [all, setAll] = useState<Project[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [progress, setProgress] = useState<number>();

  async function getAll() {
    try {
      const projects: Project[] = await projectApi.getAll();
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

    const project: Project = await projectApi.get(projectId);
    setAll([project]);
    setCurrIdx(0);
    return project;
  }

  // WARNING: untested
  async function turnTo(turnToIdx: number) {
    setCurrIdx(turnToIdx);
    return all[turnToIdx];
  }

  async function remove(project: Project | number) {
    console.log('remove project', project);
    const projectId: number = typeof project == 'number' ? project : project.projectId;
    await projectApi.remove(projectId);
    getAll();
  }

  async function create(project: Project) {
    try {
      const newProject: Project = await projectApi.create(project);
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

  async function getProgress(projectId: number = undefined): Promise<number> {
    try {
      const pjId = projectId == undefined ? all[currIdx].projectId : projectId;
      const stat = await projectApi.getProgress(pjId);
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
  }

  return {
    all,
    getAll,
    getCurr,
    turnTo,
    remove,
    create,
    update,
    progress,
    getProgress,
    get curr() {
      if (!all) return undefined;
      return all[currIdx];
    },
  };
};

/*
if oneHot = true, only one label can be active, else multiple can be activate at the same time
*/
export const LabelUtils = (
  useState: UseStateType,
  { oneHot = true, postSetCurr }: { oneHot: boolean; postSetCurr?: (label: Label) => void },
) => {
  const [all, setAll] = useState<Label[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  const [activeIds, setActiveIds] = useState(new Set());
  const [isOneHot, setOneHot] = useState<boolean>(oneHot);

  async function getAll(projectId: number) {
    if (projectId == undefined) return;
    try {
      const labels: Label[] = await projectApi.getLabels(projectId);
      setAll(labels);
      return labels;
    } catch (err) {
      console.log('label getall err ', err);
      return serviceUtils.parseError(err, message);
    }
  }

  function onSelect(label: Label | number) {
    const idx: number = indexOf(label, all, 'labelId');
    if (idx == undefined) throw Error('label.onSelect label not found');
    setCurrIdx(idx);
    const labelId: number = all[idx].labelId;
    if (isOneHot) {
      if (activeIds.has(labelId)) activeIds.clear();
      else {
        activeIds.clear();
        activeIds.add(labelId);
      }
    } else {
      if (activeIds.has(labelId)) activeIds.delete(labelId);
      else activeIds.add(labelId);
    }
    console.log('activeIds', activeIds);
    setActiveIds(new Set(activeIds));
    if (postSetCurr) postSetCurr(all[idx]);
  }

  function setCurr(label: Label | number) {
    if (!oneHot) throw Error("multi select task doesn't have current label");
    const labelId = typeof label == 'number' ? label : label.labelId;
    setCurrIdx(indexOf(labelId, all, 'labelId'));
    setActiveIds(new Set([labelId]));
  }

  function initActive(annotations: Annotation[]) {
    activeIds.clear();
    for (const ann of annotations) activeIds.add(ann.labelId);
  }

  const create = async (label: Label) => {
    try {
      const newLabel: Label = await labelApi.create(label);
      getAll(label.projectId);
      return newLabel;
    } catch (err) {
      console.log('label create err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  async function remove(label: Label | number) {
    const labelId = typeof label == 'number' ? label : label.labelId;
    try {
      await labelApi.remove(labelId);
      // setAll(all.filter((lab) => lab.labelId != label.labelId));
      if (all && all.length) getAll(all[0].projectId);
    } catch (err) {
      console.log('label remove err', err);
      serviceUtils.parseError(err, message);
    }
  }
  function isActive(label: Label | number) {
    const labelId = typeof label == 'number' ? label : label.labelId;
    return activeIds.has(labelId);
  }

  const toggleOneHot = (target: bool) => {
    if (target != undefined) setOneHot(target);
    else setOneHot(!isOneHot);
  };
  return {
    all,
    getAll,
    activeIds,
    initActive,
    onSelect,
    setCurr,
    isActive,
    create,
    remove,
    toggleOneHot,
    get curr() {
      if (all == undefined) return undefined;
      return all[currIdx];
    },
  };
};

export const TaskUtils = (useState: UseStateType) => {
  const [all, setAll] = useState<Task[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  // const [progress, setProgress] = useState<number>();

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
    // console.log('turning to', turnToIdx);
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

  function finished(progress: number = undefined) {
    if (progress == undefined) return 0;
    if (!all) return 0;
    return Math.round((all.length * progress) / 100);
  }

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
    nextTask,
    prevTask,
    finished,
    get curr() {
      if (currIdx == undefined || all == undefined) return undefined;
      // console.log('task.curr', all[currIdx]);
      return all[currIdx];
    },
  };
};

export function AnnotationUtils(
  useState: UseStateType,
  { label = undefined, project = undefined }: { label: any; project: any } = {},
) {
  const [all, setAll] = useState<Annotation[]>();
  const [currIdx, setCurrIdx] = useState<number | undefined>();
  // FIXME: : add type def
  const [activeIds, setActiveIds] = useState(new Set());

  const getAll = async (dataId: number) => {
    if (dataId == undefined) return;
    try {
      const annRes: Annotation[] = await dataApi.getAnnotations(dataId);
      setAll(annRes);
      return annRes;
    } catch (err) {
      console.log('ann getAll err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const create = async (annotation: Annotation) => {
    try {
      const newAnn = await annotationApi.create(annotation);
      let annRes = [];
      // sync anns from backend
      if (annotation.dataId) annRes = await getAll(annotation.dataId);
      // if currently 1 ann -> this is the first ann -> update progress
      if (project && annRes.length == 1) project.getProgress();
      return newAnn;
    } catch (err) {
      console.log('annotation create err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const remove = async (annotation: number | Annotation) => {
    const annId = typeof annotation == 'number' ? annotation : annotation.annotationId;
    if (annId == undefined) return;
    try {
      await annotationApi.remove(annId);
      // setAll(all.filter((a) => a.annotationId != annId));
      if (all && all.length) {
        const anns = await getAll(all[0].dataId);
        if (anns.length == 0) project.getProgress();
      }
    } catch (err) {
      console.log('annotation remove err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  const setCurr = async (annotation: Annotation | undefined) => {
    if (annotation == undefined) {
      setCurrIdx(undefined);
      return;
    }
    setCurrIdx(indexOf(annotation, all, 'annotationId'));
    setActiveIds(new Set([annotation.annotationId]));
    label.setCurr(annotation.labelId);
    console.log(
      indexOf(annotation, all, 'annotationId'),
      new Set([annotation.annotationId]),
      annotation.labelId,
    );
  };
  async function update(annotationId: number, annotation: Annotation) {
    annotationApi
      .update(annotationId, annotation)
      .then((res) => {
        console.log('annotation update res', res);
        getAll(annotation.projectId);
      })
      .catch((err) => {
        console.log('annotation update err ', err);
        serviceUtils.parseError(err, message);
      });
  }

  return {
    all,
    getAll,
    create,
    remove,
    setCurr,
    update,
    activeIds,
    get curr() {
      if (!all || !currIdx) return undefined;
      return all[currIdx];
    },
  };
}

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
        // console.log(
        //   'imgsrc',
        //   `${baseUrl}/datas/${all[currIdx].dataId}/image?sault=${all[currIdx].sault}`,
        // );
        return `${baseUrl}/datas/${all[currIdx].dataId}/image?sault=${all[currIdx].sault}`;
      }
      return ``;
    },
  };
};

// TODO: update progress when add first ann and remove last ann
export const PageInit = (
  useState: UseStateType,
  useEffect: UseEffectType,
  props: {
    effectTrigger?: any;
    label: { oneHot: boolean; postSetCurr?: (label: Label) => void };
    annotation: {};
  },
) => {
  if (!props.effectTrigger) props.effectTrigger = {};

  const loading = LoadingUtils(useState);
  const scale = ScaleUtils(useState);
  const task = TaskUtils(useState);
  const data = DataUtils(useState);
  const project = ProjectUtils(useState);
  //FIXME: What's the type of props.label?
  //REPLY: should be the same as the second parameter of LabelUtils. Maybe declear a type to use for both places?
  const label = LabelUtils(useState, props.label);
  const annotation = AnnotationUtils(useState, {
    ...props.annotation,
    label: label,
    project: project,
  });

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
    project.getProgress(projectId);
  }, []);

  useEffect(() => {
    // when all task is set, set current task
    if (task.all && task.all.length != 0) task.turnTo(0);
  }, [task.all]);

  useEffect(() => {
    // when current task is set, get task's data, data's annotation, toggle label active
    if (task.currIdx == undefined) return;

    const onTaskChange = async () => {
      if (task.curr?.projectId) project.getProgress(task.curr.projectId);
      if (task.curr?.taskId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [allData, currData] = await data.getAll(task.curr.taskId, 0);

        // console.log(allData);
        const allAnns = await annotation.getAll(currData.dataId);
        if (label.all) for (const lab of label.all) lab.active = false;
        if (props.effectTrigger.postTaskChange)
          props.effectTrigger.postTaskChange(label.all, allAnns);
      }
      loading.setCurr(false);
    };
    onTaskChange();
  }, [task.currIdx]);

  return [loading, scale, annotation, task, data, project, label];
};
