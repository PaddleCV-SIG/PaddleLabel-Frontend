import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';

export type MyButtonStyles = {
  width?: number;
  height?: number;
};

const myButton: React.FC<MyButtonStyles & ButtonProps> = (props) => {
  const myButtonStyles: MyButtonStyles = props;
  return (
    <Button {...props} style={myButtonStyles} className={`${styles.button}`}>
      {props.children}
    </Button>
  );
};
export default myButton;
