import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import PPBlock from '@/components/PPBlock';
import { toDict, TaskUtils } from '@/services/utils';
import serviceUtils from '@/services/serviceUtils';
import type { Task } from '@/services';
import type { ColumnsType } from 'antd/es/table';

const TaskList: React.FC = () => {
  const task = TaskUtils(useState);
  const projectId = serviceUtils.getQueryVariable('projectId');
  const sets = { '0': 'train', '1': 'validation', '2': 'test' };
  const baseUrl = localStorage.getItem('basePath');
  const columns: ColumnsType<Task> = [
    {
      title: 'ID',
      dataIndex: 'taskId',
      key: 'taskId',
      width: '4.5rem',
      align: 'center',
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.taskId - b.taskId,
      sortDirections: ['descend'],
    },
    {
      title: 'Annotation Count',
      dataIndex: 'annotations',
      key: 'taskId',
      width: '4.5rem',
      align: 'center',
      render: (anns: list) => <>{anns.length}</>,
      sorter: (a, b) => a.annotations.length - b.annotations.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Set',
      dataIndex: 'set',
      key: 'taskId',
      width: '4.5rem',
      align: 'center',
      render: (setIdx: string) => <>{sets[setIdx]}</>,
      sorter: (a, b) => a.set - b.set,
    },
    {
      title: 'Avatar',
      dataIndex: 'dataPaths',
      key: 'taskId',
      width: '4.5rem',
      align: 'center',
      render: (paths: string) => <img src={`${baseUrl}${paths[0]}`} height={40} />,
    },
  ];
  useEffect(() => {
    task.getAll(projectId).then((tasks) => {
      console.log('tasks', tasks);
    });
  }, []);

  return (
    <PPBlock title={'Tasks'}>
      <Table columns={columns} dataSource={toDict(task.all)} />
    </PPBlock>
  );
};

export default TaskList;
