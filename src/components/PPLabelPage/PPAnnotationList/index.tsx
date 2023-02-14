import { List, Spin } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';
import type { Annotation } from '@/models/annotation';
import { history } from 'umi';
import PPAnnotationListItem from './PPAnnotationListItem';
import { useIntl } from 'umi';

export type PPLabelListProps = {
  annotations: Annotation[];
  currAnnotation: Annotation;
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationDelete: (annotation: Annotation) => void;
  onAnnotationAdd: (annotation: Annotation) => void | undefined;
  onAnnotationSelect: (annotation: Annotation | undefined) => void;
  disabled?: boolean;
  type?: string;
  currAnnotations?: Annotation;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  const intl = useIntl();
  const annotationList = intl.formatMessage({
    id: 'component.PPAnnotationList.annotationList',
  });
  const addAnnotation = intl.formatMessage({ id: 'component.PPAnnotationList.addAnnotation' });

  const added = new Set();
  const labelId = new Map();
  const items: Annotation[] = [];
  let newItemns: Annotation[] = [];
  // const added = new Set();
  // const items: Annotation[] = [];

  if (history?.location?.pathname === '/semantic_segmentation' && props.annotations?.length > 0) {
    // debugger;

    for (const anno of props.annotations) {
      if (added.has(anno.frontendId)) continue;
      if (anno.type === 'rubber') continue;
      if (labelId.has(anno.labelId)) {
        const old = labelId.get(anno.labelId);
        if (old.frontendId < anno?.frontendId) {
          labelId.set(anno.labelId, anno);
        }
      } else {
        labelId.set(anno.labelId, anno);
      }
      // items.push(anno);
      added.add(anno.frontendId);
    }
    labelId.forEach((anno: Annotation) => {
      items.push(anno);
    });
  } else {
    if (props.annotations) {
      for (const anno of props.annotations) {
        if (added.has(anno.frontendId)) continue;
        items.push(anno);
        added.add(anno.frontendId);
      }
    }
  }
  if (props.type === 'Detection') {
    newItemns = items.sort((a: Annotation, b: Annotation) => {
      return a?.annotationId - b?.annotationId;
    });
  }

  return (
    <Spin spinning={props.disabled} indicator={<></>}>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>{annotationList}</div>}
        bordered
        dataSource={props.type === 'Detection' ? newItemns : items}
        renderItem={(item) => {
          return (
            <PPAnnotationListItem
              onClick={
                props.disabled
                  ? () => {}
                  : (annotation) => {
                      props.onAnnotationSelect(annotation);
                    }
              }
              annotation={item}
              active={
                props.disabled
                  ? false
                  : props.currAnnotations
                  ? item.frontendId == props.currAnnotations?.frontendId
                  : item.frontendId == props.currAnnotation?.frontendId
              }
              onAnnotationDelete={props.onAnnotationDelete}
              onAnnotationModify={props.onAnnotationModify}
            />
          );
        }}
        footer={() => {
          if (props.onAnnotationAdd)
            return (
              <div>
                <Button
                  style={{ height: 40, fontSize: '0.75rem' }}
                  type="primary"
                  onClick={() => {
                    props.onAnnotationAdd();
                  }}
                  block
                >
                  {addAnnotation}
                </Button>
              </div>
            );
          else return <div />;
        }}
      />
    </Spin>
  );
};
export default Component;
