import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Button, Col, Descriptions, Dropdown, Menu, message, Row } from 'antd';
import React from 'react';

export type PPRGBSetting = {
  // imgSrc: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function handleMenuClick(e: any) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      band_1
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      band_2
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      band_3
    </Menu.Item>
  </Menu>
);

const component: React.FC<PPRGBSetting> = () => {
  return (
    <div>
      <Row>
        <Col className={styles.RSPop1}>
          <span>R</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col className={styles.RSPop1}>
          <span>G</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col className={styles.RSPop1}>
          <span>B</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col className={styles.RSPop1}>
          <span>R</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col className={styles.RSPop1}>
          <span>G</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col className={styles.RSPop1}>
          <span>B</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Descriptions title="Data source information" column={1} bordered>
        <Descriptions.Item label="FileName">A/XXX.tif B/XXX.tf</Descriptions.Item>
        <Descriptions.Item label="Row">1234</Descriptions.Item>
        <Descriptions.Item label="Column">897</Descriptions.Item>
        <Descriptions.Item label="Bands">7 7</Descriptions.Item>
        <Descriptions.Item label="DataType">UInt16</Descriptions.Item>
        <Descriptions.Item label="EPSG">7030</Descriptions.Item>
        <Descriptions.Item label="Unit">m</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default component;
