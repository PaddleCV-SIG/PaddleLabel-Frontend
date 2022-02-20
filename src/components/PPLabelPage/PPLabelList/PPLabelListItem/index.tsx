import { List, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import PPColorBall from '../../PPColorBall';
import { Label } from '@/models/label';

export type PPLabelListItemProps = {
  active?: boolean;
  label: Label;
  // Currently, only support modify visibility and color
  onLabelModify: (label: Label) => void;
  onLabelDelete: (label: Label) => void;
  onClick: (label: Label) => void;
};

const Component: React.FC<PPLabelListItemProps> = (props) => {
  const label = { ...props.label };
  const [invisible, setInvisible] = useState(label.invisible);
  const item = (
    <List.Item
      className={`${styles.listItem} ${props.active ? styles.listItemActive : ''}`}
      unselectable="on"
      onClick={() => {
        props.onClick(label);
      }}
    >
      <Space align="center" size={5}>
        <a
          className={styles.eye}
          style={{
            backgroundImage: invisible ? 'url(./pics/hide.png)' : 'url(./pics/show.png)',
          }}
          onClick={() => {
            setInvisible(!invisible);
            props.onLabelModify(label);
          }}
        />{' '}
        {label.name}
        <PPColorBall
          color={label.color}
          changeable={true}
          onChange={(targetColor) => {
            label.color = targetColor.hex;
            props.onLabelModify(label);
          }}
        />
      </Space>
    </List.Item>
  );
  return item;
};
export default Component;
