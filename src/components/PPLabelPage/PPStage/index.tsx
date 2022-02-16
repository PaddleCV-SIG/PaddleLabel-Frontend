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
  const [stageMaxWidth, setStageMaxWidth] = useState(window.innerWidth - 330);
  window.addEventListener('resize', () => {
    setStageMaxWidth(window.innerWidth - 330);
  });

  const stageWidth = Math.min(image?.width || 0, stageMaxWidth);
  const stageHeight = image?.height || 0;

  const canvas = document.createElement('canvas');
  canvas.width = stageWidth;
  canvas.height = stageHeight;
  return (
    <Stage width={stageWidth} height={stageHeight} className={styles.stage}>
      <Layer>
        <Image image={image} />
      </Layer>
    </Stage>
  );
};
export default Component;
