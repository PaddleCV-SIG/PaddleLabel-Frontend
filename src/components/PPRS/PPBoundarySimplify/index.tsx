import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Button, Col, Dropdown, Input, Menu, message, Row } from 'antd';
import React from 'react';

export type PPBoundarySimplify = {
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
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

const component: React.FC<PPBoundarySimplify> = () => {
  return (
    <div>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>PD parameter</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Dropdown <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>Simplified distance</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>Simplified angle</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>Threshold of building simplification </span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
    </div>
  );
};
export default component;
