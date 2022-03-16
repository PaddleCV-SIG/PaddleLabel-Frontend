/* eslint-disable @typescript-eslint/no-unused-vars */
import { Annotation } from '@/models/annotation';
import { ToolType } from '@/pages/SemanticSegmentation';
import type Konva from 'konva';
import React, { Props, ReactElement, useRef, useState } from 'react';
import { Layer, Stage, Image, Transformer, Group } from 'react-konva';
import useImage from 'use-image';
import { PPLineType } from '../PPBrush/drawBrush';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

export type PPStageProps = {
  imgSrc?: string;
  width?: number;
  height?: number;
  scale: number;
  annotations?: Annotation<any>[];
  currentTool: ToolType;
  currentAnnotation?: Annotation<any>;
  setCurrentAnnotation: (anntation: Annotation<any>) => void;
  onMouseDown?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
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
  onAnnotationModify: (annotation: Annotation<any>) => void;
  onAnnotationModifyComplete: () => void;
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(props.imgSrc);
  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;
  const canvasWidth = props.width || imageWidth;

  const shapes = [];
  if (props.annotations) {
    for (const annotation of props.annotations) {
      if (!annotation) continue;
      const func = annotation.tool == 'polygon' ? props.createPolygonFunc : props.createBrushFunc;
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

  // console.log(`PPStage. ${JSON.stringify(props.elements)}`);
  return (
    <Stage width={canvasWidth} height={783} className={styles.stage}>
      {/* <Layer scaleX={props.scale} scaleY={props.scale} draggable={false}>
        <Image image={image} draggable={false} />
      </Layer> */}
      <Layer
        onMouseDown={(e) => {
          if (props.onMouseDown) props.onMouseDown(e, props.scale);
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
        <Group draggable={props.currentTool == 'mover'}>
          <Image draggable={false} image={image} scaleX={props.scale} scaleY={props.scale} />
          {shapes}
        </Group>
      </Layer>
    </Stage>
  );
};
export default Component;
