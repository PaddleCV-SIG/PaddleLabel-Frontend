import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space } from 'antd';
import PPContainer from '@/components/PPContainer';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPTable from '@/components/PPTable';
import PPButton from '@/components/PPButton';
import PPCreateButton from '@/components/PPCreatButton';
import PPOverlapCol from '@/components/PPOverlapCol';
import { history, useIntl } from 'umi';
import { toDict, ProjectUtils } from '@/services/utils';
import type { ColumnsType } from 'antd/es/table';
import type { Project } from '@/services';

const Projects: React.FC = () => {
  const intl = useIntl();
  const edit = intl.formatMessage({ id: 'pages.welcome.edit' });
  const label = intl.formatMessage({ id: 'pages.welcome.label' });
  const remove = intl.formatMessage({ id: 'pages.welcome.remove' });
  const myProjects = intl.formatMessage({ id: 'pages.welcome.myProjects' });
  const createProject = intl.formatMessage({ id: 'pages.welcome.createProject' });

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
            {edit}
          </PPButton>
          <PPButton
            width="4.375rem"
            height="1.875rem"
            color={'rgba(0,100,248,1)'}
            onClick={() => {
              history.push(`/${project.taskCategory.name}?projectId=${project.projectId}`);
            }}
          >
            {label}
          </PPButton>
          <PPButton
            width="4.375rem"
            height="1.875rem"
            color={'rgba(207,63,0,1)'}
            onClick={() => projects.remove(project)}
          >
            {remove}
          </PPButton>
        </Space>
      ),
    },
  ];

  // if found no project, return create project button
  // TODO: beautify frontend
  if (!projects.all?.length)
    return (
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock title={myProjects}>
            <PPCreateButton
              onClick={() => {
                history.push('/project_creation');
              }}
            >
              {createProject}
            </PPCreateButton>
          </PPBlock>
        </Col>
      </Row>
    );

  return (
    <Row style={{ marginTop: 20 }}>
      <Col span={24}>
        <PPBlock title={myProjects}>
          <PPTable columns={columns} dataSource={toDict(projects.all)} showHeader={false} />
        </PPBlock>
      </Col>
    </Row>
  );
};

const Welcome: React.FC = () => {
  const intl = useIntl();
  const createProject = intl.formatMessage({ id: 'pages.welcome.createProject' });
  const sampleProject = intl.formatMessage({ id: 'pages.welcome.sampleProject' });
  const imageClassification = intl.formatMessage({ id: 'pages.welcome.imageClassification' });
  const objectDetection = intl.formatMessage({ id: 'pages.welcome.objectDetection' });
  const instanceSegmentation = intl.formatMessage({
    id: 'pages.welcome.instanceSegmentation',
  });
  const semanticSegmentation = intl.formatMessage({
    id: 'pages.welcome.semanticSegmentation',
  });
  const keypointDetection = intl.formatMessage({ id: 'pages.welcome.keypointDetection' });
  const trainingKnowledge = intl.formatMessage({ id: 'pages.welcome.trainingKnowledge' });
  const paddleClas = intl.formatMessage({ id: 'pages.welcome.paddleClas' });
  const paddleDet = intl.formatMessage({ id: 'pages.welcome.paddleDet' });
  const paddleSeg = intl.formatMessage({ id: 'pages.welcome.paddleSeg' });
  const paddleX = intl.formatMessage({ id: 'pages.welcome.paddleX' });

  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <PPCreateButton
            onClick={() => {
              history.push('/project_creation');
            }}
          >
            {createProject}
          </PPCreateButton>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col span={17}>
          <PPBlock title={sampleProject} style={{ height: 430 }}>
            <Row>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/classification.jpg'}>{imageClassification}</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/object_detection.jpg'}>{objectDetection}</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/instance_segmentation.jpg'}>{instanceSegmentation}</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/semantic_segmentation.jpg'}>{semanticSegmentation}</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/keypoint_detection.jpg'}>{keypointDetection}</PPCard>
              </PPOverlapCol>
            </Row>
          </PPBlock>
        </Col>
        <Col span={7}>
          <PPBlock title={trainingKnowledge} style={{ height: 430 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={10}>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                {paddleClas}
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                {paddleDet}
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                {paddleSeg}
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                {paddleX}
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
