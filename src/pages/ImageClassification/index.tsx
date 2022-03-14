import React, { useState } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { message, Progress } from 'antd';
import { useEffect } from 'react';
import { refreshProject } from '../Welcome';
import { Label, Project, ProjectApi, Task } from '@/services';
import { Configuration, LabelApi } from '@/services';
import serviceUtils from '@/services/serviceUtils';

export type ToolType = 'mover' | undefined;

const baseUrl = localStorage.getItem('basePath');
const labelApi = new LabelApi(new Configuration({ basePath: baseUrl ? baseUrl : undefined }));
const projectApi = new ProjectApi(new Configuration({ basePath: baseUrl ? baseUrl : undefined }));

const Page: React.FC = () => {
  const [project, setProject] = useState<Project>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState<Task[]>();
  const [labels, setLabels] = useState<Label[]>();
  const [currentLabel, setCurrentLabel] = useState<Label>({ color: '', name: '' });
  const [scale, setScaleRaw] = useState(1);
  const setScale = (size: number) => {
    if (!size) setScaleRaw(1);
    if (size < 0.1 || size > 3.0) setScaleRaw(1);
    else setScaleRaw(size);
  };

  // Init project info on refresh or direct open
  useEffect(() => {
    refreshProject((res: Project) => {
      setProject(res);
      setLabels(res.labels);
      projectApi
        .getTasks(res.projectId + '')
        .then((tasksRes) => {
          setTasks(tasksRes);
        })
        .catch((err) => {
          serviceUtils.parseError(err, message);
        });
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
            <Progress percent={50} status="active" />
          </div>
        </div>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
      </PPToolBar>
      <div className={styles.rightSideBar}>
        <PPLabelList
          labels={labels}
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
          }}
          onLabelModify={() => {}}
          onLabelDelete={() => {}}
          onLabelAdd={(label: Label) => {
            labelApi
              .create({
                id: serviceUtils.randomIntFromInterval(0, 9999),
                name: label.name,
                color: label.color,
                projectId: project?.projectId,
              })
              .then((newLabel: Label) => {
                labels?.push(newLabel);
                setLabels(labels);
              })
              .catch((err) => {
                serviceUtils.parseError(err, message);
              });
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
