/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { Progress, message, Spin } from 'antd';
import { useAsync } from 'react-async';
import { refreshProject } from '../Welcome';
// import { getLabels, addLabel, deleteLabel } from '@/services/api';
import { getTasks, getProgress } from '@/services/api';
import { projectApi } from '@/services/api';
import type { Label, Project, Task, Data } from '@/services';
import serviceUtils from '@/services/serviceUtils';
import { annotationApi, taskApi, dataApi } from '@/services/api';
import { toDict, indexOf, setLabelActive } from '@/services/api';

import {
  ScaleUtils,
  ProjectUtils,
  LabelUtils,
  DataUtils,
  TaskUtils,
  AnnotationUtils,
} from '@/services/utils';

const baseUrl = localStorage.getItem('basePath');

export type ToolType = 'mover' | undefined;

const Page: React.FC = () => {
  const [currTool, setCurrTool] = useState<ToolType>('mover');
  const [loading, setLoading] = useState<boolean>(false);
  const projectId = serviceUtils.getQueryVariable('projectId');

  const scale = ScaleUtils(useState);
  const annotation = AnnotationUtils(useState);
  const task = TaskUtils(useState);
  const data = DataUtils(useState);
  const project = ProjectUtils(useState);

  const selectLabel = (selected) => {
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
  };

  const label = LabelUtils(useState, { oneHot: false, pageOnSelect: selectLabel });

  useEffect(() => {
    // onload, get project, label, task info
    project.getCurr(projectId);
    label.getAll(projectId);
    task.getAll(projectId);
    task.getProgress(projectId);
  }, []);

  useEffect(() => {
    // when all task is set, set current task
    if (task.all && task.all.length != 0) task.turnTo(0);
  }, [task.all]);

  useEffect(() => {
    // when current task is set, get task's data, data's annotation, toggle label active
    if (task.currIdx == undefined) return;

    const onTaskChange = async () => {
      console.log('onTaskChange', task.curr, label.all, task.progress);
      task.getProgress(task.curr.projectId);
      const [allData, currData] = await data.getAll(task.curr.taskId, 0);
      const allAnns = await annotation.getAll(currData.dataId);
      for (const lab of label.all) {
        lab.active = false;
      }
      for (const lab of label.all) {
        const annOfLabel = allAnns.filter((ann) => ann.label.labelId == lab.labelId);
        if (annOfLabel.length != 0) lab.active = true;
      }
      console.log('label.all toggled', label.all);
      label.setAll([...label.all]);
      setLoading(false);
    };
    onTaskChange();
  }, [task.currIdx]);

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
      <div id="dr" className={styles.mainStage}>
        <Spin tip="loading" spinning={loading}>
          <div className={styles.draw}>
            <PPStage
              scale={scale.curr}
              currentTool={currTool}
              setCurrentAnnotation={() => {}}
              onAnnotationModify={() => {}}
              onAnnotationModifyComplete={() => {}}
              imgSrc={`${baseUrl}/datas/${data.curr?.dataId}/image`}
            />
          </div>
          <div className={styles.pblock}>
            <div className={styles.progress}>
              <Progress percent={task.progress} status="active" /> {task.currIdx} {task.all?.length}{' '}
              {Math.floor((task.all?.length * task.progress) / 100)}
            </div>
          </div>
          <div className={styles.prevTask} onClick={() => task.turnTo(task.currIdx - 1)} />
          <div className={styles.nextTask} onClick={() => task.turnTo(task.currIdx + 1)} />
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Split Dataset</PPToolBarButton>
      </PPToolBar>
      {/*// TODO: move label widget out*/}
      <div className={styles.rightSideBar}>
        <PPLabelList
          labels={label.all}
          selectedLabel={label.curr}
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
