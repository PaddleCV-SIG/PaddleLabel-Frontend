import { Form, Input, message, Modal, Space } from 'antd';
import { Button, Radio } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { createInfo, exportDataset, IntlInit, snake2camel } from '@/services/utils';
import type { Project } from '@/services/web/models/';
import { IntlInitJsx } from '@/components/PPIntl';

type PPExportProps = {
  project: Project;
  visible?: boolean;
};

const PPExportModal: React.FC<PPExportProps> = (props) => {
  const intl = IntlInit('component.PPExportModal');
  const intlJsx = IntlInitJsx('component.PPExportModal');
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  return (
    <span hidden={props.visible == false}>
      <Button type="primary" onClick={() => setVisible(true)}>
        {intlJsx('title')}
      </Button>
      <Modal
        className={styles.modal}
        title={intlJsx('title')}
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
            console.log('values', values);
            setLoading(true);
            exportDataset(props.project.projectId, values.path, values.labelFormat)
              .then(() => {
                message.success(intlJsx('exportSuccess'));
                setVisible(false);
              })
              .catch((err) => {
                console.log(err);
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
            <Input />
            {/* autoComplete="off" */}
          </Form.Item>

          <Form.Item
            name="labelFormat"
            label={<p>{intlJsx('labelFormat')} </p>}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: intlJsx('nullLabelFormat') }]}
            style={{
              fontSize: '1.5rem',
              // display:
              //   createInfo[props.taskCategory].labelFormats != undefined ? undefined : 'none',
            }}
          >
            <Radio.Group size="large" style={{ height: '3.13rem' }}>
              {(props.project && createInfo[props.project?.taskCategory?.name]?.labelFormats
                ? Object.keys(createInfo[props.project?.taskCategory?.name]?.labelFormats)
                : []
              ).map((k) => (
                <Radio key={k} value={k}>
                  {intlJsx(snake2camel(k), 'global.labelFormat')}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                onClick={() => {
                  setVisible(false);
                  form.resetFields();
                }}
              >
                {intlJsx('cancel', 'global')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {intlJsx('export')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPExportModal;
