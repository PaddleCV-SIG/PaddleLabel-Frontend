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

export const ScaleUtils = (useState, range: number[] = [0.1, 3]) => {
  const [scale, setScale] = useState<number>(1);
  const curr = scale;

  const change = (delta: number) => {
    let s = scale;
    s += delta;
    if (s < range[0]) {
      s = range[0];
      message.error('Smallest scale is ' + range[0]);
    }
    if (s > range[1]) {
      s = range[1];
      message.error('Largest scale is ' + range[1]);
    }
    setScale(s);
  };

  return {
    curr,
    change,
  };
};

export const ProjectUtils = (useState) => {
  console.log('create project util');
  const [all, setAll] = useState<Project[]>([]);
  const [curr, setCurr] = useState<Project>();

  const getAll = async () => {
    projectApi
      .getAll()
      .then((projects) => {
        setAll(projects);
      })
      .catch((err) => {
        console.log('prject getall err', err);
        serviceUtils.parseError(err, message);
      });
  };

  const getCurr = async (projectId) => {
    console.log('get curr project');
    if (!projectId) return undefined;
    try {
      const project = await projectApi.get(projectId);
      setCurr(project);
      return project;
    } catch (err) {
      console.log('prject getcurr err', err);
      serviceUtils.parseError(err, message);
    }
  };

  const remove = async (project) => {
    projectApi.remove(project.projectId);
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
      .update(projectId, {
        name: values.name,
        description: values.description,
        dataDir: values.dataDir,
        labelDir: values.labelDir,
      })
      .then((res) => {
        console.log('project update res', res);
      })
      .catch((err) => {
        console.log('project update err ', err);
        serviceUtils.parseError(err, message);
      });
  };

  return {
    curr,
    all,
    getAll,
    getCurr,
    remove,
    create,
    update,
  };
};

export const LabelUtils = (useState, { pageOnSelect }) => {
  const [all, setAll] = useState([]);
  // const [curr, setCurr] = useState();

  const getAll = async (projectId: number) => {
    projectApi.getLabels(projectId).then((labs) => {
      for (const lab of labs) lab.active = true;
      setAll(labs);
    });
  };

  const onSelect = (label) => {
    const selected = all.filter((l) => l.labelId == label.labelId)[0];
    selected.active = !selected.active;
    pageOnSelect(selected);
    setAll([...all]);
  };

  const onAdd = () => {};
  const onDelete = () => {};
  const onModify = () => {};

  // reqLabels(projectId);
  return { all, curr, getAll, onSelect, onAdd, onDelete, onModify };
};

// export class TaskUtils {
//   all = [];
//   currIdx = 0;
//   curr;
//   setcurr;
//
//   constructor(useState) {
//     [this.curr, this.setCurr] = useState<Task>();
//   }
//
//   turnTo(turnToIdx) {
//     console.log("turnto", this, turnToIdx)
//     this.currIdx = turnToIdx;
//     this.setCurr(this.all[turnToIdx]);
//     return this.all[turnToIdx]
//   }
//
//   async getAll(projectId: number, turnToIdx: number) {
//    try {
//      this.all = await projectApi.getTasks(projectId);
//      if(turnToIdx!=undefined)
//        this.turnTo(turnToIdx);
//      return this.all;
//    } catch (err) {
//      console.log('task getall err ', err);
//      serviceUtils.parseError(err, message);
//    }
//  }
// }

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
      if (this.all.length) return this.all[this.currIdx];
      else return undefined;
    },
  };
};

// export const AnnotationUtils = (useState, {taskId:number}) => {
//
// }

export const DataUtils = (useState) => {
  // const [curr, setCurr] = useState<Data>();
  const [currIdx, setCurrIdx] = useState<number>(0);
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
