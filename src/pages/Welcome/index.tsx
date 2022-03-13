import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import PPContainer from '@/components/PPContainer';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import type { ColumnsType } from 'antd/es/table';
import PPTable from '@/components/PPTable';
import PPButton from '@/components/PPButton';
import CreateButton from '@/components/CreatButton';
import { history } from 'umi';
import PPOverlapCol from '@/components/PPOverlapCol';
import { ProjectApi } from '@/services/apis/ProjectApi';

export type ProjectInfo = {
  project_id: number;
  name: string;
};

const columns: ColumnsType<ProjectInfo> = [
  {
    title: 'ID',
    dataIndex: 'project_id',
    key: 'project_id',
    width: '4.5rem',
    align: 'center',
    render: (text: string) => <>{text}</>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'project_id',
  },
  {
    title: 'Actions',
    key: 'project_id',
    width: '15rem',
    align: 'center',
    render: (text, record) => (
      <Space size="middle">
        <PPButton width="4.375rem" height="1.875rem" color={'rgba(241,162,0,1)'}>
          Modify
        </PPButton>
        <PPButton
          width="4.375rem"
          height="1.875rem"
          color={'rgba(0,100,248,1)'}
          onClick={() => {
            history.push('/label/' + record.project_id);
          }}
        >
          Mark
        </PPButton>
        <PPButton width="4.375rem" height="1.875rem" color={'rgba(207,63,0,1)'}>
          Delete
        </PPButton>
      </Space>
    ),
  },
];

const Welcome: React.FC = () => {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    const projectApi = new ProjectApi();
    projectApi.projectsGet().then(function (res) {
      setProjects(JSON.parse(JSON.stringify(res))); // TODO: get dict instead of object
      console.log(JSON.parse(JSON.stringify(res)));
    });
  }, []);

  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <CreateButton>
            {/* {intl.formatMessage({ project_id: 'welcome.createProject' })} */}
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
                How to tran using paddleclas
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to tran using paddledet
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to tran using paddleseg
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                How to tran using paddlex
              </Button>
            </Space>
          </PPBlock>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock title="My Projects">
            <PPTable columns={columns} dataSource={projects} showHeader={false} />
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default await Welcome;
