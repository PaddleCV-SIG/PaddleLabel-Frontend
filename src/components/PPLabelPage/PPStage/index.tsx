/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import { history } from 'umi';
import { throttle } from 'lodash';
import { useDeepCompareEffect } from 'ahooks';
import type { Stage as StageType } from 'konva/lib/Stage';
import type { Layer as LayerType } from 'konva/lib/Layer';
import type { ForwardRefRenderFunction } from 'react';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import type { PPDrawToolRet, PPRenderFuncProps } from '@/components/PPDrawTool/drawUtils';
import { Threshold } from 'konva/lib/filters/Threshold';
import { useModel } from 'umi';
import type { Label } from '@/models';
import { result } from 'lodash';
import { YahooFilled } from '@ant-design/icons';

// Mock Data
// const imgSrc = './pics/32_23.jpg';
const imgSrc = './pics/basketball.jpg';

// Calculate current mouse pointer
function getPointer(toolType: ToolType) {
  switch (toolType) {
    case 'mover':
      return 'move';
    case 'rectangle':
    case 'polygon':
      return 'crosshair';
    default:
      return 'default';
  }
}
export type pageRef = {
  image: HTMLImageElement;
  scaleImage: number;
  setDragEndPos?: any;
};
export type PPStageProps = {
  imgSrc?: string;
  scale: number;
  annotations?: Annotation[];
  currentTool: ToolType;
  currentAnnotation?: Annotation;
  currentLabel?: Label;
  labels?: Label[];
  setCurrentAnnotation: (anntation: Annotation) => void;
  onAnnotationAdd: (anntation: Annotation) => void;
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationModifyComplete: () => void;
  transparency: number;
  threshold: number;
  drawTool: {
    polygon: PPDrawToolRet;
    brush?: PPDrawToolRet;
    rubber?: PPDrawToolRet;
    interactor?: PPDrawToolRet;
  };
  hideLabel: number[];
  frontendIdOps: { frontendId: number; setFrontendId: (id: number) => void };
  refresh?: number;
  image?: HTMLImageElement;
  tool: {
    curr: ToolType;
    setCurr: (tool: ToolType) => void;
  };
  scaleChange?: (delta: number) => void;
  taskIndex?: number;
  onAnnotationModifyUP?: (annotation: Annotation) => void;
  brushSize?: number;
  annotationDelete?: (anntation: Annotation[]) => void;
  onMousepoint?: () => void;
  onMousepoint2?: () => void;
  ChanegeTool?: () => void;
};

