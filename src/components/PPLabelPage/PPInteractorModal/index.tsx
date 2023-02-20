import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { IntlInit, getVersion } from '@/services/utils';
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
  const intl = IntlInit('component.PPInteractorModal');

  const model = props.model;
  const project = props.project;

  useEffect(() => {
    if (!project.curr) return;
    const settings = project.curr.otherSettings ? project.curr.otherSettings : {};
    const initialValues = {
      mlBackendUrl: settings.mlBackendUrl,
      modelFilePath: settings.modelSettings?.EISeg?.modelFilePath,
      paramFilePath: settings.modelSettings?.EISeg?.paramFilePath,
    };
    form.setFieldsValue(initialValues);
    if (settings.mlBackendUrl) model.setMlBackendUrl(settings.mlBackendUrl);
    else model.setMlBackendUrl(DEFAULT_ML_URL);
    if (settings.modelFilePath && settings.paramFilePath) {
      const params = {
        model_path: settings.modelFilePath,
        param_path: settings.paramFilePath,
      };
      model.load('EISeg', params);
    }
  }, [project.curr]);

  function saveMlsettings() {
    if (!project.curr) {
      message.error('Please select project first!');
    }
    if (!project.curr.otherSettings) project.curr.otherSettings = {};

    project.curr.otherSettings.mlBackendUrl = form.getFieldValue('mlBackendUrl');
    project.curr.otherSettings.modelSettings = {};
    project.curr.otherSettings.modelSettings.EISeg = {};
    project.curr.otherSettings.modelSettings.EISeg.modelFilePath =
      form.getFieldValue('modelFilePath');
    project.curr.otherSettings.modelSettings.EISeg.paramFilePath =
      form.getFieldValue('paramFilePath');
    // project.curr.otherSettings.perviousModel = settings.modelName;
    // project.curr.otherSettings.models = allModelSettings;
    project.update(project.curr.projectId, { otherSettings: project.curr.otherSettings });
    // project.getCurr(projectId);
    // Call ML LOAD
    model.setMlBackendUrl(project.curr.otherSettings.mlBackendUrl);
    props.model.setLoading(true);
    model
      .load(
        'EISeg',
        project.curr?.otherSettings?.models?.EISeg?.modelFilePath,
        project.curr?.otherSettings?.models?.EISeg?.paramFilePath,
      )
      .then(
        () => {
          message.info(intl('modelLoaded'));
          props.model.setLoading(false);
        },
        () => {
          props.model.setLoading(false);
        },
      );
  }
  const numVersion = (version) => {
    const [major, ...rest] = version.split('.').map(Number);
    const num = rest.reduce((acc, val, index) => {
      const factor = Math.pow(10, (index + 1) * 2);
      return acc + val / factor;
    }, major);
    return num;
  };
  const handleUrlChange = async (value: string) => {
    const errversion = '1.0.0';
    const versionss: string = (await getVersion()) as string;
    const versions = numVersion(versionss);
    if (versions && errversion > versions) {
      message.error('eiseg版本过低,请升级到升级');
    }
    form.setFields([
      {
        name: 'mlBackendUrl',
        value: value,
      },
    ]);
  };

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
          <Input
            onBlur={(e) => {
              handleUrlChange(e.target.value);
            }}
            autoComplete="off"
            placeholder={DEFAULT_ML_URL}
          />
        </Form.Item>
        <Form.Item
          name={'modelFilePath'}
          label={intl('modelPath')}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{ fontSize: '1.5rem' }}
        >
          <Input autoComplete="off" placeholder={intl('modelPathPh')} />
        </Form.Item>
        <Form.Item
          name={'paramFilePath'}
          label={intl('weightPath')}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{ fontSize: '1.5rem' }}
        >
          <Input autoComplete="off" placeholder={intl('weightPathPh')} />
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
      <div
        style={{
          fontSize: '16px',
          color: 'red',
        }}
      >
        {intl('Warintoast')}
      </div>
    </Modal>
  );
};
export default Component;
