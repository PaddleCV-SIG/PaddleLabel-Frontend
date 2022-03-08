import React, { useState } from 'react';
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
import { AnnotationApi } from '@/services/apis/AnnotationApi';
import type { Annotation } from '@/services/models';

const anno = new AnnotationApi();

export type ProjectInfo = {
  id: number;
  name: string;
};

const columns: ColumnsType<ProjectInfo> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
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
    key: 'id',
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
            history.push('/label/' + record.id);
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

const data: ProjectInfo[] = [
  {
    id: 1,
    name: 'Project1',
  },
  {
    id: 2,
    name: 'Project2',
  },
  {
    id: 3,
    name: 'Project3',
  },
  {
    id: 4,
    name: 'Project4',
  },
  {
    id: 5,
    name: 'Project5',
  },
  {
    id: 6,
    name: 'Project6',
  },
  {
    id: 7,
    name: 'Project7',
  },
  {
    id: 8,
    name: 'Project8',
  },
  {
    id: 9,
    name: 'Project9',
  },
  {
    id: 10,
    name: 'Project10',
  },
  {
    id: 11,
    name: '基于xxx的目标检测',
  },
  {
    id: 12,
    name: '非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的名字',
  },
  {
    id: 13,
    name: 'Sample Project for xxx',
  },
  {
    id: 13,
    name: 'Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long name',
  },
];

const Welcome: React.FC = () => {
  // Sample Call backend API and use response
  const [res, setRes] = useState<Annotation>({});
  anno
    .annotationsAnnotationIdGet({
      annotationId: 0,
    })
    .then((response) => {
      setRes(response);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(res);
  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <CreateButton>
            {/* {intl.formatMessage({ id: 'welcome.createProject' })} */}
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
            <PPTable columns={columns} dataSource={data} showHeader={false} />
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default await Welcome;
