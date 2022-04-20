import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';

const PPCreateButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button onClick={props.onClick} size="large" id={`${styles.createBtn}`}>
      {props.children}
    </Button>
  );
};
export default PPCreateButton;
