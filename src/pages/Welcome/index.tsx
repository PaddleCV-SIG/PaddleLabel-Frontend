import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { history, useIntl } from 'umi';
import PPContainer from '@/components/PPContainer';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPTable from '@/components/PPTable';
import PPButton from '@/components/PPButton';
import PPSampleButton from '@/components/PPSampleButton';
import PPOverlapCol from '@/components/PPOverlapCol';
import { toDict, ProjectUtils, getVersion, snake2camel } from '@/services/utils';
import { createInfo } from '@/services/utils';
import type { ColumnsType } from 'antd/es/table';
import type { Project } from '@/services/web/models';

const Projects: React.FC = () => {
  const intl = useIntl();
  const label = intl.formatMessage({ id: 'pages.welcome.label' });
  const remove = intl.formatMessage({ id: 'pages.welcome.remove' });
  const myProjects = intl.formatMessage({ id: 'pages.welcome.myProjects' });

  console.log('render projects');
  const projects = ProjectUtils(useState);
  useEffect(() => {
    getVersion().then((version) => {
      if (version != false) projects.getAll();
    });
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
      title: 'Project Category',
      key: 'projectId',
      render: (project) => {
        console.log('pj', project);
        const categoryName = snake2camel(project.taskCategory.name);
        console.log('categoryName', categoryName);
        return createInfo[categoryName].name;
      },
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
              history.push(`/project_overview?projectId=${project.projectId}`);
            }}
          >
            {'Overview'}
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
  if (!projects.all?.length) return '';
  console.log('all pjs', toDict(projects.all));

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
  const trainingKnowledge = intl.formatMessage({ id: 'pages.welcome.trainingKnowledge' });
  const paddleClas = intl.formatMessage({ id: 'pages.welcome.paddleClas' });
  const paddleDet = intl.formatMessage({ id: 'pages.welcome.paddleDet' });
  const paddleSeg = intl.formatMessage({ id: 'pages.welcome.paddleSeg' });
  const paddleX = intl.formatMessage({ id: 'pages.welcome.paddleX' });

  function createButtons() {
    const creators = [];
    for (const [taskCategory, info] of Object.entries(createInfo)) {
      creators.push(
        <PPOverlapCol span={4}>
          <PPCard imgSrc={info.avatar} href={'/project_detail?taskCategory=' + taskCategory}>
            {info.name}
          </PPCard>
        </PPOverlapCol>,
      );
    }
    return creators;
  }

  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <PPSampleButton
            onClick={() => {
              history.push('/');
            }}
          >
            {sampleProject}
          </PPSampleButton>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col span={17}>
          <PPBlock title={createProject} style={{ height: 430 }}>
            <Row>{createButtons()}</Row>
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
