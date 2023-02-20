import { Col, InputNumber, Popover, Row, Slider } from 'antd';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import React, { useEffect, useState } from 'react';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';

const defaultMinSize = 0;
const defaultMaxSize = 100;
const defaultSize = 10;

type Props = {
  size?: number;
  minSize?: number;
  maxSize?: number;
  step?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (size: number) => void;
  imgSrc?: string;
  disLoc?: TooltipPlacement;
  active?: boolean;
  disabled?: boolean;
};

const Component: React.FC<Props> = (props) => {
  const [size, setSizeRaw] = useState(formatSize(props.size));
  function setSize(destSize: number | undefined) {
    setSizeRaw(formatSize(destSize));
  }
  const step = props.step ? props.step : 10;
  const minSize = props.minSize == undefined ? defaultMinSize : props.minSize;
  const maxSize = props.maxSize == undefined ? defaultMaxSize : props.maxSize;
  function formatSize(originSize?: number) {
    if (originSize == undefined) return defaultSize;
    if (originSize <= minSize) return minSize;
    if (originSize >= maxSize) return maxSize;
    return originSize;
  }
  useEffect(() => {
    setSize(props.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.size]);

  return (
    <Popover
      overlayClassName={`${styles.popover} ${props.disLoc == 'left' ? styles.popoverLeft : ''}`}
      placement={props.disLoc || 'right'}
      content={
        <Row>
          <Col span={14}>
            <Slider
              className={styles.slider}
              value={size}
              max={maxSize}
              min={minSize}
              onChange={(newSize) => {
                props.onChange?.call(0, newSize);
              }}
              step={step}
              tooltipVisible={false}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              style={{
                width: '100%',
              }}
              min={minSize}
              max={maxSize}
              value={size}
              onChange={(newSize) => {
                props.onChange?.call(0, newSize);
              }}
              step={step}
            />
          </Col>
        </Row>
      }
      trigger={'hover'}
      visible={props.disabled ? false : undefined}
    >
      {' '}
      <PPToolBarButton
        imgSrc={props.imgSrc || ''}
        onClick={(!props.disabled && props.onClick) || undefined}
        active={props.active}
        disabled={props.disabled}
      >
        {props.children}
      </PPToolBarButton>
    </Popover>
  );
};
export default Component;
