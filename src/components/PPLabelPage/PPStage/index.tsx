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
  const [isClick, setisClick] = useState(false);
  const [refoce, setRefoce] = useState(0);
  const [DrawingSurfaceImageData, setDrawingSurfaceImageData] = useState<ImageData>();
  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<LayerType>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      currentAnnotation: props.currentAnnotation,
      transparency: transparency,
      threshold: props.threshold,
      canvasRef: canvasRef,
      interactorData: interactorData,
      label: props.currentLabel,
      radius: radius,
    };
  }, [
    props.onAnnotationModify,
    props.scale,
    props.currentTool,
    props.setCurrentAnnotation,
    stageRef,
    props.currentAnnotation,
    transparency,
    props.threshold,
    canvasRef,
    interactorData,
    props.currentLabel,
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
      const W = imagewidth > imageheight ? true : false;
      const scaleImages = W ? canvasWidth / imagewidth : canvasHeight / imageheight;
      // const scales = scaleImages - 1;
      props.scaleChange(scaleImages);
      setimageHeight(imageheight);
      setimageWidth(imagewidth);
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
  }, [props.currentTool]);
  useEffect(() => {
    const newShapes: React.ReactElement[] = [];
    if (props.annotations) {
      console.log('PPStage rendering annotations:', props.annotations);
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // const length = props?.annotations?.length;
      props.annotations.forEach((annotation, index) => {
        // if (!annotation) continue;
        if (annotation) {
          param.annotation = annotation;
          let shape;
          if (annotation.type == 'polygon') {
            shape = props.drawTool.polygon.drawAnnotation(param);
          } else if (annotation.type == 'rectangle') {
            shape = props.drawTool.polygon.drawAnnotation(param);
          }
          // else if (annotation.type == 'brush') {
          //   const flag = index === length - 1 ? true : false;
          //   shape = props.drawTool.brush?.drawAnnotation(param, flag);
          // } else if (annotation.type == 'rubber') {
          //   const flag = index === length - 1 ? true : false;
          //   shape = props.drawTool.rubber?.drawAnnotation(param, flag);
          // }
          console.log('shape', shape);

          if (shape && shape?.key !== null) {
            newShapes.push(shape);
          }
        }
      });
      setShapes(newShapes);
      console.log('shapes', newShapes);
    }
  }, [props.annotations, props.currentAnnotation, param]);
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

  // Handle layer events
  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setisClick(true);
    console.log('props?.tool?.curr', props?.tool?.curr);
    const mouseX = (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
    const mouseY =
      (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
    if (props?.tool?.curr == 'polygon') {
      if (e.evt.button === 2) {
        const array = props.currentAnnotation?.result?.split(',');
        if (array && array.length >= 4) {
          array.splice(array.length - 2, 2);
          const results = array.join(',');
          const anno = {
            ...props.currentAnnotation,
            result: results,
          };
          props.onAnnotationModify(anno);
          props.setCurrentAnnotation(undefined);
        }
      } else {
        drawTool?.onMouseDown(getEvtParam(e));
        // console.log(`currentAnnotation:`, props.currentAnnotation);
        console.log(`mouseX:`, mouseX, mouseY);
      }
    } else {
      setStartPos({
        x: mouseX,
        y: mouseY,
      });
      drawTool?.onMouseDown(getEvtParam(e));
    }
  };
  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    drawTool?.onMouseMove(getEvtParam(e));
    console.log('props?.tool?.curr', props?.currentTool);
    if (props?.currentTool == 'rectangle') {
      const mouseX =
        (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2;
      const mouseY =
        (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2;
      const ctx = canvasRef.current?.getContext('2d');
      restoreDrawingSurface(DrawingSurfaceImageData);
      drawTool?.drawGuidewires(mouseX, mouseY, ctx);
      // drawGuidewires(mouseX, mouseY, ctx);
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
  };
  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    drawTool?.onMouseUp(getEvtParam(e));
    setisClick(false);
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
  if (props.annotations) {
    const newShapes: React.ReactElement[] = [];
    const length = props?.annotations?.length;
    props.annotations.forEach((annotation, index) => {
      if (annotation) {
        param.annotation = annotation;
        let shape;
        if (annotation.type == 'brush') {
          const flag = index === length - 1 ? true : false;
          shape = props.drawTool.brush?.drawAnnotation(param, flag);
        } else if (annotation.type == 'rubber') {
          const flag = index === length - 1 ? true : false;
          shape = props.drawTool.rubber?.drawAnnotation(param, flag);
        }
        if (shape && shape?.key !== null) {
          newShapes.push(shape);
        }
        console.log('shape', shape);
      }
    });
  }
  props.drawTool?.interactor?.drawAnnotation(param);
  // Re-draw layer
  layerRef.current?.batchDraw();

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
          {shapes}
        </Layer>
      </Stage>
    </div>
  );
};
export default forwardRef(Component);
