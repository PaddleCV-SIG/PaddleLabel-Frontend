import React, { useEffect, useState } from 'react';
import { Button, Popover, Progress } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPBrush from '@/components/PPLabelPage/PPBrush';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import type { Label } from '@/models/label';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import type { Annotation } from '@/models/annotation';
import PPPolygon from '@/components/PPLabelPage/PPPolygon';
import drawBrush from '@/components/PPLabelPage/PPBrush/drawBrush';
import drawPolygon from '@/components/PPLabelPage/PPPolygon/drawPolygon';
import PPMedicalSetting from '@/components/PPMedical/PPMedicalSetting';
import { useIntl } from 'umi';

export type ToolType = 'polygon' | 'brush' | 'rubber' | 'mover' | undefined;

export const MOST_HISTORY_STEPS = 40;

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
  const [brushSize, setBrushSize] = useState(10);
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
    recordHistory([]);
  }, []);

  function recordHistory(annos: Annotation<any>[], anno?: Annotation<any>) {
    const historyStr = localStorage.getItem('history');
    const history: HistoryType = historyStr ? JSON.parse(historyStr) : { index: -1, items: [] };
    const newItem = { currentAnnotation: anno, annotations: annos };
    if (JSON.stringify(history.items[history.index]) == JSON.stringify(newItem)) {
      return;
    }
    const earliestIndex =
      history.index > MOST_HISTORY_STEPS ? history.index - MOST_HISTORY_STEPS : 0;
    const itemsToKeep = history.items.splice(
      earliestIndex,
      history.index == 0 ? 1 : history.index + 1,
    );
    history.items = itemsToKeep.concat([newItem]);
    if (history.index <= MOST_HISTORY_STEPS) history.index++;
    else history.index = MOST_HISTORY_STEPS + 1;
    localStorage.setItem('history', JSON.stringify(history));
  }

  const forwardHistory = () => {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) {
      return;
    }
    const history: HistoryType = JSON.parse(historyStr);
    if (!history) {
      return;
    }
    if (history.index >= history.items.length - 1) {
      return;
    }
    history.index++;
    localStorage.setItem('history', JSON.stringify(history));
    const item = history.items[history.index];
    setCurrentAnnotationRaw(item.currentAnnotation);
    setAnnotations(item.annotations);
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
    setCurrentAnnotationRaw(item.currentAnnotation);
    setAnnotations(item.annotations);
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
      const newAnnos = annotations.concat([annotation]);
      setAnnotations(newAnnos);
      if (!currentAnnotation) setCurrentAnnotation(annotation);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: () => {
      recordHistory(annotations, currentAnnotation);
    },
  });

  const polygon = drawPolygon({
    currentLabel: currentLabel,
    brushSize: brushSize,
    currentTool: currentTool,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (annotation) => {
      const newAnnos = annotations.concat([annotation]);
      setAnnotations(newAnnos);
      if (!currentAnnotation) setCurrentAnnotation(annotation);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: () => {
      recordHistory(annotations, currentAnnotation);
    },
  });

  const dr = currentTool == 'polygon' ? polygon : brush;

  const polygonBtn = useIntl().formatMessage({ id: 'pages.toolBar.polygon' });
  const brushBtn = useIntl().formatMessage({ id: 'pages.toolBar.brush' });
  const rubber = useIntl().formatMessage({ id: 'pages.toolBar.rubber' });
  const zoomIn = useIntl().formatMessage({ id: 'pages.toolBar.zoomIn' });
  const zoomOut = useIntl().formatMessage({ id: 'pages.toolBar.zoomOut' });
  const move = useIntl().formatMessage({ id: 'pages.toolBar.move' });
  const unDo = useIntl().formatMessage({ id: 'pages.toolBar.unDo' });
  const reDo = useIntl().formatMessage({ id: 'pages.toolBar.reDo' });
  const save = useIntl().formatMessage({ id: 'pages.toolBar.save' });
  const edit = useIntl().formatMessage({ id: 'pages.toolBar.edit' });
  const clearMark = useIntl().formatMessage({ id: 'pages.toolBar.clearMark' });
  const interactor = useIntl().formatMessage({ id: 'pages.toolBar.interactor' });
  const segmentThreshold = useIntl().formatMessage({ id: 'pages.toolBar.segmentThreshold' });
  const transparency = useIntl().formatMessage({ id: 'pages.toolBar.transparency' });
  const visualRadius = useIntl().formatMessage({ id: 'pages.toolBar.visualRadius' });
  const determineOutline = useIntl().formatMessage({ id: 'pages.toolBar.determineOutline' });
  const medicalSetting = useIntl().formatMessage({ id: 'pages.toolBar.medicalSetting' });
  const divideData = useIntl().formatMessage({ id: 'pages.toolBar.divideData' });
  const exportBtn = useIntl().formatMessage({ id: 'pages.toolBar.export' });

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPPolygon
          active={currentTool == 'polygon'}
          onClick={() => {
            setCurrentTool('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          {polygonBtn}
        </PPPolygon>
        <PPToolBarButton imgSrc="./pics/buttons/edit.png">{edit}</PPToolBarButton>
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
          {brushBtn}
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
          {rubber}
        </PPBrush>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            setScale(scale + 0.1);
          }}
        >
          {zoomIn}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            setScale(scale - 0.1);
          }}
        >
          {zoomOut}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">{save}</PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            setCurrentTool('mover');
          }}
        >
          {move}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            backwardHistory();
          }}
        >
          {unDo}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            forwardHistory();
          }}
        >
          {reDo}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">{clearMark}</PPToolBarButton>
      </PPToolBar>
      <div id="dr" className={styles.mainStage}>
        <div className={styles.draw}>
          <PPStage
            width={document.getElementById('dr')?.clientWidth}
            scale={scale}
            annotations={annotations}
            currentTool={currentTool}
            currentAnnotation={currentAnnotation}
            setCurrentAnnotation={setCurrentAnnotation}
            onAnnotationModify={onAnnotationModify}
            onAnnotationModifyComplete={() => {
              recordHistory(annotations, currentAnnotation);
            }}
            onMouseDown={dr.onMouseDown}
            onMouseMove={dr.onMouseMove}
            onMouseUp={dr.onMouseUp}
            createPolygonFunc={polygon.createElementsFunc}
            createBrushFunc={brush.createElementsFunc}
          />
        </div>
        <div className={styles.pblock}>
          <div className={styles.progress}>
            <Progress percent={50} status="active" />
          </div>
        </div>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          {interactor}
        </PPToolBarButton>
        <PPSetButton imgSrc="./pics/buttons/threshold.png" disLoc="left">
          {segmentThreshold}
        </PPSetButton>
        <PPSetButton imgSrc="./pics/buttons/alpha.png" disLoc="left">
          {transparency}
        </PPSetButton>
        <PPSetButton imgSrc="./pics/buttons/radius.png" disLoc="left">
          {visualRadius}
        </PPSetButton>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Setting of medical'}
          content={<PPMedicalSetting />}
          trigger={'hover'}
        >
          {' '}
          <PPToolBarButton imgSrc="./pics/buttons/medical_setting.png">
            {medicalSetting}
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">{divideData}</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">{exportBtn}</PPToolBarButton>
      </PPToolBar>
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
            {determineOutline}
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
