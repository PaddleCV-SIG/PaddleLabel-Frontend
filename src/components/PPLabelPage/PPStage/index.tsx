/* eslint-disable @typescript-eslint/no-unused-vars */
import { Annotation } from '@/models/annotation';
import type Konva from 'konva';
import React, { Props, ReactElement } from 'react';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import { PPLineType } from '../PPBrush/drawBrush';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

export type PPStageProps = {
  scale: number;
  annotations?: Annotation<any>[];
  onMouseDown?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  onMouseMove?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  onMouseUp?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  createPolygonFunc?: (annotations?: Annotation<any>) => ReactElement[];
  createBrushFunc?: (annotations?: Annotation<any>) => ReactElement[];
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(imgSrc);
  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;

  const shapes = [];
  if (props.annotations) {
    for (const annotation of props.annotations) {
      if (!annotation) continue;
      const func = annotation.tool == 'polygon' ? props.createPolygonFunc : props.createBrushFunc;
      if (func) shapes.push(func(annotation));
    }
  }

  // console.log(`PPStage. ${JSON.stringify(props.elements)}`);
  return (
    <Stage
      width={imageWidth * props.scale}
      height={imageHeight * props.scale}
      className={styles.stage}
    >
      <Layer scaleX={props.scale} scaleY={props.scale}>
        <Image image={image} />
      </Layer>
      <Layer
        scaleX={props.scale}
        scaleY={props.scale}
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
      >
        <Image image={image} />
        {shapes}
      </Layer>
    </Stage>
  );
};
export default Component;
