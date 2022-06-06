/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import type { Stage as StageType } from 'konva/lib/Stage';
import type { Layer as LayerType } from 'konva/lib/Layer';
import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import type { PPDrawToolRet, PPRenderFuncProps } from '@/components/PPDrawTool/drawUtils';
import { Threshold } from 'konva/lib/filters/Threshold';

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

export type PPStageProps = {
  imgSrc?: string;
  scale: number;
  annotations?: Annotation[];
  currentTool: ToolType;
  currentAnnotation?: Annotation;
  setCurrentAnnotation: (anntation: Annotation) => void;
  onAnnotationAdd: (anntation: Annotation) => void;
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationModifyComplete: () => void;
  transparency: number;
  threshold: number;
  drawTool: { polygon: PPDrawToolRet; brush?: PPDrawToolRet; interactor?: PPDrawToolRet };
  frontendIdOps: { frontendId: number; setFrontendId: (id: number) => void };
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(props.imgSrc || '', 'anonymous');
  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;
  const transparency = props.transparency == undefined ? 0 : props.transparency * 0.01;
  let drawToolTemp = undefined;
  if (
    props.currentTool == 'polygon' ||
    props.currentTool == 'rectangle' ||
    props.currentTool == 'editor'
  )
    drawToolTemp = props.drawTool.polygon;
  else if (props.currentTool == 'brush' || props.currentTool == 'rubber')
    drawToolTemp = props.drawTool.brush;
  else if (props.currentTool == 'interactor') drawToolTemp = props.drawTool.interactor;
  const drawTool = drawToolTemp;

  // const drawTool =
  //   props.currentTool == 'polygon' ? props.drawTool.polygon : props.drawTool.brush;
  // console.log(`imageWidth,imageHeight: `, imageWith, imageHeight);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });

  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<LayerType>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamically adjust canvas size, prevent content overflow
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
    if (!stageRef.current) return;
    stageRef.current.container().style.cursor = getPointer(props.currentTool);
  }, [props.currentTool]);

  const getEvtParam = (e: Konva.KonvaEventObject<MouseEvent>) => {
    return {
      e: e,
      mouseX: (e.evt.offsetX - dragEndPos.x - canvasWidth / 2) / props.scale + imageWidth / 2,
      mouseY: (e.evt.offsetY - dragEndPos.y - canvasHeight / 2) / props.scale + imageHeight / 2,
      offsetX: -imageWidth / 2,
      offsetY: -imageHeight / 2,
      canvasRef: canvasRef,
      stageRef: stageRef,
    };
  };

  // Handle layer events
  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // e.cancelBubble = true;
    drawTool?.onMouseDown(getEvtParam(e));
  };
  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    drawTool?.onMouseMove(getEvtParam(e));
  };
  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    drawTool?.onMouseUp(getEvtParam(e));
  };
  const onContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log('imgLayer onContextMenu');
    e.cancelBubble = true;
    // Prevent right-click menu
    e.evt.preventDefault();
  };

  const shapes = [];
  if (props.annotations) {
    console.log('PPStage rendering annotations:', props.annotations);
    const param: PPRenderFuncProps = {
      onDrag: props.onAnnotationModify,
      // onDragEnd: props.onAnnotationModifyComplete,
      scale: props.scale,
      currentTool: props.currentTool,
      onSelect: props.setCurrentAnnotation,
      stageRef: stageRef,
      currentAnnotation: props.currentAnnotation,
      transparency: transparency,
      threshold: props.threshold,
      canvasRef: canvasRef,
    };
    // Draw normal elements
    // Clear canvas
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (const annotation of props.annotations) {
      if (!annotation) continue;
      param.annotation = annotation;
      let shape;
      if (annotation.type == 'polygon' || annotation.type == 'rectangle') {
        shape = props.drawTool.polygon.drawAnnotation(param);
      } else if (annotation.type == 'brush' || annotation.type == 'rubber') {
        shape = props.drawTool.brush?.drawAnnotation(param);
      } else if (annotation.type == 'interactor') {
        shape = props.drawTool.interactor?.drawAnnotation(param);
      } else {
        continue;
      }
      shapes.push(shape);
    }
    // Re-draw layer
    layerRef.current?.batchDraw();
  }

  const draggable = props.currentTool == 'mover';

  return (
    <>
      <canvas
        style={{ display: 'none' }}
        id="virtualCanvas"
        width={image?.width}
        height={image?.height}
      />
      <canvas
        style={{ display: 'none' }}
        id="singleLineCanvas"
        width={image?.width}
        height={image?.height}
      />
      <canvas
        style={{ display: 'none' }}
        id="canvasId"
        ref={canvasRef}
        width={image?.width}
        height={image?.height}
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
            image={image}
            x={-(image?.width || 0) / 2}
            y={-(image?.height || 0) / 2}
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
        >
          <Image
            x={-(image?.width || 0) / 2}
            y={-(image?.height || 0) / 2}
            image={canvasRef.current || undefined}
          />
          {shapes}
        </Layer>
      </Stage>
    </>
  );
};
export default Component;
