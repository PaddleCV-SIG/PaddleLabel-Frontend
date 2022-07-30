import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { IntlInit } from '@/services/utils';

export type PPInteractorModalProps = {
  visible?: boolean;
  onCancel?: () => void;
  model: any;
  project: any;
  setVisible: (visible: boolean) => void;
};

const DEFAULT_ML_URL = 'http://127.0.0.1:1234';

const Component: React.FC<PPInteractorModalProps> = (props) => {
  const [form] = Form.useForm();
  // const intl = useIntl();
  const intl = IntlInit('component.PPInteractorModal');

  const model = props.model;
  const project = props.project;

  useEffect(() => {
    if (!project.curr) return;
    const settings = project.curr.otherSettings ? project.curr.otherSettings : {};
    const initialValues = {
      mlBackendUrl: settings.mlBackendUrl,
      mlModelAbsPath: settings.models?.EISeg?.mlModelAbsPath,
      mlWeightAbsPath: settings.models?.EISeg?.mlWeightAbsPath,
    };
    form.setFieldsValue(initialValues);
    if (settings?.mlBackendUrl) model.setMlBackendUrl(settings.mlBackendUrl);
    else model.setMlBackendUrl(DEFAULT_ML_URL);
    if (settings.mlModelAbsPath && settings.mlWeightAbsPath)
      model.load(settings.mlModelAbsPath, settings.mlWeightAbsPath);
  }, [project.curr]);

  function saveMlsettings(settings: any) {
    console.log('saveMlsettings', project.curr, settings);
    if (!project.curr) {
      message.error('Please select project first!');
    }
    if (!project.curr.otherSettings) project.curr.otherSettings = {};

    project.curr.otherSettings.mlBackendUrl = form.getFieldValue('mlBackendUrl');
    project.curr.otherSettings.models = {};
    project.curr.otherSettings.models.EISeg = {};
    project.curr.otherSettings.models.EISeg.mlModelAbsPath = form.getFieldValue('mlModelAbsPath');
    project.curr.otherSettings.models.EISeg.mlWeightAbsPath = form.getFieldValue('mlWeightAbsPath');
    project.curr.otherSettings.perviousModel = settings.modelName;
    // project.curr.otherSettings.models = allModelSettings;
    project.update(project.curr.projectId, { otherSettings: project.curr.otherSettings });
    // project.getCurr(projectId);
    // Call ML LOAD
    model.setMlBackendUrl(project.curr.otherSettings.mlBackendUrl);
    model.load(
      project.curr.otherSettings.models.EISeg.mlModelAbsPath,
      project.curr.otherSettings.models.EISeg.mlWeightAbsPath,
    );
    message.info("Ml setting saved. Let's start trainig or inference!");
  }

  // const cancel = intl.formatMessage({ id: 'component.PPCreater.cancel' });
  // const ok = intl.formatMessage({ id: 'component.PPSegMode.ok' });

  return (
    <Modal
      title={intl('title')}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      width="60rem"
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(values) => {
          console.log('form finish', values);
          saveMlsettings(values);
          props.setVisible(false);
        }}
        autoComplete="off"
      >
        <Form.Item
          name={'mlBackendUrl'}
          label={intl('mlBackendUrl')}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValue={DEFAULT_ML_URL}
          style={{ fontSize: '1.5rem' }}
        >
          <Input placeholder={DEFAULT_ML_URL} />
        </Form.Item>
        <Form.Item
          name={'mlModelAbsPath'}
          label={intl('modelPath')}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{ fontSize: '1.5rem' }}
        >
          <Input placeholder={intl('pathPh')} />
        </Form.Item>
        <Form.Item
          name={'mlWeightAbsPath'}
          label={intl('weightPath')}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{ fontSize: '1.5rem' }}
        >
          <Input placeholder={intl('pathPh')} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button
              onClick={() => {
                props.onCancel?.call(0);
              }}
            >
              {intl('cancel', 'global')}
            </Button>
            <Button type="primary" htmlType="submit">
              {intl('ok', 'global')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Component;
