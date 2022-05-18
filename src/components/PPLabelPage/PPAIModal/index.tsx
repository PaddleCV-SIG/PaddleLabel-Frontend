import serviceUtils from '@/services/serviceUtils';
import { ProjectUtils, ModelUtils, getVersion } from '@/services/utils';
import { Form, Input, message, Modal, Select } from 'antd';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';

export type PPAIModalProps = {
  visible?: boolean;
  onCancel?: () => void;
};

const Component: React.FC<PPAIModalProps> = (props) => {
  const intl = useIntl();
  const project = ProjectUtils(useState);
  const projectId = serviceUtils.getQueryVariable('projectId');
  const model = ModelUtils(useState);
  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    async function init() {
      // ensure backend up
      if (!(await getVersion())) return;

      project.getAll();

      // ensure projectid
      if (!projectId) {
        message.error(
          'Machine Learning settings are specific to every project. Please choose a project first.',
        );
        return;
      }
      const pj = await project.getCurr(projectId);
      if (pj?.otherSettings?.mlBackendUrl) model.setMlBackendUrl(pj?.otherSettings?.mlBackendUrl);
    }
    init();
  }, []);

  useEffect(() => {
    if (!project.curr) return;
    const settings = project.curr.otherSettings ? project.curr.otherSettings : {};
    const mod =
      settings.models && settings.perviousModel ? settings.models[settings.perviousModel] : {};
    const initialValues = {
      mlBackendUrl: settings.mlBackendUrl,
      modelName: settings.perviousModel,
      trainBatchSize: mod.trainBatchSize,
    };
    form.setFieldsValue(initialValues);
    if (settings?.mlBackendUrl) model.setMlBackendUrl(settings.mlBackendUrl);
  }, [project.curr]);

  function setMlBackendUrl() {
    if (!project.curr) {
      message.error('Please choose a project first!');
      return;
    }
    const mlBackendUrl = form.getFieldValue('mlBackendUrl');
    model.setMlBackendUrl(mlBackendUrl);
    const otherSettings = { ...project.curr.otherSettings, mlBackendUrl: mlBackendUrl };
    project.update(project.curr.projectId, { otherSettings: otherSettings });
  }

  function saveMlsettings(settings: object) {
    console.log('saveMlsettings', project.curr, settings);
    if (!project.curr) {
      message.error('Please select model first!');
      return;
    }
    if (!project.curr.otherSettings) project.curr.otherSettings = {};
    const allModelSettings = project.curr.otherSettings.models
      ? project.curr.otherSettings.models
      : {};
    allModelSettings[settings.modelName] = settings;

    project.curr.otherSettings.mlBackendUrl = form.getFieldValue('mlBackendUrl');
    project.curr.otherSettings.perviousModel = settings.modelName;
    project.curr.otherSettings.models = allModelSettings;
    project.update(project.curr.projectId, { otherSettings: project.curr.otherSettings });
    // project.getCurr(projectId);
    message.info("Ml setting saved. Let's start trainig or inference!");
  }

  return (
    <Modal
      title={intl.formatMessage({ id: 'pages.toolBar.interactor' })}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="horizontal"
        size="large"
        onFinish={(values) => {
          console.log('form finish', values);
          saveMlsettings(values);
        }}
        hidden={project.curr == undefined}
      >
        <Input.Group compact>
          <Form.Item
            name="mlBackendUrl"
            rules={[
              {
                required: true,
                message: 'Please input ml backend url',
              },
            ]}
            style={{ fontSize: '1.5rem' }}
          >
            <Input
              allowClear={true}
              addonBefore={'ML Backend URL '}
              style={{ textAlign: 'left' }}
            />
          </Form.Item>
          <Button type="primary" onClick={setMlBackendUrl}>
            Set
          </Button>
        </Input.Group>

        <Form.Item
          name={'modelName'}
          label={'Model'}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          rules={[
            {
              required: true,
              message: 'Please select a model',
            },
          ]}
          style={{ fontSize: '1.5rem' }}
        >
          <Select placeholder="Select a model">
            {model.all?.map((m) => (
              <Option key={m.name} value={m.name}>
                {m.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={'trainBatchSize'}
          label={'Training Batch Size'}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{ fontSize: '1.5rem' }}
        >
          <Input placeholder="Training batch size" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <Button
            onClick={() => {
              props.onCancel?.call(0);
              form.resetFields();
            }}
          >
            {intl.formatMessage({ id: 'component.PPCreater.cancel' })}
          </Button>
          <Button htmlType="submit" type="primary" style={{ height: '2.5rem', width: '48%' }} block>
            {'Save'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Component;
