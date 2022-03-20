import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import PPContainer from '@/components/PPContainer';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPTable from '@/components/PPTable';
import PPButton from '@/components/PPButton';
import CreateButton from '@/components/CreatButton'; // TODO: start with pp?
import PPOverlapCol from '@/components/PPOverlapCol';
import { history } from 'umi';
import type { Project } from '@/services';
import serviceUtils from '@/services/serviceUtils';

import { projectApi } from '@/services/api';

import { toDict, ProjectUtils } from '@/services/utils';

export const PROJECT_INFO_KEY = 'projectInfo';
export const refreshProject = async (id?: string) => {
  const projectId = id == undefined ? serviceUtils.getQueryVariable('projectId') : id;
  if (!projectId) {
    message.error("projectId isn't passed in nor present in url!");
    history.push('/');
    return;
  }
  const projectInfo = localStorage.getItem(PROJECT_INFO_KEY);
  if (projectInfo) {
    return JSON.parse(projectInfo);
  }

  const res = await projectApi.get(projectId);
  if (!res) {
    message.error(`Cannot find project: ${projectId}!`);
    history.push('/');
    return;
  }
  localStorage.setItem(PROJECT_INFO_KEY, JSON.stringify(res));
  return res;
};

const Projects: React.FC = () => {
  console.log('render projects');
  const projects = ProjectUtils(useState);
  useEffect(() => {
    projects.getAll();
  }, []);

  const columns: ColumnsType<Project> = [
    {
      title: 'ID',
      dataIndex: 'projectId',
      key: 'projectId',
      width: '4.5rem',
      align: 'center',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'projectId',
    },
    {
      title: 'Actions',
      key: 'projectId',
      width: '15rem',
      align: 'center',
      render: (text, project) => (
        <Space size="middle">
          <PPButton
            width="4.375rem"
            height="1.875rem"
            color={'rgba(241,162,0,1)'}
            onClick={() => {
              history.push(
                `/project_detail?taskCategory=${project.taskCategory.name}&projectId=${project.projectId}`,
              );
            }}
          >
            Edit
          </PPButton>
          <PPButton
            width="4.375rem"
            height="1.875rem"
            color={'rgba(0,100,248,1)'}
            onClick={() => {
              history.push(`/${project.taskCategory.name}?projectId=${project.projectId}`);
            }}
          >
            Label
          </PPButton>
          <PPButton
            width="4.375rem"
            height="1.875rem"
            color={'rgba(207,63,0,1)'}
            onClick={() => projects.remove(project)}
          >
            Delete
          </PPButton>
        </Space>
      ),
    },
  ];

  // if found no project, return create project button
  // TODO: beautify frontend
  if (!projects.all)
    return (
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock title="My Projects">
            <CreateButton
              onClick={() => {
                history.push('/project_creation');
              }}
            >
              Create Project
            </CreateButton>
          </PPBlock>
        </Col>
      </Row>
    );

  return (
    <Row style={{ marginTop: 20 }}>
      <Col span={24}>
        <PPBlock title="My Projects">
          <PPTable columns={columns} dataSource={toDict(projects.all)} showHeader={false} />
        </PPBlock>
      </Col>
    </Row>
  );
};

const Welcome: React.FC = () => {
  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <CreateButton
            onClick={() => {
              history.push('/project_creation');
            }}
          >
            Create Project
          </CreateButton>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col span={17}>
          <PPBlock title="Sample Project" style={{ height: 430 }}>
            <Row>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/classification.jpg'}>Image Classification</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/object_detection.jpg'}>Object Detection</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/instance_segmentation.jpg'}>Instance Segmentation</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/semantic_segmentation.jpg'}>Semantic Segmentation</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/keypoint_detection.jpg'}>Keypoint Detection</PPCard>
              </PPOverlapCol>
            </Row>
          </PPBlock>
        </Col>
        <Col span={7}>
          <PPBlock title="Model Training Knowledge" style={{ height: 430 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={10}>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to train using paddleclas
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to train using paddledet
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to train using paddleseg
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to train using paddlex
              </Button>
            </Space>
          </PPBlock>
        </Col>
      </Row>
      {Projects()}
    </PPContainer>
  );
};

export default Welcome;
