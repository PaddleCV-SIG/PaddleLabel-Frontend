import { Col, Form, InputNumber, message, Modal, Row, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { splitDataset } from '@/services/utils';
import type { Project } from '@/services/models';
import { IntlInitJsx } from '@/components/PPIntl';

type PPSplitDatasetProps = {
  project: Project;
  visible?: boolean;
  onFinish?: () => void;
};

const PPSplitDatasetModal: React.FC<PPSplitDatasetProps> = (props) => {
  const intl = IntlInitJsx('component.PPSplitDataset');
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
        // title={divideData}
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
              message.error(intl('fail'));
              return;
            }
            console.log(
              `x trainData: ${trainData}, validationData: ${validationData}, testData: ${testData}, props.project.curr.projectId: ${props.project.projectId}`,
            );
            setLoading(true);
            splitDataset(props.project.projectId, {
              train: trainData,
              val: validationData,
              test: testData,
            })
              .then(() => {
                message.success(intl('success'));
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
