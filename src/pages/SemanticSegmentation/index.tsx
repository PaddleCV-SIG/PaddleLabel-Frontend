/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { useIntl, history } from 'umi';
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
import { PageInit } from '@/services/utils';
import type { Annotation } from '@/models/';
import PPAIModal from '@/components/PPLabelPage/PPAIModal';
import PPAIButton from '@/components/PPLabelPage/PPAIButton';

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
  const [transparency, setTransparency] = useState(60);
  const [showPPAIModal, setShowPPAIModal] = useState(false);

  const { tool, task, data, project, scale, label, annotation } = PageInit(useState, useEffect, {
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
  });

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
      recordHistory({ annos: annotation.all, currAnno: annotation.curr });
    },
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
  };
  const intl = useIntl();
  const brush = PPBrush(drawToolParam);
  const polygon = PPPolygon(drawToolParam);
  const drawTool = { polygon: polygon, brush: brush };
  return (
    <PPLabelPageContainer className="segment">
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/polygon.png"
          active={tool.curr == 'polygon'}
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
        >
          {intl.formatMessage({ id: 'pages.toolBar.save' })}
        </PPToolBarButton>
        <PPToolBarButton
          active={tool.curr == 'mover'}
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            tool.setCurr('mover');
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
        >
          {intl.formatMessage({ id: 'pages.toolBar.reDo' })}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            annotation.setAll([]);
            annotation.setCurr(undefined);
          }}
        >
          {intl.formatMessage({ id: 'pages.toolBar.clearMark' })}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <div className="draw">
          <PPStage
            scale={scale.curr}
            annotations={annotation.all}
            currentTool={tool.curr}
            currentAnnotation={annotation.curr}
            setCurrentAnnotation={setCurrentAnnotation}
            onAnnotationModify={modifyAnnoByFrontendId}
            onAnnotationModifyComplete={() => {
              recordHistory({ annos: annotation.all, currAnno: annotation.curr });
            }}
            frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
            imgSrc={data.imgSrc}
            transparency={transparency}
            onAnnotationAdd={(anno) => {
              const newAnnos = annotation.all.concat([anno]);
              annotation.setAll(newAnnos);
              if (!annotation.curr) setCurrentAnnotation(anno);
            }}
            drawTool={drawTool}
          />
        </div>
        <div className="pblock">
          <PPProgress task={task} project={project} />
        </div>
        <div
          className="prevTask"
          onClick={() => {
            if (!task.prevTask()) {
              return;
            }
            setCurrentAnnotation(undefined);
          }}
        />
        <div
          className="nextTask"
          onClick={() => {
            if (!task.nextTask()) {
              return;
            }
            setCurrentAnnotation(undefined);
          }}
        />
      </div>
      <PPToolBar disLoc="right">
        <PPAIButton
          imgSrc="./pics/buttons/intelligent_interaction.png"
          onClick={() => setShowPPAIModal(true)}
        >
          {intl.formatMessage({ id: 'pages.toolBar.interactor' })}
        </PPAIButton>
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
          onAnnotationDelete={(anno: Annotation) => {
            annotation.setAll(annotation.all.filter((x) => x.frontendId != anno.frontendId));
            setCurrentAnnotation(undefined);
          }}
        />
      </div>
      <PPAIModal visible={showPPAIModal} onCancel={() => setShowPPAIModal(false)} />
    </PPLabelPageContainer>
  );
};

export default Page;
