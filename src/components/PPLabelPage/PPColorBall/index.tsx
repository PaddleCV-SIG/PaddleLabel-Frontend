import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

export type PPColorBallProps = {
  color?: string;
  changeable?: boolean;
  onChange?: (color: ColorResult) => void;
};

const Component: React.FC<PPColorBallProps> = (props) => {
  const [color, setColor] = useState(props.color || '#FFF');
  useEffect(() => {
    setColor(props.color || '#FFF');
  }, [props]);
  if (props.changeable) {
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
  } else {
    return <div className={styles.roundBall} style={{ backgroundColor: color }} />;
  }
};
export default Component;
