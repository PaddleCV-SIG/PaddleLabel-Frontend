import { Button, InputNumber, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';

const minSize = 1;
const maxSize = 100;
const defaultSize = 10;

export type PPBrushProps = {
  active?: boolean;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (size: number) => void;
  imgSrc?: string;
};

function formatSize(size: number | undefined) {
  if (!size) return defaultSize;
  if (size <= minSize) return minSize;
  if (size >= maxSize) return maxSize;
  return size;
}

const Component: React.FC<PPBrushProps> = (props) => {
  const [size, setSize] = useState(formatSize(props.size));
  useEffect(() => {
    setSize(formatSize(props.size));
  }, [props.size]);
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
            min={minSize}
            max={maxSize}
            value={size}
            onChange={(newSize) => {
              props.onChange?.call(0, newSize);
            }}
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
        imgSrc={props.imgSrc || './pics/buttons/brush.png'}
        onClick={props.onClick}
      >
        {props.children || 'Brush'}
      </PPToolBarButton>
    </Popover>
  );
};
export default Component;
