import { useState } from 'react';
import { Modal, Form, Input, Button, Col, Row, Divider, message, Space, Tooltip } from 'antd';
import { ChromePicker, ColorResult } from 'react-color';

const FormItem = Form.Item;

type MyModalProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: { name: string; color: string }) => void;
};

const MyModal: React.FC<MyModalProps> = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>('#FFFFFF');

  const handleColorPickerChange = (color: ColorResult) => {
    form.setFieldsValue({ color });
    setCurrentColor(color.hex);
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      onSave({ name: values.name, color: currentColor });
      form.resetFields();
    } catch (error) {
      console.log('Save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave} loading={isSubmitting}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <FormItem
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input placeholder="Enter name" />
        </FormItem>
        <FormItem
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please choose a color' }]}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <Tooltip title="Choose a color">
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '2px',
                      background: currentColor,
                    }}
                  ></div>
                </Tooltip>
                <span onClick={() => setColorPickerVisible(true)}>Click to choose a color</span>
              </Space>
            </Col>
          </Row>
        </FormItem>
        <Divider />
        <FormItem>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ display: colorPickerVisible ? 'block' : 'none' }}>
                <ChromePicker color={currentColor} onChange={handleColorPickerChange} />
              </div>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default MyModal;
