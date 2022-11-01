import { Form, Input, Modal, Space, Radio } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { importDataset, IntlInit, snake2camel, createInfo } from '@/services/utils';
import type { Project } from '@/services/models';
import { IntlInitJsx } from '@/components/PPIntl';

type PPImportProps = {
  project: Project;
  onFinish?: () => void;
  visible?: boolean;
};

const PPImportModal: React.FC<PPImportProps> = (props) => {
  const intl = IntlInit('component.PPImportModal');
  const intlJsx = IntlInitJsx('component.PPImportModal');

  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const taskCategory = snake2camel(props.project?.taskCategory?.name);
  const labelFormats =
    taskCategory && createInfo[taskCategory]?.labelFormats
      ? Object.keys(createInfo[taskCategory].labelFormats)
      : [];

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
            setLoading(true);
            importDataset(props.project.projectId, values.path, values.labelFormat)
              .then(() => {
                setLoading(false);
                setVisible(false);
                props.onFinish();
              })
              .catch(() => {
                setLoading(false);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          autoComplete="off"
        >
          <Form.Item
            label={intl('path')}
            name="path"
            rules={[{ required: true, message: intlJsx('nullPath') }]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="labelFormat"
            label={intlJsx('labelFormat')}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            // rules={[{ required: true, message: intlJsx('nullLabelFormat') }]}
            style={{ fontSize: '1.5rem' }}
          >
            <Radio.Group size="large" style={{ height: '3.13rem' }}>
              {labelFormats.map((k) => (
                <Radio key={k} value={k}>
                  {intlJsx(snake2camel(k), 'global.labelFormat')}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item>
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
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPImportModal;
