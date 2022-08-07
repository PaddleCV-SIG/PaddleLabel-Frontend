import React from 'react';
import { Row, Col, message } from 'antd';
import { history } from 'umi';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';
import PPContainer from '@/components/PPContainer';
import PPOverlapCol from '@/components/PPOverlapCol';
import { createInfo, sampleApi } from '@/services/utils';
import { IntlInitJsx } from '@/components/PPIntl';

const SampleProject: React.FC = () => {
  // const intl = IntlInit('pages.welcome');
  const intl = IntlInitJsx('pages.welcome');
  return (
    <PPContainer>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock style={{ height: 500 }} title={intl('sampleProject')}>
            <Row>
              {Object.entries(createInfo).map((entry) => {
                const key = entry[0];
                const val = entry[1];
                return (
                  <PPOverlapCol span={4} key={key}>
                    <PPCard
                      height={360}
                      width={310}
                      imgSrc={val.avatar}
                      onClick={
                        key != 'keypointDetection'
                          ? () => {
                              sampleApi.loadSample({ taskCategoryId: val.id }).then((res) => {
                                history.push(`/project_overview?projectId=${res.projectId}`);
                              });
                            }
                          : () => {
                              message.info(intl('underDevelopment', 'global'));
                            }
                      }
                    >
                      {intl(key, 'global')}
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
