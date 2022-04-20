import React, { useEffect, useState } from 'react';
import { Button, Progress } from 'antd';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { useIntl } from 'umi';
import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type { Label } from '@/models/Label';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import PPDivideDataModal from '@/components/PPLabelPage/PPDivideDataModal';
import PPExportModal from '@/components/PPLabelPage/PPExportModal';
import PPBrush from '@/components/PPDrawTool/PPBrush';
import PPPolygon from '@/components/PPDrawTool/PPPolygon';

export const MOST_HISTORY_STEPS = 40;

export type HistoryType = {
  index: number;
  items: {
    currentAnnotation?: Annotation;
    annotations: Annotation[];
  }[];
};

const Page: React.FC = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [divideModalVisible, setDivideModalVisible] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisible] = useState<boolean>(false);

  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);
  const [currentLabel, setCurrentLabel] = useState<Label>();
  const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation>();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [frontendId, setFrontendId] = useState<number>(0);
  const [brushSize, setBrushSize] = useState(1);
  const [transparency, setTransparency] = useState(60);
  const [scale, setScaleRaw] = useState(10);
  const setScale = (size: number) => {
    if (!size) setScaleRaw(1);
    if (size < 0.1 || size > 20) setScaleRaw(1);
    else setScaleRaw(size);
  };

  const setCurrentAnnotation = (anno?: Annotation) => {
    setCurrentAnnotationRaw(anno);
    if (anno?.label) setCurrentLabel(anno.label);
  };

  useEffect(() => {
    initHistory();
  }, []);

  const onAnnotationModify = (annotation: Annotation) => {
    const newAnnos: Annotation[] = [];
    for (let i = 0; i < annotations.length; i++) {
      if (annotations[i].frontendId == annotation.frontendId) {
        newAnnos.push(annotation);
      } else {
        newAnnos.push(annotations[i]);
      }
    }
    setCurrentAnnotation(annotation);
    setAnnotations(newAnnos);
  };

  const drawToolParam = {
    dataId: 0,
    currentLabel: currentLabel,
    brushSize: brushSize,
    scale: scale,
    currentTool: currentTool,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: (annotation: Annotation) => {
      const newAnnos = annotations.concat([annotation]);
      setAnnotations(newAnnos);
      if (!currentAnnotation) setCurrentAnnotation(annotation);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: () => {
      recordHistory({ annos: annotations, currAnno: currentAnnotation });
    },
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
  };
  const intl = useIntl();
  const brush = PPBrush(drawToolParam);
  const polygon = PPPolygon(drawToolParam);
  const drawTool = currentTool == 'polygon' ? polygon : brush;
  return (
    <PPLabelPageContainer className="segment">
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/polygon.png"
          active={currentTool == 'polygon'}
          onClick={() => {
            setCurrentTool('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.polygon' })}
        </PPToolBarButton>
        <PPToolBarButton
          active={currentTool == 'editor'}
          imgSrc="./pics/buttons/edit.png"
          onClick={() => {
            setCurrentTool('editor');
            setCurrentAnnotation(undefined);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.edit' })}
        </PPToolBarButton>
        <PPSetButton
          imgSrc="./pics/buttons/brush.png"
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
          {intl.formatMessage({ id: 'pages.toolBar.brush' })}
        </PPSetButton>
        <PPSetButton
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
          {intl.formatMessage({ id: 'pages.toolBar.rubber' })}
        </PPSetButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            setScale(scale + 0.1);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.zoomIn' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            setScale(scale - 0.1);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.zoomOut' })}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">
          {intl.formatMessage({ id: 'pages.toolBar.save' })}
        </PPToolBarButton>
        <PPToolBarButton
          active={currentTool == 'mover'}
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            setCurrentTool('mover');
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.move' })}
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
          {intl.formatMessage({ id: 'pages.toolBar.unDo' })}
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
          {intl.formatMessage({ id: 'pages.toolBar.reDo' })}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">
          {intl.formatMessage({ id: 'pages.toolBar.clearMark' })}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <div className="draw">
          <PPStage
            scale={scale}
            annotations={annotations}
            currentTool={currentTool}
            currentAnnotation={currentAnnotation}
            setCurrentAnnotation={setCurrentAnnotation}
            onAnnotationModify={onAnnotationModify}
            onAnnotationModifyComplete={() => {
              recordHistory({ annos: annotations, currAnno: currentAnnotation });
            }}
            frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
            imgSrc={undefined}
            transparency={transparency}
            onAnnotationAdd={(annotation) => {
              const newAnnos = annotations.concat([annotation]);
              setAnnotations(newAnnos);
              if (!currentAnnotation) setCurrentAnnotation(annotation);
            }}
            drawTool={drawTool}
          />
        </div>
        <div className="pblock">
          <div className="progress">
            <Progress
              className="progressBar"
              // percent={project.progress}
              percent={10}
              status="active"
              showInfo={false}
            />{' '}
            <span className="progressDesc">
              {/* TODO: translate */}
              {/* Current labeling {task.currIdx == undefined ? 1 : task.currIdx + 1} of{' '}
              {task.all?.length}. Already labeled {task.finished(project.progress) || 0}.  */}
              Current labeling 1 of 300. Already labeled 20.
            </span>
          </div>
        </div>
        <div
          className="prevTask"
          onClick={() => {
            if (!task.prevTask()) {
              return;
            }
            setCurrentAnnotation(undefined);
            setAnnotations([]);
          }}
        />
        <div
          className="nextTask"
          onClick={() => {
            if (!task.nextTask()) {
              return;
            }
            setCurrentAnnotation(undefined);
            setAnnotations([]);
          }}
        />
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          {intl.formatMessage({ id: 'pages.toolBar.interactor' })}
        </PPToolBarButton>
        <PPSetButton imgSrc="./pics/buttons/threshold.png" disLoc="left">
          {intl.formatMessage({ id: 'pages.toolBar.segmentThreshold' })}
        </PPSetButton>
        <PPSetButton
          imgSrc="./pics/buttons/alpha.png"
          disLoc="left"
          size={transparency}
          maxSize={100}
          minSize={0}
          onChange={(newSize) => {
            setTransparency(newSize);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.transparency' })}
        </PPSetButton>
        <PPSetButton imgSrc="./pics/buttons/radius.png" disLoc="left">
          {intl.formatMessage({ id: 'pages.toolBar.visualRadius' })}
        </PPSetButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            setDivideModalVisible(true);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.divideData' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/export.png"
          onClick={() => {
            setExportModalVisible(true);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.export' })}
        </PPToolBarButton>
      </PPToolBar>
      <div className="rightSideBar">
        <div className="determinOutline">
          <Button
            style={{ height: 40, fontSize: '0.75rem' }}
            type="primary"
            block
            onClick={() => {
              setCurrentAnnotation(undefined);
            }}
          >
            {intl.formatMessage({ id: 'pages.toolBar.determineOutline' })}
          </Button>
        </div>
        <PPLabelList
          labels={labels}
          activeIds={new Set([currentLabel])}
          onLabelSelect={(selected) => {
            setCurrentLabel(selected);
            setCurrentAnnotation(undefined);
          }}
          onLabelModify={() => {}}
          onLabelDelete={(deleted) => {
            const newLabels: Label[] = [];
            for (const label of labels) {
              if (label.labelId != deleted.labelId) {
                newLabels.push(label);
              }
            }
            setLabels(newLabels);
            if (currentLabel?.labelId == deleted.labelId) setCurrentLabel(undefined);
          }}
          onLabelAdd={(lab) => {
            labels.push(lab);
            setLabels(labels);
            setCurrentLabel(lab);
          }}
        />
        <PPAnnotationList
          currAnnotation={currentAnnotation}
          annotations={annotations}
          onAnnotationSelect={(selectedAnno) => {
            if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
          }}
          onAnnotationAdd={() => {}}
          onAnnotationModify={() => {}}
          onAnnotationDelete={(annotation: Annotation) => {
            setAnnotations(annotations.filter((x) => x.frontendId != annotation.frontendId));
            setCurrentAnnotation(undefined);
          }}
        />
      </div>
      <PPDivideDataModal
        visible={divideModalVisible}
        // splitDataset={splitDataset}
        // project={project}
        onCancel={() => {
          setDivideModalVisible(false);
        }}
        onFinish={() => {
          setDivideModalVisible(false);
        }}
      />
      <PPExportModal
        visible={exportModalVisible}
        // exportDataset={exportDataset}
        // project={project}
        onCancel={() => {
          setExportModalVisible(false);
        }}
        onFinish={() => {
          setExportModalVisible(false);
        }}
      />
    </PPLabelPageContainer>
  );
};

export default Page;
