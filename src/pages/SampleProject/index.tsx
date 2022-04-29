import React from 'react';
import { Row, Col } from 'antd';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';
import { createInfo } from '@/services/utils';
import { manageApi } from '@/services/utils';

const SampleProject: React.FC = () => {
  return (
    <PPContainer>
      {'Sample Projects'}
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Row>
              {Object.keys(createInfo).map((key) => {
                return (
                  <PPOverlapCol span={4} key={key}>
                    <PPCard
                      height={360}
                      width={310}
                      imgSrc={createInfo[key].avatar}
                      onClick={() => {
                        manageApi.loadSample({ taskCategory: key });
                      }}
                    >
                      {createInfo[key].name}
                    </PPCard>
                  </PPOverlapCol>
                );
              })}
            </Row>
          </PPBlock>
        </Col>
      </Row>
    </PPContainer>
  );
};

export default SampleProject;
