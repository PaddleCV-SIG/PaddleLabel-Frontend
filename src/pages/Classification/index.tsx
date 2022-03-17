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
import { getLabels, addLabel, deleteLabel } from '@/services/api';
import { getTasks, getProgress } from '@/services/api';
import { projectApi } from '@/services/api';
import type { Label, Project, Task, Data } from '@/services';
import serviceUtils from '@/services/serviceUtils';
import { annotationApi, taskApi, dataApi } from '@/services/api';
import { toDict, indexOf, setLabelActive } from '@/services/api';

import { ScaleUtils } from '@/services/utils';

const baseUrl = localStorage.getItem('basePath');

export type ToolType = 'mover' | undefined;

const Page: React.FC = () => {
  const [project, setProject] = useState<Project>();
  const [labels, setLabels] = useState<Label[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const [taskIdx, setTaskIdx] = useState<number>(0); // This is not taskId, this is the index of current task in tasks! They are DIFFERENT! It's mainly used for turning task
  const [task, setTask] = useState<Task>(); // current task
  const [datas, setDatas] = useState<Data[]>(); // datas of the CURRENT TASK, not all datas in project
  const [anns, setAnns] = useState<Annotation[]>(); // anns of the CURRENT TASK, not all anns in project
  const [currData, setCurrData] = useState<Data>(); // The data that's currently being shown. One piece of data
  const [currAnns, setCurrAnns] = useState<Annotation[]>(); // The anns for the current data that's being shown. One piece of data can have multiple anns

  const [currLabel, setCurrLabel] = useState<Label>({ color: '', name: '' });
  const [currTool, setCurrTool] = useState<ToolType>('mover');
  const [progress, setProgress] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const scale = ScaleUtils(useState);

  const nextTask = () => {
    console.log('turning next ', taskIdx, tasks.length);
    if (taskIdx + 1 >= tasks.length) {
      message.error('This is the last task.');
      return;
    }
    setTaskIdx(taskIdx + 1);
  };

  const prevTask = () => {
    console.log('turning prev ', taskIdx, tasks.length);
    if (taskIdx - 1 < 0) {
      message.error('This is the first task.');
      return;
    }
    setTaskIdx(taskIdx - 1);
  };

  const selectLabel = (selected) => {
    const labs = [...labels];
    labs[indexOf(selected, labels, 'name')].active = !selected.active;

    // click on active, delete ann
    if (selected.active) {
      const ann = currAnns.filter((a) => a.labelId == selected.labelId)[0];
      console.log('filter ann ', ann);
      annotationApi.remove(ann.annotationId);
    } else {
      console.log('add ann', { taskId: task.taskId, labelId: selected.labelId });
      annotationApi
        .create({ taskId: task.taskId, labelId: selected.labelId, dataId: currData.dataId })
        .catch((err) => {
          console.log('err', err);
        });
    }

    setLabels(labs);
    setCurrLabel(selected);
  };

  // only load project and task once on page show
  useEffect(() => {
    async function update() {
      try {
        setLoading(true);
        if (!project) {
          const projectRes = await refreshProject();
          const tasksRes = await projectApi.getTasks(projectRes.projectId);
          const labelsRes = await projectApi.getLabels(projectRes.projectId);
          setLabels(toDict(labelsRes));
          setTasks(tasksRes);
          setProject(projectRes);
          setLoading(false);
          return;
        }

        // update progress
        getProgress(project.projectId).then((prog) => {
          setProgress(prog);
        });

        // update task, datas, anns, currData, currAnns
        setTask(tasks[taskIdx]);
        const taskId = tasks[taskIdx].taskId;
        taskApi.getAnnotations(taskId).then((annotations) => {
          setAnns(annotations);
        });
        const newDatas = await taskApi.getDatas(taskId);
        setDatas(newDatas);
        const currentData = newDatas[0];
        setCurrData(currentData);

        const currAnnotations = await dataApi.getAnnotations(currentData.dataId);
        setCurrAnns(currAnnotations);
        setLabels(setLabelActive(labels, currAnnotations));

        setImgSrc(`${baseUrl}/datas/${currentData.dataId}/image`);
        console.log('hereraasdf', labels);

        setLoading(false);
      } catch (err) {
        console.log(err);
        serviceUtils.parseError(err as Response, message);
      }
    }
    update();
  }, [taskIdx, project]); // TODO: slice change

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
              imgSrc={imgSrc}
            />
          </div>
          <div className={styles.pblock}>
            <div className={styles.progress}>
              <Progress percent={progress} status="active" />
            </div>
          </div>
          <div
            className={styles.prevTask}
            onClick={() => {
              prevTask();
            }}
          />
          <div
            className={styles.nextTask}
            onClick={() => {
              nextTask();
            }}
          />
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Split Dataset</PPToolBarButton>
      </PPToolBar>
      {/*// TODO: move label widget out*/}
      <div className={styles.rightSideBar}>
        <PPLabelList
          labels={labels}
          selectedLabel={currLabel}
          onLabelSelect={(label) => {
            selectLabel(label);
          }}
          onLabelAdd={(label) => {
            if (project?.projectId) addLabel(project.projectId, label, setLabels);
          }}
          onLabelDelete={(label) => {
            deleteLabel(label, setLabels);
          }}
          onLabelModify={() => {}}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;