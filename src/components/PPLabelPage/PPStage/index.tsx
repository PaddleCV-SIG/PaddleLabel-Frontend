/* eslint-disable @typescript-eslint/no-unused-vars */
import { Annotation } from '@/models/Annotation';
import { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

export type PPStageProps = {
  imgSrc?: string;
  scale: number;
  annotations?: Annotation<any>[];
  currentTool: ToolType;
  currentAnnotation?: Annotation<any>;
  setCurrentAnnotation: (anntation: Annotation<any>) => void;
  onMouseDown?: (
    evt: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => void;
  onMouseMove?: (
    evt: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => void;
  onMouseUp?: (
    evt: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => void;
  createPolygonFunc?: (
    annotations: Annotation<any>,
    onDrag: (annotation: Annotation<any>) => void,
    onDragEnd: () => void,
    scale: number,
    currentTool: ToolType,
    onSelect: (anntation: Annotation<any>) => void,
    shapeRef: React.MutableRefObject<any>,
    currentAnnotation?: Annotation<any>,
  ) => ReactElement[];
  createBrushFunc?: (
    annotations: Annotation<any>,
    onDrag: (annotation: Annotation<any>) => void,
    onDragEnd: () => void,
    scale: number,
    currentTool: ToolType,
    onSelect: (anntation: Annotation<any>) => void,
    shapeRef: React.MutableRefObject<any>,
    currentAnnotation?: Annotation<any>,
  ) => ReactElement[];
  createRectangleFunc?: (
    annotation: Annotation<any>,
    onDrag: (anntation: Annotation<any>) => void,
    onDragEnd: () => void,
    scale: number,
    currentTool: ToolType,
    onSelect: (anntation: Annotation<any>) => void,
    shapeRef: React.MutableRefObject<any>,
    currentAnnotation?: Annotation<any>,
    offset?: { x: number; y: number },
  ) => ReactElement[];
  onAnnotationModify: (annotation: Annotation<any>) => void;
  onAnnotationModifyComplete: () => void;
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(props.imgSrc || imgSrc);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });

  const stageRef = useRef(null);

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

  // Handle layer events
  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // e.cancelBubble = true;
    // console.log(
    //   `PPStage onMouseDown, offsetXY:`,
    //   -canvasWidth / 2 - dragEndPos.x,
    //   -canvasHeight / 2 - dragEndPos.y,
    //   props.scale,
    // );
    if (props.onMouseDown)
      props.onMouseDown(
        e,
        -canvasWidth / 2 - dragEndPos.x,
        -canvasHeight / 2 - dragEndPos.y,
        props.scale,
      );
  };
  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // e.cancelBubble = true;
    if (props.onMouseMove)
      props.onMouseMove(
        e,
        -canvasWidth / 2 - dragEndPos.x,
        -canvasHeight / 2 - dragEndPos.y,
        props.scale,
      );
  };
  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // e.cancelBubble = true;
    if (props.onMouseUp)
      props.onMouseUp(
        e,
        -canvasWidth / 2 - dragEndPos.x,
        -canvasHeight / 2 - dragEndPos.y,
        props.scale,
      );
  };
  const onContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log('imgLayer onContextMenu');
    e.cancelBubble = true;
    // Prevent right-click menu
    e.evt.preventDefault();
  };

  const shapes = [];
  if (props.annotations) {
    // console.log('PPStage rendering annotations:', props.annotations);
    for (const annotation of props.annotations) {
      if (!annotation) continue;
      let func;
      switch (annotation.type as ToolType) {
        case 'polygon':
          func = props.createPolygonFunc;
          break;
        case 'brush':
          func = props.createBrushFunc;
          break;
        case 'rubber':
          func = props.createBrushFunc;
          break;
        case 'rectangle':
          func = props.createRectangleFunc;
          break;
        default:
          func = null;
      }
      if (!func) continue;
      const layer = (
        <Layer
          name="annotation"
          scaleX={props.scale}
          scaleY={props.scale}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onContextMenu={onContextMenu}
        >
          {func(
            annotation,
            props.onAnnotationModify,
            props.onAnnotationModifyComplete,
            props.scale,
            props.currentTool,
            props.setCurrentAnnotation,
            stageRef,
            props.currentAnnotation,
          )}
        </Layer>
      );
      shapes.push(layer);
    }
  }

  const draggable = props.currentTool == 'mover';

  return (
    <Stage
      width={canvasWidth}
      height={canvasHeight}
      offsetX={-canvasWidth / 2}
      offsetY={-canvasHeight / 2}
      className={styles.stage}
      ref={stageRef}
      // Can not apply scale on Stage cuz it always scale from left corner
      draggable={draggable}
      onDragMove={(evt) => {
        if (props.currentTool != 'mover') return;
      }}
      onDragEnd={(evt) => {
        if (props.currentTool != 'mover') return;
        console.log(`dragEndPosX,Y: (${evt.target.x()},${evt.target.y()})`);
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
      {shapes}
    </Stage>
  );
};
export default Component;
