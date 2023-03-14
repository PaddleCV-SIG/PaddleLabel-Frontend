import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from './index.less';

export type PPCardProps = {
  title?: string | React.Component;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  reset?: () => void;
  hidden?: boolean;
};

const PPBlock: React.FC<PPCardProps> = (props) => {
  return (
    <div className={styles.ppcard} style={props.style} hidden={props.hidden}>
      <Row
        className={styles.titleRow}
        style={{
          display: props.title ? 'flex' : 'none',
          alignItems: 'center',
        }}
      >
        <Title className={styles.title}>{props.title}</Title>
        {props.reset && (
          <div
            className="reset_buttons"
            style={{
              color: 'white',
              height: '2.5rem',
              marginBottom: 0,
              fontWeight: 400,
              fontSize: '1.25rem',
              marginLeft: '1.063rem',
              lineHeight: '2.5rem',
              background: '#1727c2',
              padding: '0rem 0.5rem',
              cursor: 'pointer',
            }}
            onClick={props.reset}
          >
            重制初始项目
          </div>
        )}
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
