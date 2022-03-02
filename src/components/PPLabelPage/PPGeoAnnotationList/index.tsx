import { List } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';
import PPAnnotationListItem from './PPAnnotationListItem';
import type { GeojsonCollection, GeojsonFeatureObject } from '@/pages/RemoteSensing';

export type PPLabelListProps = {
  annotations: GeojsonCollection;
  onAnnotationModify: (annotation: GeojsonFeatureObject) => void;
  onAnnotationDelete: (annotation: GeojsonFeatureObject) => void;
  onAnnotationAdd: (annotation: GeojsonFeatureObject) => void;
  onAnnotationSelect: (annotation: GeojsonFeatureObject | undefined) => void;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  return (
    <>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>Annotation List</div>}
        bordered
        dataSource={props.annotations.features}
        renderItem={(item) => {
          return (
            <PPAnnotationListItem
              onClick={props.onAnnotationSelect}
              annotation={item}
              active={false}
              onAnnotationDelete={props.onAnnotationDelete}
              onAnnotationModify={props.onAnnotationModify}
            />
          );
        }}
        footer={
          <div>
            <Button
              style={{ height: 40, fontSize: '0.75rem' }}
              type="primary"
              onClick={() => {
                props.onAnnotationSelect(undefined);
              }}
              block
            >
              Add Annotation
            </Button>
          </div>
        }
      />
    </>
  );
};
export default Component;
