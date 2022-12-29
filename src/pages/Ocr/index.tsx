import { useEffect, useState, useRef } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Spin, message, Button } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import Tables from './Tables';

import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
// import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage, { pageRef } from '@/components/PPLabelPage/PPStage';
import useImage from 'use-image';
import { ectInteractorToAnnotation } from '@/components/PPDrawTool/PPInteractor';
// import type { Label } from '@/models/';
// import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { PageInit, ModelUtils } from '@/services/utils';
import { PPDrawToolRet } from '@/components/PPDrawTool/drawUtils';
import type { Annotation } from '@/models/Annotation';
import PPRectangle from '@/components/PPDrawTool/PPRectangle';
import PPPolygon from '@/components/PPDrawTool/PPPolygon';

import PPProgress from '@/components/PPLabelPage/PPProgress';
import { IntlInitJsx } from '@/components/PPIntl';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
const port = window.location.port == '8000' ? '1234' : window.location.port;
const baseUrl = `http://${window.location.hostname}:${port}/`;
export type DrawToolType = {
  polygon: PPDrawToolRet;
  brush: undefined;
};
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
  const [flags, setflags] = useState<boolean>(false);
  const [onSelect, setOnSelect] = useState<Annotation>();
  // const [drawTool, setDrawTool] = useState<DrawToolType>();
  const model = ModelUtils(useState, baseUrl);
  const page = useRef<pageRef>(null);
  const tbIntl = IntlInitJsx('pages.toolBar');

  const { tool, loading, scale, annotation, task, data, project, label, annHistory } = PageInit(
    useState,
    useEffect,
    {
      effectTrigger: {
        postTaskChange: (allLabels, allAnns) => {
          annHistory.init({ annos: allAnns });
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
  const [image] = useImage(data.imgSrc || '', 'anonymous');
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

  const onAnnotationModify = (anno: Annotation) => {
    const newAnnos = [];
    console.log('annotationfronsss', anno);

    for (const item of annotation.all) {
      console.log('annotationfrontendId:', item.frontendId, anno.frontendId, annotation.all);
      let areasResult: any = '';
      if (item.frontendId == anno.frontendId) {
        if (history?.location?.pathname === '/optical_character_recognition') {
          areasResult = anno?.result?.split('||')[0].split('|').join(',');
        } else {
          areasResult = anno?.result;
        }
        const result = areasResult?.split(',').map((items: string) => {
          return Number(items);
        }) as number[];
        const area = (result[2] - result[0]) * (result[3] - result[1]);
        if (Math.abs(area) > 10) {
          newAnnos.push(anno);
          setCurrentAnnotation(anno);
        }
      } else {
        newAnnos.push(item);
      }
    }
    console.log('onAnnotationModify:', newAnnos, anno);
    // annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    annotation.setAll(newAnnos);
  };
  const onAnnotationModifyUP = (anno: Annotation) => {
    const newAnnos = [];
    for (const item of annotation.all) {
      console.log('annotationUP:', item, anno);
      if (item.frontendId == anno.frontendId) {
        newAnnos.push(anno);
      } else {
        newAnnos.push(item);
      }
    }
    setCurrentAnnotation(anno);
    console.log('onAnnotationModifyUP:');

    annotation.setAll(newAnnos);
    annotation.update(anno);
  };
  const onStartEdit = () => {
    setisClick(true);
  };
  const onEndEdit = () => {
    setisClick(false);
  };
  const onFinishEdit = async () => {
    // 鼠标抬起的时候
    // console.log('here');
    annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    if (!annotation.curr) return;
    console.log(
      'annotations.curr',
      onSelect,
      annotation.curr,
      annotation?.curr?.annotationId,
      annotation.curr.result.split(',').length,
    );
    if (!annotation.curr.result) return;
    const lengths = annotation.all.length - 1;
    const ErrAnno = annotation.all[lengths];
    const datas = ErrAnno?.result.split('||')[0] as string;
    if (ErrAnno && datas?.split(',').length === 2) {
      const newResult = datas.split(',').concat(annotation?.curr?.result.split(','));
      const newResults = newResult.join(',') + ErrAnno?.result.split('||')[1];
      annotation.curr.result = newResults;
    }
    const strings = annotation?.curr?.result.split('||')[0];
    if (strings.length < 3) return;
    if (annotation?.curr?.annotationId == undefined) {
      console.log('finish', data.curr, annotation.curr);
      await annotation.create(annotation?.curr);
      // setCurrentAnnotation(annotation.all[annotation.all.length -1]);
      if (tool.curr === 'polygon') {
        // debugger;
        const currs = await annotation.getAll(annotation?.curr.dataId);
        setCurrentAnnotation(currs[currs.length - 1]);
      }
    } else {
      annotation.update(annotation?.curr);
    }
    message.success(tbIntl('saveSuccess'));
    if (tool.curr == 'rectangle') setCurrentAnnotation(undefined);
  };

  const drawToolParam = {
    dataId: data.curr?.dataId,
    currentLabel: label.curr,
    scale: scale.curr,
    currentTool: tool.curr,
    annotations: annotation.all,
    currentAnnotation: annotation.curr,
    onAnnotationAdd: (anno: Annotation) => {
      const newAnnos = annotation.all.concat([anno]);
      // debugger;
      annotation.setAll(newAnnos);
      setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    modifyAnnoByFrontendId: onAnnotationModify,
    onMouseUp: onEndEdit,
    onMouseDown: onStartEdit,
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
    pathName: history?.location?.pathname,
  };

  // const setAnnotation = (select: Annotation) => {
  //   const items = annotation.all;
  //   const id = select.annotationId;
  //   const item = items.find((i) => i.annotationId === id);
  //   if (item) {
  //     const index = items.indexOf(item);
  //     items.splice(index, 1);
  //     // add to the top
  //     items.push(item);
  //     annotation.setAll(items);
  //   }
  // };

  const getMaxFrontendId = (annotations?: Annotation[]) => {
    if (!annotations || annotations.length == 0) return 0;
    let max = 0;
    for (const annotationItem of annotations) {
      if (annotationItem.frontendId > max) max = annotationItem.frontendId;
    }
    return max;
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
  const onPredicted = (images: HTMLImageElement) => {
    const imgBase64 = getBase64Image(images);
    const thresholdRaw = threshold ? threshold * 0.01 : 0.5;
    const line = model.predict('PaddleOCR', {
      format: 'b64',
      img: imgBase64,
    });
    if (!line) return;
    line.then(
      (res) => {
        if (res) {
          const predictions = res.predictions.map((item) => {
            if (item.score > thresholdRaw) {
              return item;
            }
          });
          // const predictions = res.predictions;
          // debugger;
          setIsLoad(false);
          data.updatePredicted(data.all[0]?.dataId, true);
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
  // const createLabels = (labels) => {
  //   // debugger;
  //   const newlabels = [...labels].map((item) => {
  //     const addlabel = {
  //       name: item,
  //       projectId: project.curr.projectId,
  //     };
  //     return addlabel;
  //   });
  //   if (newlabels.length > 0) {
  //     label.create(newlabels).then((newLabel) => {
  //       // debugger;
  //       setCurrentAnnotation(undefined);
  //       label.setCurr(newLabel);

  //       setflags(true);
  //     });
  //   }
  // };
  // useEffect(() => {
  //   annHistory.init({});
  // }, []);
  // useUpdateEffect(() => {
  //   if (tool.curr === 'rectangle') {
  //     // debugger;
  //     const rectagle = PPRectangle(drawToolParam);
  //     const drawTools = { polygon: rectagle, brush: undefined };
  //     setDrawTool(drawTools);
  //   } else if (tool.curr === 'polygon') {
  //     debugger;
  //     const polygon = PPPolygon(drawToolParam);
  //     const drawTools = { polygon: polygon, brush: undefined };
  //     setDrawTool(drawTools);
  //   }
  // }, [tool.curr]);
  // const rectagle = PPRectangle(drawToolParam);
  // const polygon = PPPolygon(drawToolParam);
  // const drawTool =
  //   tool.curr === 'polygon'
  //     ? { polygon: polygon, brush: undefined }
  //     : { polygon: rectagle, brush: undefined };
  const drawTool = {
    polygon: PPPolygon(drawToolParam),
    rectangle: PPRectangle(drawToolParam),
    // brush: PPBrush(drawToolParam),
    // interactor: PPInteractor(drawToolParam),
    // rubber: PPRubber(drawToolParam),
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
  useEffect(() => {
    if (!isClick) {
      onFinishEdit();
    }
  }, [isClick]);

  useUpdateEffect(() => {
    // debugger;
    if (isLoad) {
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
  // useUpdateEffect(() => {
  //   // console.log('interactorData.predictData', otherSetting, interactorData.predictData.length);
  //   if (interactorData.predictData.length && label.all) {
  //     console.log('interactorData.predictData', otherSetting, interactorData.predictData.length);
  //     const labels = new Set();
  //     const oldLabel = new Map();
  //     // const labelmaps: any = {};
  //     for (const labelItem of label.all) {
  //       if (labelItem.name) {
  //         oldLabel.set(labelItem.name, labelItem);
  //       }
  //     }
  //     if (otherSetting?.labelMapping?.length > 0) {
  //       for (const labelMap of otherSetting?.labelMapping) {
  //         // labelmaps[labelMap.model] = labelMap.project;
  //         if (!oldLabel.has(labelMap.project)) {
  //           labels.add(labelMap.project);
  //         }
  //       }
  //     } else {
  //       for (const labelItem of interactorData.predictData) {
  //         console.log('!oldLabel.has(labelItem?.label_name)', oldLabel, labelItem?.label_name);
  //         if (labelItem && !oldLabel.has(labelItem?.label_name)) {
  //           labels.add(labelItem?.label_name);
  //         }
  //       }
  //       if ([...labels].length) {
  //         // debugger;
  //         createLabels(labels);
  //       }
  //     }
  //     if (![...labels].length) {
  //       setflags(true);
  //     }
  //   }
  // }, [interactorData, otherSetting]);
  useUpdateEffect(() => {
    if (interactorData.predictData.length && project.curr?.projectId !== undefined) {
      // debugger;
      // const labels = new Map();
      label.getAll(project.curr.projectId).then((labelAll) => {
        // debugger;
        // for (const labelItem of labelAll) {
        //   labels.set(labelItem.name, labelItem);
        // }
        const annos = [];
        // const labelMapping = new Map();
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let frontendId = annotation.all?.length ? getMaxFrontendId(annotation.all) + 1 : 1;
        // if (otherSetting?.labelMapping?.length > 0) {
        //   for (const labelMaps of otherSetting.labelMapping) {
        //     labelMapping.set(labelMaps.model, labelMaps.project);
        //   }
        // }
        // console.log('interactorData.predictData', interactorData.predictData);

        interactorData.predictData.map((item) => {
          console.log('label_name', item);
          if (item) {
            // const name = labelItem.name;
            // // if (labelMapping.has(item.label_name)) {
            // //   name = labelMapping.get(item.label_name);
            // // } else {
            // //   name = item.label_name;
            // // }
            // const labelitem = labels.get(name);
            const result = item.result;
            const predictedBy = otherSetting.modelName;
            const labelitem = labelAll[0];
            // debugger;
            // saveInteractorData(labelitem, item.result);
            if (interactorData.active) {
              // debugger;
              const anno = ectInteractorToAnnotation(
                frontendId,
                result,
                data.curr?.dataId,
                labelitem,
                predictedBy,
              );
              if (anno) {
                annos.push(anno);
                frontendId++;
              }
            }
          }
        });
        const deduplicate = true;
        // debugger;
        annotation.create(annos, '', deduplicate);
        // debugger;
        setInteractorData({ active: false, predictData: [], mousePoints: [] });
        setflags(false);
      });
    }
  }, [project?.curr?.projectId, interactorData.predictData, otherSetting, flags]);
  // const scaleChange = (curr,index)=>{
  //   scale.change(curr);
  //   scale.setScales
  // }
  console.log('annitonsss', annotation.all);
  const deletes = async (anno: Annotation) => {
    const newAll = annotation.all.filter((x) => x.frontendId != anno.frontendId);
    annHistory.record({ annos: newAll });
    annotation.setAll(newAll);
    setCurrentAnnotation(undefined);
    await annotation.pushToBackend(data.curr?.dataId, newAll);
  };
  return (
    <PPLabelPageContainer className={styles.det}>
      <PPToolBar>
        {/* 多边形 */}
        <PPToolBarButton
          imgSrc="./pics/buttons/polygon.png"
          active={tool.curr == 'polygon'}
          disabled={interactorData.active}
          onClick={() => {
            if (!label.curr && history?.location?.pathname !== '/optical_character_recognition') {
              message.error(tbIntl('chooseCategoryFirst'));
              return;
            }
            // debugger;
            tool.setCurr('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          {tbIntl('polygon')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/rectangle.png"
          active={tool.curr == 'rectangle'}
          onClick={() => {
            console.log('label.curr', label.curr);

            if (!label.curr && history?.location?.pathname !== '/optical_character_recognition') {
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
            annHistory.backward().then((res) => {
              if (res) {
                annotation.setAll(res.annos);
                setCurrentAnnotation(res.currAnno);
                annotation.pushToBackend(data.curr?.dataId, res.annos);
              }
            });
          }}
        >
          {tbIntl('unDo')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/next.png"
          onClick={() => {
            annHistory.forward().then((res) => {
              if (res) {
                annotation.pushToBackend(data.curr?.dataId, res.annos);
                setCurrentAnnotation(res.currAnno);
              }
            });
          }}
        >
          {tbIntl('reDo')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            annotation.clear();
            annHistory.record({ annos: [] });
            tool.setCurr(undefined);
            if (history?.location?.pathname !== '/optical_character_recognition') {
              label.setCurr(undefined);
            }
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
              taskIndex={task.currIdx}
              scale={scale.curr}
              scaleChange={scale.setScale}
              annotations={annotation.all}
              currentTool={tool.curr}
              currentAnnotation={annotation.curr}
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={onAnnotationModify}
              onAnnotationModifyComplete={() => {}}
              frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
              imgSrc={data.imgSrc}
              transparency={60}
              onAnnotationAdd={(anno) => {
                const newAnnos = annotation.all.concat([anno]);
                annotation.setAll(newAnnos);
              }}
              tool={tool}
              drawTool={drawTool}
              threshold={0}
              OnSelect={setOnSelect}
              onAnnotationModifyUP={onAnnotationModifyUP}
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
              // scale.setCurr(1);
              setInteractorData({ active: false, predictData: [], mousePoints: [] });
              setCurrentAnnotation(undefined);
              setflags(false);
              page?.current?.setDragEndPos({
                x: 0,
                y: 0,
              });
            }}
          />
          <div
            className="nextTask"
            data-test-id="nextTask"
            onClick={() => {
              if (!task.nextTask()) {
                return;
              }
              // scale.setCurr(1);
              setInteractorData({ active: false, predictData: [], mousePoints: [] });
              setCurrentAnnotation(undefined);
              setflags(false);
              page?.current?.setDragEndPos({
                x: 0,
                y: 0,
              });
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
          // disabled={!otherSetting?.labelMapping}
          onClick={() => {
            onPredicted(image);
          }}
        >
          {tbIntl('autoInference')}
        </PPToolBarButton>
        <PPSetButton
          disabled={interactorData.active}
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
          {tbIntl('autoInferenceThreshold')}
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
      <div
        className="rightSideBar"
        style={{
          padding: '10px',
        }}
      >
        <div
          className="titles"
          style={{
            textAlign: 'center',
            padding: '20px',
            background: '#1727C2',
            color: 'white',
          }}
        >
          识别结果
        </div>
        <div
          style={{
            height: '500px',
            border: '3px solid',
          }}
        >
          <Tables
            onAnnotationDelete={deletes}
            onAnnotationModify={onAnnotationModify}
            updataAnno={annotation.update}
            annotations={annotation.all}
            currentAnnotation={annotation.curr}
            selectAnnotation={annotation.setCurr}
          ></Tables>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}
        >
          <div style={{ width: '100%' }}>
            <Button type={'primary'} block={true}>
              {'确定'}
            </Button>
          </div>
        </div>
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
