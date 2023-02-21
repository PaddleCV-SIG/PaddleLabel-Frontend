import React, { useState, useEffect } from 'react';
import { Table, Button, Image, message, Popover } from 'antd';
import { history } from 'umi';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import PPExportModal from '@/components/PPProjectOverview/PPExportModal';
import PPImportModal from '@/components/PPProjectOverview/PPImportModal';
import PPSplitDatasetModal from '@/components/PPProjectOverview/PPSplitDatasetModal';
import { toDict, TaskUtils, ProjectUtils, snake2camel, camel2snake } from '@/services/utils';
import serviceUtils from '@/services/serviceUtils';
import type { Task } from '@/services/web/models';
import type { ColumnsType } from 'antd/es/table';
import { IntlInitJsx } from '@/components/PPIntl';

const loading =
  'data:image/png;base64,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';

const TaskList: React.FC = () => {
  const intl = IntlInitJsx('pages.projectOverview');
  const task = TaskUtils(useState);
  const project = ProjectUtils(useState);
  const [updateTable, setUpdateTable] = useState<number>(0);
  const sets = {
    '0': intl('train', 'global.set'),
    '1': intl('val', 'global.set'),
    '2': intl('test', 'global.set'),
  };
  const baseUrl = localStorage.getItem('basePath');
  const projectId = serviceUtils.getQueryVariable('projectId');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (pagination, filters, sorter, extra) => {
    localStorage.setItem('orderBy', sorter.field + ' ' + sorter.order);
    // localStorage.setItem('currentTasks', JSON.stringify(extra.currentDataSource));
  };
  const renderContent = (anns: any) => {
    const labels = new Map();
    anns.forEach((item: any) => {
      if (labels.has(item.label.name)) {
        const id = labels.get(item.label.name) + 1;
        labels.set(item.label.name, id);
      } else {
        labels.set(item.label.name, 1);
      }
    });
    const arrs = [...labels];
    console.log('arrs', arrs);
    const projects = project.curr;
    console.log('projects', projects);
    const flag = projects.taskCategory?.name === 'classification';
    return (
      <div>
        {arrs.length &&
          arrs.map((arry: any) => {
            const key = arry[0];
            const name = arry[1];
            const strings = !flag ? `${key}:${name}` : key;
            return <p>{strings}</p>;
          })}
      </div>
    );
  };
  const columns: ColumnsType<Task> = [
    {
      title: intl('id'),
      dataIndex: 'taskId',
      key: 'taskId',
      width: '25%',
      align: 'center',
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.taskId - b.taskId,
    },
    {
      title: () => {
        return intl('annotationCount');
      },
      dataIndex: 'annotations',
      key: 'taskId',
      width: '25%',
      align: 'center',
      render: (anns: list) => {
        console.log('anns', anns);
        return (
          <Popover content={anns.length && renderContent(anns)}>
            <div>{anns.length}</div>
          </Popover>
        );
      },
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
            }, 1000);
          }}
        />
      ),
      sorter: (a, b) => a.dataPaths[0].split('sault')[0] > b.dataPaths[0].split('sault')[0],
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
          }}
        >
          {intl('label')}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    project.getCurr(projectId);
    task.getAll(projectId).then(() => {});
  }, []);

  // ensure projectid
  if (!projectId) {
    message.error('No valid project id');
    history.push('/');
  }
  return (
    <PPContainer>
      <PPBlock>
        <Button
          type="primary"
          onClick={() => {
            history.push(
              `/${camel2snake(project.curr.taskCategory.name)}?projectId=${project.curr.projectId}`,
            );
          }}
          hidden={task.all?.length == 0}
        >
          {intl('label')}
        </Button>

        <Button
          type="primary"
          onClick={() => {
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
        project?.curr?.taskCategory?.name === 'classification' ||
        project?.curr?.taskCategory?.name === 'optical_character_recognition' ? (
          <Button
            type="primary"
            onClick={() => {
              let path = '/project_ai';
              if (project?.curr?.taskCategory?.name === 'optical_character_recognition') {
                path = '/project_ocr_ai';
              }
              history.push(
                `${path}?taskCategory=${snake2camel(project.curr.taskCategory.name)}&projectId=${
                  project.curr.projectId
                }`,
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
      <div data-test-id="test-overview" data-task-count={task.all?.length} />
    </PPContainer>
  );
};

export default TaskList;
