import React, { useEffect, useState } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import type { Label } from '@/models/label';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import type { Annotation } from '@/models/annotation';
import PPPolygon from '@/components/PPLabelPage/PPPolygon';
import drawPolygon from '@/components/PPLabelPage/PPPolygon/drawPolygon';
import { Button, Progress } from 'antd';

export type ToolType = 'polygon' | 'mover' | undefined;

type HistoryType = {
  index: number;
  items: {
    currentAnnotation?: Annotation<any>;
    annotations: Annotation<any>[];
  }[];
};

const Page: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation<any>>();
  const [annotations, setAnnotationsRaw] = useState<Annotation<any>[]>([]);
  const [scale, setScaleRaw] = useState(1);
  const setScale = (size: number) => {
    if (!size) setScaleRaw(1);
    if (size < 0.1 || size > 3.0) setScaleRaw(1);
    else setScaleRaw(size);
  };

  const setCurrentAnnotation = (anno?: Annotation<any>) => {
    // console.log('setCurrentAnnotation');
    // recordHistory(annotations, anno);
    setCurrentAnnotationRaw(anno);
    if (anno?.label) setCurrentLabel(anno.label);
  };

  const setAnnotations = (annos: Annotation<any>[]) => {
    // console.log('setAnnotations');
    // recordHistory(annos, currentAnnotation);
    setAnnotationsRaw(annos);
  };

  useEffect(() => {
    localStorage.removeItem('history');
  }, []);

  function recordHistory(annos: Annotation<any>[], anno?: Annotation<any>) {
    const historyStr = localStorage.getItem('history');
    const history: HistoryType = historyStr ? JSON.parse(historyStr) : { index: -1, items: [] };
    console.log(`history before set: `);
    const beforeItem = JSON.stringify(history);
    console.log(beforeItem);
    const newItem = { currentAnnotation: anno, annotations: annos };
    if (JSON.stringify(history.items[history.index]) == JSON.stringify(newItem)) {
      console.log('equal with latest, do not add to history');
      return;
    }
    const itemsToKeep = history.items.splice(0, history.index == 0 ? 1 : history.index + 1);
    console.log(`itemsToKeep: ${JSON.stringify(itemsToKeep)}`);
    console.log(`itemsToAdd: ${JSON.stringify(newItem)}`);
    history.items = itemsToKeep.concat([newItem]);
    history.index++;
    localStorage.setItem('history', JSON.stringify(history));
    console.log(`history after set: `);
    console.log(JSON.stringify(history));
  }

  const forwardHistory = () => {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) {
      console.log('no historyStr, skip.');
      return;
    }
    const history: HistoryType = JSON.parse(historyStr);
    if (!history) {
      return;
    }
    if (history.index >= history.items.length - 1) {
      console.log(
        `already latest, skip. history.index:${history.index} history.items.length:${history.items.length}`,
      );
      return;
    }
    history.index++;
    localStorage.setItem('history', JSON.stringify(history));

    console.log(`After forward. history:${JSON.stringify(history)}`);
    const item = history.items[history.index];
    setCurrentAnnotationRaw(item.currentAnnotation);
    setAnnotationsRaw(item.annotations);
  };

  const backwardHistory = () => {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) return;
    const history: HistoryType = JSON.parse(historyStr);
    if (!history || !history.index) return;
    if (history.index <= 0) return; // already the latest
    history.index--;
    localStorage.setItem('history', JSON.stringify(history));
    const item = history.items[history.index];
    console.log(`after backward: ${JSON.stringify(history)}`);
    setCurrentAnnotationRaw(item.currentAnnotation);
    setAnnotationsRaw(item.annotations);
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
    recordHistory(newAnnos, annotation);
  };

  const polygon = drawPolygon({
    currentLabel: currentLabel,
    currentTool: currentTool,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (annotation) => {
      const newAnnos = annotations.concat([annotation]);
      setAnnotations(newAnnos);
      if (!currentAnnotation) setCurrentAnnotation(annotation);
      recordHistory(newAnnos, annotation);
    },
    onAnnotationModify: onAnnotationModify,
  });

  const dr = polygon;

  return (
    <PPLabelPageContainer className={styles.key}>
      <PPToolBar>
        <PPPolygon
          active={currentTool == 'polygon'}
          onClick={() => {
            setCurrentTool('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          Polygon
        </PPPolygon>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            setScale(scale + 0.1);
          }}
        >
          Zoom in
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            setScale(scale - 0.1);
          }}
        >
          Zoom out
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">Save</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png">Move</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            backwardHistory();
          }}
        >
          Undo
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            forwardHistory();
          }}
        >
          Redo
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">Clear Mark</PPToolBarButton>
      </PPToolBar>
      <div className={styles.mainStage}>
        <div className={styles.draw}>
          <PPStage
            scale={scale}
            annotations={annotations}
            onMouseDown={dr.onMouseDown}
            onMouseMove={dr.onMouseMove}
            onMouseUp={dr.onMouseUp}
            createElementsFunc={dr.createElementsFunc}
          />
        </div>
        <div className={styles.pblock}>
          <div className={styles.progress}>
            <Progress percent={50} status="active" />
          </div>
        </div>
      </div>
      <div className={styles.rightSideBar}>
        <div className={styles.finished}>
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
          onAnnotationDelete={(annotation: Annotation<any>) => {
            setAnnotations(annotations.filter((x) => x.annotationId != annotation.annotationId));
            setCurrentAnnotation(undefined);
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
