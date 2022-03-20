import React, { useState, useEffect } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { Progress, message, Spin } from 'antd';
import { PageInit } from '@/services/utils';
import { ToolType } from '@/models/ToolType';

const Page: React.FC = () => {
  const [currTool, setCurrTool] = useState<ToolType>('mover');
  const [loading, scale, annotation, task, data, project, label] = PageInit(useState, useEffect, {
    label: { oneHot: false, postSetCurr: selectLabel },
    effectTrigger: { postTaskChange: postTaskChange },
  });

  function selectLabel(selected) {
    // after toggle is active, add ann
    if (label.isActive(selected)) {
      annotation.create({
        taskId: task.curr.taskId,
        labelId: selected.labelId,
        dataId: data.curr.dataId,
      });
    } else {
      const ann = annotation.all.filter((a) => a.labelId == selected.labelId)[0];
      annotation.remove(ann.annotationId);
    }
  }

  function postTaskChange(labels, annotations) {
    loading.setCurr(true);
    if (!labels || !annotations) return;
    label.initActive(annotations);
    loading.setCurr(false);
  }

  return (
    <PPLabelPageContainer className={styles.classes}>
      <PPToolBar>
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
            setCurrTool('mover');
            message.info('You can move the image now.');
          }}
        >
          Move
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip="loading" spinning={loading.curr}>
          <div className="draw">
            <PPStage
              scale={scale.curr}
              currentTool={currTool}
              setCurrentAnnotation={() => {}}
              onAnnotationModify={() => {}}
              onAnnotationModifyComplete={() => {}}
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
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Split Dataset</PPToolBarButton>
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelAdd={(lab) => label.create({ ...lab, projectId: project.curr.projectId })}
          onLabelDelete={label.remove}
          onLabelModify={() => {}}
          hideColorPicker={true}
          hideEye={true}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
