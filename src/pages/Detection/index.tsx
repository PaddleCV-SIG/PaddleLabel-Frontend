import React, { useEffect, useState, useRef } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Spin, message } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import useImage from 'use-image';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage, { pageRef } from '@/components/PPLabelPage/PPStage';
import { ectInteractorToAnnotation } from '@/components/PPDrawTool/PPInteractor';
// import type { Label } from '@/models/';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { PageInit, ModelUtils } from '@/services/utils';
import type { Annotation } from '@/models/Annotation';
import PPRectangle from '@/components/PPDrawTool/PPRectangle';
import PPProgress from '@/components/PPLabelPage/PPProgress';
import { IntlInitJsx } from '@/components/PPIntl';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
const port = window.location.port == '8000' ? '1234' : window.location.port;
const baseUrl = `http://${window.location.hostname}:${port}/`;
const Page = () => {
  // todo: change to use annotation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [frontendId, setFrontendId] = useState<number>(0);
  const [isClick, setisClick] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { interactorData, setInteractorData } = useModel('InteractorData');
  const [threshold, setThreshold] = useState(50);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [otherSetting, setotherSetting] = useState();

  const model = ModelUtils(useState, baseUrl);
  const page = useRef<pageRef>(null);
  const tbIntl = IntlInitJsx('pages.toolBar');

  const { tool, loading, scale, annotation, task, data, project, label, annHistory } = PageInit(
    useState,
    useEffect,
    {
      effectTrigger: {
        postTaskChange: (allLabels, allAnns) => {
          annHistory.init();
          annHistory.record({ annos: allAnns });
        },
      },
      label: {
        oneHot: true,
        postSelect: () => {
          annotation.setCurr(undefined);
          setFrontendId(0);
        },
        preUnsetCurr: preCurrLabelUnset,
      },
      tool: { defaultTool: 'mover' },
      task: {
        push: false,
      },
    },
  );
  function preCurrLabelUnset() {
    annotation.setCurr(undefined);
    setFrontendId(0);
    console.log('preCurrLabelUnset');
    tool.setCurr('mover');
  }

  const setCurrentAnnotation = (anno?: Annotation) => {
    console.log('setCurrentAnnotation');
    annotation.setCurr(anno);
    if (!anno?.frontendId) setFrontendId(0);
    else setFrontendId(anno.frontendId);
  };
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
  const onAnnotationModify = (anno: Annotation) => {
    const newAnnos = [];
    for (const item of annotation.all) {
      console.log('annotation:', item, anno);
      if (item.frontendId == anno.frontendId) {
        newAnnos.push(anno);
      } else {
        newAnnos.push(item);
      }
    }
    setCurrentAnnotation(anno);
    annotation.setAll(newAnnos);
  };
  const [image] = useImage(data.imgSrc || '', 'anonymous');
  function onStartEdit() {
    setisClick(true);
  }
  function onEndEdit() {
    setisClick(false);
  }
  function onFinishEdit() {
    // 鼠标抬起的时候
    annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    if (!annotation.curr) return;
    if (!annotation.curr.result || annotation.curr.result.split(',').length != 4) return;
    if (annotation?.curr?.annotationId == undefined) {
      console.log('finish', data.curr, annotation.curr);
      annotation.create(annotation?.curr);
    } else {
      annotation.update(annotation?.curr);
    }
    message.success(tbIntl('saveSuccess'));
    if (tool.curr == 'rectangle') setCurrentAnnotation(undefined);
  }

  const drawToolParam = {
    dataId: data.curr?.dataId,
    currentLabel: label.curr,
    scale: scale.curr,
    currentTool: tool.curr,
    annotations: annotation.all,
    currentAnnotation: annotation.curr,
    onAnnotationAdd: (anno: Annotation) => {
      const newAnnos = annotation.all.concat([anno]);
      annotation.setAll(newAnnos);
      setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    modifyAnnoByFrontendId: onAnnotationModify,
    onMouseUp: onEndEdit,
    onMouseDown: onStartEdit,
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
  };

  const rectagle = PPRectangle(drawToolParam);

  const drawTool = { polygon: rectagle, brush: undefined };
  const setAnnotation = (select: Annotation) => {
    const items = annotation.all;
    const id = select.annotationId;
    const item = items.find((i) => i.annotationId === id);
    if (item) {
      const index = items.indexOf(item);
      items.splice(index, 1);
      // add to the top
      items.push(item);
      annotation.setAll(items);
    }
  };
  const getMaxFrontendId = (annotations?: Annotation[]) => {
    if (!annotations || annotations.length == 0) return 0;
    let max = 0;
    for (const annotationItem of annotations) {
      if (annotationItem.frontendId > max) max = annotationItem.frontendId;
    }
    return max;
  };
  const onPredicted = (images: HTMLImageElement) => {
    // debugger;
    console.log('page.current?.image', image, page.current?.image, page.current?.scaleImage);
    const imgBase64 = getBase64Image(images);
    const thresholdRaw = threshold ? threshold * 0.01 : 0.5;
    const line = model.predict('PicoDet', {
      format: 'b64',
      img: imgBase64,
    });
    if (!line) return;
    line.then(
      (res) => {
        if (res) {
          const predictions = res.predictions.map((item) => {
            if (item.score > thresholdRaw) {
              // return item;
              const results = item.result.split(',').map((items) => {
                // debugger;
                const newitems = parseInt(items * page.current?.scaleImage);
                return newitems;
              });
              item.result = results.join(',');
              // debugger;
              return item;
            }
          });
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
      label.create(newlabels).then((newLabel) => {
        setCurrentAnnotation(undefined);
        label.setCurr(newLabel);
      });
    }
  };
  useEffect(() => {
    annHistory.init();
  }, []);
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
  useEffect(() => {
    if (!isClick) {
      onFinishEdit();
    }
  }, [isClick]);
  useUpdateEffect(() => {
    // debugger;
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
    // setInteractorData({ active: true, predictData: [], mousePoints: [] });
  }, [isLoad, project.curr?.otherSettings]);
  useUpdateEffect(() => {
    const predictflag = !isLoading && image && isLoad;
    if (predictflag) {
      onPredicted(image);
    }
  }, [isLoading, isLoad, image]);
  useUpdateEffect(() => {
    console.log('interactorData.predictData', otherSetting, interactorData.predictData.length);
    if (interactorData.predictData.length && otherSetting?.labelMapping) {
      const labels = new Set();
      const oldLabel = new Map();
      for (const labelItem of label.all) {
        if (labelItem.name) {
          oldLabel.set(labelItem.name, labelItem);
        }
      }
      if (otherSetting?.labelMapping?.length > 0) {
        for (const labelMap of otherSetting?.labelMapping) {
          if (!oldLabel.has(labelMap.project)) {
            labels.add(labelMap.project);
          }
        }
        createLabels(labels);
      } else {
        for (const labelItem of interactorData.predictData) {
          console.log('!oldLabel.has(labelItem?.label_name)', oldLabel);
          if (labelItem && !oldLabel.has(labelItem?.label_name)) {
            labels.add(labelItem?.label_name);
          }
        }
        createLabels(labels);
      }
    }
  }, [interactorData, otherSetting]);
  useUpdateEffect(() => {
    if (interactorData.predictData.length && label.all.length && otherSetting?.labelMapping) {
      const labels = new Map();
      for (const labelItem of label.all) {
        labels.set(labelItem.name, labelItem);
      }
      const annos = [];
      const labelMapping = new Map();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let frontendId = annotation.all?.length ? getMaxFrontendId(annotation.all) + 1 : 1;
      if (otherSetting?.labelMapping?.length > 0) {
        for (const labelMaps of otherSetting.labelMapping) {
          labelMapping.set(labelMaps.model, labelMaps.project);
        }
      }
      interactorData.predictData.map((item) => {
        console.log('label_name', item);
        if (item) {
          let name = '';
          if (labelMapping.has(item.label_name)) {
            name = labelMapping.get(item.label_name);
          } else {
            name = item.label_name;
          }
          const labelitem = labels.get(name);
          const result = item.result;
          // debugger;
          // saveInteractorData(labelitem, item.result);
          if (interactorData.active) {
            const anno = ectInteractorToAnnotation(
              annotation.all,
              frontendId,
              result,
              data.curr?.dataId,
              labelitem,
            );
            if (anno) {
              annos.push(anno);
              frontendId++;
            }
          }
        }
      });
      annotation.create(annos);
      // debugger;
    }
  }, [label.all, interactorData.predictData, otherSetting]);
  return (
    <PPLabelPageContainer className={styles.det}>
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/rectangle.png"
          active={tool.curr == 'rectangle'}
          onClick={() => {
            if (!label.curr) {
              message.error(tbIntl('chooseCategoryFirst'));
              return;
            }
            tool.setCurr('rectangle');
            setCurrentAnnotation(undefined);
          }}
        >
          {tbIntl('rectangle')}
        </PPToolBarButton>
        <PPToolBarButton
          active={tool.curr == 'editor'}
          imgSrc="./pics/buttons/edit.png"
          onClick={() => {
            tool.setCurr('editor');
          }}
        >
          {tbIntl('edit')}
        </PPToolBarButton>
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
            annotation.pushToBackend(data.curr?.dataId);
          }}
        >
          {tbIntl('save')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          active={tool.curr == 'mover'}
          onClick={() => {
            tool.setCurr('mover');
          }}
        >
          {tbIntl('move')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/prev.png"
          onClick={() => {
            const res = annHistory.backward();
            // const res2 = annHistory.backward();
            if (res) {
              annotation.setAll(res.annos);
              setCurrentAnnotation(res.currAnno);
              annotation.pushToBackend(data.curr?.dataId, res.annos);
            }
          }}
        >
          {tbIntl('unDo')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            const res = annHistory.forward();
            if (res) {
              annotation.pushToBackend(data.curr?.dataId, res.annos);
              setCurrentAnnotation(res.currAnno);
            }
          }}
        >
          {tbIntl('reDo')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            annotation.clear();
            annHistory.record({ annos: [] });
          }}
        >
          {tbIntl('clearMark')}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip="loading" spinning={!!loading.curr}>
          <div className="draw">
            <PPStage
              ref={page}
              scale={scale.curr}
              annotations={annotation.all}
              currentTool={tool.curr}
              currentAnnotation={annotation.curr}
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={onAnnotationModify}
              onAnnotationModifyComplete={() => {}}
              frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
              imgSrc={data.imgSrc}
              transparency={100}
              onAnnotationAdd={(anno) => {
                const newAnnos = annotation.all.concat([anno]);
                annotation.setAll(newAnnos);
              }}
              drawTool={drawTool}
              threshold={0}
            />
          </div>
          <div className="pblock">
            <PPProgress task={task} project={project} />
          </div>
          <div
            className="prevTask"
            data-test-id="prevTask"
            onClick={() => {
              if (!task.prevTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
            }}
          />
          <div
            className="nextTask"
            data-test-id="nextTask"
            onClick={() => {
              if (!task.nextTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
            }}
          />
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
          {tbIntl('interactor')}
        </PPToolBarButton>
        <PPSetButton
          disabled={!interactorData.active}
          imgSrc="./pics/buttons/threshold.png"
          disLoc="left"
          size={threshold}
          maxSize={100}
          minSize={10}
          step={10}
          onChange={(newSize) => {
            setThreshold(newSize);
          }}
        >
          {tbIntl('segmentThreshold')}
        </PPSetButton>
        {/* <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/ml?projectId=${project.curr.projectId}`);
          }}
        >
          {'ML Settings'}
        </PPToolBarButton> */}
        {/* <PPAIButton
          imgSrc="./pics/buttons/intelligent_interaction.png"
          active={interactorData.active}
          onClick={async () => {
            
          }}
          model={model}
          project={project}
        >
        {tbIntl('interactor')}
        </PPAIButton> */}
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelDelete={label.remove}
          disabled={otherSetting?.labelMapping?.length > 0}
          onLabelAdd={(lab) => {
            label.create({ ...lab, projectId: project.curr.projectId }).then((newLabel) => {
              setCurrentAnnotation(undefined);
              label.setCurr(newLabel);
            });
          }}
        />
        <PPAnnotationList
          disabled={false}
          type={'Detection'}
          currAnnotation={annotation.curr}
          annotations={annotation.all}
          onAnnotationSelect={(selectedAnno) => {
            if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
            setAnnotation(selectedAnno);
            // console.log('selectedAnno', selectedAnno);
          }}
          onAnnotationAdd={() => {
            console.log('onAnnotationAdd');
            setCurrentAnnotation(undefined);
          }}
          onAnnotationModify={() => {}}
          onAnnotationDelete={(anno: Annotation) => {
            annotation.setAll(annotation.all.filter((x) => x.frontendId != anno.frontendId));
            setCurrentAnnotation(undefined);
            annotation.remove(anno);
          }}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
