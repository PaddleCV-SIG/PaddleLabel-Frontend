import styles from './index.less';
import { Col, Row, Slider } from 'antd';
import React from 'react';

export type PPMedicalSettingProps = {
  wwValue?: number;
  wlValue?: number;
};

const component: React.FC<PPMedicalSettingProps> = (props) => {
  return (
    <div>
      <Row>
        <Col span={6} className={styles.Pop1}>
          <span>Ww</span>
        </Col>
        <Col span={18} className={styles.Pop2}>
          <Slider
            min={1}
            max={props.wwValue || 100}
            defaultValue={37}
            // onChange={this.onChange}
            // value={typeof props.wwValue === 'number' ? props.wwValue : 0}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.Pop1}>
          <span>Wl</span>
        </Col>
        <Col span={18} className={styles.Pop2}>
          <Slider
            min={1}
            max={props.wlValue || 100}
            defaultValue={37}
            // onChange={this.onChange}
            // value={typeof props.wlValue === 'number' ? props.wlValue : 0}
          />
        </Col>
      </Row>
    </div>
  );
};
export default component;
