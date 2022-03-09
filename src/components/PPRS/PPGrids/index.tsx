import styles from './index.less';
import { Col, Input, Row } from 'antd';
import React from 'react';

export type PPGrids = {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const component: React.FC<PPGrids> = () => {
  return (
    <div>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>Size of Grid</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>Overlap of Grid</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <span className={styles.RSPop3}>Current annotation completed 1 / 16</span>
      </Row>
    </div>
  );
};
export default component;
