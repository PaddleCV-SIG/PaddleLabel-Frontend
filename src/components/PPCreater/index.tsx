import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from './index.less';

export type _PPCardProps = {
  title?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const _PPBlock: React.FC<_PPCardProps> = (props) => {
  return (
    <div className={styles._ppcard} style={props.style}>
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

export type PPCardProps = {
  title?: string;
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const PPCreater: React.FC<PPCardProps> = (props) => {
  return (
    <div className={styles.shadow} style={props.style}>
      <div id="left" className={styles.block}>
        <_PPBlock title={props.title} style={{ marginTop: 112, height: 608 }}></_PPBlock>
      </div>
      <div id="right" className={styles.block}>
        <_PPBlock style={{ marginTop: 112, height: 608 }}>
          <img src={props.imgSrc} style={{ height: 558, width: 768 }} />
        </_PPBlock>
      </div>
    </div>
  );
};

export default PPCreater;
