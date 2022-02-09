import { Popover } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

export type PPColorBallProps = {
  color?: string;
  onChange: (color: ColorResult) => void;
};

const Component: React.FC<PPColorBallProps> = (props) => {
  const [color, setColor] = useState(props.color || '#FFF');
  return (
    <Popover
      getPopupContainer={(trigger) => trigger.parentElement || document.body}
      overlayClassName={styles.popover}
      openClassName={styles.popoverOpenClassName}
      placement="bottom"
      content={
        <SketchPicker
          disableAlpha
          color={color}
          onChange={(targetColor) => {
            setColor(targetColor.hex);
          }}
          onChangeComplete={props.onChange}
        />
      }
      trigger="click"
    >
      <div className={styles.roundBall} style={{ backgroundColor: color }} />
    </Popover>
  );
};
export default Component;
