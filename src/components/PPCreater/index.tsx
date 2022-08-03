import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Button, Radio, Row, Spin, Tree, message } from 'antd';
import type { TreeDataNode } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { history } from 'umi';
import styles from './index.less';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, camel2snake, IntlInit, snake2camel, sampleApi } from '@/services/utils';
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

export type PPCreaterProps = {
  taskCategory: string; // TODO: stricter
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const PPCreater: React.FC<PPCreaterProps> = (props) => {
  const projects = ProjectUtils(useState);
  const projectId = serviceUtils.getQueryVariable('projectId');
  const [loading, setLoading] = useState<boolean>(false);
  const [sampleFiles, setSampleFiles] = useState<TreeDataNode[]>([]);

  const intl = IntlInit('component.PPCreater');

  const saveProject = (values: any) => {
    setLoading(true);
    if (!projectId) {
      projects
        .create({ ...values, taskCategoryId: createInfo[props.taskCategory]['id'] })
        .catch((err) => {
          message.error(intl('creationFail'));
          serviceUtils.parseError(err, message);
          setLoading(false);
        })
        .then((project) => {
          if (project)
            history.push(`/${camel2snake(props.taskCategory)}?projectId=${project.projectId}`);
        });
    } else {
      projects.update(projectId, { ...values }).then(() => {
        history.push(`/project_overview?projectId=${projectId}`);
      });
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    projects.getCurr(projectId).then((project) => {
      const values = {
        name: project?.name,
        description: project?.description,
        dataDir: project?.dataDir,
        labelDir: project?.labelDir,
        labelFormat: project?.labelFormat,
      };
      console.log('values', values);
      form.setFieldsValue(values);
    });
  }, []);

  const samplePath = {
    classification: {
      single_class: 'clas/single/',
      multi_class: 'clas/multi/',
    },
    detection: { coco: 'det/coco/', voc: 'det/voc/' },
    semanticSegmentation: {
      mask: 'semantic_seg/mask/',
      polygon: 'semantic_seg/polygon/',
    },
    instanceSegmentation: {
      mask: 'instance_seg/mask/',
      polygon: 'instance_seg/polygon/',
    },
  };
  const { DirectoryTree } = Tree;

  function getSampleFolderStructure() {
    if (sampleFiles.length == 0) {
      return <img src={props.imgSrc} style={{ width: '40rem' }} />;
    } else {
      // console.log('asdfasdf', samplePath[props.taskCategory][labelFormat]);
      return (
        <div>
          <DirectoryTree
            // multiple
            // defaultExpandAll
            // showLine={true}
            // showIcon={true}
            // onSelect={onSelect}
            // onExpand={onExpand}
            treeData={sampleFiles}
            blockNode={false}
          />
        </div>
      );
    }
  }

  return (
    <div className={styles.shadow} style={props.style}>
      <Spin tip="Import in progress" spinning={loading}>
        {/* TODO: increase left width and decrease right */}
        <div id="left" className={styles.block_l}>
          <_PPBlock
            title={intl(props.taskCategory, 'global') + intl('project')}
            style={{ height: 760, padding: '1.25rem 0' }}
          >
            <Form
              form={form}
              layout="horizontal"
              size="large"
              style={{ marginTop: '5.69rem' }}
              onFinish={(values) => {
                console.log(values);
                saveProject(values);
              }}
            >
              <Form.Item
                name="name"
                label={intl('projectName')}
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
                <Input
                  size="large"
                  placeholder={intl('anyString', 'global')}
                  style={{ height: '3.13rem' }}
                />
              </Form.Item>
              <Form.Item
                name="dataDir"
                label={
                  <div>
                    {intl('datasePath')}{' '}
                    <QuestionCircleOutlined
                      style={{ fontSize: '12px' }}
                      onClick={() =>
                        message.info({
                          content:
                            'The root directory of the dataset, where all images and labels are. Click here for more detail.',
                          onClick: () =>
                            window.open(
                              `https://github.com/PaddleCV-SIG/PP-Label/blob/develop/doc/dataset_file_structure.md#${props.taskCategory}`,
                            ),
                        })
                      }
                    />
                  </div>
                }
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
                  placeholder={intl('absolutePath', 'global')}
                  style={{ height: '3.13rem' }}
                  disabled={projectId == undefined ? false : true}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={intl('description')}
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
                <Input
                  size="large"
                  placeholder={intl('anyString', 'global')}
                  style={{ height: '3.13rem' }}
                />
              </Form.Item>
              <Form.Item
                name="labelFormat"
                label={
                  <div>
                    {intl('labelFormat')}
                    <QuestionCircleOutlined
                      style={{ fontSize: '12px' }}
                      onClick={() =>
                        message.info({
                          content:
                            'Choose the format to import/export dataset. Click here to see details.',
                          onClick: () => {
                            window.open(
                              `https://github.com/PaddleCV-SIG/PP-Label/blob/develop/doc/dataset_file_structure.md#${props.taskCategory}`,
                            );
                          },
                        })
                      }
                    />
                  </div>
                }
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 16,
                }}
                rules={[
                  {
                    required: createInfo[props.taskCategory].labelFormats != undefined,
                    message: 'Please choose a label import/export format',
                  },
                ]}
                style={{
                  fontSize: '1.5rem',
                  display:
                    createInfo[props.taskCategory].labelFormats != undefined ? undefined : 'none',
                }}
              >
                <Radio.Group
                  size="large"
                  style={{ height: '3.13rem' }}
                  onChange={() => {
                    sampleApi
                      .getStructure(
                        samplePath[props.taskCategory][form.getFieldValue('labelFormat')],
                      )
                      .then((res) => {
                        console.log('sample file structure', res);
                        setSampleFiles(res);
                      });
                  }}
                >
                  {Object.keys(createInfo[props.taskCategory].labelFormats).map((k) => (
                    <Radio key={k} value={k}>
                      {intl(snake2camel(k), 'global.labelFormat')}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="maxPoints"
                label={intl('maxPoints')}
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
                  {projectId ? intl('update') : intl('create')}
                </Button>
                &nbsp;&nbsp;
                <Button
                  htmlType="button"
                  style={{ height: '2.5rem', width: '48%' }}
                  block
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  {intl('cancel')}
                </Button>
              </Form.Item>
            </Form>
          </_PPBlock>
        </div>
        <div id="right" className={styles.block_r}>
          <_PPBlock style={{ height: '43.63rem', padding: '0.5rem 0' }}>
            {getSampleFolderStructure()}
          </_PPBlock>
        </div>
      </Spin>
    </div>
  );
};

export default PPCreater;
