import React from 'react';
import styles from './index.less';

export type PPToolBarProps = {
  disLoc?: string;
};

const component: React.FC<PPToolBarProps> = (props) => {
  let style = styles.leftToolbar;
  if (props.disLoc == 'right') {
    style = styles.rightToolbar;
  }
  return <div className={style}>{props.children}</div>;
};
export default component;
