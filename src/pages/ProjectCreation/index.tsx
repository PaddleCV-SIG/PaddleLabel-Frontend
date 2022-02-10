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
          <CreateButton>创建标注</CreateButton>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Space size={30}>
              <PPCard height={360} width={310} imgSrc={'./pics/classification.jpg'}>
                图像分类
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/object_detection.jpg'}>
                目标检测
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/instance_segmentation.jpg'}>
                实例分割
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/semantic_segmentation.jpg'}>
                语义分割
              </PPCard>
              <PPCard height={360} width={310} imgSrc={'./pics/keypoint_detection.jpg'}>
                关键点检测
              </PPCard>
            </Space>
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default Project;
