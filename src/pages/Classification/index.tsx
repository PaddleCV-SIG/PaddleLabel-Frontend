import React, { useState, useEffect } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { Progress, message } from 'antd';

import type { Project, Label } from '@/models';
import { refreshProject } from '../Welcome';

import { projectApi } from '@/services/api';

export type ToolType = 'mover' | undefined;

async function getProgress(projectId: number, update): number {
  if (projectId == undefined) update(0);
  // TODO: switch to getTasksStat
  projectApi
    .getTasks(projectId)
    .then((tasks) => {
      console.log(tasks);
      let finished = 0;
      for (const task of tasks) {
        if (task.annotations.length != 0) finished++;
      }
      console.log('res', finished, tasks.length, Math.ceil((finished / tasks.length) * 100));
      update(Math.ceil((finished / tasks.length) * 100));
    })
    .catch((err) => {
      console.log(err);
      update(0);
    });
}

const Page: React.FC = () => {
  const [project, setProject] = useState<Project>();
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [scale, setScaleRaw] = useState(1);
  const [progress, setProgress] = useState<number>(0);
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

  // Init project info on refresh or direct open
  useEffect(() => {
    refreshProject((res: Project) => {
      setProject(res);
      getProgress(res.projectId, (pg) => {
        setProgress(pg);
      });
    });
  }, []);
  console.log('project', project);
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
        {/* QUESTION: maybe we dont need to save?*/}
        <PPToolBarButton imgSrc="./pics/buttons/save.png">Save</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png">Move</PPToolBarButton>
      </PPToolBar>
      <div id="dr" className={styles.mainStage}>
        <div className={styles.draw}>
          <PPStage
            width={document.getElementById('dr')?.clientWidth}
            scale={scale}
            currentTool={undefined}
            setCurrentAnnotation={() => {}}
            onAnnotationModify={() => {}}
            onAnnotationModifyComplete={() => {}}
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
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
      </PPToolBar>
      <div className={styles.rightSideBar}>
        <PPLabelList
          labels={project?.labels}
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
          }}
          onLabelModify={() => {}}
          onLabelDelete={() => {}}
          onLabelAdd={() => {}}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
