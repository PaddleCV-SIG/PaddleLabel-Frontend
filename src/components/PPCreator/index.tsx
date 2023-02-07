import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Button, Radio, Row, Spin, Tree, message } from 'antd';
import type { TreeDataNode, DirectoryTreeProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { history } from 'umi';
import styles from './index.less';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, camel2snake, snake2camel, sampleApi, IntlInit } from '@/services/utils';
import { ProjectUtils } from '@/services/utils';
import { IntlInitJsx } from '@/components/PPIntl';

export type _PPCardProps = {
  title?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  content?: string;
  docUrl?: string;
};

const _PPBlock: React.FC<_PPCardProps> = (props) => {
  return (
    <div className={styles._ppcard} style={props.style}>
      <Row className={styles.titleRow} style={{ display: props.title ? undefined : 'none' }}>
        <Title className={styles.title}>{props.title}</Title>
        <div data-test-id={props.title != undefined ? 'projectDetailDoc' : ''}>
          <QuestionCircleOutlined
            style={{ fontSize: '12px' }}
            onClick={() =>
              message.info({
                content: props.content,
                onClick: () => window.open(props.docUrl),
              })
            }
          />
        </div>
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

export type PPCreatorProps = {
  taskCategory: string; // TODO: stricter
  imgSrc?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

const PPCreator: React.FC<PPCreatorProps> = (props) => {
  const { query = {} } = history.location;
  console.log('query?.projectId', query?.projectId);
  const projectId = query?.projectId != undefined ? parseInt(query.projectId) : undefined;
  const projects = ProjectUtils(useState);
  const [loading, setLoading] = useState<boolean>(false);
  const [sampleFiles, setSampleFiles] = useState<TreeDataNode[]>([]);
  // const [labelFormat, setLabelFormat] = useState<string>();

  const intlJsx = IntlInitJsx('component.PPCreator');
  const intl = IntlInit('component.PPCreator');

  const saveProject = (values: any) => {
    setLoading(true);
    if (!projectId) {
      projects
        .create({
          ...values,
          taskCategoryId: createInfo[props.taskCategory].id,
        })
        .catch((err) => {
          message.error(intlJsx('creationFail'));
          serviceUtils.parseError(err, message);
          setLoading(false);
        })
        .then((project) => {
          if (project)
            history.push(`/${camel2snake(props.taskCategory)}?projectId=${project.projectId}`);
        });
    } else {
      projects.update(projectId, { ...values, otherSettings: otherSettings }).then(() => {
        history.push(`/project_overview?projectId=${projectId}`);
      });
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (!projectId) {
      return;
    }

    projects.getCurr(projectId).then(() => {});
  }, [projectId]);
  useEffect(() => {
    if (!projects.curr) {
      return;
    }
    const project = projects.curr;
    const values = {
      name: project?.name,
      description: project?.description,
      dataDir: project?.dataDir,
      labelFormat: project?.labelFormat,
      segMaskType: project?.otherSettings?.segMaskType,
    };
    // if (project?.labelFormat) setLabelFormat(project.labelFormat);
    form.setFieldsValue(values);
  }, [projects.curr]);

  const { DirectoryTree } = Tree;
  const onTreeSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    const isLeaf = info.node.isLeaf == true;
    if (isLeaf) {
      window.open('/api/samples/file?path=' + encodeURIComponent(info.node.key));
    }
  };

  function getSampleFolderStructure() {
    if (sampleFiles.length == 0) {
      return <img src={props.imgSrc} style={{ width: '40rem' }} />;
    } else {
      return (
        <div>
          <div className={styles.DirectoryTitle}>{intlJsx('folderStructureSample')}</div>
          <DirectoryTree
            // defaultExpandAll
            // showLine={true}
            // showIcon={true}
            onSelect={onTreeSelect}
            treeData={sampleFiles}
            blockNode={false}
          />
          <div className={styles.DirectoryContent}>
            <div>{intlJsx('folderStructureSampleDetail')}</div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className={styles.shadow} style={props.style}>
      <Spin tip={intlJsx('importInProgress')} spinning={loading} size="large">
        {/* TODO: increase left width and decrease right */}
        <div id="left" className={styles.block_l}>
          <_PPBlock
            title={intl(props.taskCategory, 'global') + intl('project')}
            content={intlJsx('titleContent')}
            docUrl={`/static/doc/CN/manual/${camel2snake(props.taskCategory)}.html`}
            style={{ height: 760, padding: '1.25rem 0' }}
          >
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
                    message: intlJsx('requireProjectName'),
                  },
                ]}
                style={{ fontSize: '1.5rem' }}
              >
                <Input
                  autoComplete="off"
                  size="large"
                  placeholder={intl('anyString', 'global')}
                  style={{ height: '3.13rem' }}
                />
              </Form.Item>
              <Form.Item
                name="dataDir"
                label={intl('datasePath')}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 16,
                }}
                rules={[
                  {
                    required: true,
                    message: intlJsx('requireDatasePath'),
                  },
                ]}
                style={{ fontSize: '1.5rem' }}
              >
                <Input
                  autoComplete="off"
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
                  autoComplete="off"
                  size="large"
                  placeholder={intl('anyString', 'global')}
                  style={{ height: '3.13rem' }}
                />
              </Form.Item>
              <Form.Item
                name="labelFormat"
                label={
                  <p
                    style={{
                      marginBottom: '0px',
                    }}
                  >
                    {props.taskCategory == 'classification'
                      ? intlJsx('clasSubCags')
                      : intlJsx('labelFormat')}{' '}
                    <QuestionCircleOutlined
                      style={{ fontSize: '12px' }}
                      onClick={() =>
                        message.info({
                          content:
                            props.taskCategory == 'classification'
                              ? intlJsx('classificationSubCatgDetail')
                              : intlJsx('labelFormatDetail'),
                        })
                      }
                    />
                  </p>
                }
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 16,
                }}
                rules={[
                  {
                    required: props.taskCategory == 'classification',
                    message: intlJsx('chooseClasSubcatg'),
                  },
                ]}
                style={{
                  fontSize: '1.5rem',
                  display:
                    createInfo[props.taskCategory].labelFormats != undefined && !projectId
                      ? undefined
                      : 'none',
                }}
              >
                <Radio.Group
                  size="large"
                  // style={{ height: '3.13rem' }}
                  onChange={() => {
                    // setLabelFormat(form.getFieldValue('labelFormat'));
                    sampleApi
                      .getStructure(
                        // samplePath[props.taskCategory][form.getFieldValue('labelFormat')],
                        `sample/bear/${props.taskCategory}/${snake2camel(
                          form.getFieldValue('labelFormat'),
                        )}/`,
                      )
                      .then((res) => {
                        setSampleFiles(res);
                      });
                  }}
                >
                  {Object.keys(createInfo[props.taskCategory].labelFormats).map((k) => (
                    <Radio key={k} value={k}>
                      {intlJsx(snake2camel(k), 'global.labelFormat')}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>

              {/* <Form.Item
                name="segMaskType"
                label={intl('segMaskType')}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  fontSize: '1.5rem',
                  display:
                    !projectId &&
                    labelFormat == 'mask' &&
                    props.taskCategory == 'semanticSegmentation'
                      ? undefined
                      : 'none',
                }}
              >
                <Radio.Group size="large" style={{ height: '3.13rem' }}>
                  {['pseudo', 'grayscale'].map((k) => (
                    <Radio key={k} value={k}>
                      {intlJsx(k, 'global.segMaskType')}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item> */}

              {/* <Form.Item
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
                <Input
                  autoComplete="off"
                  size="large"
                  placeholder="Numbers (Int)"
                  style={{ height: '3.13rem' }}
                />
              </Form.Item> */}
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
                  {projectId ? intlJsx('update') : intlJsx('create')}
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
                  {intlJsx('cancel')}
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

export default PPCreator;
