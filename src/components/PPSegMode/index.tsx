import { Col, Form, Space, Row, Alert } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import PPSegCard from '../PPSegCard';

export type _PPCardProps = {
  title?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const _PPBlock: React.FC<_PPCardProps> = (props) => {
  return (
    <div className={styles._ppcard} style={props.style}>
      <Row className={styles.titleRow} style={{ display: props.title ? undefined : 'none' }}>
        <Title className={styles.title}>{props.title}</Title>
      </Row>
      <Row style={{ marginTop: 26 }}>
        <Col
          span={24}
          style={{ paddingLeft: 30, paddingRight: 30, textAlign: 'center', ...props.innerStyle }}
        >
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

export type PPCardProps = {
  title?: string;
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const PPSegMode: React.FC<PPCardProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <div className={styles.shadow} style={props.style}>
      <div id="left" className={styles.block_l}>
        <_PPBlock title={props.title} style={{ height: 760, padding: '1.25rem 0' }}>
          <Form form={form} layout="horizontal" size="large" style={{ marginTop: '5.69rem' }}>
            <Form.Item
              wrapperCol={{
                span: 16,
                offset: 3,
              }}
            >
              <Space>
                <Alert
                  className={styles.info}
                  message="Semantic segmentation annotation provides a variety of vertical class directions,
                please select."
                  type="info"
                  style={{ height: '3.13rem', width: '38.75rem' }}
                />
              </Space>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 16,
                offset: 3,
              }}
            >
              <Space size={20}>
                <PPSegCard imgSrc={'./pics/seg_mode/un_not_clicked.png'} width={140} height={140}>
                  General
                </PPSegCard>
                <PPSegCard imgSrc={'./pics/seg_mode/md_not_clicked.png'} width={140} height={140}>
                  Medical
                </PPSegCard>
                <PPSegCard imgSrc={'./pics/seg_mode/rs_not_clicked.png'} width={140} height={140}>
                  Remote Sensing
                </PPSegCard>
                <PPSegCard imgSrc={'./pics/seg_mode/cd_not_clicked.png'} width={140} height={140}>
                  Change Detection
                </PPSegCard>
              </Space>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 16,
                offset: 6,
              }}
            >
              <Button
                htmlType="button"
                type="primary"
                style={{ height: '2.5rem', width: '48%' }}
                block
              >
                OK
              </Button>
              &nbsp;&nbsp;
              <Button htmlType="button" style={{ height: '2.5rem', width: '48%' }} block>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </_PPBlock>
      </div>
      <div id="right" className={styles.block_r}>
        <_PPBlock style={{ height: 760, padding: '0.5rem 0' }}>
          <img src={props.imgSrc} style={{ height: 698, width: 960 }} />
        </_PPBlock>
      </div>
    </div>
  );
};

export default PPSegMode;
