import React from 'react';
import { Row, Col } from 'antd';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';

const Project: React.FC = () => {
  return (
    <PPContainer>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Row>
              <PPOverlapCol span={4}>
                <PPCard
                  height={360}
                  width={310}
                  imgSrc={'./pics/classification.jpg'}
                  href="/classification_project"
                >
                  Image Classification
                </PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard height={360} width={310} imgSrc={'./pics/object_detection.jpg'}>
                  Object Detection
                </PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard height={360} width={310} imgSrc={'./pics/instance_segmentation.jpg'}>
                  Instance Segmentation
                </PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard height={360} width={310} imgSrc={'./pics/semantic_segmentation.jpg'}>
                  Semantic Segmentation
                </PPCard>
              </PPOverlapCol>
              <PPOverlapCol span={4}>
                <PPCard height={360} width={310} imgSrc={'./pics/keypoint_detection.jpg'}>
                  Keypoint detection
                </PPCard>
              </PPOverlapCol>
            </Row>
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default Project;
