import React from 'react';
import styles from './index.less';

const component: React.FC = (props) => {
  return <div className={styles.toolbar}>{props.children}</div>;
};
export default component;
