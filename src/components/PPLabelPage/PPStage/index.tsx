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

  // Potentially performance optimize point when resizing window.
  // May limite to resize only once in 3 seconds.
  // Inital stage size
  const [stageWidth, setStageWidth] = useState(Math.max(window.innerWidth, 1024) - 330);
  const [stageHeight, setStageHeight] = useState(
    Math.max(window.innerHeight - 60, 708, imageHeight),
  );

  // Change stage size to prevent scrollbar
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      setStageWidth(window.innerWidth - 330);
    }
    if (window.innerHeight > 768 && window.innerHeight > imageHeight) {
      setStageHeight(window.innerHeight - 60);
    }
  });

  // Image position: at the middle of stage

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
