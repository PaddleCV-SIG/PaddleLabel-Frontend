import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from './index.less';

export type PPCardProps = {
  title?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const PPBlock: React.FC<PPCardProps> = (props) => {
  return (
    <div className={styles.ppcard} style={props.style}>
      <Row className={styles.titleRow} style={{ display: props.title ? undefined : 'none' }}>
        <Title className={styles.title}>{props.title}</Title>
      </Row>
      <Row style={{ marginTop: 26 }}>
        <Col
          span={24}
          style={{ paddingLeft: 30, paddingRight: 30, textAlign: 'center', ...props.innerStyle }}
        >
          {props.children}
        </Col>
      </Row>
    </div>
  );
};
export default PPBlock;
