/* eslint-disable @typescript-eslint/no-unused-vars */
import type Konva from 'konva';
import React from 'react';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

export type PPStageProps = {
  elements: any[];
  onMouseDown?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseMove?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseUp?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(imgSrc);
  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;

  // console.log(`PPStage. ${JSON.stringify(props.elements)}`);
  return (
    <Stage width={imageWidth} height={imageHeight} className={styles.stage}>
      <Layer>
        <Image image={image} />
      </Layer>
      <Layer
        onMouseDown={(e) => {
          if (props.onMouseDown) props.onMouseDown(e);
        }}
        onMouseMove={(e) => {
          if (props.onMouseMove) props.onMouseMove(e);
        }}
        onMouseUp={(e) => {
          if (props.onMouseUp) props.onMouseUp(e);
        }}
        onContextMenu={(e) => {
          // Prevent right-click menu
          e.evt.preventDefault();
        }}
      >
        <Image image={image} />
        {props.elements.map((element, i) => {
          return element;
        })}
      </Layer>
    </Stage>
  );
};
export default Component;
