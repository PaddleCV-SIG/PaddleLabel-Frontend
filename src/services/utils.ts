/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: remove this

import { message } from 'antd';
import serviceUtils from '@/services/serviceUtils';
import type { Task, Project, Data } from '@/services';
import { ProjectApi, TaskApi, DataApi, AnnotationApi, LabelApi } from '@/services';
import { Configuration } from '@/services';
import { DependencyList, Dispatch, EffectCallback, SetStateAction } from 'react';
import { Label } from '@/models/Label';
import type { ToolType, Annotation } from '@/models/Annotation';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

const projectApi = new ProjectApi(config);
const taskApi = new TaskApi(config);
const dataApi = new DataApi(config);
const annotationApi = new AnnotationApi(config);
const labelApi = new LabelApi(config);

export type UseStateType = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
export type UseEffectType = (effect: EffectCallback, deps?: DependencyList | undefined) => void;

export const createInfo = {
  classification: {
    name: 'Image Classification',
    avatar: './pics/classification.jpg',
    id: 1,
  },
  detection: { name: 'Detection', avatar: './pics/object_detection.jpg', id: 2 },
  semanticSegmentation: {
    name: 'Semantic Segmentation',
    avatar: './pics/semantic_segmentation.jpg',
    id: 3,
  },
  instanceSegmentation: {
    name: 'Instance Segmentation',
    avatar: './pics/instance_segmentation.jpg',
    id: 4,
  },
  keypointDetection: {
    name: 'Keypoint Detection',
    avatar: './pics/keypoint_detection.jpg',
    id: 5,
  },
};

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

export function camel2snake(name: string) {
  if (!name) return name;
  return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
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

export function ToolUtils(useState, { defaultTool }: { defaultTool: ToolType }) {
  const [curr, setCurr] = useState<ToolType>(defaultTool);
  return {
    curr,
    setCurr,
  };
}

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
      console.log('label getall:', labels);
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
    setActiveIds(new Set(activeIds));
    if (postSetCurr) postSetCurr(all[idx]);
  }

  function setCurr(label: Label | number) {
    console.log('LabelUtils setCurr', label);
    if (!oneHot) return;
    if (!label) return;
    let labelId = typeof label == 'number' ? label : label.labelId;
    labelId = indexOf(labelId, all, 'labelId');
    if (labelId != undefined) {
      console.log('LabelUtils setCurr index:', labelId);
      setCurrIdx(labelId);
      setActiveIds(new Set([label]));
    }
  }

  function initActive(annotations: Annotation[]) {
    activeIds.clear();
    for (const ann of annotations) activeIds.add(ann.labelId);
  }

  async function create(label: Label) {
    console.log('create label', label);

    try {
      const newLabel: Label = await labelApi.create(label);
      getAll(label.projectId);
      return newLabel;
    } catch (err) {
      console.log('label create err', err);
      return serviceUtils.parseError(err, message);
    }
  }

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

  const toggleOneHot = (target: boolean) => {
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

  const turnTo = (turnToIdx: number) => {
    if (!all) return false;
    if (turnToIdx < 0) {
      message.error('This is the first image. No previous image.');
      return false;
    }
    if (turnToIdx == all.length) {
      message.error('This is the final image. No next image.');
      return false;
    }
    setCurrIdx(turnToIdx);
    return true;
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

  const nextTask = () => {
    return turnTo(currIdx + 1);
  };
  const prevTask = () => {
    return turnTo(currIdx - 1);
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
      return all[currIdx];
    },
  };
};

