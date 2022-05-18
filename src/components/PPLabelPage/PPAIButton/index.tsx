import serviceUtils from '@/services/serviceUtils';
import { ProjectUtils, ModelUtils, getVersion } from '@/services/utils';
import { Col, Form, message, Popover, Row, Select } from 'antd';
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

  return (
    <Popover
      overlayClassName={`${styles.popover} ${styles.popoverLeft}`}
      placement={'left'}
      content={
        <Row>
          <Col span={24}>
            <Select placeholder="Select a model" style={{ padding: '0 4px', width: '100%' }}>
              {model.all?.map((m) => (
                <Option key={m.name} value={m.name}>
                  {m.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
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
