import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Form, message } from 'antd';
import { history } from 'umi';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import serviceUtils from '@/services/serviceUtils';
import { ProjectUtils } from '@/services/utils';
import { ModelUtils, getVersion } from '@/services/utils';
import PPTrainModal from '@/components/ML/PPTrainModal';
import PPExportModal from '@/components/PPProjectOverview/PPExportModal';

const ML: React.FC = () => {
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

  function trainModel(dataDir: string) {
    const s = project.curr.otherSettings;
    model.train(s.perviousModel, dataDir, s.models[s.perviousModel]);
  }
  function runInference() {
    const s = project.curr.otherSettings;
    if (!s || !s.mlBackendUrl || !s.perviousModel) {
      message.error('Please set and save ml settings first.');
      return;
    }
    message.info('Running inference.');
    project
      .predict(project.curr.projectId, {
        mlBackendUrl: s.mlBackendUrl,
        model: s.perviousModel,
        sameServer: false,
        createLabel: true,
      })
      .then(() => {
        message.info('Prediction Complete');
      });
  }

  return (
    <PPContainer>
      <PPBlock>
        {'Project:'}
        <Select
          placeholder="Select a project"
          onChange={(pjid) => project.getCurr(pjid)}
          value={project.curr?.projectId}
        >
          {project.all?.map((proj) => (
            <Option value={proj.projectId}>{proj.name}</Option>
          ))}
        </Select>
      </PPBlock>

      <PPBlock hidden={project.curr == undefined}>
        <PPTrainModal model={model} project={project.curr} trainModel={trainModel} />
        <PPExportModal project={project.curr} />
        <Button
          type={'primary'}
          onClick={() => {
            if (!project.curr?.otherSettings?.mlBackendUrl) {
              message.error('Set backend url first');
              return;
            }
            window.open(
              `${project.curr.otherSettings.mlBackendUrl.replace('model', 'visualdl')}`,
              '_blank',
            );
          }}
        >
          {'Progress'}
        </Button>
        <Button type={'primary'} onClick={runInference}>
          {'Run Inference'}
        </Button>
      </PPBlock>

      <PPBlock>
        <Button
          type={'primary'}
          onClick={() => {
            console.log('pjid', project.curr.projectId);
            history.push(`/${project.curr.taskCategory.name}?projectId=${project.curr.projectId}`);
          }}
        >
          {'Label'}
        </Button>
        <Button
          type={'primary'}
          onClick={() => {
            history.push(`/project_overview?projectId=${project.curr.projectId}`);
          }}
        >
          {'Project Overview'}
        </Button>
      </PPBlock>

      <PPBlock>
        <Form
          form={form}
          layout="horizontal"
          size="large"
          style={{ marginTop: '5.69rem' }}
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
                <Option value={m.name}>{m.name}</Option>
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
              htmlType="submit"
              type="primary"
              style={{ height: '2.5rem', width: '48%' }}
              block
            >
              {'Save'}
            </Button>
          </Form.Item>
        </Form>
      </PPBlock>

      {/* <PPTrainModal
        visible={trainModelVisable}
        trainModel={trainModel}
        onCancel={() => {
          setTrainModelVisable(false);
        }}
        onFinish={() => {
          setTrainModelVisable(false);
        }}
      /> */}
    </PPContainer>
  );
};
export default ML;
