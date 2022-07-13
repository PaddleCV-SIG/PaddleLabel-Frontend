import { Button, Form, Input, message, Popover } from 'antd';
import React, { useEffect } from 'react';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';

export type PPAIModalProps = {
  visible?: boolean;
  onCancel?: () => void;
  imgSrc?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (size: number) => void;
  model: any;
  project: any;
};

const DEFAULT_ML_URL = 'http://127.0.0.1:1234';

const Component: React.FC<PPAIModalProps> = (props) => {
  // const intl = useIntl();
  const [form] = Form.useForm();
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
      return;
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

  return (
    <Popover
      overlayClassName={`${styles.popover} ${styles.popoverLeft}`}
      placement={'left'}
      content={
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
          <Form.Item
            name={'mlBackendUrl'}
            label={'ML Backend URL'}
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
            label={'Model Path'}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{ fontSize: '1.5rem' }}
          >
            <Input placeholder="Absolute path" />
          </Form.Item>
          <Form.Item
            name={'mlWeightAbsPath'}
            label={'Weight Path'}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{ fontSize: '1.5rem' }}
          >
            <Input placeholder="Absolute path" />
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
              {'Save'}
            </Button>
          </Form.Item>
        </Form>
      }
      trigger={'hover'}
    >
      {' '}
      <PPToolBarButton imgSrc={props.imgSrc || ''} onClick={props.onClick} active={props.active}>
        {props.children}
      </PPToolBarButton>
    </Popover>
  );
};
export default Component;
