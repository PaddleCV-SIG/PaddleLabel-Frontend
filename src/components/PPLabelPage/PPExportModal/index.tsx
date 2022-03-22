import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

type PPExportProps = {
  visible?: boolean;
  onCancel?: () => void;
  onFinish?: () => void;
  project: any;
  exportDataset: (projectId: number, path: string) => Promise<any>;
};

const Component: React.FC<PPExportProps> = (props) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);

  const cancel = useIntl().formatMessage({ id: 'component.PPCreater.cancel' });

  const [form] = Form.useForm();

  return (
    <Modal
      className={styles.modal}
      title={useIntl().formatMessage({ id: 'component.PPExportModal.title' })}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={(values) => {
          console.log(values);
          const path = values.path;
          if (!path) {
            message.error(intl.formatMessage({ id: 'component.PPExportModal.pathNotNull' }));
            return;
          }
          setLoading(true);
          props
            .exportDataset(props.project.curr.projectId, path)
            .then(() => {
              message.success(intl.formatMessage({ id: 'component.PPExportModal.exportSuccess' }));
              props.onFinish?.call(0);
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
                props.onCancel?.call(0);
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
  );
};
export default Component;
