import React from 'react';
import { Row, Col, Space } from 'antd';
import PPContainer from '@/components/PPContainer';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import CreateButton from '@/components/CreatButton';

const Project: React.FC = () => {
  return (
    <PPContainer>
      <Row gutter={[20, 20]} style={{ marginTop: 101 }}>
        <Col span={24}>
          <CreateButton>Create Label</CreateButton>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Space size={30}>
              <PPCard height={360} width={310} imgSrc={'./pics/classification.jpg'}>
                Image Classification
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/object_detection.jpg'}>
                Object Detection
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/instance_segmentation.jpg'}>
                Instance Segmentation
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/semantic_segmentation.jpg'}>
                Semantic Segmentation
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/keypoint_detection.jpg'}>
                Keypoint detection
              </PPCard>
            </Space>
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default Project;
