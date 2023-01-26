import { Space } from 'antd';
import React from 'react';
import styles from './index.less';

export type PPToolBarButtonProps = {
  imgSrc: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
};

const component: React.FC<PPToolBarButtonProps> = (props) => {
  return (
    <div
      // unselectable="on"
      className={`${styles.toolBarButtonContainerWrapper} ${
        props.active && styles.toolBarButtonContainerWrapperActive
      } ${props.disabled && styles.toolBarButtonContainerWrapperDisabled}`}
      onClick={(!props.disabled && props.onClick) || undefined}
    >
      <Space align="center" className={styles.toolBarButtonContainer} size={0}>
        <Space align="center" direction="vertical" className={styles.toolBarButton} size={0}>
          <img
            className={props.disabled ? styles.toolBarButtonImgDisabled : undefined}
            src={props.imgSrc}
          />
          <div className={styles.buttonText}>{props.children}</div>
        </Space>
      </Space>
    </div>
  );
};
export default component;
