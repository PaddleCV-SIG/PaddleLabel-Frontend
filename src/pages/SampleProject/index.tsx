import React from 'react';
import { Row, Col } from 'antd';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';
import { createInfo } from '@/services/utils';

const SampleProject: React.FC = () => {
  return (
    <PPContainer>
      {'Sample Projects'}
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Row>
              {Object.values(createInfo).map((info) => {
                console.log('info', info);
                return (
                  <PPOverlapCol span={4}>
                    <PPCard height={360} width={310} imgSrc={info.avatar} onClick={() => {}}>
                      {info.name}
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