const Component: ForwardRefRenderFunction<pageRef, PPStageProps> = (props, ref) => {
  const [image] = useImage(props.imgSrc || '', 'anonymous');
  // const image = props.image;
  const transparency = props.transparency === undefined ? 0 : props.transparency * 0.01;
  const interactorData = useModel('InteractorData', (x) => x.interactorData);
  const radius = useModel('VisualRadius', (x) => x.radius);
  let drawToolTemp = undefined;
  if (props.currentTool === 'polygon') {
    drawToolTemp = props.drawTool?.polygon;
  } else if (
    props.currentTool === 'editor' &&
    (props.currentAnnotation?.type === 'ocr_polygon' || props.currentAnnotation?.type === 'polygon')
  ) {
    drawToolTemp = props.drawTool?.polygon;
  } else if (history?.location?.pathname === '/detection') {
    drawToolTemp = props.drawTool?.rectangle;
  } else if (history?.location?.pathname === '/optical_character_recognition') {
    if (
      props.currentTool === 'editor' &&
      (props.currentAnnotation?.type === 'ocr_rectangle' ||
        props.currentAnnotation?.type === 'rectangle')
    ) {
      drawToolTemp = props.drawTool?.rectangle;
    } else if (
      props.currentTool === 'editor' &&
      (props.currentAnnotation?.type === 'ocr_polygon' ||
        props.currentAnnotation?.type === 'polygon')
    ) {
      drawToolTemp = props.drawTool?.polygon;
    } else if (props.currentTool === 'polygon') {
      drawToolTemp = props.drawTool?.polygon;
    } else if (props.currentTool === 'rectangle') {
      drawToolTemp = props.drawTool?.rectangle;
    }
  } else if (props.currentTool === 'rectangle') {
    drawToolTemp = props.drawTool?.rectangle;
  } else if (props.currentTool === 'brush') drawToolTemp = props.drawTool?.brush;
  else if (props.currentTool === 'rubber') {
    drawToolTemp = props.drawTool?.rubber;
  } else if (props.currentTool === 'interactor') drawToolTemp = props.drawTool?.interactor;
  const drawTool = drawToolTemp;
  console.log('drawTool', drawTool);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [imageWidth, setimageWidth] = useState<number>(1);
  const [imageHeight, setimageHeight] = useState<number>(1);
  const [shapes, setShapes] = useState<any[]>([]);
  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [pointArr, setpointArr] = useState([]); //存放坐标的数组
  const [isClick, setisClick] = useState(false);
  const [flags, setflags] = useState(true);
  const [frist, setfrist] = useState(true);
  const [scaleFlag, setScaleFlag] = useState(0);
  const [pointIndex, setPointIndex] = useState(null);
  const [refoce, setRefoce] = useState(0);
  const [DrawingSurfaceImageData, setDrawingSurfaceImageData] = useState<ImageData>();
  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<LayerType>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);

  // Dynamically adjust canvas size, prevent content overflow
  const param: PPRenderFuncProps = {
    onDrag: props.onAnnotationModify,
    onDragUP: props.onAnnotationModifyUP,
    // onDragEnd: props.onAnnotationModifyComplete,
    scale: props.scale,
    currentTool: props.currentTool,
    onSelect: props.setCurrentAnnotation,
    onPointIndex: (index: number) => {
      setPointIndex(index);
    },
    stageRef: stageRef,
    layerRef: layerRef,
    currentAnnotation: props.currentAnnotation,
    annotations: props.annotations,
    transparency: transparency,
    threshold: props.threshold,
    canvasRef: canvasRef,
    canvasRef2: canvasRef2,
    canvasWidth: imageWidth,
    canvasHeight: imageHeight,
    interactorData: interactorData,
    label: props.currentLabel,
    radius: radius,
    pathName: history?.location?.pathname,
    ChanegeTool: props.ChanegeTool,
    pointIndex: pointIndex,
    ctx3: canvasRef3.current?.getContext('2d'),
    pointArr: pointArr,
  };
  function handleWindowResize() {
    const parent = document.getElementById('dr');
    if (parent) {
      setCanvasWidth(parent.clientWidth);
      setCanvasHeight(parent.clientHeight);
    }
  }
  const renderShape = () => {
    const newShapes: React.ReactElement[] = [];
    props.annotations.forEach((annotation, index) => {
      const flagss = props.hideLabel.includes(annotation.labelId);
      console.log('props.annotations', annotation, flags, props.hideLabel);

      if (annotation && !flagss) {
        param.annotation = annotation;
        let shape;
        if (annotation.type === 'polygon') {
          // const flag = index === length - 1 ? true : false;
          const flag = flags || props.currentAnnotation?.result !== annotation.result;
          shape = props.drawTool?.polygon.drawAnnotation(param, flag);
        } else if (annotation.type === 'rectangle') {
          // debugger;
          shape = props.drawTool?.rectangle.drawAnnotation(param);
          // debugger;
          // shape.scaleX(0.1);
          // shape.scaleY(0.1);
        } else if (annotation.type === 'ocr_rectangle') {
          shape = props.drawTool?.rectangle.drawAnnotation(param);
        } else if (annotation.type === 'ocr_polygon') {
          const datass = annotation.result?.split('||')[0];
          const address = annotation.result?.split('||')[1].split('|')[0];
          const results2 = datass && datass.split('|').join(',');
          param.annotation = {
            ...annotation,
            result: results2,
          };
          const flag = flags || props.currentAnnotation?.result !== annotation.result;
          shape = props.drawTool?.polygon.drawAnnotation(param, flag, address);
        }
        if (annotation.type === 'brush') {
          // const flag = index === length - 1 ? true : false;
          shape = props.drawTool?.brush?.drawAnnotation(
            param,
            // flag,
            // -imageWidth / 2,
            // -imageHeight / 2,
          );
          layerRef.current?.batchDraw();
        } else if (annotation.type === 'rubber') {
          // const flag = index === length - 1 ? true : false;
          shape = props.drawTool?.rubber?.drawAnnotation(
            param,
            // flag,
            // -imageWidth / 2,
            // -imageHeight / 2,
          );
          layerRef.current?.batchDraw();
        }
        if (shape && shape?.key !== null) {
          newShapes.push(shape);
        }
      }
    });
    setShapes(newShapes);
  };
  useEffect(() => {
    layerRef?.current?.batchDraw();
  }, [props.drawTool, layerRef]);
  useEffect(() => {
    // Listen to window resize event
    window.removeEventListener('resize', handleWindowResize);
    window.addEventListener('resize', handleWindowResize);
    // Set inital canvas size
    const parent = document.getElementById('dr');
    if (parent) {
      setCanvasWidth(parent.clientWidth);
      setCanvasHeight(parent.clientHeight);
    }
  }, []);
  useEffect(() => {
    if (
      canvasHeight &&
      canvasWidth &&
      image &&
      typeof image !== 'string' &&
      props.scaleChange &&
      props.taskIndex !== undefined
    ) {
      const imagewidth = image?.width || 0;
      const imageheight = image?.height || 0;

      const zoomlevel = canvasWidth / imagewidth;
      const zoomlevel2 = canvasHeight / imageheight;
      let scaleImages2 = 0;
      if (zoomlevel > 1 && zoomlevel2 > 1) {
        // 图片需要放大
        if (zoomlevel > zoomlevel2) {
          scaleImages2 = canvasHeight / imageheight;
          // 需要放大;
        } else {
          // scaleImages2 = zoomlevel2;
          scaleImages2 = canvasWidth / imagewidth;
        }
      } else {
        // 图片需要缩小
        if (zoomlevel > zoomlevel2) {
          scaleImages2 = canvasHeight / imageheight;
          // 需要放大;
        } else {
          scaleImages2 = canvasWidth / imagewidth;
        }
      }
      // const scales = scaleImages - 1;
      props.scaleChange(scaleImages2);
      setimageHeight(imageheight);
      setimageWidth(imagewidth);
    }
  }, [canvasHeight, canvasWidth, image]);
  useEffect(() => {
    if (canvasRef?.current?.width && canvasRef?.current?.height) {
      saveDrawingSurface();
    }
  }, [canvasRef?.current?.width, canvasRef?.current?.height]);
  useEffect(() => {
    if (!stageRef.current) return;
    stageRef.current.container().style.cursor = getPointer(props.currentTool);
    const ctx3 = canvasRef3.current?.getContext('2d');
    if (ctx3) ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height);
    setisClick(false);
  }, [props.currentTool]);
  useEffect(() => {
    setScaleFlag(props.scale);
  }, [props.scale]);
  useEffect(() => {
    if (props.annotations) {
      const ctx = canvasRef.current?.getContext('2d');
      const ctx2 = canvasRef2.current?.getContext('2d');
      const ctx3 = canvasRef2.current?.getContext('2d');

      if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (ctx2) ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
      if (ctx3) ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height);
      // const length = props?.annotations?.length;
      if (frist) {
        setTimeout(() => {
          renderShape();
          setfrist(false);
        }, 500);
      } else {
        renderShape();
      }
    }
  }, [
    props.annotations,
    props.currentAnnotation,
    flags,
    props.currentTool,
    props.hideLabel,
    scaleFlag,
  ]);
  useEffect(() => {
    // debugger;
    layerRef.current?.batchDraw();
  }, [shapes]);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    props.drawTool?.interactor?.drawAnnotation(param);
    layerRef.current?.batchDraw();
  }, [interactorData, props.threshold]);
  const renderReact = (endPos: any) => {
    const width = Math.abs(startPos.x - endPos.x);
    const height = Math.abs(startPos.y - endPos.y);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return <></>;
    ctx.beginPath();
    if (endPos.x >= startPos.x) {
      if (endPos.y >= startPos.y) {
        ctx.rect(startPos.x, startPos.y, width, height);
      } else {
        ctx.rect(startPos.x, startPos.y, width, -height);
      }
    } else {
      if (endPos.y >= startPos.y) {
        ctx.rect(startPos.x, startPos.y, -width, height);
      } else {
        ctx.rect(startPos.x, startPos.y, -width, -height);
      }
    }
    ctx.strokeStyle = 'red'; //将线条颜色设置为蓝色
    ctx.stroke();
    layerRef.current?.batchDraw();
    // ctx.save();
  };
  function restoreDrawingSurface(drawingSurfaceImageData: any) {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.putImageData(drawingSurfaceImageData, 0, 0);
  }
  function saveDrawingSurface() {
    const ctx = canvasRef.current?.getContext('2d');
    if (canvasRef?.current?.width && canvasRef?.current?.height) {
      const drawingSurfaceImageDatas = ctx?.getImageData(
        0,
        0,
        canvasRef?.current?.width,
        canvasRef?.current?.height,
      );
      setDrawingSurfaceImageData(drawingSurfaceImageDatas);
    }
  }
  const getEvtParam = (e: Konva.KonvaEventObject<MouseEvent>) => {
    return {
      e: e,
      mouseX: (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2,
      mouseY: (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2,
      offsetX: -imageWidth / 2,
      offsetY: -imageHeight / 2,
      canvasRef: canvasRef,
      stageRef: stageRef,
      img: image,
      pathName: history?.location?.pathname,
      currentAnnotation: props?.currentAnnotation,
      flags: flags,
    };
  };
  // 多边形画点
  const makearc = (ctx, x, y, r, s, e, color) => {
    console.log('makearc函数执行了', ctx, x, y, r, s, e, color);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //清空画布
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, s, e);
    ctx.fill();
  };
  /*canvas生成圆点*/
  const GetRandomNum = (Min, Max) => {
    const Range = Max - Min;
    const Rand = Math.random();
    return Min + Math.round(Rand * Range);
  };
  // Handle layer events
  const onMousepoint2 = () => {
    if (props.onMousepoint2) {
      props.onMousepoint2();
    }
  };
  const onMousepoint = () => {
    if (props.onMousepoint) {
      props.onMousepoint();
    }
  };
  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // debugger;
    console.log('onMouseDowns', e, props?.tool?.curr);

    if (e.evt.button === 1) {
      if (props?.tool?.curr === 'polygon') {
        props.changePreTools('polygon');
        props.tool.setCurr('mover');
        return;
      } else {
        onMousepoint();
        return;
      }
    }
    setisClick(true);
    const ctx = canvasRef.current?.getContext('2d');
    const mouseX = (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
    const mouseY =
      (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
    if (props?.tool?.curr === 'polygon' && ctx) {
      if (e.evt.button === 2) {
        let results = '';
        if (history?.location?.pathname === '/optical_character_recognition') {
          const datass: string = props.currentAnnotation?.result?.split('||')[0] as string;
          results = datass.split('|').join(',');
        } else {
          results = props.currentAnnotation?.result as string;
        }
        if (
          props.currentAnnotation?.result &&
          props.annotationDelete &&
          results.split(',').length < 5
        ) {
          const newAnnotaions = props.annotations?.filter((item) => {
            if (item.result !== props.currentAnnotation?.result) {
              return item;
            }
          });
          props.annotationDelete(newAnnotaions);
        } else {
          if (props.annotationDelete) {
            props.annotationDelete(props.annotations);
          }
        }

        props.setCurrentAnnotation(undefined);
        setpointArr([]);
        if (!flags) {
          // debugger;
          setflags(true);
        }
      } else {
        if (pointIndex !== null && props.currentAnnotation && flags) {
          // 开始编辑
          // 编辑
          const newAnno = props.currentAnnotation;
          const newAnnos = props.currentAnnotation?.result?.split(',');

          const starts = newAnnos?.slice(pointIndex + 1, newAnnos?.length);
          const ends = newAnnos?.slice(0, pointIndex - 1);

          const finly = [...starts, ...ends];
          // debugger;
          const pointArrs = [];
          for (let index = 0; index < finly.length; index += 2) {
            pointArrs.push({
              // x: finly[index] - 0 + imageWidth / 2,
              // y: finly[index + 1] - 0 + imageHeight / 2,
              x: finly[index],
              y: finly[index + 1],
            });
          }
          if (history?.location?.pathname === '/optical_character_recognition') {
            const datass: any = [];
            for (const item of props.annotations) {
              if (item.annotationId == props.currentAnnotation?.annotationId) {
                datass.push(item);
              }
            }
            const datas: string = datass[0].result?.split('||')[1] as string;
            newAnno.result = finly.join('|') + '||' + datas;
          } else {
            newAnno.result = finly.join(',');
          }

          if (flags) {
            setflags(false);
          }
          props.onAnnotationModify(newAnno);
          setpointArr(pointArrs);
        } else {
          ctx.strokeStyle = props.currentLabel?.color; //线条颜色
          ctx.lineWidth = 4; //线条粗细
          drawTool?.onMouseDown(getEvtParam(e));
          if (flags) {
            setflags(false);
          }
          setpointArr([...pointArr, { x: mouseX, y: mouseY }]);
        }
      }
    } else {
      if (props.currentTool === 'editor') {
        console.log('props.currentTool', props.currentTool === 'editor');

        let resulsts: any = [];
        if (history?.location?.pathname === '/optical_character_recognition') {
          if (props.currentAnnotation) {
            const datass: string = props.currentAnnotation?.result?.split('||')[0] as string;
            resulsts = datass.split('|');
          }
        } else {
          if (props.currentAnnotation) {
            resulsts = props.currentAnnotation?.result?.split(',');
          }
        }
        if (resulsts) {
          const x = resulsts[0] - 0 + imageWidth / 2;
          const y = resulsts[1] - 0 + imageHeight / 2;
          setpointArr([...resulsts]);
          setStartPos({
            x: x,
            y: y,
          });
        }
      } else if (props.currentTool === 'rectangle') {
        // debugger;
        setStartPos({
          x: mouseX,
          y: mouseY,
        });
      }

      drawTool?.onMouseDown(getEvtParam(e));
      if (e.evt.button === 2) {
        onMousepoint2();
      }
      if (
        (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
        !props.brushSize ||
        !ctx
      )
        return;
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = props.brushSize;
      ctx.strokeStyle = props.currentTool === 'brush' ? props.currentLabel?.color : 'rgba(0,0,0,0)';
      // ctx.globalCompositeOperation =
      //   props.currentTool === 'brush' ? 'source-over' : 'destination-out';
      ctx.moveTo(mouseX, mouseY);
      layerRef.current?.batchDraw();
    }
    // isMove.value = true;
    //  const { canvasRef } = param;
  };
  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const mouseX = (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
    const mouseY =
      (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
    const ctx = canvasRef.current?.getContext('2d');
    const ctx3 = canvasRef3.current?.getContext('2d');
    console.log('props.currentTool', props?.currentTool, isClick);
    if (props?.currentTool === 'rectangle' || props?.currentTool === 'editor') {
      if (history?.location?.pathname === '/optical_character_recognition') {
        if (
          props.currentAnnotation?.type === 'rectangle' ||
          props.currentAnnotation?.type === 'ocr_rectangle'
        ) {
          restoreDrawingSurface(DrawingSurfaceImageData);
          drawTool?.drawGuidewires(mouseX, mouseY, ctx);
          const endpos = {
            x: mouseX,
            y: mouseY,
          };

          if (isClick) {
            renderReact(endpos);
          }
          const newrefoce = refoce + 1;
          setRefoce(newrefoce);
        }
      } else if (history?.location?.pathname === '/detection') {
        restoreDrawingSurface(DrawingSurfaceImageData);
        drawTool?.drawGuidewires(mouseX, mouseY, ctx);
        const endpos = {
          x: mouseX,
          y: mouseY,
        };

        if (isClick) {
          renderReact(endpos);
        }
        const newrefoce = refoce + 1;
        setRefoce(newrefoce);
      }
    } else if (props?.currentTool === 'polygon' && ctx3 && !flags) {
      console.log('props.currentTool3', props?.currentTool, pointArr);

      ctx3.strokeStyle = props.currentLabel?.color; //线条颜色
      ctx3.lineWidth = 4; //线条粗细
      // ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height); //清空画布
      makearc(ctx3, mouseX, mouseY, GetRandomNum(4, 4), 0, 180, props.currentLabel?.color);
      if (pointArr.length > 0) {
        ctx3.beginPath();
        ctx3.moveTo(pointArr[0].x, pointArr[0].y);
        if (pointArr.length > 1) {
          for (let i = 1; i < pointArr.length; i++) {
            ctx3.lineTo(pointArr[i].x, pointArr[i].y);
          }
        }
        ctx3.lineTo(mouseX, mouseY);
        ctx3.fillStyle = props.currentLabel?.color; //填充颜色
        ctx3.fill(); //填充
        ctx3.stroke(); //绘制
        layerRef.current?.batchDraw();
      }
    } else if (props?.currentTool === 'brush' || props?.currentTool === 'rubber') {
      if (isClick && ctx) {
        if (
          !props.currentTool ||
          !props.currentAnnotation ||
          !props.currentAnnotation.result ||
          props.currentAnnotation.result.length < 2 ||
          !props.currentLabel?.color
        ) {
          return;
        }
        makearc(ctx3, mouseX, mouseY, props.brushSize / 2, 0, 180, 'white');
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = props.currentTool === 'brush' ? props.currentLabel?.color : '#ccc';
        ctx?.stroke();
        layerRef.current?.batchDraw();
      } else {
        makearc(ctx3, mouseX, mouseY, props.brushSize / 2, 0, 180, 'white');
        layerRef.current?.batchDraw();
      }
    }
    drawTool?.onMouseMove(getEvtParam(e));
  };
  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 1 && props.preTools) {
      props.tool.setCurr(props.preTools);
      return;
    }
    setisClick(false);
    if (pointIndex !== null && props.currentAnnotation && !flags) {
      const mouseX =
        (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
      const mouseY =
        (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
      // 编辑中
      let results = '';
      if (history?.location?.pathname === '/optical_character_recognition') {
        const datass: string = props.currentAnnotation?.result?.split('||')[0] as string;
        results = datass.split('|').join(',');
      } else {
        results = props.currentAnnotation?.result;
      }

      results = results + `,${mouseX},${mouseY}`;
      if (history?.location?.pathname === '/optical_character_recognition') {
        const datass: string = props.currentAnnotation?.result?.split('||')[1] as string;

        results = results.split(',').join('|') + '||' + datass;
      }
      const newanno = props.currentAnnotation;
      newanno.result = results;
      props.onAnnotationModifyUP(newanno);

      props.setCurrentAnnotation(undefined);
      setpointArr([]);
      if (!flags) {
        // debugger;
        setflags(true);
      }
      setPointIndex(null);
    }
    drawTool?.onMouseUp(getEvtParam(e));
    const ctx3 = canvasRef3.current?.getContext('2d');
    if (ctx3) {
      ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height); //清空画布
    }
  };
  const onContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    e.evt.preventDefault();
  };
  // useEffect(() => {
  //   const newrefoce = refoce + 1;
  //   setRefoce(newrefoce);
  // }, [dragEndPos]);
  // if (props.annotations) {
  //   const newShapes: React.ReactElement[] = [];
  //   const length = props?.annotations?.length;
  //   props.annotations.forEach((annotation, index) => {
  //     if (annotation) {
  //       console.log('annotation', annotation);
  //       param.annotation = annotation;
  //       let shape;
  //       if (annotation.type == 'brush') {
  //         const flag = index === length - 1 ? true : false;
  //         shape = props.drawTool.brush?.drawAnnotation(param, flag);
  //       } else if (annotation.type == 'rubber') {
  //         const flag = index === length - 1 ? true : false;
  //         shape = props.drawTool.rubber?.drawAnnotation(param, flag);
  //       }
  //       if (shape && shape?.key !== null) {
  //         newShapes.push(shape);
  //       }
  //       console.log('shape', shape);
  //     }
  //   });
  // }
  // Re-draw layer
  // 自动重绘制的次数
  console.log('annos all', props.annotations);

  const draggable = props.currentTool === 'mover';
  useImperativeHandle(ref, () => ({
    image,
    setDragEndPos,
  }));

  return (
    <div
      data-test-id="stage-container"
      data-label-length={props.annotations ? props.annotations.length : 0}
      data-image-src={props.imgSrc}
    >
      <canvas
        style={{ display: 'none' }}
        id="canvasId"
        ref={canvasRef}
        width={imageWidth}
        height={imageHeight}
      />
      <canvas
        style={{ display: 'none' }}
        id="canvasId"
        ref={canvasRef2}
        width={imageWidth}
        height={imageHeight}
      />
      <canvas
        style={{ display: 'none' }}
        id="canvasId"
        ref={canvasRef3}
        width={imageWidth}
        height={imageHeight}
      />
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: '-1' }}>
        <defs>
          <filter id="remove-alpha" x="0" y="0" width="100%" height="100%">
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        offsetX={-canvasWidth / 2}
        offsetY={-canvasHeight / 2}
        className="stage"
        ref={stageRef}
        // Can not apply scale on Stage cuz it always scale from left corner
        draggable={draggable}
        onDragMove={(evt) => {
          if (props.currentTool != 'mover') return;
        }}
        onDragEnd={(evt) => {
          if (props.currentTool != 'mover') {
            // onDragEnd(evt);
            return;
          }
          setDragEndPos({
            x: evt.target.x(),
            y: evt.target.y(),
          });
        }}
        x={dragEndPos.x}
        y={dragEndPos.y}
      >
        <Layer
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onContextMenu={onContextMenu}
          scaleX={props.scale}
          scaleY={props.scale}
          draggable={false}
        >
          <Image
            name="baseImage"
            draggable={false}
            image={image?.width === imageWidth ? image : undefined}
            x={-(imageWidth || 0) / 2}
            y={-(imageHeight || 0) / 2}
          />
        </Layer>
        <Layer
          ref={layerRef}
          name="annotation"
          scaleX={props.scale}
          scaleY={props.scale}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onContextMenu={onContextMenu}
          opacity={transparency}
          // onMouseOut={() => {
          //   console.log(`Circle onMouseOut`);
          //   // restoreDrawingSurface(DrawingSurfaceImageData);
          //   const ctx = canvasRef.current?.getContext('2d');
          //   ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
          //   setRefoce(refoce + 1);
          // }}
        >
          {
            <Image
              x={-(imageWidth || 0) / 2}
              y={-(imageHeight || 0) / 2}
              displayName={refoce}
              image={canvasRef.current || undefined}
            />
          }
          {
            <Image
              x={-(imageWidth || 0) / 2}
              y={-(imageHeight || 0) / 2}
              displayName={refoce}
              image={canvasRef2.current || undefined}
            />
          }
          {
            <Image
              x={-(imageWidth || 0) / 2}
              y={-(imageHeight || 0) / 2}
              displayName={refoce}
              image={canvasRef3.current || undefined}
            />
          }
          {shapes}
        </Layer>
      </Stage>
    </div>
  );
};
export default forwardRef(Component);
