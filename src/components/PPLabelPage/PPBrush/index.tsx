import { Button, InputNumber, Popover } from 'antd';
import React, { useState } from 'react';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';

const minSize = 1;
const maxSize = 20;
const defaultSize = 10;

export type PPBrushProps = {
  active?: boolean;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (size: number) => void;
};

function formatSize(size: number | undefined) {
  if (!size) return defaultSize;
  if (size <= minSize) return minSize;
  if (size >= maxSize) return maxSize;
  return size;
}

const Component: React.FC<PPBrushProps> = (props) => {
  const [size, setSize] = useState(formatSize(props.size));
  return (
    <Popover
      overlayClassName={styles.popover}
      placement="right"
      content={
        <>
          <Button
            type="text"
            onClick={() => {
              const changedSize = formatSize(size - 1);
              setSize(changedSize);
              props.onChange?.call(0, changedSize);
            }}
          >
            -
          </Button>
          <InputNumber
            min={1}
            max={20}
            value={size}
            onChange={props.onChange}
            controls={false}
            style={{ textAlign: 'center' }}
          />
          <Button
            type="text"
            onClick={() => {
              const changedSize = formatSize(size + 1);
              setSize(changedSize);
              props.onChange?.call(0, changedSize);
            }}
          >
            +
          </Button>
        </>
      }
      trigger={props.active ? 'hover' : 'click'}
    >
      {' '}
      <PPToolBarButton
        active={props.active}
        imgSrc="./pics/buttons/brush.png"
        onClick={props.onClick}
      >
        笔刷
      </PPToolBarButton>
    </Popover>
  );
};
export default Component;
