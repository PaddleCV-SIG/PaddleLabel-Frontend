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
  const [labelFormat, setLabelFormat] = useState<string>();

  const intlJsx = IntlInitJsx('component.PPCreater');
  const intl = IntlInit('component.PPCreater');

  const saveProject = (values: any) => {
    setLoading(true);
    const otherSettings = {};
    if (values.segMaskType) otherSettings.segMaskType = values.segMaskType;

    if (!projectId) {
      projects
        .create({
          ...values,
          taskCategoryId: createInfo[props.taskCategory]['id'],
          otherSettings: otherSettings,
        })
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
      projects.update(projectId, { ...values, otherSettings: otherSettings }).then(() => {
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
        segMaskType: project?.otherSettings?.segMaskType,
      };
      console.log('values', values);
      console.log('othersettings', project?.otherSettings);
      if (project?.labelFormat) setLabelFormat(project.labelFormat);
      form.setFieldsValue(values);
    });
  }, []);

  const { DirectoryTree } = Tree;
  const onTreeSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info, info.node.isLeaf != undefined);
    const isLeaf = info.node.isLeaf != undefined;
    if (isLeaf) {
      console.log('url', encodeURIComponent(info.node.key));
      window.open('/api/samples/file?path=' + encodeURIComponent(info.node.key));
    }
  };

  function getSampleFolderStructure() {
    if (sampleFiles.length == 0) {
      return <img src={props.imgSrc} style={{ width: '40rem' }} />;
    } else {
      return (
        <div>
          <div className={styles.DirectoryTitle}>标注保存结构示例</div>
          <DirectoryTree
            // defaultExpandAll
            // showLine={true}
            // showIcon={true}
            onSelect={onTreeSelect}
            treeData={sampleFiles}
            blockNode={false}
          />
          <div className={styles.DirectoryContent}>
            <div>1.标注完成后，生成标注结果的组织形式ru如上所示</div>
            <div>2.若重新导入已有标注，请参加如上标注结构组织文件夹下的文件</div>
          </div>
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
            content={intlJsx('titleContent')}
            docUrl={`https://github.com/PaddleCV-SIG/PaddleLabel/blob/docs/doc/CN/project/${camel2snake(
              props.taskCategory,
            )}.md`}
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
                    message: 'Please input project name!',
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
                    message: 'Please input dataset path!',
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
                  <p>
                    {intlJsx('labelFormat')}{' '}
                    <QuestionCircleOutlined
                      style={{ fontSize: '12px' }}
                      onClick={() =>
                        message.info({
                          content: intlJsx('labelFormatDetail'),
                          // onClick: () => window.open(),
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
                rules={
                  [
                    // {
                    //   required: createInfo[props.taskCategory].labelFormats != undefined,
                    //   message: 'Please choose a label import/export format',
                    // },
                  ]
                }
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
                  style={{ height: '3.13rem' }}
                  onChange={() => {
                    setLabelFormat(form.getFieldValue('labelFormat'));
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

              <Form.Item
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
                    labelFormat == 'mask' && props.taskCategory == 'semanticSegmentation'
                      ? undefined
                      : 'none',
                }}
              >
                <Radio.Group size="large" style={{ height: '3.13rem' }}>
                  {['pesudo', 'grayscale'].map((k) => (
                    <Radio key={k} value={k}>
                      {intlJsx(k, 'global.segMaskType')}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>

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

export default PPCreater;
