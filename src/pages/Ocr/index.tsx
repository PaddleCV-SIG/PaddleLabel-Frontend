import { useEffect, useState, useRef } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Spin, message } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import Tables from './Tables';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
// import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import type { pageRef } from '@/components/PPLabelPage/PPStage';
import PPStage from '@/components/PPLabelPage/PPStage';
import useImage from 'use-image';
import { ectInteractorToAnnotation } from '@/components/PPDrawTool/PPInteractor';
// import type { Label } from '@/models/';
// import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { PageInit, ModelUtils } from '@/services/utils';
import type { PPDrawToolRet } from '@/components/PPDrawTool/drawUtils';
import type { Annotation } from '@/models/Annotation';
import PPRectangle from '@/components/PPDrawTool/PPRectangle';
import PPPolygon from '@/components/PPDrawTool/PPPolygon';
import Keyevent from 'react-keyevent';
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
  const [threshold, setThreshold] = useState(0.8);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [otherSetting, setotherSetting] = useState();
  const [flags, setflags] = useState<boolean>(false);
  const [preTools, setPreTools] = useState<string>('mover');
  // const [onSelect, setOnSelect] = useState<Annotation>();
  const [transparency, setTransparency] = useState(60);
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
  const datas = useRef(data);
  datas.current = data;
  const [image] = useImage(data.imgSrc || '', 'anonymous');
  function preCurrLabelUnset() {
    annotation.setCurr(undefined);
    setFrontendId(0);
    tool.setCurr('mover');
    setPreTools('mover');
  }

  const setCurrentAnnotation = (anno?: Annotation) => {
    annotation.setCurr(anno);
    if (!anno?.frontendId) setFrontendId(0);
    else setFrontendId(anno.frontendId);
  };

  const onAnnotationModify = (anno: Annotation) => {
    const newAnnos = [];
    if (anno.type === 'ocr_polygon') {
      if (!anno) return;
      for (const item of annotation.all) {
        if (item.frontendId === anno.frontendId) {
          newAnnos.push({
            ...item,
            result: anno.result,
          });
          setCurrentAnnotation(anno);
        } else {
          newAnnos.push(item);
        }
      }
      // annotation.setAll(annAll);
    } else {
      for (const item of annotation.all) {
        let areasResult: any = '';
        if (item.frontendId === anno.frontendId) {
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
            item.result = anno?.result;
            setCurrentAnnotation(anno);
            newAnnos.push(item);
          }
        } else {
          newAnnos.push(item);
        }
      }
    }
    annotation.setAll(newAnnos);

    // // annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
  };
  const onAnnotationModifyUP = (anno: Annotation) => {
    const newAnnos = [];
    for (const item of annotation.all) {
      if (item.frontendId == anno.frontendId) {
        newAnnos.push(anno);
      } else {
        newAnnos.push(item);
      }
    }
    setCurrentAnnotation(anno);

    annotation.setAll(newAnnos);
    annotation.update(anno);
    message.success(tbIntl('saveSuccess'));
  };
  const onStartEdit = () => {
    setisClick(true);
  };
  const onEndEdit = () => {
    if (interactorData.active) return;
    annHistory.record({ annos: annotation.all, currAnno: annotation.curr });

    setisClick(false);
  };
  const onFinishEdit = async () => {
    annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    if (!annotation.curr) return;
    if (!annotation.curr.result) return;
    if (annotation.curr.type === 'ocr_polygon') {
    } else {
      const lengths = annotation.all.length - 1;
      const ErrAnno = annotation.all[lengths];
      const ErrAnnoDatas = ErrAnno?.result.split('||')[0] as string;
      if (ErrAnno && ErrAnnoDatas?.split('|').length === 2) {
        const currResults = annotation?.curr?.result;
        const pointDatas = currResults.split('||')[0];
        const newResult = ErrAnnoDatas.split('|').concat(pointDatas.split('|'));
        const newResults = newResult.join('|') + ErrAnno?.result.split('||')[1];
        annotation.curr.result = newResults;
      }
      const strings = annotation?.curr?.result.split('||')[0];
      if (strings.length < 3) {
        setCurrentAnnotation(undefined);
        return;
      }
      if (annotation?.curr?.annotationId == undefined) {
        await annotation.create(annotation?.curr);
        // setCurrentAnnotation(annotation.all[annotation.all.length - 1]);
      } else {
        annotation.update(annotation?.curr);
      }
      setCurrentAnnotation(undefined);
      message.success(tbIntl('saveSuccess'));
    }
  };

  const drawToolParam = {
    dataId: data.curr?.dataId,
    currentLabel: label.all && label.all[0],
    scale: scale.curr,
    currentTool: tool.curr,
    annotations: annotation.all,
    currentAnnotation: annotation.curr,
    onAnnotationAdd: (anno: Annotation) => {
      setCurrentAnnotation(anno);
      const newAnnos = annotation.all.concat([anno]);
      annotation.setAll(newAnnos);
    },
    onAnnotationModify: onAnnotationModify,
    onMouseUp: onEndEdit,
    onMouseDown: onStartEdit,
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
    pathName: history?.location?.pathname,
    ChanegeTool: (tools: any) => {
      tool.setCurr(tools);
    },
    preTool: preTools,
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
    if (!img) return '';
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  };

  const onPredicted = (images: HTMLImageElement) => {
    const imgBase64 = getBase64Image(images);
    const thresholdRaw = threshold ? threshold : 0.5;
    const dataCurr = data?.curr;

    const line = model.predict('PaddleOCR', {
      format: 'b64',
      img: imgBase64,
      piggyback: {
        dataId: dataCurr?.dataId,
      },
    });
    if (!line) return;
    const settings = project.curr?.otherSettings ? project.curr.otherSettings : {};
    if (!settings?.mlBackendUrl) {
      return;
    }
    const params = {
      lang: settings.lang,
    };
    model.load(settings?.modelName, params).then(
      () => {
        // message.info(intl('modelLoaded'));
        line.then(
          (res: any) => {
            if (res) {
              // debugger;
              const id = datas.current.curr?.dataId;

              if (id !== res.piggyback.dataId) {
                return;
              }
              const predictions = res.predictions.map((item: any) => {
                if (item.score > thresholdRaw) {
                  return item;
                }
              });
              setIsLoad(false);
              data.updatePredicted(data.all[0]?.dataId, true); // 是否已经推理过
              setInteractorData({
                active: true,
                mousePoints: interactorData.mousePoints,
                predictData: predictions,
              });
            }
          },
          (error) => {
            alert('error', error);
            model.setLoading(false);
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
  const drawTool = {
    polygon: PPPolygon(drawToolParam),
    rectangle: PPRectangle(drawToolParam),
  };
  // useEffect(() => {
  //   if (data) {
  //     const [images] = useImage(data.imgSrc || '', 'anonymous');
  //     setImage(images);
  //   }
  // }, []);
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
      if (!settings?.mlBackendUrl) {
        return;
      }
      model.setMlBackendUrl(settings.mlBackendUrl || '');
      model.setLoading(true);
      const params = {
        lang: settings.lang,
      };
      model.load(settings.modelName, params).then(
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
    if (interactorData.predictData.length && project.curr?.projectId !== undefined) {
      label.getAll(project.curr.projectId).then((labelAll) => {
        const annos: any = [];
        let frontendIds = annotation.all?.length ? getMaxFrontendId(annotation.all) + 1 : 1;

        interactorData.predictData.map((item) => {
          if (item) {
            const result = item.result;
            const predictedBy = otherSetting?.modelName;
            const labelitem = labelAll && labelAll[0];
            if (interactorData.active) {
              // debugger;
              const anno = ectInteractorToAnnotation(
                frontendIds,
                result,
                data.curr?.dataId,
                labelitem,
                predictedBy,
              );
              if (anno) {
                annos.push(anno);
                frontendIds++;
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
  const deletes = async (anno: Annotation) => {
    const newAll = annotation.all.filter((x) => x.frontendId != anno.frontendId);
    annHistory.record({ annos: newAll });
    annotation.setAll(newAll);
    setCurrentAnnotation(undefined);
    await annotation.pushToBackend(data.curr?.dataId, newAll);
  };
  const annotationDelete = (newAnnos: Annotation[]) => {
    annotation.setAll(newAnnos);
    annotation.pushToBackend(data.curr?.dataId, newAnnos);
  };
  const onG = () => {
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
  };
  const onF = () => {
    if (!task.prevTask()) {
      return;
    }
    // scale.setCurr(1);
    setInteractorData({ active: false, predictData: [], mousePoints: [] });
    setCurrentAnnotation(undefined);
    setflags(false);
    if (page?.current) {
      page?.current?.setDragEndPos({
        x: 0,
        y: 0,
      });
    }
  };
  const onD = () => {
    const anno = annotation.curr;
    annotation.setAll(annotation.all.filter((x) => x.frontendId != anno.frontendId));
    setCurrentAnnotation(undefined);
    annotation.remove(anno);
  };
  const onB = () => {
    annHistory.backward().then((res) => {
      if (res) {
        annotation.setAll(res.annos);
        setCurrentAnnotation(res.currAnno);
        annotation.pushToBackend(data.curr?.dataId, res.annos);
      }
    });
  };
  const onCtrlS = () => {
    annotation.pushToBackend(data.curr?.dataId);
  };
  const onShiftCtrlC = () => {
    console.log('onShiftCtrlC');
  };
  const handleWheel = (event) => {
    const deta = event.deltaY;
    if (deta > 0) {
      scale.change(-0.1);
    }
    if (deta < 0) {
      scale.change(0.1);
    }
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
            setPreTools('polygon');

            setCurrentAnnotation(undefined);
          }}
        >
          {tbIntl('polygon')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/rectangle.png"
          active={tool.curr == 'rectangle'}
          onClick={() => {
            if (!label.curr && history?.location?.pathname !== '/optical_character_recognition') {
              message.error(tbIntl('chooseCategoryFirst'));
              return;
            }
            tool.setCurr('rectangle');
            setPreTools('rectangle');
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
            setPreTools('mover');
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
            setPreTools('');
            if (history?.location?.pathname !== '/optical_character_recognition') {
              label.setCurr(undefined);
            }
          }}
        >
          {tbIntl('clearMark')}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage" onWheel={handleWheel}>
        <Spin tip="loading" spinning={!!loading.curr}>
          <Keyevent
            className="TopSide"
            events={{
              onG,
              onF,
              onD,
              onB,
              onCtrlS,
              onShiftCtrlC,
            }}
            needFocusing
          >
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
                annotationDelete={annotationDelete}
                onAnnotationModifyComplete={() => {}}
                frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
                imgSrc={data.imgSrc}
                hideLabel={[]}
                transparency={transparency}
                onAnnotationAdd={(anno) => {
                  const newAnnos = annotation.all.concat([anno]);
                  annotation.setAll(newAnnos);
                }}
                preTools={preTools}
                changePreTools={(tools: string) => {
                  setPreTools(tools);
                }}
                tool={tool}
                drawTool={drawTool}
                threshold={0}
                // OnSelect={setOnSelect}
                onAnnotationModifyUP={onAnnotationModifyUP}
                ChanegeTool={(tools: any) => {
                  tool.setCurr(tools);
                }}
              />
            </div>
          </Keyevent>
          {/* <div className="pblock">
            <PPProgress task={task} project={project} />
          </div> */}
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
              }}
              onClick={() => {
                if (!task.prevTask()) {
                  return;
                }
                // scale.setCurr(1);
                setInteractorData({ active: false, predictData: [], mousePoints: [] });
                setCurrentAnnotation(undefined);
                setflags(false);
                if (page?.current) {
                  page?.current?.setDragEndPos({
                    x: 0,
                    y: 0,
                  });
                }
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
              }}
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
            >
              {tbIntl('nextTask')}
            </div>
          </div>
          {/* <div
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
              if (page?.current) {
                page?.current?.setDragEndPos({
                  x: 0,
                  y: 0,
                });
              }
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
          /> */}
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
          disabled={!image || !project?.curr?.otherSettings?.mlBackendUrl}
          onClick={() => {
            if (image) {
              onPredicted(image);
            }
          }}
        >
          {tbIntl('autoInference')}
        </PPToolBarButton>
        <PPSetButton
          disabled={interactorData.active}
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
        <PPSetButton
          imgSrc="./pics/buttons/alpha.png"
          disLoc="left"
          size={transparency}
          maxSize={100}
          minSize={0}
          disabled={interactorData.active}
          onChange={(newSize) => {
            setTransparency(newSize);
          }}
        >
          {tbIntl('transparency')}
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
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}
        >
          {/* <div style={{ width: '100%' }}>
            <Button type={'primary'} block={true}>
              {'确定'}
            </Button>
          </div> */}
        </div>
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
