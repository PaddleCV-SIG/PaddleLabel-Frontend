/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: remove this

import type { DependencyList, Dispatch, EffectCallback, SetStateAction } from 'react';
import { message } from 'antd';
import { history, useIntl } from 'umi';
import serviceUtils from '@/services/serviceUtils';
import type { Task, Project, Data } from '@/services/web';
import {
  ProjectApi,
  TaskApi,
  DataApi,
  AnnotationApi,
  LabelApi,
  ManageApi,
  Configuration,
  SampleApi,
  RpcApi,
} from '@/services/web';
import { HistoryUtils } from '@/services/history';
import { IntlInitJsx } from '@/components/PPIntl';
import type { ToolType, Annotation, Label } from '@/models/';
import { ModelApi } from '@/services/ml';
import type { Model } from '@/services/ml/models';
import { History } from '/Users/v_xiaoyixin/paddlefortends/PaddleLabel-Frontend/node_modules/@umijs/runtime';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

const rpcApi = new RpcApi(config);
const projectApi = new ProjectApi(config);
const taskApi = new TaskApi(config);
const dataApi = new DataApi(config);
const annotationApi = new AnnotationApi(config);
const labelApi = new LabelApi(config);
export const manageApi = new ManageApi(config);
export const sampleApi = new SampleApi(config);

export type UseStateType = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
export type UseEffectType = (effect: EffectCallback, deps?: DependencyList | undefined) => void;
export const getRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
};

// TODO: values in labelFormats dick isn't used

export const createInfo = {
  classification: {
    name: 'Classification',
    avatar: './pics/classification.jpg',
    id: 1,
    labelFormats: { single_class: 'Single Class', multi_class: 'Multi Class' },
  },
  detection: {
    name: 'Detection',
    avatar: './pics/object_detection.jpg',
    id: 2,
    labelFormats: { coco: 'COCO', voc: 'VOC', yolo: 'YOLO' },
  },
  semanticSegmentation: {
    name: 'Semantic Segmentation',
    avatar: './pics/semantic_segmentation.jpg',
    id: 3,
    labelFormats: { mask: 'Mask', coco: 'Polygon', eiseg: '' },
  },
  instanceSegmentation: {
    name: 'Instance Segmentation',
    avatar: './pics/instance_segmentation.jpg',
    id: 4,
    labelFormats: { mask: 'Mask', coco: 'Polygon', eiseg: '' },
  },
  // keypointDetection: {
  //   name: 'Keypoint Detection',
  //   avatar: './pics/keypoint_detection.jpg',
  //   id: 5,
  // },
  opticalCharacterRecognition: {
    name: 'OCR',
    avatar: './pics/ocr.png',
    id: 7,
    labelFormats: { txt: 'txt' },
  },
  // point: {
  //   name: 'Point',
  //   avatar: './pics/ocr.png',
  //   id: 8,
  //   labelFormats: { labelme: 'labelme' },
  // },
};

// TODO: all should default to undefined or []
// TODO: check create for missing xxId

/* helper functions */
export async function getVersion() {
  try {
    const version = await manageApi.getVersion();
    return version;
  } catch (err) {
    message.error(
      'Backend unavaliable, please make sure backend is running and check ur internet connection.',
    );
    return false;
  }
}

// TODO: a more elegent way
export const toDict = (arr: any[]) => {
  if (arr == undefined) return [];
  return JSON.parse(JSON.stringify(arr));
};

