import { Col, Form, InputNumber, message, Modal, Row, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
// import type { ProjectUtils } from '@/services/utils';
import { IntlInitJsx } from '@/components/PPIntl';

type PPSplitDatasetProps = {
  project: any; // ProjectUtils's return
  visible?: boolean;
  onFinish?: () => void;
};

const PPSplitDatasetModal: React.FC<PPSplitDatasetProps> = (props) => {
  const intl = IntlInitJsx('component.PPSplitDatasetModal');
  const [visible, setVisible] = useState<boolean>(false);
  const [trainData, setTrainData] = useState<number>(60);
  const [validationData, setValidationData] = useState<number>(20);
  const [testData, setTestData] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

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
        width="50rem"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: false }}
          onFinish={() => {
            if (trainData + validationData + testData != 100) {
              message.error(intl('not100'));
              return;
            }
            setLoading(true);
            props.project
              .splitDataset({ train: trainData, val: validationData, test: testData })
              .then(() => {
                setVisible(false);
              })
              .finally(() => {
                if (props.onFinish) props.onFinish();
                setLoading(false);
              });
          }}
          autoComplete="off"
          layout="vertical"
        >
          <Row>
            <Col span={8}>
              <Form.Item label={intl('train')} name="train">
                <InputNumber
                  addonAfter="%"
                  defaultValue={60}
                  precision={0}
                  min={0}
                  max={100}
                  value={trainData}
                  onChange={setTrainData}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={intl('validation')} name="validation">
                <InputNumber
                  addonAfter="%"
                  defaultValue={20}
                  precision={0}
                  min={0}
                  max={100}
                  value={validationData}
                  onChange={setValidationData}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={intl('test')} name="test">
                <InputNumber
                  addonAfter="%"
                  defaultValue={20}
                  precision={0}
                  min={0}
                  max={100}
                  value={testData}
                  onChange={setTestData}
                />
              </Form.Item>
            </Col>
          </Row>

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
                {intl('ok', 'global')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </span>
  );
};
export default PPSplitDatasetModal;
