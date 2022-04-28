import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import { importDataset } from '@/services/utils';
import type { Project } from '@/services/models';

type PPImportProps = {
  project: Project;
  onFinish?: () => void;
  visible?: boolean;
};

const PPImportModal: React.FC<PPImportProps> = (props) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const cancel = intl.formatMessage({ id: 'component.PPCreater.cancel' });

  const [form] = Form.useForm();

  return (
    <span hidden={props.visible == false}>
      <Button type="primary" onClick={() => setVisible(true)}>
        {'Import Additional Data'}
      </Button>
      <Modal
        className={styles.modal}
        title={'Import Additional Data'}
        visible={visible}
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
          <Form.Item label={'Dataset Path'} name="path">
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
                {'Import'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPImportModal;
