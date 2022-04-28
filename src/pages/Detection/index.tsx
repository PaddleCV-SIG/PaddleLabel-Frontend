import React, { useEffect, useState } from 'react';
import { Progress, Spin, message } from 'antd';
import { useIntl, history } from 'umi';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import PPRectangle from '@/components/PPLabelPage/PPRectangle';
import { PageInit } from '@/services/utils';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import drawRectangle from '@/components/PPDrawTool/PPRectangle';
import type { Annotation } from '@/models/Annotation';

const Page: React.FC = () => {
  // todo: change to use annotation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tool, loading, scale, annotation, task, data, project, label } = PageInit(
    useState,
    useEffect,
    {
      label: { oneHot: true },
      tool: { defaultTool: 'mover' },
      effectTrigger: { postTaskChange: initHistory },
    },
  );

  // These only used by frontend, and synchronize with backend when triggered.
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>();
  const [annotations, setAnotations] = useState<Annotation[]>([]);

  const addAnnotation = (anno: Annotation) => {
    if (!anno.frontendId)
      throw new Error(
        'addAnnotation, Annotation frontendId not generated: ' + JSON.stringify(anno),
      );
    annotations.push(anno);
    setAnotations(annotations);
    setCurrentAnnotation(anno);
  };

  const modifyAnnotation = (anno: Annotation) => {
    if (!anno.frontendId)
      throw new Error(
        'addAnnotation, Annotation frontendId not generated: ' + JSON.stringify(anno),
      );
    const newAnnos = [];
    for (const everyAnno of annotations) {
      if (everyAnno.frontendId == anno.frontendId) {
        newAnnos.push(anno);
      } else {
        newAnnos.push(everyAnno);
      }
    }
    console.log('modifyAnnotation, newAnnos:', newAnnos, 'anno:', anno);
    setAnotations(newAnnos);
    setCurrentAnnotation(anno);
  };

  const removeAnnotation = (anno: Annotation) => {
    if (!anno.frontendId)
      throw new Error(
        'addAnnotation, Annotation frontendId not generated: ' + JSON.stringify(anno),
      );
    const newAnnos = [];
    for (const everyAnno of annotations) {
      if (everyAnno.frontendId != anno.frontendId) {
        newAnnos.push(everyAnno);
      }
    }
    setAnotations(newAnnos);
    setCurrentAnnotation(undefined);
  };

  // const syncSingleAnnotation = (anno: Annotation) => {
  //   if (!anno) return;
  //   console.log('modifyAnnotation', anno, 'anno.label:', anno?.label);
  //   anno.taskId = task.curr.taskId;
  //   anno.dataId = data.curr.dataId;
  //   annotation.modify(anno);
  // };

  // useEffect(() => {
  //   initHistory(); // reinit history after turn task
  // }, []);

  const rectagle = drawRectangle({
    currentLabel: label.curr,
    currentTool: tool.curr,
    annotations: annotations,
    currentAnnotation: currentAnnotation,
    onAnnotationAdd: addAnnotation,
    onAnnotationModify: modifyAnnotation,
    onMouseUp: () => {
      recordHistory({ annos: annotations, currAnno: currentAnnotation });
    },
  });

  const dr = rectagle;

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
        <PPRectangle
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
        </PPRectangle>
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
            message.info(
              'Annotations are saved automatically in this type of project. No need to click save.',
            );
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
            if (!res) {
              return;
            }
            setCurrentAnnotation(res.currAnno);
            setAnotations(res.annos);
          }}
        >
          {unDo}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            const res = forwardHistory();
            if (!res) {
              return;
            }
            setCurrentAnnotation(res.currAnno);
            setAnotations(res.annos);
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
              annotations={annotations}
              currentTool={tool.curr}
              currentAnnotation={currentAnnotation}
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={modifyAnnotation}
              onAnnotationModifyComplete={() => {
                recordHistory({ annos: annotations, currAnno: currentAnnotation });
              }}
              onMouseDown={dr.onMouseDown}
              onMouseMove={dr.onMouseMove}
              onMouseUp={dr.onMouseUp}
              createRectangleFunc={rectagle.createElementsFunc}
              imgSrc={data.imgSrc}
            />
          </div>
          <div className="pblock">
            <div className="progress">
              <Progress
                className="progressBar"
                percent={project.progress}
                status="active"
                showInfo={false}
              />{' '}
              <span className="progressDesc">
                {/* TODO: translate */}
                Current labeling {task.currIdx == undefined ? 1 : task.currIdx + 1} of{' '}
                {task.all?.length}. Already labeled {task.finished(project.progress) || 0}.
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
              setAnotations([]);
            }}
          />
          <div
            className="nextTask"
            onClick={() => {
              if (!task.nextTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
              setAnotations([]);
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
          onLabelSelect={(selected) => {
            label.onSelect(selected);
            setCurrentAnnotation(undefined);
          }}
          onLabelModify={() => {}}
          onLabelDelete={label.remove}
          onLabelAdd={(lab) => label.create({ ...lab, projectId: project.curr.projectId })}
        />
        <PPAnnotationList
          annotations={annotations}
          currAnnotation={currentAnnotation}
          onAnnotationSelect={setCurrentAnnotation}
          onAnnotationAdd={() => {
            setCurrentAnnotation(undefined);
          }}
          onAnnotationModify={() => {}}
          onAnnotationDelete={(ann) => {
            removeAnnotation(ann);
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
