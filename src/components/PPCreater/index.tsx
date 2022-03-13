import { Col, Form, Input, Radio, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { ProjectApi } from '@/services/apis/ProjectApi';
import { Configuration } from '@/services';

export type _PPCardProps = {
  title?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

export type TaskCategory =
  | 'classification'
  | 'detection'
  | 'semantic_segmentation'
  | 'instance_segmentation'
  | 'keypoint_detection';

const taskCategoryMap = {
  classification: 1,
  detection: 2,
  semantic_segmentation: 3,
  instance_segmentation: 4,
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
  mode: TaskCategory;
  title?: string;
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const PPCreater: React.FC<PPCardProps> = (props) => {
  const baseUrl = localStorage.getItem('basePath');
  const projectApi = new ProjectApi(new Configuration(baseUrl ? { basePath: baseUrl } : undefined));

  const saveData = (values: any) => {
    projectApi.create({
      name: values.name,
      dataDir: values.dataDir,
      description: values.description,
      taskCategoryId: taskCategoryMap[props.mode],
    });
  };

  const [form] = Form.useForm();
  return (
    <div className={styles.shadow} style={props.style}>
      <div id="left" className={styles.block_l}>
        <_PPBlock title={props.title} style={{ height: 760, padding: '1.25rem 0' }}>
          <Form
            form={form}
            layout="horizontal"
            size="large"
            style={{ marginTop: '5.69rem' }}
            onFinish={(values) => {
              saveData(values);
            }}
          >
            <Form.Item
              name="name"
              label="Project Name"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input project name!',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Input size="large" placeholder="Words or numbers" style={{ height: '3.13rem' }} />
            </Form.Item>
            <Form.Item
              name="dataDir"
              label="Dataset Path"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input dataset path!',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Input size="large" placeholder="Path" style={{ height: '3.13rem' }} />
            </Form.Item>
            <Form.Item
              name="max_points"
              label="MaxPoints"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: props.mode == 'keypoint_detection',
                  message: 'Please input max points!',
                },
              ]}
              style={{
                fontSize: '1.5rem',
                display: props.mode == 'keypoint_detection' ? undefined : 'none',
              }}
            >
              <Input size="large" placeholder="Numbers (Int)" style={{ height: '3.13rem' }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: false,
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Input size="large" placeholder="Words or numbers" style={{ height: '3.13rem' }} />
            </Form.Item>
            <Form.Item
              name="annotation mode"
              label="AnnotationMode"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: props.mode == 'semantic_segmentation',
                  message: 'Please select annotation mode!',
                },
              ]}
              style={{
                fontSize: '1.5rem',
                display: props.mode == 'semantic_segmentation' ? undefined : 'none',
              }}
            >
              <div className={styles.goup}>
                <Radio.Group defaultValue={1} size="large" style={{ height: '3.13rem' }}>
                  <Radio value={1}>Pixel model</Radio>
                  <Radio value={2}>Polygon mode</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 16,
                offset: 6,
              }}
            >
              <Button
                htmlType="submit"
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
        <_PPBlock style={{ height: '43.63rem', padding: '0.5rem 0' }}>
          <img src={props.imgSrc} style={{ height: '43.63rem', width: '60rem' }} />
        </_PPBlock>
      </div>
    </div>
  );
};

export default PPCreater;
