import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import styles from './index.less';
import PPContainer from '@/components/PPContainer';
import { PlusOutlined } from '@ant-design/icons';
import PPCard from '@/components/PPCard';
import PPBlock from '@/components/PPBlock';

const Welcome: React.FC = () => {
  return (
    <PPContainer>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Button icon={<PlusOutlined />} size="large" id={`${styles.createBtn}`}>
            {/* {intl.formatMessage({ id: 'welcome.createProject' })} */}
            创建项目
          </Button>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col span={17}>
          <PPBlock title="示例项目" style={{ height: 430 }}>
            <Space size={20}>
              <PPCard>图像分类标注示例</PPCard>
              <PPCard>图像分类标注示例</PPCard>
              <PPCard>图像分类标注示例</PPCard>
              <PPCard>图像分类标注示例</PPCard>
              <PPCard>图像分类标注示例</PPCard>
            </Space>
          </PPBlock>
        </Col>
        <Col span={7}>
          <PPBlock title="模型训练知识" style={{ height: 430 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={10}>
              <Button type="primary" style={{ height: '50px' }} block>
                如何使用 paddleclas 训练
              </Button>
              <Button type="primary" style={{ height: '50px' }} block>
                如何使用 paddledet 训练
              </Button>
              <Button type="primary" style={{ height: '50px' }} block>
                如何使用 paddleseg 训练
              </Button>
              <Button type="primary" style={{ height: '50px' }} block>
                如何使用 paddlex 训练
              </Button>
            </Space>
          </PPBlock>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <PPBlock title="我的项目" />
        </Col>
      </Row>
    </PPContainer>
  );
};

export default Welcome;
