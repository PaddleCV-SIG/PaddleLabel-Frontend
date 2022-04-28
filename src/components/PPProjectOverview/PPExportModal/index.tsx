import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import { exportDataset } from '@/services/utils';
import type { Project } from '@/services/models';

type PPExportProps = {
  project: Project;
  visible?: boolean;
};

const PPExportModal: React.FC<PPExportProps> = (props) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const cancel = intl.formatMessage({ id: 'component.PPCreater.cancel' });

  const [form] = Form.useForm();

  return (
    <span hidden={props.visible == false}>
      <Button type="primary" onClick={() => setVisible(true)}>
        {'Export Dataset'}
      </Button>
      <Modal
        className={styles.modal}
        title={intl.formatMessage({ id: 'component.PPExportModal.title' })}
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
              message.error(intl.formatMessage({ id: 'component.PPExportModal.pathNotNull' }));
              return;
            }
            setLoading(true);
            exportDataset(props.project.projectId, path)
              .then(() => {
                message.success(
                  intl.formatMessage({ id: 'component.PPExportModal.exportSuccess' }),
                );
                setVisible(false);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          autoComplete="off"
        >
          <Form.Item label={intl.formatMessage({ id: 'component.PPExportModal.path' })} name="path">
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
                {cancel}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {intl.formatMessage({ id: 'component.PPExportModal.export' })}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPExportModal;
