import React, { useState } from 'react';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import styles from './index.less';

// Mock Data
const imgSrc = './pics/basketball.jpg';

const Component: React.FC = () => {
  const [image] = useImage(imgSrc);

  // Potentially performance optimize point when resizing window.
  // May limite to resize only once in 3 seconds.
  const [stageWidth, setStageWidth] = useState(Math.max(window.innerWidth, 1024) - 330);
  const [stageHeight, setStageHeight] = useState(
    Math.max(window.innerHeight - 60, 708, image?.height || 0),
  );
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      setStageWidth(window.innerWidth - 330);
    }
    if (window.innerHeight > 768 && window.innerHeight > (image?.height || 0)) {
      setStageHeight(window.innerHeight - 60);
    }
  });
  const imageWidth = image?.width || 0;
  const imageX = stageWidth / 2 - imageWidth / 2;

  const canvas = document.createElement('canvas');
  canvas.width = stageWidth;
  canvas.height = stageHeight;
  return (
    <Stage width={stageWidth} height={stageHeight} className={styles.stage}>
      <Layer>
        <Image image={image} x={imageX} />
      </Layer>
    </Stage>
  );
};
export default Component;
