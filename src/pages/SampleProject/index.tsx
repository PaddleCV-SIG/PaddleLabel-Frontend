import React from 'react';
import { Row, Col } from 'antd';
import { history } from 'umi';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';
import { createInfo, manageApi } from '@/services/utils';

const SampleProject: React.FC = () => {
  return (
    <PPContainer>
      {'Sample Projects'}
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }}>
            <Row>
              {Object.entries(createInfo).map((entry) => {
                const key = entry[0];
                const val = entry[1];
                console.log(key, val);
                return (
                  <PPOverlapCol span={4} key={key}>
                    <PPCard
                      height={360}
                      width={310}
                      imgSrc={val.avatar}
                      onClick={() => {
                        manageApi.loadSample({ taskCategoryId: val.id }).then((res) => {
                          history.push(`/project_overview?projectId=${res.projectId}`);
                        });
                      }}
                    >
                      {val.name}
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
