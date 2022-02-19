import { Form, Input, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import PPColorBall from '../PPColorBall';
import type { Label } from '../PPLabelList';

export type PPAddLabelProps = {
  order?: number;
  visible?: boolean;
  defaultLabel?: Label;
  onLabelAdd: (addedLabel: Label) => void;
  onCancel?: () => void;
};

const generatedColorList: string[] = [
  '#FF0000',
  '#008000',
  '#0000FF',
  '#FFFF00',
  '#FFA500',
  '#00FFFF',
  '#8B00FF',
  '#FFC0CB',
  '#7CFC00',
  '#007FFF',
  '#800080',
  '#36BF36',
  '#DAA520',
  '#800000',
  '#008B8B',
  '#B22222',
  '#E6D933',
  '#000080',
  '#FF00FF',
  '#FFFF99',
  '#87CEEB',
  '#5C50E6',
  '#CD5C5C',
  '#20B2AA',
  '#E680FF',
  '#4D1F00',
  '#006374',
  '#B399FF',
  '#8B4513',
  '#BA55D3',
  '#C0C0C0',
  '#808080',
  '#000000',
];

const Component: React.FC<PPAddLabelProps> = (props) => {
  const [newLabelColor, setNewLabelColor] = useState<string>(
    props.defaultLabel?.color || generatedColorList[props.order || 0],
  );
  useEffect(() => {
    setNewLabelColor(props.defaultLabel?.color || generatedColorList[props.order || 0]);
  }, [props]);

  const [form] = Form.useForm();

  return (
    <Modal title="Add Label" visible={props.visible} onCancel={props.onCancel} footer={null}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false, labelname: props.defaultLabel?.name }}
        onFinish={(values) => {
          const newLabel: Label = {
            name: values.labelname,
            color: newLabelColor,
          };
          props.onLabelAdd(newLabel);
          form.resetFields();
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Label Name"
          name="labelname"
          rules={[{ required: true, message: 'Please input label name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Select Color" name="color">
          <PPColorBall
            color={newLabelColor}
            onChange={(color) => {
              setNewLabelColor(color.hex);
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button
              onClick={() => {
                props.onCancel?.call(0);
                form.resetFields();
              }}
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Component;
