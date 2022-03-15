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

import { getProgress } from '@/services/api';
import { getLabels, addLabel, deleteLabel } from '@/services/api';

export type ToolType = 'mover' | undefined;

const Page: React.FC = () => {
  const [project, setProject] = useState<Project>();
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [labels, setLabels] = useState([]);
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
      getProgress(res.projectId, setProgress);
      getLabels(res.projectId, setLabels);
    });
  }, []);

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
        {/* QUESTION: maybe we dont need a save button?*/}
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
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Split Dataset</PPToolBarButton>
      </PPToolBar>
      <div className={styles.rightSideBar}>
        <PPLabelList
          labels={labels}
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
          }}
          onLabelModify={() => {}}
          onLabelDelete={(label) => {
            deleteLabel(label, setLabels);
          }}
          onLabelAdd={(label) => {
            addLabel(project.projectId, label, setLabels);
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
