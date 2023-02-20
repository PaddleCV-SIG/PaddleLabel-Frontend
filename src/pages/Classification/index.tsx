import React, { useState, useEffect, useRef } from 'react';
import { Spin, message } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import { useUpdateEffect } from 'ahooks';

import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPProgress from '@/components/PPLabelPage/PPProgress';
import { PageInit, ModelUtils } from '@/services/utils';
import type { Label, Annotation } from '@/models';
import { IntlInitJsx } from '@/components/PPIntl/';
import { IntlInit } from '@/services/utils';
import useImage from 'use-image';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
import Keyevent from 'react-keyevent';
const port = window.location.port == '8000' ? '1234' : window.location.port;
const baseUrl = `http://${window.location.hostname}:${port}/`;
const Page: React.FC = () => {
  const page = useRef<pageRef>(null);
  const intl = IntlInit('pages.classification');
  const tbIntl = IntlInitJsx('pages.toolBar');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [otherSetting, setotherSetting] = useState();
  // const [flags, setflags] = useState<boolean>(false);
  const [preTools, setPreTools] = useState<string>('');
  const { interactorData, setInteractorData } = useModel('InteractorData');
  const [threshold, setThreshold] = useState(0.9);
  const [hideLabel, setHideLabel] = useState<number[]>([]);
  const { tool, loading, scale, annotation, task, data, project, label, refreshVar } = PageInit(
    useState,
    useEffect,
    {
      label: { oneHot: false, postSelect: selectLabel },
      tool: { defaultTool: 'mover' },
      effectTrigger: { postTaskChange: postTaskChange, postProjectChanged: postProjectChanged },
    },
  );

  const [image] = useImage(data.imgSrc || '', 'anonymous');
  const model = ModelUtils(useState, baseUrl);

  function postProjectChanged() {
    if (project.curr?.otherSettings?.clasSubCatg == 'singleClass') label.setOneHot(true);
  }
  const getBase64Image = (img?: HTMLImageElement) => {
    console.log('getBase64Image', img);

    if (!img) return '';
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    console.log('img.width', img.width);
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL('image/png');
    console.log('dataURL', dataURL);

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  };
  async function selectLabel(selected: Label, activeIds: Set<number>) {
    // after toggle active, add ann
    console.log('+_+_+', selected, activeIds, activeIds.has(selected.labelId));
    if (activeIds.has(selected.labelId)) {
      console.log('+_+_+_', 'here');
      // if one hot, remove all current annotations
      if (label.isOneHot) annotation.all.map((ann) => annotation.remove(ann));
      // annotation.setAll([]);
      annotation
        .create({
          taskId: task.curr.taskId,
          labelId: selected.labelId,
          dataId: data.curr.dataId,
        })
        .then(() => message.success(tbIntl('saveSuccess')));
    } else {
      const anns = annotation.all.filter((a: Annotation) => a.labelId == selected.labelId);
      for (const ann of anns) annotation.remove(ann.annotationId);
    }
  }

  function postTaskChange(labels: [Label], annotations: [Annotation]) {
    loading.setCurr(true);
    if (!labels || !annotations) return;
    label.initActive(annotations);
    loading.setCurr(false);
    console.log('post task change');
  }
  const onPredicted = (images: HTMLImageElement) => {
    const imgBase64 = getBase64Image(images);
    // const thresholdRaw = threshold ? threshold * 0.01 : 0.5;
    const line = model.predict('PPLCNetV2', {
      format: 'b64',
      img: imgBase64,
    });
    if (!line) return;
    const settings = project.curr?.otherSettings ? project.curr.otherSettings : {};

    model.load(settings?.modelName).then(
      () => {
        // message.info(intl('modelLoaded'));
        line.then(
          (res) => {
            if (res) {
              console.log('resss', res);
              const predictions = res?.predictions;
              setIsLoad(false);
              data.updatePredicted(data.all[0].dataId, true);
              setInteractorData({
                active: true,
                mousePoints: interactorData.mousePoints,
                predictData: predictions,
              });
            }
          },
          (error) => {
            model.setLoading(false);
            console.log('line.error', error);
          },
        );
      },
      () => {
        model.setLoading(false);
        if (!isLoading) {
          setIsLoading(true);
        }
      },
    );
  };
  const createLabels = (labels) => {
    const newlabels = [...labels].map((item) => {
      const addlabel = {
        name: item,
        projectId: project.curr.projectId,
      };
      return addlabel;
    });
    if (newlabels.length > 0) {
      label.create(newlabels).then((newLabels) => {
        newLabels?.forEach((newLabel) => {
          label.onSelect(newLabel);
        });
      });
    }
  };
  useUpdateEffect(() => {
    if (data.all.length > 0) {
      // data.updatePredicted(data.all[0].dataId);
      if (data.all[0].predicted) {
        const flag = false;
        if (flag !== isLoad) {
          setIsLoad(flag);
        }
      } else {
        const flag = true;
        if (flag !== isLoad) {
          setIsLoad(flag);
        }
      }
    }
  }, [data.all]);
  useUpdateEffect(() => {
    if (isLoad && project.curr?.otherSettings?.labelMapping) {
      if (model.loading) {
        message.error(tbIntl('modelLoading'));
        return;
      }
      const settings = project.curr?.otherSettings ? project.curr.otherSettings : {};
      model.setMlBackendUrl(settings.mlBackendUrl || '');
      model.setLoading(true);
      model.load(settings.modelName).then(
        () => {
          // message.info(intl('modelLoaded'));
          model.setLoading(false);
          if (isLoading) {
            setIsLoading(false);
          }
        },
        () => {
          model.setLoading(false);
          if (!isLoading) {
            setIsLoading(true);
          }
        },
      );
    } else {
      setotherSetting(project.curr?.otherSettings);
    }
  }, [isLoad, project.curr?.otherSettings]);
  useUpdateEffect(() => {
    const predictflag = !isLoading && image && isLoad;
    if (predictflag) {
      onPredicted(image);
    }
  }, [isLoading, isLoad, image]);
  useUpdateEffect(() => {
    console.log('interactorData.predictData', otherSetting, interactorData.predictData.length);
    if (interactorData.predictData.length && otherSetting?.labelMapping && label.all) {
      const labels = new Set();
      const oldLabel = new Map();
      const labelmaps: any = {};
      for (const labelItem of label.all) {
        if (labelItem.name) {
          oldLabel.set(labelItem.name, labelItem);
        }
      }

      if (otherSetting?.labelMapping?.length > 0) {
        for (const labelMap of otherSetting?.labelMapping) {
          labelmaps[labelMap.model] = labelMap.project;
          if (!oldLabel.has(labelMap.project)) {
            labels.add(labelMap.project);
          }
        }
      }
      const thresholdRaw = threshold ? threshold : 0.5;
      for (const labelItem of interactorData.predictData) {
        if (labelItem?.score > thresholdRaw) {
          console.log('!oldLabel.has(labelItem?.label_name)', oldLabel);
          if (
            labelItem &&
            !oldLabel.has(labelItem?.label_name) &&
            !labelmaps[labelItem?.label_name]
          ) {
            labels.add(labelItem?.label_name);
          }
        }
      }
      const info = interactorData.predictData.some((labelItem) => {
        return labelItem.score > thresholdRaw;
      });
      if (!info) {
        message.error(intl('noHighScoreResult'));
      }
      createLabels(labels);
      if (![...labels].length) {
        // setflags(true);
      }
    }
  }, [interactorData, otherSetting]);
  const onHideLabel = (change: boolean, id: number) => {
    if (change) {
      setHideLabel([...hideLabel, id]);
    } else {
      const ids: number[] = hideLabel?.map((item: number) => {
        if (item !== id) {
          return item;
        }
      });
      setHideLabel(ids);
    }
  };
  const onG = () => {
    if (!label.activeIds.size) {
      message.info(intl('preNext'));
    }
    task.nextTask();
    page?.current?.setDragEndPos({ x: 0, y: 0 });
  };
  const onF = () => {
    if (!label.activeIds.size) {
      message.info(intl('preNext'));
    }
    task.prevTask();
    page?.current?.setDragEndPos({
      x: 0,
      y: 0,
    });
  };
  const onCtrlS = () => {
    message.success(tbIntl('autoSave'));
  };
  return (
    <PPLabelPageContainer className={styles.classes}>
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            scale.change(0.1);
          }}
        >
          {tbIntl('zoomIn')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          {tbIntl('zoomOut')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            message.success(tbIntl('autoSave'));
          }}
        >
          {tbIntl('save')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          active={tool.curr == 'mover'}
          onClick={() => {
            tool.setCurr('mover');
            setPreTools('mover');
          }}
        >
          {tbIntl('move')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            tool.setCurr(preTools);
            annotation.clear();
          }}
        >
          {tbIntl('clearMark')}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip={tbIntl('loading', 'global')} spinning={loading.curr}>
          <Keyevent
            className="TopSide"
            events={{
              onG,
              onF,
              onCtrlS,
            }}
            needFocusing
          >
            <div className="draw">
              <PPStage
                ref={page}
                scale={scale.curr}
                currentTool={tool.curr}
                scaleChange={scale.setScale}
                taskIndex={task.currIdx}
                hideLabel={hideLabel}
                setCurrentAnnotation={() => {}}
                onAnnotationModify={() => {}}
                onAnnotationModifyComplete={() => {}}
                imgSrc={data.imgSrc}
                annotations={annotation.all}
              />
            </div>
          </Keyevent>
          <div
            className="pblock"
            style={{
              display: 'flex',
            }}
          >
            <div
              className="preButton"
              style={{
                background: 'blue',
                color: 'white',
                width: '100px',
                textAlign: 'center',
                lineHeight: '2.55rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (!label.activeIds.size) {
                  message.info(intl('preNext'));
                }
                task.prevTask();
                page?.current?.setDragEndPos({
                  x: 0,
                  y: 0,
                });
              }}
            >
              {tbIntl('prevTask')}
            </div>
            <PPProgress task={task} project={project} />
            <div
              className="nextButton"
              style={{
                background: 'blue',
                color: 'white',
                width: '100px',
                textAlign: 'center',
                lineHeight: '2.55rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (!label.activeIds.size) {
                  message.info(intl('preNext'));
                }
                task.nextTask();
                page?.current?.setDragEndPos({ x: 0, y: 0 });
              }}
            >
              {tbIntl('nextTask')}
            </div>
          </div>
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/project_overview?projectId=${project.curr.projectId}`);
          }}
        >
          {tbIntl('projectOverview')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/intelligent_interaction.png"
          disabled={!otherSetting?.labelMapping}
          onClick={() => {
            onPredicted(image);
          }}
        >
          {tbIntl('autoInference')}
        </PPToolBarButton>
        <PPSetButton
          disabled={!interactorData.active}
          imgSrc="./pics/buttons/threshold.png"
          disLoc="left"
          size={threshold}
          maxSize={1}
          minSize={0.1}
          step={0.1}
          onChange={(newSize) => {
            setThreshold(newSize);
          }}
        >
          {tbIntl('autoInferenceThreshold')}
        </PPSetButton>
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelAdd={(lab) => label.create({ ...lab, projectId: project.curr.projectId })}
          onLabelDelete={label.remove}
          hideColorPicker={true}
          hideEye={true}
          refresh={refreshVar}
          onHideLabel={onHideLabel}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
