import styles from './index.less';
import { Col, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

export type PPGrids = {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const Component: React.FC<PPGrids> = () => {
  const intl = useIntl();
  const gridSize = intl.formatMessage({ id: 'component.PPRS.gridSize' });
  const overlap = intl.formatMessage({ id: 'component.PPRS.overlap' });
  const completed = intl.formatMessage(
    { id: 'component.PPRS.completed' },
    {
      show: 1,
      total: 16,
    },
  );

  return (
    <div>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>{gridSize}</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input autoComplete="off" placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.RSPop1}>
          <span>{overlap}</span>
        </Col>
        <Col span={12} className={styles.RSPop2}>
          <Input autoComplete="off" placeholder="Basic usage" />
        </Col>
      </Row>
      <Row>
        <span className={styles.RSPop3}>{completed}</span>
      </Row>
    </div>
  );
};
export default Component;
