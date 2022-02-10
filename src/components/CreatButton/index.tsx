import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

const CreateButton: React.FC = (props) => {
  return (
    <Button icon={<PlusOutlined />} size="large" id={`${styles.createBtn}`}>
      {props.children}
    </Button>
  );
};
export default CreateButton;
