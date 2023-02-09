import React, { useState } from 'react';
import { List, Space } from 'antd';
import styles from './index.less';
import PPColorBall from '../../PPColorBall';
import type { Label } from '@/models/label';

export type PPLabelListItemProps = {
  label: Label;
  active: boolean;
  hideEye?: boolean;
  hideColorPicker?: boolean;
  // Currently, only support modify visibility and color
  onLabelModify?: (label: Label) => void;
  onLabelDelete: (label: Label) => void;
  onClick: (label: Label) => void;
  onHideLabel: (change: boolean, id: number) => void;
};

const Component: React.FC<PPLabelListItemProps> = (props) => {
  const label = { ...props.label };
  const [invisible, setInvisible] = useState(label.invisible);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const eye = props.hideEye ? (
    ' '
  ) : (
    <>
      <a
        className={styles.eye}
        style={{
          backgroundImage: invisible ? 'url(./pics/hide.png)' : 'url(./pics/show.png)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setInvisible(!invisible);
          if (props.onLabelModify) props.onLabelModify(label);
          props.onHideLabel(Boolean(!invisible), label.labelId);
        }}
      />{' '}
    </>
  );

  const colorPicker = props.hideColorPicker ? (
    <></>
  ) : (
    <PPColorBall
      color={label.color}
      changeable={false}
      onChange={(targetColor) => {
        label.color = targetColor.hex;
        props.onLabelModify(label);
      }}
    />
  );

  const item = (
    <List.Item
      className={`${styles.listItem} ${props.active ? styles.listItemActive : ''}`}
      unselectable="on"
      onClick={() => {
        props.onClick(label);
      }}
      data-test-id={`category-${label.ith}`}
    >
      <Space align="center" size={5}>
        {eye}
        {label.name}
        {colorPicker}
      </Space>
      <a
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          const time = new Date().getTime();
          if (time - lastClickTime < 300) return;
          setLastClickTime(time);
          props.onLabelDelete(label);
        }}
        data-test-id={`deleteCategory-${label.ith}`}
      />
    </List.Item>
  );
  return item;
};
export default Component;
