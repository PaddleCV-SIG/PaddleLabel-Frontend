/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { Progress, message, Spin } from 'antd';
import { PageInit } from '@/services/utils';

const baseUrl = localStorage.getItem('basePath');

export type ToolType = 'mover' | undefined;

const Page: React.FC = () => {
  const [currTool, setCurrTool] = useState<ToolType>('mover');

  const [loading, setLoading, scale, annotation, task, data, project, label] = PageInit(
    useState,
    useEffect,
    {
      label: { oneHot: false, postSetCurr: selectLabel },
      effectTrigger: { postTaskChange: postTaskChange },
    },
  );

  function selectLabel(selected) {
    // after toggle is active, add ann
    console.log('selectLabel', task.curr, data.curr, annotation.all);

    if (selected.active) {
      annotation.create({
        taskId: task.curr.taskId,
        labelId: selected.labelId,
        dataId: data.curr.dataId,
      });
    } else {
      const ann = annotation.all.filter((a) => a.labelId == selected.labelId)[0];
      console.log('filter ann ', ann);
      annotation.remove(ann.annotationId);
    }
    console.log('selectlabel', selected);
  }

  function postTaskChange(labels, annotations) {
    if (!labels) return;
    for (const lab of labels) {
      const annOfLabel = annotations.filter((ann) => ann.label.labelId == lab.labelId);
      if (annOfLabel.length != 0) lab.active = true;
    }
    console.log('label.all toggled', label.all);
    label.setAll([...labels]);
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
        <Spin tip="loading" spinning={loading}>
          <div className="draw">
            <PPStage
              scale={scale.curr}
              currentTool={currTool}
              setCurrentAnnotation={() => {}}
              onAnnotationModify={() => {}}
              onAnnotationModifyComplete={() => {}}
              // imgSrc={`${baseUrl}/datas/${data.curr?.dataId}/image`}
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
                Current labeling {task.currIdx} of {task.all?.length}. Already labeled{' '}
                {task.finished}.
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
      {/*// TODO: move label widget out*/}
      <div className="rightSideBar">
        <PPLabelList
          labels={label.all}
          onLabelSelect={label.setCurr}
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
