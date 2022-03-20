import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Button, Col, Dropdown, Input, Menu, message, Row } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

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
  const pdParameter = useIntl().formatMessage({ id: 'component.PPRS.pdParameter' });
  const simplifiedDistance = useIntl().formatMessage({
    id: 'component.PPRS.simplifiedDistance',
  });
  const simplifiedAngle = useIntl().formatMessage({ id: 'component.PPRS.simplifiedAngle' });
  const threshold = useIntl().formatMessage({ id: 'component.PPRS.threshold' });

  return (
    <div>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>{pdParameter}</span>
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
          <span>{simplifiedDistance}</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>{simplifiedAngle}</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>{threshold}</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
    </div>
  );
};
export default component;
