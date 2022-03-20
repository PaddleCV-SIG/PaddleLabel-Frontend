import { List } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';
import { Annotation } from '@/models/annotation';
import PPAnnotationListItem from './PPAnnotationListItem';
import { useIntl } from 'umi';

export type PPLabelListProps = {
  annotations: Annotation[];
  // FIXME: is this right? it is a Set()
  activeIds;
  selectedAnnotation?: Annotation;
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationDelete: (annotation: Annotation) => void;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationSelect: (annotation: Annotation | undefined) => void;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  const annotationList = useIntl().formatMessage({
    id: 'component.PPAnnotationList.annotationList',
  });
  const addAnnotation = useIntl().formatMessage({ id: 'component.PPAnnotationList.addAnnotation' });

  return (
    <>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>{annotationList}</div>}
        bordered
        dataSource={props.annotations}
        renderItem={(item) => {
          return (
            <PPAnnotationListItem
              onClick={props.onAnnotationSelect}
              annotation={item}
              active={props.activeIds?.has(item.annotationId)}
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
              {addAnnotation}
            </Button>
          </div>
        }
      />
    </>
  );
};
export default Component;
