import { Form, Input, Modal, Space, message } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import type { Project } from '@/services/models';

import styles from './index.less';

type PPTrainProps = {
  visible?: boolean;
  trainModel: (dataDir: string) => void;
  model: any;
  project: Project;
};

const PPTrainModal: React.FC<PPTrainProps> = (props) => {
  const intl = useIntl();
  const [visible, setVisible] = useState<boolean>(false);

  const cancel = intl.formatMessage({ id: 'component.PPCreater.cancel' });

  const [form] = Form.useForm();

  function ensureTrainSettings() {
    const s = props.project.otherSettings;
    if (s?.perviousModel && s?.models && s?.models[s?.perviousModel]) return true;
    message.error('Please set and save ML settings first!');
    return false;
  }

  return (
    <span hidden={props.visible == false}>
      <Button
        type="primary"
        onClick={() => {
          if (ensureTrainSettings()) setVisible(true);
        }}
      >
        {'Train Model'}
      </Button>
      <Modal
        className={styles.modal}
        title={'Train Model'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={(values) => {
            const path = values.path;
            props.trainModel(path);
            setVisible(false);
          }}
          autoComplete="off"
        >
          <Form.Item
            label={'Dataset Path'}
            name="path"
            rules={[
              {
                required: true,
                message: 'Please input dataset path',
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                onClick={() => {
                  setVisible(false);
                  form.resetFields();
                }}
              >
                {cancel}
              </Button>
              <Button type="primary" htmlType="submit">
                {'Train'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPTrainModal;
