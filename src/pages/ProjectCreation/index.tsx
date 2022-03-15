import React from 'react';
import { Row, Col } from 'antd';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';

const Project: React.FC = () => {
  const createInfo = [
    {
      taskCategory: 'classification',
      name: 'Image Classification',
      avatar: './pics/classification.jpg',
    },
    { taskCategory: 'detection', name: 'Detection', avatar: './pics/object_detection.jpg' },
    {
      taskCategory: 'instanceSegmentation',
      name: 'Instance Segmentation',
      avatar: './pics/instance_segmentation.jpg',
    },
    {
      taskCategory: 'semanticSegmentation',
      name: 'Semantic Segmentation',
      avatar: './pics/semantic_segmentation.jpg',
    },
    {
      taskCategory: 'keypoint',
      name: 'Keypoint Detection',
      avatar: './pics/keypoint_detection.jpg',
    },
  ];
  function create() {
    const creators = [];
    for (const info of createInfo) {
      creators.push(
        <PPOverlapCol span={4}>
          <PPCard
            height={360}
            width={310}
            imgSrc={info['avatar']}
            href={'/project_creation?taskCategory=' + info['taskCategory']}
          >
            {info['name']}
          </PPCard>
        </PPOverlapCol>,
      );
    }
    return creators;
  }
  return (
    <PPContainer>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Row>{create()}</Row>
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default Project;
