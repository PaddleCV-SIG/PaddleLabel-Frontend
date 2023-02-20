import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import { message } from 'antd';
import { ProjectUtils, ModelUtils, IntlInit, getVersion } from '@/services/utils';
import serviceUtils from '@/services/serviceUtils';
import styles from './index.less';
import { history } from 'umi';
// import { label } from '../../../cypress/support/label';
// import Project from '../../services/web/models/Project';
const { Option } = Select;
// let index = 0;
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
const PaddleAi: React.FC = () => {
  const DEFAULT_ML_URL = 'http://127.0.0.1:1234';
  const intl = IntlInit('pages.ProjectAi');
  // const [frontendId, setFrontendId] = useState<number>(0);
  const [form] = Form.useForm();
  const [modelUrl, setModelUrl] = useState<any>(DEFAULT_ML_URL);
  const [languages, setLanguages] = useState([
    'ch',
    'en',
    'korean',
    'japan',
    'chinese_cht',
    'ta',
    'te',
    'ka',
    'latin',
    'arabic',
    'cyrillic',
    'devanagari',
  ]);
  const project = ProjectUtils(useState);

  const model = ModelUtils(useState, modelUrl);
  const projectId = serviceUtils.getQueryVariable('projectId');

  const handleChange = (value: any) => {
    // setModelSelected(value);
    for (const models of model.all) {
      if (models.name === value) {
        // debugger;
        setLanguages(models?.languages);
      }
    }
  };
  const saveProject = () => {
    const otherSettings = form.getFieldsValue(true);
    if (projectId) {
      const projectIds = Number(projectId);
      project.update(projectIds, { otherSettings: otherSettings }).then(() => {
        history.push(`/project_overview?projectId=${projectId}`);
      });
      project.setAllPredicted(false, projectId);
    }
  };
  useEffect(() => {
    form.setFields([
      {
        name: 'mlBackendUrl',
        value: DEFAULT_ML_URL,
      },
    ]);
  }, []);
  useEffect(() => {
    if (projectId) {
      project.getCurr(projectId);
      model.getAll();
      // label.getAll(projectId);
    }
  }, [projectId]);
  useEffect(() => {
    if (project?.curr?.otherSettings) {
      form.setFieldsValue(project?.curr?.otherSettings);
      // setModelUrl(project?.curr?.otherSettings?.mlBackendUrl);
    }
  }, [project?.curr?.otherSettings]);
  useEffect(() => {
    if (modelUrl) {
      model.setMlBackendUrl(modelUrl);
    }
  }, [modelUrl]);
  useEffect(() => {
    model.getAll();
  }, [model.backendUrl]);
  const onConfirm = () => {
    form
      ?.validateFields()
      .then(async () => {
        // debugger;
        saveProject();
      })
      .catch((errorInfo) => {
        alert(errorInfo);
      });
  };
  const numVersion = (version) => {
    const [major, ...rest] = version.split('.').map(Number);
    const num = rest.reduce((acc, val, index) => {
      const factor = Math.pow(10, (index + 1) * 2);
      return acc + val / factor;
    }, major);
    return num;
  };
  const handleUrlChange = async (value: string) => {
    const errversion = 1.01;
    const versionss: string = (await getVersion()) as string;
    const versions = numVersion(versionss);
    if (versions && errversion > versions) {
      message.error('ml版本过低,请升级到升级');
    }
    form.setFields([
      {
        name: 'mlBackendUrl',
        value: value,
      },
    ]);
    setModelUrl(value);
  };
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
              name="mlBackendUrl"
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
                  message: '该字段为必填项请填写对应信息',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Input
                autoComplete="off"
                size="large"
                // defaultValue={DEFAULT_ML_URL}
                // value={modelUrl}
                // onChange={(e) => {
                //   handleUrlChange(e.target.value);
                // }}
                onBlur={(e) => {
                  handleUrlChange(e.target.value);
                }}
                style={{ height: '3.13rem' }}
              />
            </Form.Item>
            <Form.Item
              name="modelName"
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
                  message: '该字段为必填项请填写对应信息',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Select
                // defaultValue=""
                onChange={handleChange}
                // value={modelSelected}
                style={{
                  width: '100%',
                }}
              >
                {model.all &&
                  model.all?.map((item) => {
                    if (item.name === 'PaddleOCR') {
                      return <Option value={item.name}>{item.name}</Option>;
                    }
                  })}
                {/* <Option value={'PaddleOCR'}>{'PaddleOCR'}</Option> */}
              </Select>
            </Form.Item>
            <Form.Item
              name="lang"
              label={'语言选择'}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                  message: '该字段为必填项请填写对应信息',
                },
              ]}
              style={{ fontSize: '1.5rem' }}
            >
              <Select
                style={{
                  width: '100%',
                }}
              >
                {languages &&
                  languages?.map((item) => {
                    return <Option value={item}>{item}</Option>;
                  })}
              </Select>
            </Form.Item>
          </Form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <div style={{ width: '6rem', marginRight: '2rem' }}>
              <Button block={true} type="primary" onClick={onConfirm}>
                {intl('confirm')}
              </Button>
            </div>
            <div style={{ width: '6rem' }}>
              <Button
                block={true}
                onClick={() => {
                  // setisFlag(() => {
                  //   return false;
                  // });
                  history.push(`/project_overview?projectId=${projectId}`);
                }}
              >
                {intl('goback')}
              </Button>
            </div>
            {/* <div style={{ width: '6rem' }}>
              <Button type="primary" block={true} onClick={saveProject}>
                {intl('determine')}
              </Button>
            </div> */}
          </div>
        </div>
      </PPBlock>
    </PPContainer>
  );
};

export default PaddleAi;
