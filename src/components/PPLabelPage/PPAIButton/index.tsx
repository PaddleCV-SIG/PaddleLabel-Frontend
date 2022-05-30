import serviceUtils from '@/services/serviceUtils';
import { ProjectUtils, ModelUtils, getVersion } from '@/services/utils';
import { Button, Form, Input, message, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';

export type PPAIModalProps = {
  visible?: boolean;
  onCancel?: () => void;
  imgSrc?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (size: number) => void;
};

const Component: React.FC<PPAIModalProps> = (props) => {
  // const intl = useIntl();
  const project = ProjectUtils(useState);
  const projectId = serviceUtils.getQueryVariable('projectId');
  const model = ModelUtils(useState);
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

  // function setMlBackendUrl() {
  //   if (!project.curr) {
  //     message.error('Please choose a project first!');
  //     return;
  //   }
  //   const mlBackendUrl = form.getFieldValue('mlBackendUrl');
  //   model.setMlBackendUrl(mlBackendUrl);
  //   const otherSettings = { ...project.curr.otherSettings, mlBackendUrl: mlBackendUrl };
  //   project.update(project.curr.projectId, { otherSettings: otherSettings });
  // }

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
            style={{ fontSize: '1.5rem' }}
          >
            <Input placeholder="http://127.0.0.1:1234/model" />
          </Form.Item>
          <Form.Item
            name={'ml_model_abs_path'}
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
            name={'ml_weight_abs_path'}
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
