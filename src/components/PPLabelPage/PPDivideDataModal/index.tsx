import { Col, Form, InputNumber, message, Modal, Row, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

type PPDivideDataProps = {
  visible?: boolean;
  onCancel?: () => void;
  onFinish?: () => void;
  project: any;
  splitDataset: (
    projectId: number,
    props: { train: number; validation: number; test: number },
  ) => Promise<any>;
};

const Component: React.FC<PPDivideDataProps> = (props) => {
  const intl = useIntl();
  const [trainData, setTrainData] = useState<number>(60);
  const [validationData, setValidationData] = useState<number>(20);
  const [testData, setTestData] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  const divideData = intl.formatMessage({ id: 'pages.toolBar.divideData' });
  const train = intl.formatMessage({ id: 'component.PPDivideDataModal.train' });
  const validation = intl.formatMessage({ id: 'component.PPDivideDataModal.validation' });
  const test = intl.formatMessage({ id: 'component.PPDivideDataModal.test' });
  const cancel = intl.formatMessage({ id: 'component.PPCreater.cancel' });
  const ok = intl.formatMessage({ id: 'component.PPSegMode.ok' });

  const [form] = Form.useForm();

  return (
    <Modal
      className={styles.modal}
      title={divideData}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={() => {
          if (trainData + validationData + testData != 100) {
            message.error('Train, Validation and Test total percent should equal 100!');
            return;
          }
          console.log(
            `x trainData: ${trainData}, validationData: ${validationData}, testData: ${testData}, props.project.curr.projectId: ${props.project.curr.projectId}`,
          );
          setLoading(true);
          props
            .splitDataset(props.project.curr.projectId, {
              train: trainData * 0.01,
              val: validationData * 0.01,
              test: testData * 0.01,
            })
            .then(() => {
              console.log('success');
              message.success(intl.formatMessage({ id: 'component.PPDivideDataModal.success' }));
              props.onFinish?.call(0);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col span={8}>
            <Form.Item label={train} name="train">
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
            <Form.Item label={validation} name="validation">
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
            <Form.Item label={test} name="test">
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
                props.onCancel?.call(0);
                form.resetFields();
              }}
            >
              {cancel}
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {ok}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Component;
