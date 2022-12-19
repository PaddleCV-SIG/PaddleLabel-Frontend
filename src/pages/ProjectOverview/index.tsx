import React, { useState, useEffect } from 'react';
import { Table, Button, Image, message } from 'antd';
import { history } from 'umi';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import PPExportModal from '@/components/PPProjectOverview/PPExportModal';
import PPImportModal from '@/components/PPProjectOverview/PPImportModal';
import PPSplitDatasetModal from '@/components/PPProjectOverview/PPSplitDatasetModal';
import { toDict, TaskUtils, ProjectUtils, snake2camel, camel2snake } from '@/services/utils';
import serviceUtils from '@/services/serviceUtils';
import type { Task } from '@/services';
import type { ColumnsType } from 'antd/es/table';
import { IntlInitJsx } from '@/components/PPIntl';

const loading =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';

const TaskList: React.FC = () => {
  // const [divideModalVisible, setDivideModalVisible] = useState<boolean>(false);
  // const intl = IntlInit('pages.projectOverview');
  const intl = IntlInitJsx('pages.projectOverview');

  const task = TaskUtils(useState);
  const project = ProjectUtils(useState);
  const [updateTable, setUpdateTable] = useState<number>(0);
  // const [reforce, setReforce] = useState<boolean>(false);
  const sets = { '0': 'train', '1': 'validation', '2': 'test' };
  const baseUrl = localStorage.getItem('basePath');
  const projectId = serviceUtils.getQueryVariable('projectId');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (pagination, filters, sorter, extra) => {
    localStorage.setItem('orderBy', sorter.field + ' ' + sorter.order);
    // localStorage.setItem('currentTasks', JSON.stringify(extra.currentDataSource));
  };
  const columns: ColumnsType<Task> = [
    {
      title: 'ID',
      dataIndex: 'taskId',
      key: 'taskId',
      width: '25%',
      align: 'center',
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.taskId - b.taskId,
    },
    {
      title: intl('annotationCount'),
      dataIndex: 'annotations',
      key: 'taskId',
      width: '25%',
      align: 'center',
      render: (anns: list) => <>{anns.length}</>,
      sorter: (a, b) => a.annotations.length - b.annotations.length,
    },
    {
      title: intl('split'),
      dataIndex: 'set',
      key: 'taskId',
      width: '25%',
      align: 'center',
      render: (setIdx: string) => <>{sets[setIdx]}</>,
      sorter: (a, b) => a.set - b.set,
    },
    {
      title: intl('image'),
      dataIndex: 'dataPaths',
      key: 'taskId',
      width: '25%',
      align: 'center',
      render: (paths: string) => (
        <Image
          src={`${baseUrl}${paths[0]}`}
          height={40}
          // loading={'lazy'}
          onError={(thisImage) => {
            thisImage.target.src = loading;
            setTimeout(() => {
              thisImage.target.src = `${baseUrl}${paths[0]}reload`;
              console.log(`${baseUrl}${paths[0]} reload`);
            }, 1000);
          }}
        />
      ),
    },
    {
      dataIndex: 'taskId',
      key: 'taskId',
      align: 'center',
      render: (taskId: string) => (
        <Button
          type="primary"
          onClick={() => {
            localStorage.setItem('currTaskId', taskId);
            history.push(
              `/${camel2snake(project.curr.taskCategory.name)}?projectId=${project.curr.projectId}`,
            );
            // history.push(`/Ocr?projectId=${project.curr.projectId}`);
          }}
        >
          {intl('label')}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    project.getCurr(projectId);
    task.getAll(projectId).then((tasks) => {
      console.log('tasks', tasks);
    });
  }, []);
  // useEffect(() => {
  //   const flag = project?.curr?.taskCategory?.name === 'detection';
  //   console.log('flag', flag, project?.curr?.taskCategory?.name);

  //   setReforce(flag);
  // }, [project?.curr?.taskCategory?.name]);
  // ensure projectid
  if (!projectId) {
    message.error('No valid project id');
    history.push('/');
  }
  console.log('project.curr.taskCategory.name', project?.curr?.taskCategory?.name);

  return (
    <PPContainer>
      <PPBlock>
        <Button
          type="primary"
          onClick={() => {
            history.push(
              `/${camel2snake(project.curr.taskCategory.name)}?projectId=${project.curr.projectId}`,
            );
            // history.push(`/Ocr?projectId=${project.curr.projectId}`);
          }}
          hidden={task.all?.length == 0}
        >
          {intl('label')}
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('project', project.curr);
            history.push(
              `/project_detail?taskCategory=${snake2camel(
                project.curr.taskCategory.name,
              )}&projectId=${project.curr.projectId}`,
            );
          }}
        >
          {intl('projectSettings')}
        </Button>

        <PPSplitDatasetModal
          project={project}
          visible={task.all?.length != 0}
          onFinish={() => task.getAll(project.curr.projectId)}
        />
        <PPExportModal project={project.curr} visible={task.all?.length != 0} />
        <PPImportModal
          project={project.curr}
          onFinish={() => {
            task.getAll(project.curr.projectId);
            setUpdateTable(updateTable + 1);
          }}
          visible={task.all?.length != 0}
        />
        {project?.curr?.taskCategory?.name === 'detection' ||
        project?.curr?.taskCategory?.name === 'classification' ? (
          <Button
            type="primary"
            onClick={() => {
              console.log('project.curr.taskCategory.name', project.curr.taskCategory.name);
              history.push(
                `/project_ai?taskCategory=${snake2camel(
                  project.curr.taskCategory.name,
                )}&projectId=${project.curr.projectId}`,
              );
            }}
          >
            {intl('autoInferenceSettings')}
          </Button>
        ) : null}
      </PPBlock>
      <PPBlock title={intl('tasks')}>
        {intl('taskCount')}
        {': ' + task.all?.length}
        <br />
        {(() => {
          if (task.all?.length == 0)
            return (
              <PPImportModal
                project={project.curr}
                onFinish={() => {
                  task.getAll(project.curr.projectId);
                  setUpdateTable(updateTable + 1);
                }}
              />
            );
          return (
            <span id={updateTable}>
              <Table columns={columns} dataSource={[...toDict(task.all)]} onChange={onChange} />{' '}
            </span>
          );
        })()}
      </PPBlock>
    </PPContainer>
  );
};

export default TaskList;
