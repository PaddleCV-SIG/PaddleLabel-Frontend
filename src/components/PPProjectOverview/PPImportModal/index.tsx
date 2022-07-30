import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { importDataset, IntlInit } from '@/services/utils';
import type { Project } from '@/services/models';

type PPImportProps = {
  project: Project;
  onFinish?: () => void;
  visible?: boolean;
};

const PPImportModal: React.FC<PPImportProps> = (props) => {
  const intl = IntlInit('component.PPImportModal');

  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const [form] = Form.useForm();

  return (
    <span hidden={props.visible == false}>
      <Button type="primary" onClick={() => setVisible(true)}>
        {intl('title')}
      </Button>
      <Modal
        className={styles.modal}
        title={intl('title')}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={(values) => {
            const path = values.path;
            if (!path) {
              message.error(intl('nullPath'));
              return;
            }
            setLoading(true);
            importDataset(props.project.projectId, path)
              .then(() => {
                setVisible(false);
                props.onFinish();
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          autoComplete="off"
        >
          <Form.Item label={intl('path')} name="path">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                onClick={() => {
                  setVisible(false);
                  form.resetFields();
                }}
              >
                {intl('cancel', 'global')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {intl('import')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPImportModal;
