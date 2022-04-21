import { Form, Input, message, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

type PPImportProps = {
  visible?: boolean;
  onCancel?: () => void;
  onFinish?: () => void;
  project: any;
  importDataset: (projectId: number, path: string) => Promise<any>;
};

const Component: React.FC<PPImportProps> = (props) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);

  const cancel = intl.formatMessage({ id: 'component.PPCreater.cancel' });

  const [form] = Form.useForm();

  return (
    <Modal
      className={styles.modal}
      title={'Import Additional Data'}
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
            .importDataset(props.project.curr.projectId, path)
            .then(() => {
              props.onFinish?.call(0);
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
                props.onCancel?.call(0);
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
  );
};
export default Component;
