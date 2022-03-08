/* eslint-disable @typescript-eslint/no-unused-vars */
import { Annotation } from '@/models/annotation';
import type Konva from 'konva';
import React from 'react';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import { PPLineType } from '../PPBrush/drawBrush';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

export type PPStageProps = {
  scale: number;
  annotations: Annotation<any>[];
  onMouseDown?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  onMouseMove?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
  onMouseUp?: (evt: Konva.KonvaEventObject<MouseEvent>, scale: number) => void;
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(imgSrc);
  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;

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
        {props.annotations.map((element, i) => {
          return element.lines?.map((ele2, i2) => {
            return ele2.element;
          });
        })}
      </Layer>
    </Stage>
  );
};
export default Component;
