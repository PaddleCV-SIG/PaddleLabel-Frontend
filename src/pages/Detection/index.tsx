import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import useImage from 'use-image';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
// import { interactorToAnnotation } from '@/components/PPDrawTool/PPInteractor';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import { PageInit, ModelUtils } from '@/services/utils';
import type { Annotation } from '@/models/Annotation';
import PPRectangle from '@/components/PPDrawTool/PPRectangle';
import PPProgress from '@/components/PPLabelPage/PPProgress';
import { IntlInitJsx } from '@/components/PPIntl';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
const generatedColorList: string[] = [
  '#FF0000',
  '#008000',
  '#0000FF',
  '#FFFF00',
  '#FFA500',
  '#00FFFF',
  '#8B00FF',
  '#FFC0CB',
  '#7CFC00',
  '#007FFF',
  '#800080',
  '#36BF36',
  '#DAA520',
  '#800000',
  '#008B8B',
  '#B22222',
  '#E6D933',
  '#000080',
  '#FF00FF',
  '#FFFF99',
  '#87CEEB',
  '#5C50E6',
  '#CD5C5C',
  '#20B2AA',
  '#E680FF',
  '#4D1F00',
  '#006374',
  '#B399FF',
  '#8B4513',
  '#BA55D3',
  '#C0C0C0',
  '#808080',
  '#000000',
];
const Page: React.FC = () => {
  // todo: change to use annotation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [frontendId, setFrontendId] = useState<number>(0);
  const [isClick, setisClick] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { interactorData, setInteractorData } = useModel('InteractorData');
  // const [finlyList] = useState<Annotation[]>([]);
  // const [selectFinly] = useState<Annotation>();
  const [threshold, setThreshold] = useState(50);
  const model = ModelUtils(useState);
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
    // console.log('save invoked', anno.annotationId);
  };
  const [image] = useImage(data.imgSrc || '', 'anonymous');
  function onStartEdit() {
    // console.log('onStartEdit函数执行了', annotation.all);
    // annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    setisClick(true);
  }
  function onEndEdit() {
    // console.log('onStartEdit函数执行了', annotation.all);
    // annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    setisClick(false);
  }
  function onFinishEdit() {
    // 鼠标抬起的时候
    annHistory.record({ annos: annotation.all, currAnno: annotation.curr });
    console.log('finish before', annotation.curr);
    if (!annotation.curr) return;
    if (!annotation.curr.result || annotation.curr.result.split(',').length != 4) return;
    if (annotation?.curr?.annotationId == undefined) {
      console.log('finish', data.curr, annotation.curr);
      annotation.create(annotation?.curr);
    } else {
      annotation.update(annotation?.curr);
    }
    // console.log('finish after', annotation.curr);
    message.success(tbIntl('saveSuccess'));
    // console.log('tool', tool.curr);
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
    const index = items.indexOf(item);
    items.splice(index, 1);
    // add to the top
    items.push(item);
    annotation.setAll(items);
  };
  // const saveInteractorData = () => {
  //   if (interactorData.active) {
  //     console.log('label.curr', label.curr, interactorData?.predictData);
  //     const anno = interactorToAnnotation(
  //       threshold,
  //       annotation.all,
  //       interactorData?.predictData,
  //       data.curr?.dataId,
  //       finlyList,
  //       selectFinly,
  //       label.curr,
  //     );
  //     console.log('annos', anno);

  //     if (anno) {
  //       const newAnnos = annotation.all.concat([anno]);
  //       annotation.setAll(newAnnos);
  //       setCurrentAnnotation(anno);
  //       annotation.pushToBackend(data.curr?.dataId, newAnnos);
  //     }
  //     setInteractorData({ active: false, predictData: [], mousePoints: [] });
  //     // setCurrentAnnotation(undefined);
  //   }
  // };
  useEffect(() => {
    annHistory.init();
  }, []);
  useEffect(() => {
    console.log('onStartEdit函数执行了', annotation.all);
    if (!isClick) {
      onFinishEdit();
    }
  }, [isClick]);
  useEffect(() => {
    if (model.loading) {
      message.error(tbIntl('modelLoading'));
      return;
    }
    const settings = project.curr?.otherSettings ? project.curr.otherSettings : {};
    model.setMlBackendUrl(settings.mlBackendUrl);
    model.setLoading(true);
    model.load().then(
      () => {
        // message.info(intl('modelLoaded'));
        console.log('settings', settings);
        model.setLoading(false);
        setIsLoading(false);
      },
      () => {
        model.setLoading(false);
        setIsLoading(true);
      },
    );
    // setInteractorData({ active: true, predictData: [], mousePoints: [] });
  }, [project.curr]);
  useEffect(() => {
    console.log('data.imgSrc', data.imgSrc, image, isLoading);
    if (!isLoading && data.imgSrc && image) {
      const imgBase64 = getBase64Image(image);
      console.log('asdasdf', data.imgSrc);
      const line = model.predict('PicoDet', {
        format: 'b64',
        img: imgBase64,
      });
      if (!line) return;
      console.log('line.result', line);
      line.then(
        (res) => {
          // message.info(intl('modelLoaded'));
          // model.setLoading(false);
          // setIsLoading(false);
          // console.log('line.result', e);
          setInteractorData({
            active: true,
            mousePoints: interactorData.mousePoints,
            predictData: res.predictions,
          });
        },
        (error) => {
          // model.setLoading(false);
          // setIsLoading(true);
          console.log('line.error', error);
        },
      );
    }
  }, [isLoading, data.imgSrc, image]);
  useEffect(() => {
    if (interactorData.predictData.length && label.all.length) {
      const length = label.all.length;
      const labels = new Set();
      for (const labelItem of interactorData.predictData) {
        labels.add(labelItem.label_name);
      }
      const newlabels = [...labels].map((item, index) => {
        const addlabel = {
          color: generatedColorList[index + length],
          name: item,
          // labelId: index + length + 1,
          projectId: project.curr.projectId,
        };
        return addlabel;
      });
      console.log('newlabels', newlabels);
      label.create(newlabels).then((newLabel) => {
        setCurrentAnnotation(undefined);
        label.setCurr(newLabel);
      });
      // saveInteractorData();
    }
  }, [interactorData, label.all]);
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
        > */}
        {/* {tbIntl('interactor')}
        </PPAIButton> */}
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
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