export function snake2camel(name: string) {
  if (!name) return name;
  return name
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
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

export function IntlInit(page: string) {
  const useintl = useIntl();
  return (id: string, pageName: string = page) => {
    if (id == '') return useintl.formatMessage({ id: pageName });
    return useintl.formatMessage({ id: pageName + '.' + id });
  };
}

// scale image
export const ScaleUtils = (useState: UseStateType, range: number[] = [0.1, 15]) => {
  const [curr, setCurr] = useState<number>(1);
  const [Scales, setScales] = useState<number[]>([]);
  const intl = IntlInit('pages.toolBar.scale');

  function setScale(scale: number) {
    let s: number = scale;
    if (s < range[0]) {
      s = range[0];
      message.error(intl('smallestScale') + ': ' + range[0]);
    }
    if (s > range[1]) {
      s = range[1];
      message.error(intl('largestScale') + ': ' + range[1]);
    }
    setCurr(s);
  }

  function change(delta: number) {
    setScale(curr + delta);
  }
  return { curr, change, setScale, setCurr, Scales, setScales };
};

export function ToolUtils(
  useState: UseStateType,
  { defaultTool }: { defaultTool: ToolType },
): {
  curr: ToolType;
  setCurr: (tool: ToolType) => void;
} {
  const [curr, setCurrRaw] = useState<ToolType>(defaultTool);
  const setCurr = (tool: ToolType) => {
    setCurrRaw(tool);
    console.trace();
  };
  return {
    curr,
    setCurr,
  };
}
export function projectHistory(Id: number, taskId: number) {
  const str = localStorage.getItem('projectHistory');
  if (str) {
    const historysData = JSON.parse(str);
    const newData = {
      ...historysData,
      [Id]: taskId,
    };
    localStorage.setItem('projectHistory', JSON.stringify(newData));
  } else {
    const newData = {
      [Id]: taskId,
    };
    localStorage.setItem('projectHistory', JSON.stringify(newData));
  }
}
export function LoadingUtils(useState: UseStateType) {
  const [curr, setCurr] = useState<boolean>(false);
  return { curr, setCurr };
}

export const ProjectUtils = (useState: UseStateType) => {
  const [all, setAll] = useState<Project[]>();
  const [curr, setCurr] = useState<Project>();
  const [finished, setFinished] = useState<number>();
  const splitIntl = IntlInitJsx('component.PPSplitDatasetModal');

  function getImportOptions(projectType: string) {
    return projectApi.getImportOptions(projectType);
  }

  async function splitDataset(props: { train: number; val: number; test: number }) {
    return projectApi
      .splitDataset(curr.projectId, props)
      .then((res) => {
        message.success(splitIntl('success'));
      })
      .catch((err) => {
        message.error(splitIntl('fail'));
        serviceUtils.parseError(err, message);
      });
  }

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

  async function getCurr(projectId: number): Promise<Project | undefined> {
    projectApi
      .get(projectId)
      .then((project) => {
        console.log('projects', project);
        setCurr(project);
        return project;
      })
      .catch((err) => {
        serviceUtils.parseError(err);
        history.push('/');
        return undefined;
      });
  }

  async function remove(project: Project | number | string) {
    const projectId: number = typeof project == 'object' ? +project.projectId : +project;
    await projectApi.remove(projectId);
    getAll();
  }

  async function create(project: Project) {
    const newProject: Project = await projectApi.create(project);
    return newProject;
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

  // todo: fix
  async function getFinished(projectId: number | undefined = undefined): Promise<number> {
    try {
      const pjId = projectId == undefined ? curr.projectId : projectId;
      const stat = await projectApi.getProgress(pjId);
      if (!stat || stat.finished == undefined || stat.total == undefined)
        throw Error('empty progress');
      setFinished(stat.finished);
      return stat.finished;
    } catch (err) {
      serviceUtils.parseError(err, message);
      return 0;
    }
  }

  async function predict(projectId: number, settings: object) {
    projectApi.predict(projectId, settings).catch((err) => {
      serviceUtils.parseError(err, message);
    });
  }

  function setAllPredicted(predicted: boolean, projectId: string) {
    projectApi.setAll(projectId, { dataPredicted: predicted });
  }
  return {
    all,
    getAll,
    curr,
    getCurr,
    remove,
    create,
    update,
    finished,
    getFinished,
    predict,
    setAllPredicted,
    splitDataset,
    getImportOptions,
  };
};

type labelUtilProps = {
  oneHot?: boolean;
  postSelect?: (label?: Label, activeIds?: Set<number>) => void;
  preUnsetCurr?: () => void;
};
/*
if oneHot = true, only one label can be active, else multiple can be activate at the same time
either case, only one label will be curr. curr will be set in onSelect
*/
export const LabelUtils = (
  useState: UseStateType,
  { oneHot = true, postSelect, preUnsetCurr }: labelUtilProps,
) => {
  const intlJsx = IntlInitJsx('component.label');

  const [all, setAll] = useState<Label[]>();
  const [curr, setCurrRaw] = useState<Label | undefined>();
  const [activeIds, setActiveIds] = useState(new Set<number>());
  const [isOneHot, setOneHot] = useState<boolean>(oneHot);

  async function getAll(projectId: number): Promise<Label[] | undefined> {
    if (projectId == undefined) return;
    try {
      const labels: Label[] = await projectApi.getLabels(projectId);
      setAll(labels);
      return labels;
    } catch (err) {
      serviceUtils.parseError(err, message);
      return;
    }
  }

  function onSelect(label: Label) {
    let activeIdsTemp = activeIds;
    if (activeIds.has(label.labelId)) {
      activeIds.delete(label.labelId);
      setActiveIds(new Set(activeIds));
      activeIdsTemp = activeIds;
      if (curr?.labelId == label.labelId) unsetCurr();
    } else {
      activeIdsTemp = setCurr(label);
    }
    if (postSelect) postSelect(label, activeIdsTemp);
  }

  function unsetCurr() {
    activeIds.delete(curr?.labelId);
    setActiveIds(new Set(activeIds));
    if (preUnsetCurr) preUnsetCurr();
    setCurrRaw(undefined);
    return activeIds;
  }

  function setCurr(label: Label) {
    if (label == undefined) return unsetCurr();
    setCurrRaw(label);
    if (isOneHot) activeIds.clear();
    activeIds.add(label.labelId);
    setActiveIds(new Set(activeIds));
    return activeIds;
  }

  function initActive(annotations: Annotation[]) {
    activeIds.clear();
    for (const ann of annotations) activeIds.add(ann.labelId);
    setActiveIds(new Set(activeIds));
    if (isOneHot && activeIds.size > 1) message.error(intlJsx('ontHotMultiple'));
  }

  async function create(label: Label | Label[]): Promise<Label[] | undefined> {
    try {
      // debugger;
      const newLabels = await labelApi.create(
        label instanceof Array ? label : [label],
        undefined,
        true,
      );

      getAll(label instanceof Array ? label[0].projectId : label.projectId);
      return newLabels;
    } catch (err) {
      serviceUtils.parseError(err, message);
      return;
    }
  }

  async function remove(label: Label): Promise<Label[]> {
    try {
      await labelApi.remove(label.labelId);
      if (activeIds.has(label.labelId)) {
        activeIds.delete(label.labelId);
        setActiveIds(activeIds);
      }
      if (curr != undefined && curr.labelId == label.labelId) unsetCurr();
      const labels = await getAll(label.projectId);
      message.success(intlJsx('deleteSuccess'));
      return labels;
    } catch (err) {
      serviceUtils.parseError(err, message);
      return [];
    }
  }
  function isActive(label: Label) {
    return activeIds.has(label.labelId);
  }

  return {
    all,
    getAll,
    activeIds,
    setActiveIds,
    initActive,
    onSelect,
    curr,
    setCurr,
    isActive,
    create,
    remove,
    isOneHot,
    setOneHot,
  };
};

export const TaskUtils = (useState: UseStateType, props: { annotation: any; push: boolean }) => {
  const [all, setAll] = useState<Task[]>();
  const [currIdx, setCurrIdx] = useState<number>();
  const intl = IntlInitJsx('pages.toolBar.task');

  const turnTo = (turnToIdx: number) => {
    if (!all) return false;
    if (turnToIdx < 0) {
      message.error(intl('noPrev'));
      return false;
    }
    if (turnToIdx == all.length) {
      message.error(intl('noNext'));
      return false;
    }
    setCurrIdx(turnToIdx);
    return true;
  };

  const getAll = async (
    projectId: number,
    turnToIdx?: number,
    orderBy: string = 'modified asc',
  ) => {
    try {
      const allRes = await projectApi.getTasks(projectId, orderBy);
      setAll(allRes);
      if (turnToIdx != undefined) {
        turnTo(turnToIdx);
        return [allRes, allRes[turnToIdx]];
      } else {
        const HistoryData = JSON.parse(localStorage.getItem('projectHistory'));
        const storeIndex = HistoryData[projectId];
        if (storeIndex !== undefined) {
          for (let index = 0; index < allRes.length; index++) {
            const item = allRes[index];
            if (item.taskId === storeIndex) {
              localStorage.setItem('currTaskId', storeIndex);
              turnTo(index);
              return [allRes, allRes[index]];
            }
          }
        }
      }
      return allRes;
    } catch (err) {
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
    setAll,
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
  {
    label = undefined,
    project = undefined,
    recordHistory = () => {},
  }: { label: any; project: any; recordHistory: ({ annos: [] }) => void },
) {
  const [all, setAllRaw] = useState<Annotation[]>();
  const [curr, setCurrRaw] = useState<Annotation | undefined>();
  // const tbIntl = IntlInit('pages.toolBar');

  const tbIntl = IntlInitJsx('pages.toolBar');

  function setAll(annos: Annotation[]) {
    setAllRaw(annos);
  }

  const getAll = async (dataId: number) => {
    if (dataId == undefined) return [];
    try {
      const annRes: Annotation[] = await dataApi.getAnnotations(dataId);
      // setAll([]);
      setAll(annRes);
      return annRes;

      // setAll([]);
    } catch (err) {
      serviceUtils.parseError(err, message);
      return [];
    }
  };

  async function clear() {
    if (!all) return;

    if (all?.length == 0) return;
    await pushToBackend(all[0].dataId, []);
    setAllRaw([]);
    if (label) {
      label.setActiveIds(new Set());
    }
    if (project) project.getFinished();
  }

  const create = async (
    annotation: Annotation | Annotation[],
    requestId?: string,
    deduplicate?: boolean,
  ) => {
    const prepAnn = (anno: Annotation) => {
      const ann = { ...anno };
      if (ann.label) ann.labelId = ann.label.labelId;
      ann.label = undefined;
      return ann;
    };
    try {
      const anns = annotation instanceof Array ? annotation.map(prepAnn) : [prepAnn(annotation)];
      if (deduplicate) {
        await annotationApi.create(anns, null, deduplicate);
      } else {
        await annotationApi.create(anns);
      }
      let annRes: Annotation[] = [];
      // sync anns from backend
      if (anns[0]?.dataId) {
        annRes = await getAll(anns[0]?.dataId);
      }
      if (project && annRes.length == 1) project.getFinished();
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  };

  async function remove(annotation: number | Annotation) {
    const annId = typeof annotation == 'number' ? annotation : annotation.annotationId;
    if (annId == undefined) return;
    try {
      await annotationApi.remove(annId);
      if (all && all.length && all[0].dataId!) {
        const anns = await getAll(all[0].dataId);
        recordHistory({ annos: anns });
        if (anns.length == 0) project.getFinished();
      }
      message.success(tbIntl('saveSuccess'));
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  }

  async function setCurr(annotation: Annotation | undefined) {
    if (annotation == undefined) {
      setCurrRaw(undefined);
      return;
    }
    setCurrRaw(annotation);
    label.setCurr(annotation.label);
  }

  async function update(annotation: Annotation) {
    if (!annotation.annotationId) return [];
    const ann = { ...annotation };
    ann.taskId = undefined;
    ann.label = undefined;
    ann.labelId = undefined;

    annotationApi
      .update(ann.annotationId, ann)
      .then((res) => {
        // setCurr(res);
        return getAll(ann.dataId);
      })
      .catch((err) => {
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

  async function pushToBackend(dataId?: number, anns?: Annotation[]) {
    if (dataId == undefined || dataId == null) return;
    const newAll = anns ? anns : all;
    try {
      const res = await dataApi.setAnnotations(dataId + '', newAll);

      setAllRaw(res);
      message.success(tbIntl('saveSuccess'));
      return res;
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  }

  return {
    all,
    clear,
    getAll,
    create,
    remove,
    setCurr,
    update,
    modify,
    curr,
    setAll,
    pushToBackend,
  };
}

export const DataUtils = (useState: UseStateType) => {
  const [currIdx, setCurrIdx] = useState<number>(0);
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
      return serviceUtils.parseError(err, message);
    }
  };
  const updatePredicted = async (dataId: string, flag: boolean) => {
    try {
      // const params = {
      //   dataId: dataId,
      //   data: {
      //     predicted: true,
      //   },
      // };
      await dataApi.update(dataId, {
        // predicted: false,
        predicted: flag,
      });
      // debugger;
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  };
  const setAnnotations = async (dataId: number, annotations: Annotation[]) => {
    try {
      await dataApi.setAnnotations(dataId + '', annotations);
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  };

  return {
    all,
    getAll,
    turnTo,
    setAnnotations,
    updatePredicted,
    get curr() {
      // debugger;
      if (currIdx == undefined || all == undefined) return undefined;
      return all[currIdx];
    },
    get imgSrc() {
      if (all && all[currIdx]) {
        return `${baseUrl}/datas/${all[currIdx].dataId}/image?sault=${all[currIdx].sault}`;
      }
      return ``;
    },
  };
};

export function exportDataset(
  projectId: number,
  params: { exportDir: string; exportFormat: string; segMaskType: string },
) {
  return projectApi
    .exportDataset(projectId, params)
    .then((res) => {})
    .catch((err) => {
      serviceUtils.parseError(err, message);
      throw err;
    });
}

// TODO: use intl for success message, wrap the three functions in a class
export function importDataset(
  projectId: number,
  importDir: string,
  importFormat: string | undefined,
) {
  return projectApi
    .importDataset(projectId, { importDir: importDir, importFormat: importFormat })
    .then((res) => {
      message.success('额外数据导入成功');
    })
    .catch((err) => {
      serviceUtils.parseError(err, message);
      throw new Error();
    });
}
export function PageInit(
  useState: UseStateType,
  useEffect: UseEffectType,
  props: {
    effectTrigger?: {
      postTaskChange?: (labels?: Label[], annotations?: Annotation[]) => void;
      postProjectChanged?: () => void;
    };
    label: labelUtilProps;
    tool: { defaultTool: ToolType };
    annotation?: Annotation; // FIXME: setting annotation this way may be overwritten by annotation.getAll in onTaskChange
    task: { push: boolean };
    // recordHistory?: ({ annos: [] }) => void;
  },
) {
  message.config({ maxCount: 6, duration: 2 });
  const tool = ToolUtils(useState, props.tool ? props.tool : {});
  const loading = LoadingUtils(useState);
  const scale = ScaleUtils(useState);
  const data = DataUtils(useState);
  const project = ProjectUtils(useState);
  const label = LabelUtils(useState, props.label ? props.label : {});
  const annHistory = HistoryUtils(useState, rpcApi);
  const annotation = AnnotationUtils(useState, {
    ...props.annotation,
    label: label,
    project: project,
    recordHistory: annHistory.record,
  });

  const task = TaskUtils(useState, { annotation, ...props.task });
  const [refreshVar, setRefreshVar] = useState<number>(0);

  function refresh() {
    for (const t of [100, 200, 1000, 2000])
      setTimeout(function () {
        setRefreshVar(Math.random());
      }, t);
  }

  useEffect(() => {
    // onload, get project, label, task info
    const projectIdStr = serviceUtils.getQueryVariable('projectId');
    if (projectIdStr == undefined) {
      // history.push('/');
      return;
    }
    const projectId = parseInt(projectIdStr);
    project.getCurr(projectId).catch((err) => {
      serviceUtils.parseError(err, message);
      // history.push('/');
      return;
    });
    loading.setCurr(true);
    label.getAll(projectId);

    const orderBy = localStorage.getItem('orderBy');
    if (orderBy) task.getAll(projectId, undefined, orderBy);
    else task.getAll(projectId);
    localStorage.removeItem('orderBy');
    project.getFinished(projectId);
  }, []);

  useEffect(() => {
    if (!project.curr) return;
    if (props.effectTrigger?.postProjectChanged) {
      props.effectTrigger.postProjectChanged();
    }
  }, [project.curr]);

  useEffect(() => {
    // when all task is set, set current task
    if (task.all) {
      if (task.all.length == 0) {
        message.error('No task under this project, please import data first!');
        history.push(`/project_overview?projectId=${project.curr?.projectId}`);
        return;
      }
      const currTaskId = localStorage.getItem('currTaskId');
      if (currTaskId != null) {
        for (let idx = 0; idx < task.all.length; idx++) {
          if (task.all[idx].taskId == currTaskId) {
            task.turnTo(idx);
            break;
          }
        }
        localStorage.removeItem('currTaskId');
      } else {
        task.turnTo(0);
      }
    }
  }, [task.all]);

  useEffect(() => {
    // when current task is set, get task's data, data's annotation
    if (task.currIdx == undefined) return;

    const onTaskChange = async () => {
      if (task.curr?.projectId) project.getFinished(task.curr.projectId);
      if (task.curr?.taskId) {
        projectHistory(task.curr?.projectId, task.curr?.taskId);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [allData, currData] = await data.getAll(task.curr.taskId, 0);
        const allAnns = await annotation.getAll(currData.dataId);
        if (label.all) for (const lab of label.all) lab.active = false;
        if (props.effectTrigger?.postTaskChange)
          props.effectTrigger?.postTaskChange(label.all, allAnns);
        annotation.setAll(allAnns);
      }
      loading.setCurr(false);
      refresh();
    };
    loading.setCurr(true);
    onTaskChange();
  }, [task.currIdx]);

  useEffect(() => {
    refresh();
  }, [annotation.all, label.all]);

  return { tool, loading, scale, annotation, task, data, project, label, refreshVar, annHistory };
}

// ml related
export function ModelUtils(useState: UseStateType, mlBackendUrl: string = undefined) {
  const [curr, setCurr] = useState<Model>();
  const [all, setAll] = useState<Model[]>();
  const [backendUrl, setBackendUrl] = useState<string>(mlBackendUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const intl = IntlInit('component.PPInteractorModal');
  // let modelApi = new ModelApi(new Configuration({ basePath: backendUrl }));
  let modelApi = new ModelApi(new Configuration({ basePath: backendUrl }));

  async function getAll() {
    try {
      const models: Model[] = await modelApi.getAll();
      setAll(models);
      return models;
    } catch (err) {
      serviceUtils.parseError(
        err,
        message,
        'The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.',
      );
      return;
    }
  }

  async function setMlBackendUrl(url: string) {
    modelApi = new ModelApi(new Configuration({ basePath: url }));
    setBackendUrl(url);
  }

  async function train(modelName: string, dataDir: string, configs: object) {
    try {
      checkAPI();
      return await modelApi.train(modelName, { dataDir: dataDir, configs: configs });
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  }

  async function predict(model: string, data) {
    try {
      checkAPI();
      return await modelApi.predict(model, data);
    } catch (err) {
      return serviceUtils.parseError(err, message);
    }
  }

  async function load(modelName: string, parmas = {}) {
    try {
      await checkAPI();
      setLoading(true);
      await modelApi.load(modelName, {
        initParams: parmas,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(intl('loadFail'));
      throw err;
    }
  }

  async function checkAPI() {
    if (!modelApi.configuration.configuration.basePath) {
      // debugger;
      throw new Error('Set ML backend url first!');
    }
    return (await modelApi.isBackendUp()).trim();
  }

  return {
    setMlBackendUrl,
    curr,
    all,
    getAll,
    setCurr,
    modelApi,
    train,
    predict,
    load,
    loading,
    setLoading,
    checkAPI,
    backendUrl,
  };
}
