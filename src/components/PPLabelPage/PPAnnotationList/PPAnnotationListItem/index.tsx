import { List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import PPColorBall from '../../PPColorBall';
import type { Annotation } from '@/models/annotation';

export type PPAnnotationListItemProps = {
  active: boolean;
  annotation: Annotation;
  // Currently, only support modify visibility and color
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationDelete: (annotation: Annotation) => void;
  onClick: (annotation: Annotation) => void;
};

const Component: React.FC<PPAnnotationListItemProps> = (props) => {
  const annotation = { ...props.annotation };
  const [invisible, setInvisible] = useState(annotation.invisible);
  useEffect(() => {
    setInvisible(props.annotation.invisible);
  }, [props.annotation.invisible]);
  const item = (
    <List.Item
      className={`${styles.listItem} ${props.active ? styles.listItemActive : ''}`}
      unselectable="on"
      onClick={() => {
        props.onClick(annotation);
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
            props.onAnnotationModify(annotation);
          }}
        />{' '}
        <span className={styles.annotationId}>{annotation.annotationId}</span>
        <span className={styles.labelName}>{annotation.label.name}</span>
        <PPColorBall color={annotation.label.color} />
      </Space>

      <a
        className={styles.delete}
        onClick={() => {
          annotation.delete = true;
          props.onAnnotationDelete(annotation);
        }}
      />
    </List.Item>
  );
  return item;
};
export default Component;
