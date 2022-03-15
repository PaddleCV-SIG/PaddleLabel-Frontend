/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { Progress, message } from 'antd';
import { useAsync } from 'react-async';
import { refreshProject } from '../Welcome';
import { getLabels, addLabel, deleteLabel } from '@/services/api';
import { getTasks, getProgress } from '@/services/api';
import { projectApi } from '@/services/api';
import type { Label, Project, Task, Data } from '@/services';
import serviceUtils from '@/services/serviceUtils';

const baseUrl = localStorage.getItem('basePath');

export type ToolType = 'mover' | undefined;

const Page: React.FC = () => {
  const [project, setProject] = useState<Project>();
  const [labels, setLabels] = useState<Label[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const [datas, setDatas] = useState<Data[]>();

  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [currentTool, setCurrentTool] = useState<ToolType>('mover');
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);
  const [scale, setScaleRaw] = useState(1);
  const [progress, setProgress] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>('');

  const setScale = (newScale: number, range: number[] = [0.1, 3]) => {
    let s = newScale;
    if (s == undefined) s = 1;
    if (s < range[0]) {
      s = range[0];
      message.error('Smallest scale is ' + range[0]);
    }
    if (s > range[1]) {
      s = range[1];
      message.error('Largest scale is ' + range[1]);
    }
    setScaleRaw(s);
  };

  const nextTask = () => {
    console.log('turning next ', currentTaskId, tasks.length);
    if (currentTaskId + 1 >= tasks.length) {
      message.error('This is the last task.');
      return;
    }
    setCurrentTaskId(currentTaskId + 1);
  };

  const prevTask = () => {
    console.log('turning prev ', currentTaskId, tasks.length);
    if (currentTaskId - 1 < 0) {
      message.error('This is the first task.');
      return;
    }
    setCurrentTaskId(currentTaskId - 1);
  };

  // want to only load project and task once when open the page
  useEffect(() => {
    async function update() {
      try {
        console.log('before if', project);
        if (!project) {
          const projectRes = await refreshProject();
          const tasksRes = await projectApi.getTasks(projectRes.projectId);
          const labelsRes = await projectApi.getLabels(projectRes.projectId);

          setLabels(serviceUtils.toDict(labelsRes));
          setTasks(tasksRes);
          setProject(projectRes);
          return;
        }

        console.log('after if ', project, tasks);

        const progressRes = await getProgress(project.projectId);
        setProgress(progressRes);

        const labelsRes = await projectApi.getLabels(project.projectId);
        setLabels(serviceUtils.toDict(labelsRes));

        let currentData = tasks[currentTaskId]['datas'];
        currentData = currentData[0]; // TODO: for 3d, scroll wheel for changing this
        console.log('currentData', currentData);

        // TODO: nested object use snake case
        setImgSrc(`${baseUrl}/datas/${currentData.data_id}/image`);
      } catch (err) {
        console.log(err);
        serviceUtils.parseError(err as Response, message);
      }
    }
    update();
  }, [currentTaskId, project]);

  return (
    <PPLabelPageContainer className={styles.classes}>
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            setScale(scale + 0.1);
          }}
        >
          Zoom in
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            setScale(scale - 0.1);
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
      </PPToolBar>
      <div id="dr" className={styles.mainStage}>
        <div className={styles.draw}>
          <PPStage
            width={document.getElementById('dr')?.clientWidth}
            scale={scale}
            currentTool={currentTool}
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
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Split Dataset</PPToolBarButton>

        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            nextTask();
          }}
        >
          Next Task
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            prevTask();
          }}
        >
          Prev Task
        </PPToolBarButton>
      </PPToolBar>
      {/*// TODO: move label widget out*/}
      <div className={styles.rightSideBar}>
        <PPLabelList
          labels={labels}
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
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
