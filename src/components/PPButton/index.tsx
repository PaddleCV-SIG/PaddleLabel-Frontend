import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';

export type PPButtonStyles = {
  width?: string;
  height?: string;
  color?: string;
};

const PPButton: React.FC<PPButtonStyles & ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      style={{
        color: props.color,
        width: props.width,
        height: props.height,
        borderColor: props.color,
      }}
      className={`${styles.button}`}
    >
      {props.children}
    </Button>
  );
};
export default PPButton;
