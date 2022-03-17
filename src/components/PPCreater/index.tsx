import { Col, Form, Input, Radio, Row, Cascader } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { history } from 'umi';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, camel2snake } from '@/services/api';
import type { Project } from '@/services/models/Project';
import { ProjectUtils } from '@/services/utils';

export type _PPCardProps = {
  title?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const paths = [
  {
    value: '/app',
    label: '/app',
    children: [
      {
        value: 'data',
        label: 'data',
        children: [
          {
            value: 'pplabel',
            label: 'pplabel',
            children: [
              {
                value: 'clas_single',
                label: 'clas_single',
                children: [
                  {
                    value: 'PetImages',
                    label: 'PetImages',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

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
  taskCategory: string; // TODO: stricter
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  project: Project;
};

function buildDataDir(dataDirs: string[]) {
  let res = '';
  for (const dataDir of dataDirs) {
    if (dataDir.endsWith('/')) res += dataDir;
    else res += dataDir + '/';
  }
  return res;
}

const PPCreater: React.FC<PPCardProps> = (props) => {
  console.log('render ppcreater', props);
  const projects = ProjectUtils(useState);

  const saveProject = (values: any) => {
    if (!props.project) {
      projects
        .create({
          name: values.name,
          description: values.description,
          taskCategoryId: createInfo[props.taskCategory]['id'],
          dataDir: buildDataDir(values.dataDir),
          labelDir: values.labelDir,
        })
        .then(() => {
          history.push(`/${camel2snake(props.taskCategory)}?projectId=${res.projectId}`);
        });
    } else {
      projects
        .update(props.project.projectId, {
          name: values.name,
          description: values.description,
          dataDir: values.dataDir,
          labelDir: values.labelDir,
        })
        .then(() => {
          history.push('/welcome');
        });
    }
  };

  const projectId = serviceUtils.getQueryVariable('projectId');
  console.log('projectId', projectId);

  const title = props.taskCategory ? createInfo[props.taskCategory]['name'] : null;
  const [form] = Form.useForm();

  useEffect(() => {
    projects.getCurr(projectId).then((project) => {
      console.log('project', project);
      const initialValues = {
        name: project.name,
        description: project.description,
        // dataDir: project.dataDir, // TODO: value.join is not a funx
      };
      form.setFieldsValue(initialValues);
    });
  }, []);

  return (
    <div className={styles.shadow} style={props.style}>
      <div id="left" className={styles.block_l}>
        <_PPBlock title={title} style={{ height: 760, padding: '1.25rem 0' }}>
          <Form
            form={form}
            layout="horizontal"
            size="large"
            style={{ marginTop: '5.69rem' }}
            onFinish={(values) => {
              saveProject(values);
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
              <Cascader
                options={paths}
                onChange={(value) => {
                  console.log(value);
                }}
                changeOnSelect
              />
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
              name="maxPoints"
              label="MaxPoints"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: props.taskCategory == 'keypointDetection',
                  message: 'Please input max points!',
                },
              ]}
              style={{
                fontSize: '1.5rem',
                display: props.taskCategory == 'keypointDetection' ? undefined : 'none',
              }}
            >
              <Input size="large" placeholder="Numbers (Int)" style={{ height: '3.13rem' }} />
            </Form.Item>

            <Form.Item
              name="segmentationMode"
              label="AnnotationMode"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: props.taskCategory == 'semanticSegmentation',
                  message: 'Please select task category!',
                },
              ]}
              style={{
                fontSize: '1.5rem',
                display: props.taskCategory == 'semanticSegmentation' ? undefined : 'none',
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
                {props.project ? 'Update' : 'Create'}
              </Button>
              &nbsp;&nbsp;
              <Button
                htmlType="button"
                style={{ height: '2.5rem', width: '48%' }}
                block
                onClick={() => {
                  history.push('/welcome');
                }}
              >
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
