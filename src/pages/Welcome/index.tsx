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
  projectId: number;
  name: string;
};

const columns: ColumnsType<ProjectInfo> = [
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
    key: 'name',
  },
  {
    title: 'Actions',
    key: 'projectId',
    width: '15rem',
    align: 'center',
    render: (text, record) => (
      <Space size="middle">
        <PPButton width="4.375rem" height="1.875rem" color={'rgba(241,162,0,1)'}>
          修改信息
        </PPButton>
        <PPButton
          width="4.375rem"
          height="1.875rem"
          color={'rgba(0,100,248,1)'}
          onClick={() => {
            history.push('/label/' + record.projectId);
          }}
        >
          去标注
        </PPButton>
        <PPButton width="4.375rem" height="1.875rem" color={'rgba(207,63,0,1)'}>
          删除
        </PPButton>
      </Space>
    ),
  },
];

// moved mock project data to /mock/project.ts, had trouble commiting

const Welcome: React.FC = () => {
  // Sample backend API Call
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    const projectApi = new ProjectApi();
    projectApi.projectsGet().then(function (res) {
      setProjects(JSON.parse(JSON.stringify(res))); // TODO: get dict instead of object
    });
  }, []);

  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <CreateButton>
            {/* {intl.formatMessage({ projectId: 'welcome.createProject' })} */}
            创建项目
          </CreateButton>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col span={17}>
          <PPBlock title="示例项目" style={{ height: 430 }}>
            <Row>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/classification.jpg'}>图像分类标注示例</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/object_detection.jpg'}>目标检测标注示例</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/instance_segmentation.jpg'}>实例分割标注示例</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/semantic_segmentation.jpg'}>语义分割标注示例</PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard imgSrc={'./pics/keypoint_detection.jpg'}>关键点检测标注示例</PPCard>
              </PPOverlapCol>
            </Row>
          </PPBlock>
        </Col>
        <Col span={7}>
          <PPBlock title="模型训练知识" style={{ height: 430 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={10}>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                如何使用 paddleclas 训练
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                如何使用 paddledet 训练
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                如何使用 paddleseg 训练
              </Button>
              <Button type="primary" style={{ height: '3.125rem' }} block>
                如何使用 paddlex 训练
              </Button>
            </Space>
          </PPBlock>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock title="我的项目">
            <PPTable columns={columns} dataSource={projects} showHeader={false} />
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default await Welcome;
