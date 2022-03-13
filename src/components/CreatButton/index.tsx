import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

const CreateButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button onClick={props.onClick} icon={<PlusOutlined />} size="large" id={`${styles.createBtn}`}>
      {props.children}
    </Button>
  );
};
export default CreateButton;
