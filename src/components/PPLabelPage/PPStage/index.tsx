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

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const shapeRef = useRef(null);

  // Dynamically adjust canvas size, prevent content overflow
  function handleWindowResize() {
    const parent = document.getElementById('dr');
    if (parent) {
      console.log(`parentSize: `, parent.clientWidth, parent.clientHeight);
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
      console.log('PPStage rendering annotation:', annotation, 'annotation.tool:', annotation.tool);
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
      if (func)
        shapes.push(
          func(
            annotation,
            props.onAnnotationModify,
            props.onAnnotationModifyComplete,
            props.scale,
            props.currentTool,
            props.setCurrentAnnotation,
            shapeRef,
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
      ref={shapeRef}
    >
      {/* <Layer scaleX={props.scale} scaleY={props.scale} draggable={false}>
        <Image image={image} draggable={false} />
      </Layer> */}
      <Layer
        onMouseDown={(e) => {
          if (props.onMouseDown)
            props.onMouseDown(
              e,
              -canvasWidth / 2 - dragOffset.x,
              -canvasHeight / 2 - dragOffset.y,
              props.scale,
            );
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
      >
        <Group
          draggable={props.currentTool == 'mover'}
          scaleX={props.scale}
          scaleY={props.scale}
          onDragEnd={(evt) => {
            if (props.currentTool != 'mover') return;
            setDragOffset({
              x: evt.target.x(),
              y: evt.target.y(),
            });
          }}
        >
          <Image
            name="baseImage"
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
