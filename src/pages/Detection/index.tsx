/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: remove this
/* eslint-disable @typescript-eslint/no-shadow*/ // TODO: remove this
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import PPRectangle from '@/components/PPLabelPage/PPRectangle';
import drawRectangle from '@/components/PPLabelPage/PPRectangle/drawRectangle';
import { Button, Progress, Spin, message } from 'antd';
import { PageInit } from '@/services/utils';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import type { Annotation } from '@/models/Annotation';
import { ToolType } from '@/models/ToolType';

const Page: React.FC = () => {
  const [loading, scale, annotation, task, data, project, label] = PageInit(useState, useEffect, {
    label: { oneHot: true },
    effectTrigger: { postTaskChange: initHistory },
  });
  // TODO: move to utils
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);

  const [annotations, setAnnotations] = useState<Annotation<any>[]>([]);

  const setCurrentAnnotation = (anno?: Annotation<any>) => {
    if (!anno) return;
    console.log('setCurrentAnnotation', anno, 'anno.label:', anno?.label);
    anno.taskId = task.curr.taskId;
    anno.dataId = data.curr.dataId;
    annotation.setCurr(anno);
    console.log(annotation.curr);
    if (anno?.label) label.setCurr(anno.label);
  };

  useEffect(() => {
    initHistory(); // reinit history after turn task s
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

  const rectagle = drawRectangle({
    currentLabel: label.curr,
    currentTool: currentTool,
    annotations: annotations,
    currentAnnotation: annotation.curr,
    onAnnotationAdd: (anno) => {
      const newAnnos = annotations.concat([anno]);
      setAnnotations(newAnnos);
      if (!annotation.curr) setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: () => {
      recordHistory({ annos: annotations, currAnno: annotation.curr });
    },
  });

  const dr = rectagle;

  return (
    <PPLabelPageContainer className={styles.det}>
      <PPToolBar>
        <PPRectangle
          active={currentTool == 'rectangle'}
          onClick={() => {
            setCurrentTool('rectangle');
            setCurrentAnnotation(undefined);
          }}
        >
          Rectangle
        </PPRectangle>
        <PPToolBarButton
          active={currentTool == 'editor'}
          imgSrc="./pics/buttons/edit.png"
          onClick={() => {
            setCurrentTool('editor');
          }}
        >
          Edit
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            scale.change(0.1);
          }}
        >
          Zoom in
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          Zoom out
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            message.info("Annotations are saved automatically. You don't need to click save.");
          }}
        >
          Save
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            setCurrentTool('mover');
          }}
        >
          Move
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            const res = backwardHistory();
            if (!res) {
              return;
            }
            setAnnotations(res.annos);
            setCurrentAnnotation(res.currAnno);
          }}
        >
          Undo
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            const res = forwardHistory();
            if (!res) {
              return;
            }
            setAnnotations(res.annos);
            setCurrentAnnotation(res.currAnno);
          }}
        >
          Redo
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">Clear Mark</PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip="loading" spinning={!!loading.curr}>
          <div className="draw">
            <PPStage
              scale={scale.curr}
              annotations={annotations}
              currentTool={currentTool}
              currentAnnotation={annotation.curr}
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={onAnnotationModify}
              onAnnotationModifyComplete={() => {
                recordHistory({ annos: annotations, currAnno: annotation.curr });
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
                percent={task.progress}
                status="active"
                showInfo={false}
              />{' '}
              <span className="progressDesc">
                Current labeling {task.currIdx == undefined ? 1 : task.currIdx + 1} of{' '}
                {task.all?.length}. Already labeled {task.finished(project.progress) || 0}.
              </span>
            </div>
          </div>
          <div className="prevTask" onClick={task.prevTask} />
          <div className="nextTask" onClick={task.nextTask} />
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
      </PPToolBar>
      <div className="rightSideBar">
        <div className="determinOutline">
          <Button
            style={{ height: 40, fontSize: '0.75rem' }}
            type="primary"
            block
            onClick={() => {
              annotation.setCurr(undefined);
            }}
          >
            Determine Outline
          </Button>
        </div>
        <PPLabelList
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={(selected) => {
            label.onSelect(selected);
            // annotation.setCurr(undefined);
          }}
          onLabelModify={() => {}}
          onLabelDelete={label.remove}
          onLabelAdd={(lab) => label.create({ ...lab, projectId: project.curr.projectId })}
        />
        <PPAnnotationList
          annotations={annotation.all}
          activeIds={annotation.activeIds}
          onAnnotationSelect={annotation.setCurr}
          onAnnotationAdd={() => {}}
          onAnnotationModify={() => {}}
          onAnnotationDelete={
            // (annotation: Annotation<any>) => {
            // setAnnotations(annotations.filter((x) => x.annotationId != annotation.annotationId));
            // setCurrentAnnotation(undefined);
            // }
            annotation.remove
          }
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
