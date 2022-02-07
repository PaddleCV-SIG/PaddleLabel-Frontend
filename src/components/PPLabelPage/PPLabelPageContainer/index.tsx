import React from 'react';
import styles from './index.less';

const component: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return <div className={`${styles.container} ${props.className}`}>{props.children}</div>;
};
export default component;
