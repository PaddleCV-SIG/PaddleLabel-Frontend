/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState, useRef } from 'react';
import { Button, message, Spin } from 'antd';
import { history, useModel } from 'umi';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
import PPSButtons from '@/components/PPLabelPage/PPButtons';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import PPBrush from '@/components/PPDrawTool/PPBrush';
import PPRubber from '@/components/PPDrawTool/PPRubber';
import PPPolygon from '@/components/PPDrawTool/PPPolygon';
import PPProgress from '@/components/PPLabelPage/PPProgress';
import { ModelUtils, PageInit } from '@/services/utils';
import { ColorMaker } from '@/services/ColorMaker';

import type { pageRef } from '@/components/PPLabelPage/PPStage';
import type { Annotation } from '@/models/';
import PPAIButton from '@/components/PPLabelPage/PPAIButton';
import PPInteractor, { interactorToAnnotation } from '@/components/PPDrawTool/PPInteractor';
import { IntlInitJsx } from '@/components/PPIntl';
const Page: React.FC = () => {
  const tbIntl = IntlInitJsx('pages.toolBar');
  const [frontendId, setFrontendId] = useState<number>(0);
  const [pathNames] = useState(!history?.location?.pathname.includes('/instance_segmentation'));
  const [finlyList, setfinlyList] = useState<Annotation[]>([]);
  const [selectFinly, setSelectFinly] = useState<Annotation>();
  const [isLabel, setisLabel] = useState<string>('label');
  const [brushSize, setBrushSize] = useState(10);
  const [threshold, setThreshold] = useState(50);
  const [newAnnotation, setNewAnnotation] = useState<Annotation[]>();
  const [transparency, setTransparency] = useState(60);
  const { radius, setRadius } = useModel('VisualRadius');
  const { interactorData, setInteractorData } = useModel('InteractorData');
  const [saveFlag, setsaveFlag] = useState(false);
  const [mousepoint, setMousepoint] = useState(false);
  const [mousepoint2, setMousepoint2] = useState(false);

  const model = ModelUtils(useState);
  const page = useRef<pageRef>(null);
  const { tool, loading, scale, annotation, task, data, project, label, refreshVar, annHistory } =
    PageInit(useState, useEffect, {
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
      task: { push: true },
    });
  function preCurrLabelUnset() {
    annotation.setCurr(undefined);
    setFrontendId(0);
  }
  const setCurrentAnnotation = (anno?: Annotation) => {
    annotation.setCurr(anno);
    if (!anno?.frontendId) setFrontendId(0);
    else setFrontendId(anno.frontendId);
  };
  const saveInteractorData = () => {
    if (interactorData.active) {
      const anno = interactorToAnnotation(
        threshold,
        annotation.all,
        interactorData?.predictData,
        data.curr?.dataId,
        finlyList,
        selectFinly,
        label.curr,
      );
      console.log('label.anno', anno);
      if (anno) {
        const newAnnos = annotation.all.concat([anno]);
        annotation.setAll(newAnnos);
        setCurrentAnnotation(anno);
        annotation.pushToBackend(data.curr?.dataId, newAnnos);
      }
      // tool.setCurr(undefined);
      console.log('...interactorData', { ...interactorData, active: true, predictData: [] });

      setInteractorData({ mousePoints: [], active: true, predictData: [] });
      // setCurrentAnnotation(undefined);
      setsaveFlag(true);
    }
  };
  const savefinlyList = () => {
    if (annotation.all?.length > 0) {
      const frontendId = new Map();
      const items: Annotation[] = [];
      if (isLabel !== 'label') {
        annotation.all.forEach((anno) => {
          const myColor = ColorMaker.GetColor(anno.frontendId);
          const items = JSON.parse(JSON.stringify(anno));
          items.label.color = '#' + myColor.Color;
          frontendId.set(anno.frontendId, items);
        });
      } else {
        annotation.all.forEach((anno) => {
          console.log('debuggerannos', anno);
          // debugger;
          frontendId.set(anno.frontendId, anno);
        });
      }
      frontendId.forEach((anno: Annotation) => {
        items.push(anno);
      });
      console.log('items', items);

      setfinlyList(items);
      setSelectFinly(null);
    } else {
      setfinlyList([]);
      setSelectFinly(null);
    }
  };
  // useEffect(() => {
  //   annHistory.init();
  // }, []);
  // 初始用来判断执行增不增加
  useEffect(() => {
    console.log('useEffect函数执行了', annotation.all);
    savefinlyList();
  }, [loading.curr, isLabel, saveFlag]);
  useEffect(() => {
    if (interactorData.active && interactorData.predictData.length) {
      console.log('interactorData', interactorData);
      saveInteractorData();
    }
  }, [mousepoint]);
  // useEffect(() => {
  //   if (interactorData.active) {
  //     console.log('interactorData2', interactorData);
  //     setInteractorData({ ...interactorData, force: !interactorData.force });
  //   }
  // }, [mousepoint2]);
  // useEffect(()=>{
  //   if (annotation.all.length) {

  //   }
  // },[saveFlag])
  useEffect(() => {
    if (loading.curr) return;
    if (isLabel === 'label') return;
    // const frontendId = new Map();
    // const items: Annotation[] = [];
    const newAnnotation = annotation.all.map((item: Annotation) => {
      const myColor = ColorMaker.GetColor(item.frontendId);
      const items: Annotation = JSON.parse(JSON.stringify(item));
      items.label.color = '#' + myColor.Color;
      // if (frontendId.has(item.frontendId)) {
      //   items.label.color = frontendId.get(item.frontendId);
      // } else {
      //   items.label.color = '#' + myColor.Color;
      //   frontendId.set(items.frontendId, '#' + myColor.Color);
      // }
      return items;
    });
    console.log('newAnnotation', newAnnotation);
    setNewAnnotation(newAnnotation);
  }, [isLabel, annotation.all, loading.curr]);

  const onAnnotationModify = (anno: Annotation) => {
    if (!anno) return;
    console.log('onAnnotationModify', anno);
    annotation.all.pop();
    annotation.all.push(anno);
    setCurrentAnnotation(anno);
    annotation.setAll(annotation.all);
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
    annotation.setAll(newAnnos);
    // debugger;
    annotation.update(anno);
  };

  const modifyAnnoByFrontendId = (anno: Annotation) => {
    console.log('modifyAnnoByFrontendId:', anno);
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
  };
  const annotationDelete = (newAnnos: Annotation[]) => {
    annotation.setAll(newAnnos);
    annotation.pushToBackend(data.curr?.dataId, newAnnos);
  };
  const drawToolParam = {
    dataId: data.curr?.dataId,
    currentLabel: label.curr,
    brushSize: brushSize,
    scale: scale.curr,
    currentTool: tool.curr,
    annotations: annotation.all,
    labels: label.all,
    currentAnnotation: annotation.curr,
    onAnnotationAdd: (anno: Annotation) => {
      const newAnnos = annotation.all.concat([anno]);
      annotation.setAll(newAnnos);
      setCurrentAnnotation(anno);
    },
    onAnnotationModify: onAnnotationModify,
    modifyAnnoByFrontendId: modifyAnnoByFrontendId,
    onMouseUp: () => {
      // Do not record interactor's history, do not pushToBackend either
      if (interactorData.active) return;
      annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
      annotation.pushToBackend(data.curr?.dataId, annotation.all);
      // 存下一份记录
    },
    frontendIdOps: { frontendId: frontendId, setFrontendId: setFrontendId },
    model: model,
    finlyList: finlyList,
    selectFinly: selectFinly,
    isLabel: isLabel,
    pathName: history?.location?.pathname,
  };

  const drawTool = {
    polygon: PPPolygon(drawToolParam),
    brush: PPBrush(drawToolParam),
    interactor: PPInteractor(drawToolParam),
    rubber: PPRubber(drawToolParam),
  };
  console.log('annotation.all', annotation.all);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setisLabel(value);
  };
  return (
    <PPLabelPageContainer className="segment">
      <PPToolBar>
        {/* 多边形 */}
        <PPToolBarButton
          imgSrc="./pics/buttons/polygon.png"
          active={tool.curr == 'polygon'}
          disabled={interactorData.active}
          onClick={() => {
            if (!label.curr) {
              message.error(tbIntl('chooseCategoryFirst'));
              return;
            }
            tool.setCurr('polygon');
            setCurrentAnnotation(undefined);
          }}
        >
          {tbIntl('polygon')}
        </PPToolBarButton>
        {/* 编辑 */}
        <PPToolBarButton
          active={tool.curr == 'editor'}
          disabled={interactorData.active}
          imgSrc="./pics/buttons/edit.png"
          onClick={() => {
            tool.setCurr('editor');
            // setCurrentAnnotation(undefined);
          }}
        >
          {tbIntl('edit')}
        </PPToolBarButton>
        {/* 笔刷 */}
        <PPSetButton
          imgSrc="./pics/buttons/brush.png"
          size={brushSize}
          active={tool.curr == 'brush'}
          disabled={interactorData.active}
          onClick={() => {
            if (!label.curr) {
              message.error(tbIntl('chooseCategoryFirst'));
              return;
            }
            if (tool.curr != 'rubber' && tool.curr != 'brush') {
              setCurrentAnnotation(undefined);
            }
            tool.setCurr('brush');
          }}
          onChange={(newBrushSize) => {
            if (newBrushSize >= 1) {
              setBrushSize(newBrushSize);
            }
          }}
        >
          {tbIntl('brush')}
        </PPSetButton>
        {/* 橡皮擦 */}
        <PPSetButton
          size={brushSize}
          active={tool.curr == 'rubber'}
          disabled={(pathNames && interactorData.active) || !annotation.all?.length}
          onClick={() => {
            if (tool.curr != 'rubber' && tool.curr != 'brush') {
              setCurrentAnnotation(undefined);
            }
            tool.setCurr('rubber');
          }}
          onChange={(newBrushSize) => {
            setBrushSize(newBrushSize);
          }}
          imgSrc="./pics/buttons/rubber.png"
        >
          {tbIntl('rubber')}
        </PPSetButton>
        {/* 放大 */}
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            scale.change(0.1);
          }}
        >
          {tbIntl('zoomIn')}
        </PPToolBarButton>
        {/* 缩小 */}
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          {tbIntl('zoomOut')}
        </PPToolBarButton>
        {/* 保存 */}
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            annotation.pushToBackend(data.curr?.dataId);
          }}
          disabled={interactorData.active}
        >
          {tbIntl('save')}
        </PPToolBarButton>
        {/* 移动 */}
        <PPToolBarButton
          active={tool.curr == 'mover'}
          imgSrc="./pics/buttons/move.png"
          onClick={() => {
            if (tool.curr == 'mover') {
              if (interactorData.active) {
                tool.setCurr('interactor');
              } else {
                tool.setCurr(undefined);
              }
            } else {
              tool.setCurr('mover');
            }
          }}
        >
          {tbIntl('move')}
        </PPToolBarButton>
        {/* 撤销 */}

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
          disabled={interactorData.active}
        >
          {tbIntl('unDo')}
        </PPToolBarButton>
        {/* 重做 */}

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
          disabled={interactorData.active}
        >
          {tbIntl('reDo')}
        </PPToolBarButton>
        {/* 删除 */}

        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            annotation.setCurr(undefined);
            annotation.clear();
            annHistory.record({ annos: [] });
            setSelectFinly(null);
            setfinlyList([]);
            tool.setCurr(undefined);
            label.setCurr(undefined);
          }}
          disabled={interactorData.active}
        >
          {tbIntl('clearMark')}
        </PPToolBarButton>
      </PPToolBar>
      {/* 主内容区域 */}
      <div id="dr" className="mainStage">
        <Spin tip="loading" spinning={!!loading.curr}>
          <div className="draw">
            <PPStage
              ref={page}
              scale={scale.curr}
              taskIndex={task.currIdx}
              scaleChange={scale.setScale}
              annotations={isLabel == 'label' ? annotation.all : newAnnotation ? newAnnotation : []}
              currentTool={tool.curr}
              labels={label.all}
              tool={tool}
              currentAnnotation={annotation.curr}
              currentLabel={label.curr}
              setCurrentAnnotation={setCurrentAnnotation}
              onAnnotationModify={modifyAnnoByFrontendId}
              onAnnotationModifyUP={onAnnotationModifyUP}
              onAnnotationModifyComplete={() => {
                // Do not record interactor's history
                if (interactorData.active) return;
                // annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
              }}
              onMousepoint={() => {
                setMousepoint(!mousepoint);
              }}
              onMousepoint2={() => {
                setMousepoint2(!mousepoint2);
              }}
              annotationDelete={annotationDelete}
              frontendIdOps={{ frontendId: frontendId, setFrontendId: setFrontendId }}
              imgSrc={data.imgSrc}
              transparency={transparency}
              threshold={threshold}
              onAnnotationAdd={(anno) => {
                const newAnnos = annotation.all.concat([anno]);
                annotation.setAll(newAnnos);
                if (!annotation.curr) setCurrentAnnotation(anno);
              }}
              drawTool={drawTool}
              refresh={refreshVar}
              brushSize={brushSize}
            />
          </div>
          <div
            className="prevTask"
            data-test-id="prevTask"
            onClick={() => {
              // if (interactorData.active) saveInteractorData();
              if (!task.prevTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
              // if (interactorData.active)
              //   setInteractorData({ active: false, predictData: [], mousePoints: [] });
              setSelectFinly(null);
              setfinlyList([]);
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
              // if (interactorData.active) saveInteractorData();
              if (!task.nextTask()) {
                return;
              }
              setCurrentAnnotation(undefined);
              // if (interactorData.active)
              //   setInteractorData({ active: false, predictData: [], mousePoints: [] });
              setSelectFinly(null);
              setfinlyList([]);
              page?.current?.setDragEndPos({
                x: 0,
                y: 0,
              });
            }}
          />
        </Spin>
        <div className="pblock">
          <PPProgress task={task} project={project} />
        </div>
      </div>

      <PPToolBar disLoc="right">
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          disabled={interactorData.active}
          onClick={() => {
            history.push(`/project_overview?projectId=${project.curr.projectId}`);
          }}
        >
          {tbIntl('projectOverview')}
          {/* 项目总览 */}
        </PPToolBarButton>
        <PPAIButton
          imgSrc="./pics/buttons/intelligent_interaction.png"
          active={interactorData.active}
          onClick={async () => {
            console.log('model.loading', model.loading);

            if (model.loading) {
              message.error(tbIntl('modelLoading'));
              return;
            }
            if (interactorData.active) {
              tool.setCurr(undefined);
              setInteractorData({ active: false, predictData: [], mousePoints: [] });
            } else {
              const settings = project.curr.otherSettings ? project.curr.otherSettings : {};
              console.log(
                'settings.modelSettings?.EISeg?.modelFilePath',
                settings?.modelSettings?.EISeg?.modelFilePath,
                settings?.modelSettings?.EISeg?.paramFilePath,
              );
              const params = {
                model_path: settings?.modelSettings?.EISeg?.modelFilePath,
                param_path: settings?.modelSettings?.EISeg?.paramFilePath,
              };
              try {
                await model.load('EISeg', params);
              } catch (e) {
                return;
              }
              tool.setCurr('interactor');
              // tool.setCurr(undefined);
              setInteractorData({ active: true, predictData: [], mousePoints: [] });
            }
          }}
          model={model}
          project={project}
        >
          {tbIntl('interactor')}
          {/* 智能标注 */}
        </PPAIButton>
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
          {/* 分割阈值 */}
        </PPSetButton>
        <PPSetButton
          disabled={!interactorData.active}
          imgSrc="./pics/buttons/radius.png"
          disLoc="left"
          size={radius}
          maxSize={50}
          minSize={5}
          step={5}
          onChange={(newSize) => {
            setRadius(newSize);
          }}
        >
          {tbIntl('visualRadius')}
          {/* 可视化半径 */}
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

        {/* {history?.location?.pathname === '/instance_segmentation' && ( */}
        {!pathNames && (
          <PPSButtons
            imgSrc="./pics/buttons/alpha.png"
            disLoc="left"
            size={transparency}
            maxSize={100}
            minSize={0}
            disabled={interactorData.active}
            onChange={handleChange}
          >
            {tbIntl('colorMode')}
          </PPSButtons>
        )}
      </PPToolBar>
      <div className="rightSideBar">
        {!pathNames && (
          <div className="determinOutline">
            <Button
              disabled={pathNames}
              style={{ height: 40, fontSize: '0.75rem' }}
              type="primary"
              block
              onClick={() => {
                // saveInteractorData();
                savefinlyList();
              }}
            >
              {tbIntl('determineOutline')}
            </Button>
          </div>
        )}

        <PPLabelList
          hideColorPicker={false}
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelDelete={label.remove}
          onLabelAdd={(lab) => {
            label.create({ ...lab, projectId: project.curr.projectId }).then((newLabel) => {
              setCurrentAnnotation(undefined);
              label.setCurr(newLabel);
            });
          }}
        />
        {pathNames ? (
          <PPAnnotationList
            currAnnotation={annotation.curr}
            annotations={isLabel == 'label' ? annotation.all : newAnnotation ? newAnnotation : []}
            onAnnotationSelect={(selectedAnno) => {
              if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
            }}
            onAnnotationAdd={() => {
              setCurrentAnnotation(undefined);
            }}
            onAnnotationModify={() => {}}
            onAnnotationDelete={async (anno: Annotation) => {
              const newAll = annotation.all.filter((x) => x.frontendId != anno.frontendId);
              annHistory.record({ annos: newAll });
              annotation.setAll(newAll);
              setCurrentAnnotation(undefined);
              await annotation.pushToBackend(data.curr?.dataId, newAll);
            }}
            disabled={interactorData.active}
          />
        ) : (
          <PPAnnotationList
            currAnnotation={selectFinly}
            annotations={finlyList}
            onAnnotationSelect={(selectedAnno) => {
              // if (!selectedAnno?.delete) setCurrentAnnotation(selectedAnno);
              if (!selectedAnno?.delete) {
                console.log('selectedAnno', selectedAnno);

                setSelectFinly(selectedAnno);
              }
            }}
            onAnnotationAdd={() => {
              setCurrentAnnotation(undefined);
            }}
            onAnnotationModify={() => {}}
            onAnnotationDelete={async (anno: Annotation) => {
              const newAll = annotation.all.filter((x) => x.frontendId != anno.frontendId);
              const newfinlyList = finlyList.filter((x) => x.frontendId != anno.frontendId);
              annHistory.record({ annos: newAll });
              annotation.setAll(newAll);
              setfinlyList(newfinlyList);
              setCurrentAnnotation(undefined);
              await annotation.pushToBackend(data.curr?.dataId, newAll);
              // savefinlyList();
            }}
            disabled={interactorData.active}
          />
        )}
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
