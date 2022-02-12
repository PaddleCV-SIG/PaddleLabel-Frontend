import type { ColProps } from 'antd';
import { Col } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const PPBlock: React.FC<ColProps & React.RefAttributes<HTMLDivElement>> = (props) => {
  const [hovered, SetHovered] = useState(false);
  return (
    <Col
      {...props}
      className={`${styles.col} ${props.className}`}
      style={{ zIndex: hovered ? 11 : 10, width: hovered ? '100%' : '100%' }}
      onMouseOver={() => {
        SetHovered(true);
      }}
      onMouseLeave={() => {
        SetHovered(false);
      }}
    >
      {props.children}
    </Col>
  );
};
export default PPBlock;
