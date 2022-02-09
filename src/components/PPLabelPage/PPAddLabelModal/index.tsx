import { Form, Input, Modal, Space } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import PPColorBall from '../PPColorBall';
import type { Label } from '../PPLabelList';

export type PPLabelListProps = {
  visible?: boolean;
  defaultLabel?: Label;
  onLabelAdd: (addedLabel: Label) => void;
  onCancel?: () => void;
};

// const generatedColorList: string[] = [
//   '#FF0000',
//   '#008000',
//   '#0000FF',
//   '#FFFF00',
//   '#FFA500',
//   '#00FFFF',
//   '#8B00FF',
//   '#FFC0CB',
//   '#7CFC00',
//   '#007FFF',
//   '#800080',
//   '#36BF36',
//   '#DAA520',
//   '#800000',
//   '#008B8B',
//   '#B22222',
//   '#E6D933',
//   '#000080',
//   '#FF00FF',
//   '#FFFF99',
//   '#87CEEB',
//   '#5C50E6',
//   '#CD5C5C',
//   '#20B2AA',
//   '#E680FF',
//   '#4D1F00',
//   '#006374',
//   '#B399FF',
//   '#8B4513',
//   '#BA55D3',
//   '#C0C0C0',
//   '#808080',
//   '#000000',
// ];

const Component: React.FC<PPLabelListProps> = (props) => {
  const defaultLabel = props.defaultLabel;
  const [addModalVisible, setAddLabelModalVisible] = useState(props.visible);
  const [newLabelColor, setNewLabelColor] = useState<string>(defaultLabel?.color || '#FF0000');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newLabelName, setNewLabelName] = useState<string>(defaultLabel?.name || '');
  return (
    <Modal title="Add Label" visible={addModalVisible} onCancel={props.onCancel} footer={null}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={(values) => {
          const newLabel: Label = {
            name: values.labelname,
            color: newLabelColor,
          };
          props.onLabelAdd(newLabel);
          setAddLabelModalVisible(false);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Label Name"
          name="labelname"
          rules={[{ required: true, message: 'Please input label name!' }]}
        >
          <Input defaultValue={newLabelName} />
        </Form.Item>

        <Form.Item
          label="Select Color"
          name="color"
          rules={[{ required: true, message: 'Please select color!' }]}
        >
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
                setAddLabelModalVisible(false);
                props.onCancel?.call(0);
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
