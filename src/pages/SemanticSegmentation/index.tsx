import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPBrush from '@/components/PPLabelPage/PPBrush';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import type { Label } from '@/models/label';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import type { Annotation } from '@/models/annotation';
import PPPolygon from '@/components/PPLabelPage/PPPolygon';
import drawBrush from '@/components/PPLabelPage/PPBrush/drawBrush';
import drawPolygon from '@/components/PPLabelPage/PPPolygon/drawPolygon';

export type ToolType = 'polygon' | 'brush' | 'rubber' | 'mover' | undefined;

const Page: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation<any>>();
  const [annotations, setAnnotations] = useState<Annotation<any>[]>([]);
  const [brushSize, setBrushSize] = useState(10);

  const setCurrentAnnotation = (anno?: Annotation<any>) => {
    setCurrentAnnotationRaw(anno);
    if (anno?.label) setCurrentLabel(anno.label);
  };

  const onAnnotationModify = (annotation: Annotation<any>) => {
    const newAnnos: Annotation<any>[] = [];
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

  const brush = drawBrush({
    currentLabel: currentLabel,
    brushSize: brushSize,
    currentTool: currentTool,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (annotation) => {
      setAnnotations(annotations.concat([annotation]));
      if (!currentAnnotation) setCurrentAnnotation(annotation);
    },
    onAnnotationModify: onAnnotationModify,
  });
  const polygon = drawPolygon({
    currentLabel: currentLabel,
    brushSize: brushSize,
    currentTool: currentTool,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (annotation) => {
      setAnnotations(annotations.concat([annotation]));
      if (!currentAnnotation) setCurrentAnnotation(annotation);
    },
    onAnnotationModify: onAnnotationModify,
  });
  const dr = currentTool == 'polygon' ? polygon : brush;
  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          Intelligent Interaction
        </PPToolBarButton>
        <PPPolygon
          active={currentTool == 'polygon'}
          onClick={() => {
            setCurrentTool('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          Polygon
        </PPPolygon>
        <PPBrush
          size={brushSize}
          active={currentTool == 'brush'}
          onClick={() => {
            if (currentTool != 'rubber' && currentTool != 'brush') {
              setCurrentAnnotation(undefined);
            }
            setCurrentTool('brush');
          }}
          onChange={(newBrushSize) => {
            setBrushSize(newBrushSize);
          }}
        >
          Brush
        </PPBrush>

        <PPBrush
          size={brushSize}
          active={currentTool == 'rubber'}
          onClick={() => {
            if (currentTool != 'rubber' && currentTool != 'brush') {
              setCurrentAnnotation(undefined);
            }
            setCurrentTool('rubber');
          }}
          onChange={(newBrushSize) => {
            setBrushSize(newBrushSize);
          }}
          imgSrc="./pics/buttons/rubber.png"
        >
          Rubber
        </PPBrush>
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
        <div className={styles.determinOutline}>
          <Button
            style={{ height: 40, fontSize: '0.75rem' }}
            type="primary"
            block
            onClick={() => {
              setCurrentAnnotation(undefined);
            }}
          >
            Determine Outline
          </Button>
        </div>
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
        <PPAnnotationList
          selectedAnnotation={currentAnnotation}
          annotations={annotations}
          onAnnotationSelect={(selectedAnno) => {
            if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
          }}
          onAnnotationAdd={() => {}}
          onAnnotationModify={() => {}}
          onAnnotationDelete={(annotation: Annotation) => {
            setAnnotations(annotations.filter((x) => x.annotationId != annotation.annotationId));
            setCurrentAnnotation(undefined);
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
