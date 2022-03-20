import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Button, Col, Descriptions, Dropdown, Menu, message, Row } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

export type PPRGBSetting = {
  // imgSrc: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function handleMenuClick(e: any) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      band_1
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      band_2
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      band_3
    </Menu.Item>
  </Menu>
);

const component: React.FC<PPRGBSetting> = () => {
  const r = useIntl().formatMessage({ id: 'component.PPRS.r' });
  const g = useIntl().formatMessage({ id: 'component.PPRS.g' });
  const b = useIntl().formatMessage({ id: 'component.PPRS.b' });
  const dataInformation = useIntl().formatMessage({ id: 'component.PPRS.dataInformation' });
  const fileName = useIntl().formatMessage({ id: 'component.PPRS.fileName' });
  const row = useIntl().formatMessage({ id: 'component.PPRS.row' });
  const column = useIntl().formatMessage({ id: 'component.PPRS.column' });
  const bands = useIntl().formatMessage({ id: 'component.PPRS.bands' });
  const dataType = useIntl().formatMessage({ id: 'component.PPRS.dataType' });
  const EPSG = useIntl().formatMessage({ id: 'component.PPRS.EPSG' });
  const unit = useIntl().formatMessage({ id: 'component.PPRS.unit' });

  return (
    <div>
      <Row>
        <Col className={styles.RSPop1}>
          <span>{r}</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col className={styles.RSPop1}>
          <span>{g}</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col className={styles.RSPop1}>
          <span>{b}</span>
        </Col>
        <Col className={styles.RSPop2}>
          <Dropdown overlay={menu}>
            <Button style={{ width: '100%' }}>
              Band <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Descriptions title={dataInformation} column={1} bordered>
        <Descriptions.Item label={fileName}>A/XXX.tif</Descriptions.Item>
        <Descriptions.Item label={row}>1234</Descriptions.Item>
        <Descriptions.Item label={column}>897</Descriptions.Item>
        <Descriptions.Item label={bands}>7</Descriptions.Item>
        <Descriptions.Item label={dataType}>UInt16</Descriptions.Item>
        <Descriptions.Item label={EPSG}>7030</Descriptions.Item>
        <Descriptions.Item label={unit}>m</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default component;
