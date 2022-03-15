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
import { getProgress } from '@/services/api';
import { getLabels, addLabel, deleteLabel } from '@/services/api';
import { Configuration, Label, Project, ProjectApi, Task } from '@/services';
import serviceUtils from '@/services/serviceUtils';
// import { getImgSrc } from '@/services/api';

const baseUrl = localStorage.getItem('basePath');
const config = new Configuration(baseUrl ? { basePath: baseUrl } : undefined);

export const projectApi = new ProjectApi(config);

export type ToolType = 'mover' | undefined;

const Page: React.FC = () => {
  const [project, setProject] = useState<Project>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState<Task[]>();
  const [labels, setLabels] = useState<Label[]>();
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [scale, setScaleRaw] = useState(1);
  const [progress, setProgress] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>('');
  // const [taskId, setTaskId] = useState<number>(1); // TODO: 这两个是写死的，需要加切换图片
  const [dataId, setDataId] = useState<number>(1);

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
    async function initProject() {
      try {
        const projectRes = await refreshProject();
        console.log(projectRes);
        setProject(projectRes);

        const tasksRes = await projectApi.getTasks(projectRes.projectId);
        const finished = tasksRes.filter((task) => task.annotations?.length != 0).length;
        let progressRes = Math.ceil((finished / tasksRes.length) * 100);
        progressRes = progressRes <= 0 ? 0 : progressRes;
        console.log('res', finished, tasksRes.length, progressRes);
        setProgress(progressRes);

        const labelsRes = await projectApi.getLabels(projectRes.projectId);
        console.log('got labels ', labelsRes);
        setLabels(serviceUtils.toDict(labelsRes));

        console.log(`img src: ${baseUrl}/data/${dataId}/image`);
        setImgSrc(`${baseUrl}/datas/${dataId}/image`);
      } catch (err) {
        console.log(err);
        serviceUtils.parseError(err as Response, message);
      }
    }
    initProject();
  }, []);

  // setDataId(1);
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
            addLabel(project.projectId, label, setLabels);
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
