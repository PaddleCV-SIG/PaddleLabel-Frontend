import React, { useState } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import type { Label } from '@/models/label';
import type { Annotation } from '@/models/annotation';
import draw from '@/components/PPLabelPage/PPBrush/draw';

export type ToolType = 'polygon' | 'brush' | 'rubber' | 'mover' | undefined;

const Page: React.FC = () => {
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation>();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const setCurrentAnnotation = (anno?: Annotation) => {
    setCurrentAnnotationRaw(anno);
    if (anno?.label) setCurrentLabel(anno.label);
  };

  const onAnnotationModify = (annotation: Annotation) => {
    const newAnnos: Annotation[] = [];
    for (let i = 0; i < annotations.length; i++) {
      if (annotations[i].annotationId == annotation.annotationId) {
        newAnnos.push(annotation);
      } else {
        newAnnos.push(annotations[i]);
      }
    }
    setCurrentAnnotation(annotation);
    setAnnotations(newAnnos);
  };

  const dr = draw({
    currentLabel: currentLabel,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (annotation) => {
      setAnnotations(annotations.concat([annotation]));
      if (!currentAnnotation) setCurrentAnnotation(annotation);
    },
    onAnnotationModify: onAnnotationModify,
  });
  return (
    <PPLabelPageContainer className={styles.classes}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_in.png">Zoom in</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_out.png">Zoom out</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">Save</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png">Move</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/prev.png">Undo</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/next.png">Redo</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">Clear Mark</PPToolBarButton>
      </PPToolBar>
      <div className={styles.mainStage}>
        <PPStage
          annotations={annotations}
          onMouseDown={dr.onMouseDown}
          onMouseMove={dr.onMouseMove}
          onMouseUp={dr.onMouseUp}
        />
      </div>
      <div className={styles.rightSideBar}>
        <PPLabelList
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
            setCurrentAnnotation(undefined);
          }}
          onLabelModify={() => {}}
          onLabelDelete={() => {}}
          onLabelAdd={() => {}}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
