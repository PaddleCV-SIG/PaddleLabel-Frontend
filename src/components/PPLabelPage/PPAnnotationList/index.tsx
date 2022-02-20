import { List } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { Annotation } from '@/models/annotation';
import PPAnnotationListItem from './PPAnnotationListItem';

export type PPLabelListProps = {
  selectedAnnotation?: Annotation;
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationDelete: (annotation: Annotation) => void;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationSelect: (annotation: Annotation | undefined) => void;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  const [annotations] = useState<Annotation[]>([]);

  return (
    <>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>Annotation List</div>}
        bordered
        dataSource={annotations}
        renderItem={(item) => {
          return (
            <PPAnnotationListItem
              onClick={props.onAnnotationSelect}
              annotation={item}
              active={item.annotationId == props.selectedAnnotation?.annotationId}
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
