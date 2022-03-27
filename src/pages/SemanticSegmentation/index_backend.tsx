/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Progress } from 'antd';
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
import { useIntl } from 'umi';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import { PageInit } from '@/services/utils';

const Page: React.FC = () => {
  const [
    tool,
    loading,
    scale,
    annotation,
    task,
    data,
    project,
    label,
    splitDataset,
    exportDataset,
  ] = PageInit(useState, useEffect, {
    label: { oneHot: true },
    effectTrigger: { postTaskChange: initHistory },
  });

  // These only used by frontend, and synchronize with backend when triggered.
  const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation>();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [divideModalVisible, setDivideModalVisible] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisible] = useState<boolean>(false);

  const setCurrentAnnotation = (anno?: Annotation<any>) => {
    setCurrentAnnotationRaw(anno);
    if (anno?.label) label.setCurr(anno.label);
  };

  useEffect(() => {
    // setAnnotations([
    //   {
    //     annotationId: 1,
    //     tool: 'polygon',
    //     label: {
    //       color: '#FF0000',
    //       name: 'Label 1',
    //     },
    //     lines: [
    //       {
    //         color: '#FF0000',
    //         // [476,136,715,128,724,270,482,280]
    //         points: [521, 133, 760, 125, 769, 267, 527, 277],
    //       },
    //     ],
    //   },
    // ]);
    initHistory();
  }, []);

  const onAnnotationModify = (anno: Annotation<any>) => {
    const newAnnos: Annotation<any>[] = [];
    for (let i = 0; i < annotations.length; i++) {
      if (annotations[i].annotationId == anno.annotationId) {
        newAnnos.push(anno);
      } else {
        newAnnos.push(annotations[i]);
      }
    }
    setCurrentAnnotation(anno);
    setAnnotations(newAnnos);
  };

  const brush = drawBrush({
    currentLabel: label.curr,
    brushSize: brushSize,
    currentTool: tool.curr,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (anno) => {
      const newAnnos = annotations.concat([anno]);
      setAnnotations(newAnnos);
      if (!currentAnnotation) setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: () => {
      recordHistory({ annos: annotations, currAnno: currentAnnotation });
    },
  });

  const polygon = drawPolygon({
    currentLabel: label.curr,
    brushSize: brushSize,
    currentTool: tool.curr,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (anno) => {
      const newAnnos = annotations.concat([anno]);
      setAnnotations(newAnnos);
      if (!currentAnnotation) setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: () => {
      recordHistory({ annos: annotations, currAnno: currentAnnotation });
    },
  });

  const dr = tool.curr == 'polygon' ? polygon : brush;

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
  const divideData = useIntl().formatMessage({ id: 'pages.toolBar.divideData' });
  const exportBtn = useIntl().formatMessage({ id: 'pages.toolBar.export' });

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPPolygon
          active={tool.curr == 'polygon'}
          onClick={() => {
            tool.setCurr('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          {polygonBtn}
        </PPPolygon>
        <PPToolBarButton imgSrc="./pics/buttons/edit.png">{edit}</PPToolBarButton>
        <PPBrush
          size={brushSize}
          active={tool.curr == 'brush'}
          onClick={() => {
            if (tool.curr != 'rubber' && tool.curr != 'brush') {
              setCurrentAnnotation(undefined);
            }
            tool.setCurr('brush');
          }}
          onChange={(newBrushSize) => {
            setBrushSize(newBrushSize);
          }}
        >
          {brushBtn}
        </PPBrush>
        <PPBrush
          size={brushSize}
          active={tool.curr == 'rubber'}
          onClick={() => {
            if (tool.curr != 'rubber' && tool.curr != 'brush') {
              setCurrentAnnotation(undefined);
            }
            tool.setCurr('rubber');
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
            scale.change(0.1);
          }}
        >
          {zoomIn}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          {zoomOut}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">{save}</PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            tool.setCurr('mover');
          }}
        >
          {move}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            const res = backwardHistory();
            if (res) {
              setAnnotations(res.annos);
              setCurrentAnnotation(res.currAnno);
            }
          }}
        >
          {unDo}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            const res = forwardHistory();
            if (res) {
              setAnnotations(res.annos);
              setCurrentAnnotation(res.currAnno);
            }
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
            currentTool={tool.curr}
            currentAnnotation={currentAnnotation}
            setCurrentAnnotation={setCurrentAnnotation}
            onAnnotationModify={onAnnotationModify}
            onAnnotationModifyComplete={() => {
              recordHistory({ annos: annotations, currAnno: currentAnnotation });
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
          selectedLabel={label.curr}
          onLabelSelect={(selectedLabel) => {
            label.setCurr(selectedLabel);
            setCurrentAnnotation(undefined);
          }}
          onLabelModify={() => {}}
          onLabelDelete={() => {}}
          onLabelAdd={() => {}}
        />
        <PPAnnotationList
          currAnnotation={currentAnnotation}
          annotations={annotations}
          onAnnotationSelect={(selectedAnno) => {
            if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
          }}
          onAnnotationAdd={() => {}}
          onAnnotationModify={() => {}}
          onAnnotationDelete={(anno: Annotation<any>) => {
            setAnnotations(annotations.filter((x) => x.annotationId != anno.annotationId));
            setCurrentAnnotation(undefined);
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
