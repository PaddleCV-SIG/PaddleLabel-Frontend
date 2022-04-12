import React from 'react';
import { Row, Col } from 'antd';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';
import { createInfo } from '@/services/utils';

const Project: React.FC = () => {
  function createButtons() {
    const creators = [];
    for (const [taskCategory, info] of Object.entries(createInfo)) {
      creators.push(
        <PPOverlapCol span={4}>
          <PPCard
            height={360}
            width={310}
            imgSrc={info.avatar}
            href={'/project_detail?taskCategory=' + taskCategory}
          >
            {info.name}
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
            <Row>{createButtons()}</Row>
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default Project;
