import { Col, Form, InputNumber, message, Modal, Row, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import { splitDataset } from '@/services/utils';
import type { Project } from '@/services/models';

type PPSplitDatasetProps = {
  project: Project;
  visible?: boolean;
};

const PPSplitDatasetModal: React.FC<PPSplitDatasetProps> = (props) => {
  const intl = useIntl();
  const [visible, setVisible] = useState<boolean>(false);
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
    <span hidden={props.visible == false}>
      <Button type="primary" onClick={() => setVisible(true)}>
        {'Split Dataset'}
      </Button>
      <Modal
        className={styles.modal}
        title={divideData}
        visible={visible}
        onCancel={() => setVisible(false)}
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
              `x trainData: ${trainData}, validationData: ${validationData}, testData: ${testData}, props.project.curr.projectId: ${props.project.projectId}`,
            );
            setLoading(true);
            splitDataset(props.project.projectId, {
              train: trainData * 0.01,
              val: validationData * 0.01,
              test: testData * 0.01,
            })
              .then(() => {
                message.success(intl.formatMessage({ id: 'component.PPDivideDataModal.success' }));
                setVisible(false);
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
                  setVisible(false);
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
    </span>
  );
};
export default PPSplitDatasetModal;
