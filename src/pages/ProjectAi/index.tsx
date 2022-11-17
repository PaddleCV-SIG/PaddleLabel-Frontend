import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import type { InputRef } from 'antd';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import { ProjectUtils, ModelUtils, LabelUtils, IntlInit } from '@/services/utils';
import serviceUtils from '@/services/serviceUtils';
import styles from './index.less';
import { v4 as uuid } from 'uuid';
import { history } from 'umi';
// import { label } from '../../../cypress/support/label';
// import Project from '../../services/web/models/Project';
const { Option } = Select;
const { TextArea } = Input;
// let index = 0;
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
const PaddleAi: React.FC = () => {
  const DEFAULT_ML_URL = 'http://127.0.0.1:1234';
  const intl = IntlInit('pages.ProjectAi');
  const [frontendId, setFrontendId] = useState<number>(0);
  const [form] = Form.useForm();
  const [modelUrl, setModelUrl] = useState(DEFAULT_ML_URL);
  const [modelSelected, setModelSelected] = useState();
  const [isFlag, setisFlag] = useState<Boolean>(true);
  // const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  // const [name, setName] = useState('');
  const [name2, setName2] = useState('');
  const [labels, setLabels] = useState('');
  const [labelOption, setLabelOption] = useState([]);
  const [labels2, setLabels2] = useState('');
  const [labelItem, setlabelItem] = useState([]);
  // const inputRef = useRef<InputRef>(null);
  const inputRef2 = useRef<InputRef>(null);
  const project = ProjectUtils(useState);
  // const port = window.location.port == '8000' ? '1234' : window.location.port;
  // const port = 17995;
  // const baseUrl = `http://${window.location.hostname}:${port}/`;
  // const baseUrl = modelUrl;

  const model = ModelUtils(useState, modelUrl);
  const projectId = serviceUtils.getQueryVariable('projectId');
  console.log('FrontendId', frontendId);

  const preCurrLabelUnset = () => {
    // annotation.setCurr(undefined);
    setFrontendId(0);
  };
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
    const labelOptions = labelOption.filter((item) => {
      return item !== value;
    });
    setLabelOption(labelOptions);
  };
  const multipleChange2 = (value: string | string[]) => {
    console.log(`multipleChange2: ${value}`);
    setLabels2(value);
  };
  // const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };
  const onNameChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName2(event.target.value);
  };
  // const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   setItems([...items, name || `New item ${index++}`]);
  //   setName('');
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };
  const addLabel = () => {
    console.log('labels', labels, labels2);

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
  };
  const deleteItems = (id: string, modelName: string) => {
    const newLabelItems = labelItem.filter((item) => {
      return item.id !== id;
    });
    setlabelItem(newLabelItems);
    setLabelOption([...labelOption, modelName]);
  };
  const label = LabelUtils(useState, {
    oneHot: true,
    postSelect: () => {
      //   annotation.setCurr(undefined);
      setFrontendId(0);
    },
    preUnsetCurr: preCurrLabelUnset,
  });
  const onLabelAdd = (lab) => {
    label.create({ ...lab, projectId: project.curr.projectId }).then((newLabel) => {
      label.setCurr(newLabel);
    });
  };
  const addLabels = () => {
    const labelIdMap = new Map();
    label.all.forEach((labelItems) => {
      labelIdMap.set(labelItems.labelId, '');
    });
    items2.forEach((items) => {
      if (!items.labelId) {
        onLabelAdd(items);
      }
    });
  };
  const addItem2 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lab = {
      name: name2,
      color: generatedColorList[items2.length || 0],
    };
    const labelIdMap = new Map();
    items2.forEach((labelItems) => {
      labelIdMap.set(labelItems.name, '');
    });
    if (!labelIdMap.has(name2)) {
      setItems2((item) => {
        return [...item, lab];
      });
    }

    // onLabelAdd();
    setName2('');
    setTimeout(() => {
      inputRef2.current?.focus();
    }, 0);
  };
  const saveProject = () => {
    // setLoading(true);
    const otherSettings = {
      mlBackendUrl: 'http://localhost:1234',
      modelName: modelSelected,
      labelMapping: labelItem,
    };
    // if (values.segMaskType) otherSettings.segMaskType = values.segMaskType;
    console.log('otherSettings', otherSettings);
    // const values = project.curr;
    project.update(projectId, { otherSettings: otherSettings }).then(() => {
      addLabels();
      history.push(`/project_overview?projectId=${projectId}`);
    });
    project.setAllPredicted(false, projectId);
  };
  useEffect(() => {
    if (modelUrl) {
      model.setMlBackendUrl(modelUrl);
    }
  }, [modelUrl, model.setMlBackendUrl]);
  useEffect(() => {
    model.getAll();
  }, [model.backendUrl]);
  useEffect(() => {
    if (projectId) {
      project.getCurr(projectId);
      model.getAll();
      label.getAll(projectId);
    }
  }, [projectId]);
  useEffect(() => {
    if (label.all) {
      setItems2(label.all);
    }
  }, [label.all]);
  useEffect(() => {
    if (modelSelected) {
      for (const models of model.all) {
        console.log('models', models);

        if (models.name === modelSelected) {
          if (models.labelNames) {
            setLabelOption(models.labelNames);
          }
        }
      }
    }
  }, [modelSelected]);
  return (
    <PPContainer>
      <PPBlock style={{ height: '100%' }}>
        {/* <div
          style={{
            textAlign: 'left',
          }}
        >
          
        </div> */}
        {/* <div className={styles.DirectoryTitle}>{intl('title')}</div> */}
        <Title className={styles.title}>{intl('title')}</Title>
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
                  {/* {model.all &&
                    model.all?.map((item) => {
                      return <Option value={item.name}>{item.name}</Option>;
                    })} */}
                  {project?.curr?.taskCategory?.name === 'detection' ? (
                    <Option value="PicoDet">PicoDet</Option>
                  ) : (
                    <Option value="PPLCNetV2">PPLCNetV2</Option>
                  )}
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
                    type={isFlag ? 'primary' : 'default'}
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
                    type={!isFlag ? 'primary' : 'default'}
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
                  {labelItem.map((item, labelItemIndex) => {
                    return (
                      <div className={styles.Corresponding_list} key={item.id}>
                        <div className={styles.Corresponding_li}>
                          <div className={styles.Corresponding_label1}>
                            {/* {item.model.map((models, modelIndex) => {
                              return (
                                <div className={styles.label} key={modelIndex}>
                                  {models}
                                </div>
                              );
                            })} */}
                            <div className={styles.label} key={labelItemIndex}>
                              {item.model}
                            </div>
                          </div>
                          <div className={styles.Corresponding_label2}>
                            <div className={styles.label}>{item.project}</div>
                          </div>
                          <Button
                            size={'small'}
                            type="primary"
                            danger
                            onClick={() => {
                              deleteItems(item.id, item.model);
                            }}
                          >
                            {intl('delete')}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className={styles.Corresponding_select_content}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div className={styles.Corresponding_select}>
                      <div
                        style={{
                          width: '200px',
                        }}
                      >
                        <Select
                          defaultValue=""
                          onChange={multipleChange}
                          value={labels}
                          style={{
                            width: '100%',
                          }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                        >
                          {labelOption &&
                            labelOption?.map((item) => {
                              return <Option value={item}>{item}</Option>;
                            })}
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
                          // mode="multiple"
                          placeholder="custom dropdown render"
                          onChange={multipleChange2}
                          value={labels2}
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
                          {items2.map((item) => {
                            return (
                              <Option value={item.name} key={item.id}>
                                {item.name}
                              </Option>
                            );
                          })}
                          {/* {label.all?.map((item) => {
                            return (
                              <Option value={item.name} key={item.id}>
                                {item.name}
                              </Option>
                            );
                          })} */}
                        </Select>
                      </div>
                    </div>
                    <Button size={'small'} type="primary" danger onClick={addLabel}>
                      {intl('add')}
                    </Button>
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
              <Button block={true} type="primary" onClick={saveProject}>
                {intl('confirm')}
              </Button>
            </div>
            <div style={{ width: '6rem' }}>
              <Button
                block={true}
                onClick={() => {
                  setisFlag(() => {
                    return false;
                  });
                  history.push(`/project_overview?projectId=${projectId}`);
                }}
              >
                {intl('goback')}
              </Button>
            </div>
          </div>
        </div>
      </PPBlock>
    </PPContainer>
  );
};

export default PaddleAi;
