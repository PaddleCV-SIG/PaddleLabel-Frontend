import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { exportDataset, IntlInit } from '@/services/utils';
import type { Project } from '@/services/web/models/';

type PPExportProps = {
  project: Project;
  visible?: boolean;
};

const PPExportModal: React.FC<PPExportProps> = (props) => {
  const intl = IntlInit('component.PPExportModal');
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
            if (!path) {
              message.error(intl('nullPath'));
              return;
            }
            setLoading(true);
            exportDataset(props.project.projectId, path)
              .then(() => {
                message.success(intl('exportSuccess'));
                setVisible(false);
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
                {intl('export')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPExportModal;
