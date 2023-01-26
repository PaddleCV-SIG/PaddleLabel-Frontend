import { List, Space } from 'antd';
import React from 'react';
import styles from './index.less';
import PPColorBall from '../../PPColorBall';
import type { GeojsonFeatureObject } from '@/pages/RemoteSensing';

export type PPAnnotationListItemProps = {
  active?: boolean;
  annotation: GeojsonFeatureObject;
  // Currently, only support modify visibility and color
  onAnnotationModify: (annotation: GeojsonFeatureObject) => void;
  onAnnotationDelete: (annotation: GeojsonFeatureObject) => void;
  onClick: (annotation: GeojsonFeatureObject) => void;
};

const Component: React.FC<PPAnnotationListItemProps> = (props) => {
  const annotation = { ...props.annotation };
  // const [invisible, setInvisible] = useState(annotation.invisible);
  // useEffect(() => {
  //   setInvisible(props.annotation.invisible);
  // }, [props.annotation.invisible]);
  const invisible = false;
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
          onClick={(e) => {
            e.stopPropagation();
            // setInvisible(!invisible);
            props.onAnnotationModify(annotation);
          }}
        />{' '}
        <span className={styles.annotationId}>{annotation.properties.annotationId}</span>
        <span className={styles.labelName}>{annotation.properties.labelName}</span>
        <PPColorBall color={annotation.properties.stroke} />
      </Space>

      <a
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          // annotation.delete = true;
          props.onAnnotationDelete(annotation);
        }}
      />
    </List.Item>
  );
  return item;
};
export default Component;
