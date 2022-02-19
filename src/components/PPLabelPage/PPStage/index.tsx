/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Layer, Stage, Image, Line } from 'react-konva';
import useImage from 'use-image';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

const Component: React.FC = () => {
  const [image] = useImage(imgSrc);
  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;

  const [points, setPoints] = useState<number[]>([]);
  const [marking, setMarking] = useState(false);
  const mode = 'brush';
  return (
    <Stage width={imageWidth} height={imageHeight} className={styles.stage}>
      <Layer
        onMouseDown={(e) => {
          setMarking(true);
          // console.log(points);
          setPoints([e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY]);
        }}
        onMouseMove={(e) => {
          if (!marking) return;
          // console.log(points);
          setPoints(points.concat([e.evt.offsetX, e.evt.offsetY]));
        }}
        onMouseUp={() => {
          setMarking(false);
        }}
      >
        <Image image={image} />
        <Line
          stroke="#df4b26"
          strokeWidth={10}
          globalCompositeOperation={mode === 'brush' ? 'source-over' : 'destination-out'}
          lineCap="round"
          points={points}
          tension={0.01}
        />
      </Layer>
    </Stage>
  );
};
export default Component;
