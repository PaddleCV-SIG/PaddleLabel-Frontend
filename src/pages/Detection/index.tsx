import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { useIntl, history } from 'umi';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { PageInit } from '@/services/utils';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import type { Annotation } from '@/models/Annotation';
import PPRectangle from '@/components/PPDrawTool/PPRectangle';
import PPProgress from '@/components/PPLabelPage/PPProgress';

const Page: React.FC = () => {
  // todo: change to use annotation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [frontendId, setFrontendId] = useState<number>(0);

  const { tool, loading, scale, annotation, task, data, project, label } = PageInit(
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

  const onAnnotationModify = (anno: Annotation) => {
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

  useEffect(() => {
    initHistory();
  }, []);

  // Auto save every 20s
  useEffect(() => {
    const int = setInterval(() => {
      // console.log('triggered!', data);
      annotation.pushToBackend(data.curr?.dataId);
    }, 20000);
    return () => {
      clearInterval(int);
    };
  }, [annotation, data, data.curr]);

  const drawToolParam = {
    dataId: data.curr?.dataId,
    currentLabel: label.curr,
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
    modifyAnnoByFrontendId: onAnnotationModify,
    onMouseUp: () => {
      recordHistory({ annos: annotation.all, currAnno: annotation.curr });
    },
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
  };

  const rectagle = PPRectangle(drawToolParam);

  const drawTool = { polygon: rectagle, brush: undefined };

  const intl = useIntl();
  const rectangleBtn = intl.formatMessage({ id: 'pages.toolBar.rectangle' });
  const zoomIn = intl.formatMessage({ id: 'pages.toolBar.zoomIn' });
  const zoomOut = intl.formatMessage({ id: 'pages.toolBar.zoomOut' });
  const move = intl.formatMessage({ id: 'pages.toolBar.move' });
  const unDo = intl.formatMessage({ id: 'pages.toolBar.unDo' });
  const reDo = intl.formatMessage({ id: 'pages.toolBar.reDo' });
  const save = intl.formatMessage({ id: 'pages.toolBar.save' });
  const edit = intl.formatMessage({ id: 'pages.toolBar.edit' });
  const clearMark = intl.formatMessage({ id: 'pages.toolBar.clearMark' });

  return (
    <PPLabelPageContainer className={styles.det}>
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/rectangle.png"
          active={tool.curr == 'rectangle'}
          onClick={() => {
            if (!label.curr) {
              message.error('Please choose a label category first!');
              return;
            }
            tool.setCurr('rectangle');
            setCurrentAnnotation(undefined);
          }}
        >
          {rectangleBtn}
        </PPToolBarButton>
        <PPToolBarButton
          active={tool.curr == 'editor'}
          imgSrc="./pics/buttons/edit.png"
          onClick={() => {
            tool.setCurr('editor');
          }}
        >
          {edit}
        </PPToolBarButton>
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
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            annotation.pushToBackend(data.curr?.dataId);
          }}
        >
          {save}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          active={tool.curr == 'mover'}
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
              annotation.setAll(res.annos);
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
              annotation.setAll(res.annos);
              setCurrentAnnotation(res.currAnno);
            }
          }}
        >
          {reDo}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => console.log('clear')}
        >
          {clearMark}
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
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={onAnnotationModify}
              onAnnotationModifyComplete={() => {
                recordHistory({ annos: annotation.all, currAnno: annotation.curr });
              }}
              frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
              imgSrc={data.imgSrc}
              transparency={100}
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
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/project_overview?projectId=${project.curr.projectId}`);
          }}
        >
          {'Project Overview'}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/ml?projectId=${project.curr.projectId}`);
          }}
        >
          {'ML Settings'}
        </PPToolBarButton>
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
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
    </PPLabelPageContainer>
  );
};

export default Page;
