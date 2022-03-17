import { message } from 'antd';

import serviceUtils from '@/services/serviceUtils';
// import type {Label} from '@/services';
import { ProjectApi } from '@/services';
import { Configuration } from '@/services';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

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
  // const [all, setAll, curr, setCurr] = CreateBind(useState, bind);
  const [all, setAll] = useState<Project[]>([]);
  const [curr, setCurr] = useState<Project>();

  const projectApi = new ProjectApi(config);

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
    if (!projectId) return;
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
    projectApi
      .create(values)
      .then((project) => {
        console.log('project create res', project);
      })
      .catch((err) => {
        console.log('project create err', err);
        serviceUtils.parseError(err, message);
      });
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
  const [labels, setLabels] = useState([]);

  const projectApi = new ProjectApi(config);
  // const labelApi = new LabelApi(config);

  const reqLabels = async (projectId: number) => {
    projectApi.getLabels(projectId).then((labs) => {
      for (const lab of labs) lab.active = true;
      setLabels(labs);
    });
  };

  const onSelect = (lab) => {
    const selected = labels.filter((l) => l.labelId == lab.labelId)[0];
    selected.active = !selected.active;
    pageOnSelect(selected);
    setLabels([...labels]);
  };

  const onAdd = () => {};
  const onDelete = () => {};
  const onModify = () => {};

  // reqLabels(projectId);
  return { labels, reqLabels, onSelect, onAdd, onDelete, onModify };
};

// export const TaskUtils = (useState, {taskId:number}) => {
//
// }
//
// export const AnnotationUtils = (useState, {taskId:number}) => {
//
// }
