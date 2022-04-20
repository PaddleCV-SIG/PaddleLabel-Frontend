import { List } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';
import { Annotation } from '@/models/annotation';
import PPAnnotationListItem from './PPAnnotationListItem';
import { useIntl } from 'umi';

export type PPLabelListProps = {
  annotations: Annotation[];
  currAnnotation: Annotation;
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationDelete: (annotation: Annotation) => void;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationSelect: (annotation: Annotation | undefined) => void;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  const intl = useIntl();
  const annotationList = intl.formatMessage({
    id: 'component.PPAnnotationList.annotationList',
  });
  const addAnnotation = intl.formatMessage({ id: 'component.PPAnnotationList.addAnnotation' });

  const added = new Set();
  const items: Annotation[] = [];
  for (const anno of props.annotations) {
    if (added.has(anno.frontendId)) continue;
    items.push(anno);
    added.add(anno.frontendId);
  }
  return (
    <>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>{annotationList}</div>}
        bordered
        dataSource={items}
        renderItem={(item) => {
          return (
            <PPAnnotationListItem
              onClick={props.onAnnotationSelect}
              annotation={item}
              active={item.frontendId == props.currAnnotation?.frontendId}
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
                // props.onAnnotationSelect(undefined);
                props.onAnnotationAdd();
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
