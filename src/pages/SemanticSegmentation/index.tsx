/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { useIntl, history, useModel } from 'umi';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import PPBrush from '@/components/PPDrawTool/PPBrush';
import PPPolygon from '@/components/PPDrawTool/PPPolygon';
import PPProgress from '@/components/PPLabelPage/PPProgress';
import { ModelUtils, PageInit } from '@/services/utils';
import type { Annotation } from '@/models/';
import PPAIButton from '@/components/PPLabelPage/PPAIButton';
import PPInteractor, { interactorToAnnotation } from '@/components/PPDrawTool/PPInteractor';

export const MOST_HISTORY_STEPS = 40;

export type HistoryType = {
  index: number;
  items: {
    currentAnnotation?: Annotation;
    annotations: Annotation[];
  }[];
};

const Page: React.FC = () => {
  const [frontendId, setFrontendId] = useState<number>(0);
  const [brushSize, setBrushSize] = useState(10);
  const [threshold, setThreshold] = useState(50);
  const [transparency, setTransparency] = useState(60);
  const { interactorData, setInteractorData } = useModel('InteractorData');

  const model = ModelUtils(useState);
  const { tool, loading, scale, annotation, task, data, project, label, refreshVar } = PageInit(
    useState,
    useEffect,
    {
      effectTrigger: { postTaskChange: () => initHistory() },
      label: {
        oneHot: true,
        postSelect: () => {
          annotation.setCurr(undefined);
          setFrontendId(0);
        },
        preUnsetCurr: preCurrLabelUnset,
      },
      tool: { defaultTool: 'mover' },
      task: { push: true },
    },
  );

  function preCurrLabelUnset() {
    annotation.setCurr(undefined);
    setFrontendId(0);
    tool.setCurr('mover');
  }

  const setCurrentAnnotation = (anno?: Annotation) => {
    annotation.setCurr(anno);
    if (!anno?.frontendId) setFrontendId(0);
    else setFrontendId(anno.frontendId);
  };

  useEffect(() => {
    initHistory();
  }, []);

  // Auto save every 20s
  useEffect(() => {
    const int = setInterval(() => {
      console.log('triggered!', data);
      annotation.pushToBackend(data.curr?.dataId);
    }, 20000);
    return () => {
      clearInterval(int);
    };
  }, [annotation, data, data.curr]);

  const onAnnotationModify = (anno: Annotation) => {
    if (!anno) return;
    annotation.all.pop();
    annotation.all.push(anno);
    setCurrentAnnotation(anno);
    annotation.setAll(annotation.all);
  };

  const modifyAnnoByFrontendId = (anno: Annotation) => {
    // console.log('modifyAnnoByFrontendId:', anno);
    const newAnnos = [];
    for (const item of annotation.all) {
      if (item.frontendId == anno.frontendId) {
        newAnnos.push(anno);
      } else {
        newAnnos.push(item);
      }
    }
    setCurrentAnnotation(anno);
    annotation.setAll(newAnnos);
  };

  const drawToolParam = {
    dataId: data.curr?.dataId,
    currentLabel: label.curr,
    brushSize: brushSize,
    scale: scale.curr,
    currentTool: tool.curr,
    annotations: annotation.all,
    currentAnnotation: annotation.curr,
    onAnnotationAdd: (anno: Annotation) => {
      const newAnnos = annotation.all.concat([anno]);
      annotation.setAll(newAnnos);
      setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    modifyAnnoByFrontendId: modifyAnnoByFrontendId,
    onMouseUp: () => {
      // Do not record interactor's history, do not pushToBackend either
      if (interactorData.active) return;
      recordHistory({ annos: annotation.all, currAnno: annotation.curr });
      annotation.pushToBackend(data.curr?.dataId, annotation.all);
    },
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
    model: model,
  };
  const intl = useIntl();
  const drawTool = {
    polygon: PPPolygon(drawToolParam),
    brush: PPBrush(drawToolParam),
    interactor: PPInteractor(drawToolParam),
  };
  return (
    <PPLabelPageContainer className="segment">
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/polygon.png"
          active={tool.curr == 'polygon'}
          disabled={interactorData.active}
          onClick={() => {
            if (!label.curr) {
              message.error('Please select a label first');
              return;
            }
            tool.setCurr('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.polygon' })}
        </PPToolBarButton>
        <PPToolBarButton
          active={tool.curr == 'editor'}
          disabled={interactorData.active}
          imgSrc="./pics/buttons/edit.png"
          onClick={() => {
            tool.setCurr('editor');
            setCurrentAnnotation(undefined);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.edit' })}
        </PPToolBarButton>
        <PPSetButton
          imgSrc="./pics/buttons/brush.png"
          size={brushSize}
          active={tool.curr == 'brush'}
          disabled={interactorData.active}
          onClick={() => {
            if (!label.curr) {
              message.error('Please select a label first');
              return;
            }
            if (tool.curr != 'rubber' && tool.curr != 'brush') {
              setCurrentAnnotation(undefined);
            }
            tool.setCurr('brush');
          }}
          onChange={(newBrushSize) => {
            setBrushSize(newBrushSize);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.brush' })}
        </PPSetButton>
        <PPSetButton
          size={brushSize}
          active={tool.curr == 'rubber'}
          disabled={interactorData.active}
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
          {intl.formatMessage({ id: 'pages.toolBar.rubber' })}
        </PPSetButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            scale.change(0.1);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.zoomIn' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.zoomOut' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            annotation.pushToBackend(data.curr?.dataId);
          }}
          disabled={interactorData.active}
        >
          {intl.formatMessage({ id: 'pages.toolBar.save' })}
        </PPToolBarButton>
        <PPToolBarButton
          active={tool.curr == 'mover'}
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            if (tool.curr == 'mover') {
              if (interactorData.active) {
                tool.setCurr('interactor');
              } else {
                tool.setCurr(undefined);
              }
            } else {
              tool.setCurr('mover');
            }
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.move' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            const res = backwardHistory();
            if (res) {
              annotation.setAll(res.annos);
              setCurrentAnnotation(res.currAnno);
            }
          }}
          disabled={interactorData.active}
        >
          {intl.formatMessage({ id: 'pages.toolBar.unDo' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            const res = forwardHistory();
            if (res) {
              annotation.setAll(res.annos);
              setCurrentAnnotation(res.currAnno);
            }
          }}
          disabled={interactorData.active}
        >
          {intl.formatMessage({ id: 'pages.toolBar.reDo' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            annotation.setAll([]);
            annotation.setCurr(undefined);
          }}
          disabled={interactorData.active}
        >
          {intl.formatMessage({ id: 'pages.toolBar.clearMark' })}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip="loading" spinning={!!loading.curr}>
          <div className="draw">
            <PPStage
              scale={scale.curr}
              annotations={annotation.all}
              currentTool={tool.curr}
              currentAnnotation={annotation.curr}
              currentLabel={label.curr}
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={modifyAnnoByFrontendId}
              onAnnotationModifyComplete={() => {
                // Do not record interactor's history
                if (interactorData.active) return;
                recordHistory({ annos: annotation.all, currAnno: annotation.curr });
              }}
              frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
              imgSrc={data.imgSrc}
              transparency={transparency}
              threshold={threshold}
              onAnnotationAdd={(anno) => {
                const newAnnos = annotation.all.concat([anno]);
                annotation.setAll(newAnnos);
                if (!annotation.curr) setCurrentAnnotation(anno);
              }}
              drawTool={drawTool}
              refresh={refreshVar}
            />
          </div>
          <div
            style={{ display: interactorData.active ? 'none' : 'block' }}
            className="prevTask"
            onClick={() => {
              if (!task.prevTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
              setInteractorData({ active: false, predictData: [], mousePoints: [] });
            }}
          />
          <div
            style={{ display: interactorData.active ? 'none' : 'block' }}
            className="nextTask"
            onClick={() => {
              if (!task.nextTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
              setInteractorData({ active: false, predictData: [], mousePoints: [] });
            }}
          />
        </Spin>
        <div className="pblock">
          <PPProgress task={task} project={project} />
        </div>
      </div>
      <PPToolBar disLoc="right">
        <PPAIButton
          imgSrc="./pics/buttons/intelligent_interaction.png"
          active={interactorData.active}
          onClick={() => {
            if (interactorData.active) {
              tool.setCurr(undefined);
              setInteractorData({ active: false, predictData: [], mousePoints: [] });
            } else {
              tool.setCurr('interactor');
              setInteractorData({ active: true, predictData: [], mousePoints: [] });
            }
          }}
          model={model}
          project={project}
        >
          {intl.formatMessage({ id: 'pages.toolBar.interactor' })}
        </PPAIButton>
        <PPSetButton
          disabled={!interactorData.active}
          imgSrc="./pics/buttons/threshold.png"
          disLoc="left"
          size={threshold}
          maxSize={100}
          minSize={10}
          step={10}
          onChange={(newSize) => {
            setThreshold(newSize);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.segmentThreshold' })}
        </PPSetButton>
        <PPSetButton
          disabled={!interactorData.active}
          imgSrc="./pics/buttons/radius.png"
          disLoc="left"
        >
          {intl.formatMessage({ id: 'pages.toolBar.visualRadius' })}
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
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/project_overview?projectId=${project.curr.projectId}`);
          }}
        >
          {'Project Overview'}
        </PPToolBarButton>
        {/* <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/ml?projectId=${project.curr.projectId}`);
          }}
        >
          {'ML Settings'}
        </PPToolBarButton> */}
      </PPToolBar>
      <div className="rightSideBar">
        <div className="determinOutline">
          <Button
            style={{ height: 40, fontSize: '0.75rem' }}
            type="primary"
            block
            onClick={() => {
              if (interactorData.active) {
                console.log(tool.curr);
                const anno = interactorToAnnotation(
                  threshold,
                  annotation.all,
                  interactorData?.predictData,
                  data.curr?.dataId,
                  label.curr,
                );
                if (anno) {
                  const newAnnos = annotation.all.concat([anno]);
                  annotation.setAll(newAnnos);
                  setCurrentAnnotation(anno);
                  annotation.pushToBackend(data.curr?.dataId, newAnnos);
                }
              }
              setInteractorData({ active: true, predictData: [], mousePoints: [] });
              setCurrentAnnotation(undefined);
            }}
          >
            {intl.formatMessage({ id: 'pages.toolBar.determineOutline' })}
          </Button>
        </div>
        <PPLabelList
          hideColorPicker={false}
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelModify={() => {}}
          onLabelDelete={label.remove}
          onLabelAdd={(lab) => {
            label.create({ ...lab, projectId: project.curr.projectId }).then((newLabel) => {
              setCurrentAnnotation(undefined);
              label.setCurr(newLabel);
            });
          }}
        />
        <PPAnnotationList
          currAnnotation={annotation.curr}
          annotations={annotation.all}
          onAnnotationSelect={(selectedAnno) => {
            if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
          }}
          onAnnotationAdd={() => {
            setCurrentAnnotation(undefined);
          }}
          onAnnotationModify={() => {}}
          onAnnotationDelete={async (anno: Annotation) => {
            const newAll = annotation.all.filter((x) => x.frontendId != anno.frontendId);
            annotation.setAll(newAll);
            setCurrentAnnotation(undefined);
            await annotation.pushToBackend(data.curr?.dataId, newAll);
          }}
          disabled={interactorData.active}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
