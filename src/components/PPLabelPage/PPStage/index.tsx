/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import { useDeepCompareEffect } from 'ahooks';
import type { Stage as StageType } from 'konva/lib/Stage';
import type { Layer as LayerType } from 'konva/lib/Layer';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import type { PPDrawToolRet, PPRenderFuncProps } from '@/components/PPDrawTool/drawUtils';
import { Threshold } from 'konva/lib/filters/Threshold';
import { useModel } from 'umi';
import { Label } from '@/models';

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
  setDragEndPos?: () => void;
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
  frontendIdOps: { frontendId: number; setFrontendId: (id: number) => void };
  refresh?: number;
  image?: HTMLImageElement;
  tool: {
    curr: ToolType;
    setCurr: (tool: ToolType) => void;
  };
  scaleChange?: (delta: number) => void;
  taskIndex?: number;
  OnSelect?: (anntation: Annotation) => void;
  onAnnotationModifyUP?: (annotation: Annotation) => void;
  brushSize?: number;
};

const Component: ForwardRefRenderFunction<pageRef, PPStageProps> = (props, ref) => {
  const [image] = useImage(props.imgSrc || '', 'anonymous');
  // const image = props.image;
  const transparency = props.transparency == undefined ? 0 : props.transparency * 0.01;
  const interactorData = useModel('InteractorData', (x) => x.interactorData);
  const radius = useModel('VisualRadius', (x) => x.radius);
  let drawToolTemp = undefined;
  if (
    props.currentTool == 'polygon' ||
    props.currentTool == 'rectangle' ||
    props.currentTool == 'editor'
  )
    drawToolTemp = props.drawTool.polygon;
  else if (props.currentTool == 'brush') drawToolTemp = props.drawTool.brush;
  else if (props.currentTool == 'rubber') {
    drawToolTemp = props.drawTool.rubber;
  } else if (props.currentTool == 'interactor') drawToolTemp = props.drawTool.interactor;
  const drawTool = drawToolTemp;
  console.log('drawToolTemp', drawToolTemp);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [imageWidth, setimageWidth] = useState<number>(500);
  const [imageHeight, setimageHeight] = useState<number>(500);
  const [shapes, setShapes] = useState<any[]>([]);
  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [pointArr, setpointArr] = useState([]); //存放坐标的数组
  const [isClick, setisClick] = useState(false);
  const [flags, setflags] = useState(true);
  const [refoce, setRefoce] = useState(0);
  const [DrawingSurfaceImageData, setDrawingSurfaceImageData] = useState<ImageData>();
  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<LayerType>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);

  // Dynamically adjust canvas size, prevent content overflow
  const param: PPRenderFuncProps = useMemo(() => {
    return {
      onDrag: props.onAnnotationModify,
      onDragUP: props.onAnnotationModifyUP,
      // onDragEnd: props.onAnnotationModifyComplete,
      scale: props.scale,
      currentTool: props.currentTool,
      onSelect: props.setCurrentAnnotation,
      OnSelects: props.OnSelect,
      stageRef: stageRef,
      layerRef: layerRef,
      currentAnnotation: props.currentAnnotation,
      transparency: transparency,
      threshold: props.threshold,
      canvasRef: canvasRef,
      canvasRef2: canvasRef2,
      interactorData: interactorData,
      label: props.currentLabel,
      radius: radius,
    };
  }, [
    props.onAnnotationModify,
    props.onAnnotationModifyUP,
    props.scale,
    props.currentTool,
    props.setCurrentAnnotation,
    props.OnSelect,
    props.currentAnnotation,
    props.threshold,
    props.currentLabel,
    transparency,
    interactorData,
    radius,
  ]);
  function handleWindowResize() {
    const parent = document.getElementById('dr');
    if (parent) {
      // console.log(`parentSize: `, parent.clientWidth, parent.clientHeight);
      setCanvasWidth(parent.clientWidth);
      setCanvasHeight(parent.clientHeight);
    }
  }

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
    console.log(
      'flags',
      canvasHeight,
      canvasWidth,
      image,
      typeof image !== 'string',
      props.scaleChange,
      props.taskIndex !== undefined,
    );

    if (
      canvasHeight &&
      canvasWidth &&
      image &&
      typeof image !== 'string' &&
      props.scaleChange &&
      props.taskIndex !== undefined
    ) {
      // debugger;
      const imagewidth = image?.width || 0;
      const imageheight = image?.height || 0;

      // debugger;
      const zoomlevel = canvasWidth / imagewidth;
      const zoomlevel2 = canvasHeight / imageheight;
      let scaleImages2 = 0;
      // debugger;
      if (zoomlevel > 1 && zoomlevel2 > 1) {
        // 图片需要放大
        if (zoomlevel > zoomlevel2) {
          // scaleImages2 = zoomlevel;
          // scaleImages2 = canvasWidth / imagewidth;
          scaleImages2 = canvasHeight / imageheight;
          // 需要放大;
        } else {
          // scaleImages2 = zoomlevel2;
          scaleImages2 = canvasWidth / imagewidth;
        }
      } else {
        // 图片需要缩小
        if (zoomlevel > zoomlevel2) {
          // scaleImages2 = zoomlevel2;
          // scaleImages2 = canvasWidth / imagewidth;
          scaleImages2 = canvasHeight / imageheight;
          // 需要放大;
        } else {
          // scaleImages2 = zoomlevel;
          // scaleImages2 = canvasHeight / imageheight;
          scaleImages2 = canvasWidth / imagewidth;
        }
        // if (imageheight > canvasHeight) {
        //   // scaleImages2 = canvasWidth / imagewidth;
        //   scaleImages2 = canvasHeight / imageheight;
        // } else {
        //   scaleImages2 = canvasWidth / imagewidth;
        // }
      }
      // const scales = scaleImages - 1;
      props.scaleChange(scaleImages2);
      setimageHeight(imageheight);
      setimageWidth(imagewidth);
      // if (zoomlevel2 > zoomlevel) {
      //   props.scaleChange(zoomlevel);
      // } else {
      //   props.scaleChange(zoomlevel2);
      // }
      // setimageHeight(imageheight);
      // setimageWidth(imagewidth);
      // if (imagewidth === imageheight) {
      //   let scaleImages = 0;
      //   if (canvasWidth - canvasWidth > 0) {
      //     scaleImages = canvasHeight / imageheight;
      //   } else {
      //     scaleImages = canvasWidth / imagewidth;
      //   }
      //   props.scaleChange(scaleImages);
      //   setimageHeight(imageheight);
      //   setimageWidth(imagewidth);
      // } else {
      //   // const flags = imagewidth - imageheight > 0 ? true : false;
      //   let scaleImages2 = 0;
      //   if (zoomlevel > zoomlevel2) {
      //     scaleImages2 = canvasHeight / imageheight;
      //   } else {
      //     scaleImages2 = canvasWidth / imagewidth;
      //   }
      //   // const scales = scaleImages - 1;
      //   props.scaleChange(scaleImages2);
      //   setimageHeight(imageheight);
      //   setimageWidth(imagewidth);
      // }
    }
  }, [canvasHeight, canvasWidth, image]);
  useEffect(() => {
    if (canvasRef?.current?.width && canvasRef?.current?.height) {
      console.log('saveDrawingSurface函数执行了');

      saveDrawingSurface();
    }
  }, [canvasRef?.current?.width, canvasRef?.current?.height]);
  useEffect(() => {
    if (!stageRef.current) return;
    stageRef.current.container().style.cursor = getPointer(props.currentTool);
    // debugger;
    // if (props.currentTool === 'mover') {
    //   setisClick(false);
    // }
    setisClick(false);
  }, [props.currentTool]);
  useEffect(() => {
    const newShapes: React.ReactElement[] = [];
    if (props.annotations) {
      console.log('PPStage rendering annotations:', props.annotations);
      const ctx = canvasRef.current?.getContext('2d');
      const ctx2 = canvasRef2.current?.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (ctx2) ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
      const length = props?.annotations?.length;
      props.annotations.forEach((annotation, index) => {
        // if (!annotation) continue;
        if (annotation) {
          param.annotation = annotation;
          let shape;
          if (annotation.type == 'polygon') {
            // const flag = index === length - 1 ? true : false;
            shape = props.drawTool.polygon.drawAnnotation(param, flags);
          } else if (annotation.type == 'rectangle') {
            shape = props.drawTool.polygon.drawAnnotation(param);
          }
          if (annotation.type == 'brush') {
            const flag = index === length - 1 ? true : false;
            shape = props.drawTool.brush?.drawAnnotation(
              param,
              flag,
              -imageWidth / 2,
              -imageHeight / 2,
            );
          } else if (annotation.type == 'rubber') {
            const flag = index === length - 1 ? true : false;
            shape = props.drawTool.rubber?.drawAnnotation(
              param,
              flag,
              -imageWidth / 2,
              -imageHeight / 2,
            );
          }
          if (shape && shape?.key !== null) {
            newShapes.push(shape);
          }
          console.log('shape', shape);
        }
      });
      console.log('newShapes', newShapes);
      setShapes(newShapes);
    }
  }, [props.annotations, props.currentAnnotation, flags, props.currentTool]);
  useEffect(() => {
    console.log('shapes', shapes);
    // debugger;
    layerRef.current?.batchDraw();
  }, [shapes]);
  const renderReact = (endPos: any) => {
    const width = Math.abs(startPos.x - endPos.x);
    const height = Math.abs(startPos.y - endPos.y);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return <></>;
    console.log('canvasRef', canvasRef, ctx);
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
    console.log('startPos', startPos, endPos);
    ctx.strokeStyle = 'red'; //将线条颜色设置为蓝色
    ctx.stroke();
    // ctx.save();
  };
  function restoreDrawingSurface(drawingSurfaceImageData: any) {
    const ctx = canvasRef.current?.getContext('2d');
    console.log('drawingSurfaceImageData', drawingSurfaceImageData);

    ctx?.putImageData(drawingSurfaceImageData, 0, 0);
  }
  function saveDrawingSurface() {
    const ctx = canvasRef.current?.getContext('2d');
    if (canvasRef?.current?.width && canvasRef?.current?.height) {
      console.log('ctx', ctx);
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
    };
  };
  // 多边形画点
  const makearc = (ctx, x, y, r, s, e, color) => {
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
  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setisClick(true);
    console.log('props?.tool?.curr', props?.tool?.curr);
    const ctx = canvasRef.current?.getContext('2d');
    const mouseX = (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
    const mouseY =
      (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
    if (props?.tool?.curr == 'polygon' && ctx) {
      if (e.evt.button === 2) {
        props.setCurrentAnnotation(undefined);
        setpointArr([]);
        setflags(true);
      } else {
        setflags(false);
        ctx.strokeStyle = props.currentLabel?.color; //线条颜色
        ctx.lineWidth = 4; //线条粗细
        // let oIndex = -1;
        makearc(ctx, mouseX, mouseY, GetRandomNum(2, 2), 0, 180, props.currentLabel?.color);
        setpointArr([...pointArr, { x: mouseX, y: mouseY }]);
        drawTool?.onMouseDown(getEvtParam(e));
      }
    } else {
      setStartPos({
        x: mouseX,
        y: mouseY,
      });
      drawTool?.onMouseDown(getEvtParam(e));
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
      ctx.strokeStyle = props.currentTool === 'brush' ? props.currentLabel?.color : '';
      ctx.globalCompositeOperation =
        props.currentTool === 'brush' ? 'source-over' : 'destination-out';
      ctx.moveTo(mouseX, mouseY);
      layerRef.current?.batchDraw();
    }
    // isMove.value = true;
    //  const { canvasRef } = param;
  };
  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    drawTool?.onMouseMove(getEvtParam(e));
    const mouseX = (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
    const mouseY =
      (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
    const ctx = canvasRef.current?.getContext('2d');
    const ctx3 = canvasRef3.current?.getContext('2d');

    if (props?.currentTool == 'rectangle') {
      restoreDrawingSurface(DrawingSurfaceImageData);
      drawTool?.drawGuidewires(mouseX, mouseY, ctx);
      const endpos = {
        x: mouseX,
        y: mouseY,
      };
      console.log('isClick', isClick);

      if (isClick) {
        renderReact(endpos);
      }
      const newrefoce = refoce + 1;
      setRefoce(newrefoce);
    } else if (props?.currentTool == 'polygon' && ctx) {
      ctx.strokeStyle = props.currentLabel?.color; //线条颜色
      ctx.lineWidth = 4; //线条粗细
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //清空画布
      // const piX = 0;
      // const piY = 0;
      makearc(ctx, mouseX, mouseY, GetRandomNum(4, 4), 0, 180, props.currentLabel?.color);
      console.log('pointArr', pointArr);

      if (pointArr.length > 0) {
        ctx.beginPath();
        ctx.moveTo(pointArr[0].x, pointArr[0].y);
        if (pointArr.length > 1) {
          for (let i = 1; i < pointArr.length; i++) {
            ctx.lineTo(pointArr[i].x, pointArr[i].y);
          }
        }

        ctx.lineTo(mouseX, mouseY);
        ctx.fillStyle = props.currentLabel?.color; //填充颜色
        ctx.fill(); //填充
        ctx.stroke(); //绘制
        layerRef.current?.batchDraw();
      }
    } else if (props?.currentTool == 'rubber' || props?.currentTool == 'brush') {
      if (
        !props.currentTool ||
        !props.currentAnnotation ||
        !props.currentAnnotation.result ||
        props.currentAnnotation.result.length < 2 ||
        !props.currentLabel?.color
      ) {
        return;
      }
      if (isClick) {
        // drawTool?.drawGuidewires(mouseX, mouseY, ctx, props.brushSize);
        ctx?.lineTo(mouseX, mouseY);
        ctx?.stroke();
        makearc(ctx3, mouseX, mouseY, props.brushSize / 2, 0, 180, 'white');
        layerRef.current?.batchDraw();
      }
    }
    // if (props?.currentTool == 'polygon') {
    //   // restoreDrawingSurface(DrawingSurfaceImageData);
    //   onMouseMovePolygon(mouseX, mouseY, ctx);
    // }
  };
  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setisClick(false);
    drawTool?.onMouseUp(getEvtParam(e));
    const ctx3 = canvasRef3.current?.getContext('2d');
    // const ctx2 = canvasRef3.current?.getContext('2d');
    // if (ctx2) {
    //   ctx2.closePath();
    // }
    if (ctx3) {
      ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height); //清空画布
    }
  };
  const onContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    e.evt.preventDefault();
  };
  console.log('props.scale', props.scale);
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
  props.drawTool?.interactor?.drawAnnotation(param);
  // Re-draw layer
  // 自动重绘制的次数

  const draggable = props.currentTool == 'mover';
  useImperativeHandle(ref, () => ({
    image,
    setDragEndPos,
  }));
  console.log('image?.width', image?.width, imageWidth);

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
          // console.log(`dragEndPosX,Y: (${evt.target.x()},${evt.target.y()})`);
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
