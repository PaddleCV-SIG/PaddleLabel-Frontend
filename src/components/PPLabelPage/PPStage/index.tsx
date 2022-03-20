/* eslint-disable @typescript-eslint/no-unused-vars */
import { Annotation } from '@/models/annotation';
import { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import React, { Props, ReactElement, useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image, Transformer, Group } from 'react-konva';
import useImage from 'use-image';
import { PPLineType } from '../PPBrush/drawBrush';
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
  onMouseMove?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  onMouseUp?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  createPolygonFunc?: (
    annotations: Annotation<any>,
    onDrag: (annotation: Annotation<any>) => void,
    onDragEnd: () => void,
    scale: number,
    currentTool: ToolType,
    onSelect: (anntation: Annotation<any>) => void,
    currentAnnotation?: Annotation<any>,
  ) => ReactElement[];
  createBrushFunc?: (
    annotations: Annotation<any>,
    onDrag: (annotation: Annotation<any>) => void,
    onDragEnd: () => void,
    scale: number,
    currentTool: ToolType,
    onSelect: (anntation: Annotation<any>) => void,
    currentAnnotation?: Annotation<any>,
  ) => ReactElement[];
  createRectangleFunc?: (
    annotation: Annotation<any>,
    onDrag: (anntation: Annotation<any>) => void,
    onDragEnd: () => void,
    scale: number,
    currentTool: ToolType,
    onSelect: (anntation: Annotation<any>) => void,
    currentAnnotation?: Annotation<any>,
  ) => ReactElement[];
  onAnnotationModify: (annotation: Annotation<any>) => void;
  onAnnotationModifyComplete: () => void;
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(props.imgSrc || '');

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  console.log('scale: ', props.scale);

  // Dynamically adjust canvas size, prevent content overflow
  function handleWindowResize() {
    const parent = document.getElementById('dr');
    if (parent) {
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

  const shapes = [];
  if (props.annotations) {
    for (const annotation of props.annotations) {
      if (!annotation) continue;
      // console.log(annotation);
      let func;
      switch (annotation.tool as ToolType) {
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
      if (func)
        shapes.push(
          func(
            annotation,
            props.onAnnotationModify,
            props.onAnnotationModifyComplete,
            props.scale,
            props.currentTool,
            props.setCurrentAnnotation,
            props.currentAnnotation,
          ),
        );
    }
  }

  return (
    <Stage
      width={canvasWidth}
      height={canvasHeight}
      offsetX={-canvasWidth / 2}
      offsetY={-canvasHeight / 2}
      className={styles.stage}
    >
      {/* <Layer scaleX={props.scale} scaleY={props.scale} draggable={false}>
        <Image image={image} draggable={false} />
      </Layer> */}
      <Layer
        onMouseDown={(e) => {
          if (props.onMouseDown)
            props.onMouseDown(e, -canvasWidth / 2, -canvasHeight / 2, props.scale);
        }}
        onMouseMove={(e) => {
          if (props.onMouseMove) props.onMouseMove(e, props.scale);
        }}
        onMouseUp={(e) => {
          if (props.onMouseUp) props.onMouseUp(e, props.scale);
        }}
        onContextMenu={(e) => {
          // Prevent right-click menu
          e.evt.preventDefault();
        }}
        draggable={false}
        scaleX={props.scale}
        scaleY={props.scale}
      >
        <Group draggable={props.currentTool == 'mover'} onDragEnd={(evt) => {}}>
          <Image
            draggable={false}
            image={image}
            x={-(image?.width || 0) / 2}
            y={-(image?.height || 0) / 2}
          />
          {shapes}
        </Group>
      </Layer>
    </Stage>
  );
};
export default Component;
