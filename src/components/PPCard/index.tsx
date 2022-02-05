import type { CardProps } from 'antd';
import { Card } from 'antd';
import React from 'react';
import styles from './index.less';

export type MyButtonStyles = {
  width?: number;
  height?: number;
};

const PPCard: React.FC<MyButtonStyles & CardProps> = (props) => {
  return (
    <>
      <Card
        hoverable
        className={styles.card}
        cover={<img alt="example" src="/pics/classification.jpg" />}
      >
        {props.children}
      </Card>
    </>
  );
};
export default PPCard;
