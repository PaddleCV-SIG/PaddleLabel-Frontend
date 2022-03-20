import { Col, Form, Input, Radio, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { history, useIntl } from 'umi';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, camel2snake } from '@/services/api';
import type { Project } from '@/services/models/Project';
import { ProjectUtils } from '@/services/utils';

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
  taskCategory: string; // TODO: stricter
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  project: Project;
};

const PPCreater: React.FC<PPCardProps> = (props) => {
  const projects = ProjectUtils(useState);
  const projectId = serviceUtils.getQueryVariable('projectId');
  console.log('render ppcreater', props, projectId);

  const projectName = useIntl().formatMessage({ id: 'component.PPCreater.projectName' });
  const datasePath = useIntl().formatMessage({ id: 'component.PPCreater.datasePath' });
  const description = useIntl().formatMessage({ id: 'component.PPCreater.description' });
  const maxPoints = useIntl().formatMessage({ id: 'component.PPCreater.maxPoints' });
  const annotationMode = useIntl().formatMessage({ id: 'component.PPCreater.annotationMode' });
  const pixelMode = useIntl().formatMessage({ id: 'component.PPCreater.pixelMode' });
  const polygonMode = useIntl().formatMessage({ id: 'component.PPCreater.polygonMode' });
  const update = useIntl().formatMessage({ id: 'component.PPCreater.update' });
  const create = useIntl().formatMessage({ id: 'component.PPCreater.create' });
  const cancel = useIntl().formatMessage({ id: 'component.PPCreater.cancel' });

  const saveProject = (values: any) => {
    if (!projectId) {
      projects
        .create({
          name: values.name,
          description: values.description,
          taskCategoryId: createInfo[props.taskCategory]['id'],
          dataDir: values.dataDir,
          labelDir: values.labelDir,
        })
        .then((project) => {
          history.push(`/${camel2snake(props.taskCategory)}?projectId=${project.projectId}`);
        })
        .catch(() => {});
    } else {
      projects
        .update(projectId, {
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

  const title = props.taskCategory ? createInfo[props.taskCategory]['name'] : null;
  const [form] = Form.useForm();

  useEffect(() => {
    projects.getCurr(projectId).then((project) => {
      console.log('project', project);
      const initialValues = {
        name: project?.name,
        description: project?.description,
        dataDir: project?.dataDir, // TODO: value.join is not a funx
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
              label={projectName}
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
              label={datasePath}
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
              <Input
                size="large"
                placeholder="Dataset Path"
                style={{ height: '3.13rem' }}
                disabled={projectId == undefined ? false : true}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={description}
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
              label={maxPoints}
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
              label={annotationMode}
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
                  <Radio value={1}>{pixelMode}</Radio>
                  <Radio value={2}>{polygonMode}</Radio>
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
                {projectId ? update : create}
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
                {cancel}
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
