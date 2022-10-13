import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import { ProjectUtils, ModelUtils } from '@/services/utils';
import serviceUtils from '@/services/serviceUtils';
import styles from './index.less';
import { v4 as uuid } from 'uuid';
import { history } from 'umi';
// import { label } from '../../../cypress/support/label';
// import Project from '../../services/web/models/Project';
const { Option } = Select;
const { TextArea } = Input;
let index = 0;
const PaddleAi: React.FC = () => {
  const DEFAULT_ML_URL = 'http://127.0.0.1:1234';
  //   const intl = IntlInit('component.PPCreater');
  const [form] = Form.useForm();
  const [modelUrl, setModelUrl] = useState(DEFAULT_ML_URL);
  const [modelSelected, setModelSelected] = useState();
  const [isFlag, setisFlag] = useState<Boolean>(true);
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [name, setName] = useState('');
  const [name2, setName2] = useState('');
  const [labels, setLabels] = useState('');
  const [labels2, setLabels2] = useState('');
  const [labelItem, setlabelItem] = useState([]);
  const inputRef = useRef<InputRef>(null);
  const inputRef2 = useRef<InputRef>(null);
  const project = ProjectUtils(useState);
  const port = window.location.port == '8000' ? '1234' : window.location.port;
  const baseUrl = `http://${window.location.hostname}:${port}/`;
  const model = ModelUtils(useState, baseUrl);
  const projectId = serviceUtils.getQueryVariable('projectId');
  useEffect(() => {
    if (projectId) {
      project.getCurr(projectId);
      model.getAll();
    }
  }, [projectId]);
  const handleChange = (value: string) => {
    console.log(`modelSelected ${value}`);
    setModelSelected(value);
  };
  const handleUrlChange = (value: string) => {
    console.log(`Urlselected ${value}`);
    setModelUrl(value);
  };
  const multipleChange = (value: string | string[]) => {
    console.log(`multipleChange: ${value}`);
    setLabels(value);
  };
  const multipleChange2 = (value: string | string[]) => {
    console.log(`multipleChange2: ${value}`);
    setLabels2(value);
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onNameChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName2(event.target.value);
  };
  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const addItem2 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setItems2([...items2, name2 || `New item ${index++}`]);
    setName2('');
    setTimeout(() => {
      inputRef2.current?.focus();
    }, 0);
  };
  const addLabel = () => {
    console.log('labels', labels, labels2);

    if (labels && labels2) {
      setlabelItem((labelItems) => {
        return [
          ...labelItems,
          {
            id: uuid(),
            model: labels,
            project: labels2,
          },
        ];
      });
      setLabels('');
      setLabels2('');
    }
  };
  const deleteItems = (id) => {
    const newLabelItems = labelItem.filter((item) => {
      return item.id !== id;
    });
    setlabelItem(newLabelItems);
  };
  const saveProject = () => {
    // setLoading(true);
    const otherSettings = {
      mlBackendUrl: 'http://localhost:1234',
      modelName: modelSelected,
      label_mapping: labelItem,
    };
    // if (values.segMaskType) otherSettings.segMaskType = values.segMaskType;
    console.log('otherSettings', otherSettings);
    // const values = project.curr;
    project.update(projectId, { otherSettings: otherSettings }).then(() => {
      history.push(`/project_overview?projectId=${projectId}`);
    });
  };
  return (
    <PPContainer>
      <PPBlock style={{ height: '100%' }}>
        <div>
          <Form
            form={form}
            layout="horizontal"
            size="large"
            style={{ marginTop: '5.69rem' }}
            // onFinish={(values) => {
            //   saveProject(values);
            // }}
          >
            <Form.Item
              name="name"
              label={'机器学习后端网址'}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input project name!',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Input
                autoComplete="off"
                size="large"
                defaultValue={DEFAULT_ML_URL}
                value={modelUrl}
                onChange={handleUrlChange}
                style={{ height: '3.13rem' }}
              />
            </Form.Item>
            <Form.Item
              name="dataDir"
              label={'模型选择'}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input dataset path!',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <Select
                  defaultValue=""
                  onChange={handleChange}
                  value={modelSelected}
                  style={{
                    width: '100%',
                  }}
                >
                  {model.all &&
                    model.all?.map((item) => {
                      return <Option value={item.name}>{item.name}</Option>;
                    })}
                </Select>
              </div>
            </Form.Item>
            <Form.Item
              name="dataDir"
              label={'使用预标注模型标签'}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input dataset path!',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <div
                style={{
                  display: 'flex',
                }}
              >
                <div style={{ width: '6rem', marginRight: '2rem' }}>
                  <Button
                    type="primary"
                    block={true}
                    onClick={() => {
                      setisFlag(() => {
                        return true;
                      });
                    }}
                  >
                    {'是'}
                  </Button>
                </div>
                <div style={{ width: '6rem' }}>
                  <Button
                    block={true}
                    onClick={() => {
                      setisFlag(() => {
                        return false;
                      });
                    }}
                  >
                    {'否'}
                  </Button>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="textArea"
              label={'标签对应关系'}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: false,
                  message: 'Please input dataset path!',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              {isFlag ? (
                <TextArea
                  rows={5}
                  defaultValue={
                    '接受预标注模型标签后，当模型检测到新标签后，会自动在标签列表中增加该标签'
                  }
                />
              ) : (
                <div className={styles.Corresponding_list_content}>
                  {labelItem.map((item) => {
                    return (
                      <div className={styles.Corresponding_list} key={item.id}>
                        <div className={styles.Corresponding_li}>
                          <div className={styles.Corresponding_label1}>
                            {item.model.map((models, modelIndex) => {
                              return (
                                <div className={styles.label} key={modelIndex}>
                                  {models}
                                </div>
                              );
                            })}
                          </div>
                          <div className={styles.Corresponding_label2}>
                            {item.project.map((projects, indexs) => {
                              return (
                                <div className={styles.label} key={indexs}>
                                  {projects}
                                </div>
                              );
                            })}
                          </div>
                          <div
                            className={styles.Corresponding_button}
                            onClick={() => {
                              deleteItems(item.id);
                            }}
                          >
                            删除
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className={styles.Corresponding_select_content}
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div className={styles.Corresponding_select}>
                      <div
                        style={{
                          width: '200px',
                        }}
                      >
                        <Select
                          style={{ width: 200 }}
                          mode="multiple"
                          placeholder="custom dropdown render"
                          value={labels ? (labels + '').split(',') : undefined}
                          onChange={multipleChange}
                          dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider style={{ margin: '8px 0' }} />
                              <Space style={{ padding: '0 8px 4px' }}>
                                <Input
                                  placeholder="Please enter item"
                                  ref={inputRef}
                                  value={name}
                                  onChange={onNameChange}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                  Add
                                </Button>
                              </Space>
                            </>
                          )}
                        >
                          {items.map((item) => (
                            <Option key={item}>{item}</Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className={styles.Corresponding_select}>
                      <div
                        style={{
                          width: '200px',
                        }}
                      >
                        <Select
                          style={{ width: 200 }}
                          mode="multiple"
                          placeholder="custom dropdown render"
                          onChange={multipleChange2}
                          value={labels2 ? (labels2 + '').split(',') : undefined}
                          dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider style={{ margin: '8px 0' }} />
                              <Space style={{ padding: '0 8px 4px' }}>
                                <Input
                                  placeholder="Please enter item"
                                  ref={inputRef2}
                                  value={name2}
                                  onChange={onNameChange2}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem2}>
                                  Add
                                </Button>
                              </Space>
                            </>
                          )}
                        >
                          {items2.map((item) => (
                            <Option key={item}>{item}</Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className={styles.Corresponding_button} onClick={addLabel}>
                      添加
                    </div>
                  </div>
                </div>
              )}
            </Form.Item>
          </Form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <div style={{ width: '6rem', marginRight: '2rem' }}>
              <Button
                block={true}
                onClick={() => {
                  setisFlag(() => {
                    return false;
                  });
                }}
              >
                {'返回'}
              </Button>
            </div>
            <div style={{ width: '6rem' }}>
              <Button type="primary" block={true} onClick={saveProject}>
                {'确定'}
              </Button>
            </div>
          </div>
        </div>
      </PPBlock>
    </PPContainer>
  );
};

export default PaddleAi;