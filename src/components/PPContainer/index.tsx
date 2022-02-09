import React from 'react';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const PPContainer: React.FC = (props) => {
  return (
    <div
      className={`${styles.container}`}
      style={{ backgroundImage: 'url(./pics/background.png)' }}
    >
      {props.children}
    </div>
  );
};
export default PPContainer;