export function AnnotationUtils(
  useState: UseStateType,
  { label = undefined, project = undefined }: { label: any; project: any },
) {
  const [all, setAll] = useState<Annotation[]>();
  const [curr, setCurrRaw] = useState<Annotation | undefined>();

  const getAll = async (dataId: number) => {
    console.log('AnnotationUtils getAll, dataId:', dataId);
    if (dataId == undefined) return [];
    try {
      const annRes: Annotation[] = await dataApi.getAnnotations(dataId);
      console.log('AnnotationUtils getAll, annRes:', annRes);
      setAll(annRes);
      return annRes;
    } catch (err) {
      console.log('AnnotationUtils ann getAll err', err);
      serviceUtils.parseError(err, message);
      return [];
    }
  };

  const create = async (annotation: Annotation, refresh: boolean = false) => {
    console.log('create label', annotation.label);

    try {
      if (annotation.label) annotation.labelId = annotation.label.labelId;
      annotation.label = undefined;
      const newAnn = await annotationApi.create(annotation);
      setCurr(newAnn);
      let annRes: Annotation[] = [];
      // sync anns from backend
      if (annotation.dataId) annRes = await getAll(annotation.dataId);
      // if currently 1 ann -> this is the first ann -> update progress
      if (project && annRes.length == 1) project.getProgress();
    } catch (err) {
      console.log('annotation create err', err);
      return serviceUtils.parseError(err, message);
    }
  };

  async function remove(annotation: number | Annotation) {
    console.log('remove', annotation);

    const annId = typeof annotation == 'number' ? annotation : annotation.annotationId;
    if (annId == undefined) return;
    try {
      await annotationApi.remove(annId);
      if (all && all.length && all[0].dataId!) {
        const anns = await getAll(all[0].dataId);
        if (anns.length == 0) project.getProgress();
      }
    } catch (err) {
      console.log('annotation remove err', err);
      return serviceUtils.parseError(err, message);
    }
  }

  async function setCurr(annotation: Annotation | undefined) {
    console.log('annotation setcurr', annotation, 'all', all);
    if (annotation == undefined) {
      setCurrRaw(undefined);
      return;
    }
    setCurrRaw(annotation);
    label.setCurr(annotation.labelId);
  }

  async function update(annotation: Annotation) {
    if (!annotation.annotationId) return [];
    annotation.taskId = undefined;
    if (annotation.label) annotation.labelId = annotation.label?.labelId;
    annotation.label = undefined;
    annotationApi
      .update(annotation.annotationId, annotation)
      .then((res) => {
        console.log('annotation update res', res);
        setCurr(annotation);
        return getAll(annotation.dataId);
      })
      .catch((err) => {
        console.log('annotation update err ', err);
        serviceUtils.parseError(err, message);
        return [];
      });
  }

  async function modify(annotation: Annotation) {
    if (!annotation) return undefined;
    // no annotationId -> new ann, create
    if (annotation.annotationId == undefined) await create(annotation);
    else await update(annotation);
  }

  return {
    all,
    getAll,
    create,
    remove,
    setCurr,
    update,
    modify,
    curr,
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

function exportDataset(projectId, exportDir) {
  return projectApi
    .exportDataset(projectId, { exportDir: exportDir })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('export error', err);
      serviceUtils.parseError(err, message);
    });
}
async function splitDataset(
  projectId: number,
  props: { train: number; val: number; test: number },
) {
  console.log('split param', props);

  return projectApi
    .splitDataset(projectId, props)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('split error', err);
      serviceUtils.parseError(err, message);
    });
}

export const PageInit = (
  useState: UseStateType,
  useEffect: UseEffectType,
  props: {
    effectTrigger?: any;
    label: { oneHot: boolean; postSetCurr?: (label: Label) => void };
    tool: { defaultTool: ToolType };
    annotation?: Annotation; // FIXME: setting annotation this way may be overwritten by annotation.getAll in onTaskChange
  },
) => {
  const tool = ToolUtils(useState, props.tool ? props.tool : {});
  const loading = LoadingUtils(useState);
  const scale = ScaleUtils(useState);
  const task = TaskUtils(useState);
  const data = DataUtils(useState);
  const project = ProjectUtils(useState);
  //FIXME: What's the type of props.label?
  //REPLY: should be the same as the second parameter of LabelUtils. Maybe declear a type to use for both places?
  const label = LabelUtils(useState, props.label ? props.label : {});
  const annotation = AnnotationUtils(useState, {
    ...props.annotation,
    label: label,
    project: project,
  });

  useEffect(() => {
    // onload, get project, label, task info
    const projectIdStr = serviceUtils.getQueryVariable('projectId');
    if (projectIdStr == undefined) {
      // history.push('/');
      return;
    }
    const projectId = parseInt(projectIdStr);
    project.getCurr(projectIdStr).catch((err) => {
      serviceUtils.parseError(err, message);
      // history.push('/');
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
        const allAnns = await annotation.getAll(currData.dataId);
        if (label.all) for (const lab of label.all) lab.active = false;
        if (props.effectTrigger?.postTaskChange)
          props.effectTrigger?.postTaskChange(label.all, allAnns);
      }
      loading.setCurr(false);
    };
    onTaskChange();
  }, [task.currIdx]);

  return [
    tool,
    loading,
    scale,
    annotation,
    task,
    data,
    project,
    label,
    splitDataset,
    exportDataset,
  ];
};
