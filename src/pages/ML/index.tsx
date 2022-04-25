import React, { useState, useEffect, useRef } from 'react';
import { Button, Select, Input, message } from 'antd';
import PPContainer from '@/components/PPContainer';
import PPBlock from '@/components/PPBlock';
import serviceUtils from '@/services/serviceUtils';
import { ProjectUtils } from '@/services/utils';
import { ModelUtils } from '@/services/utils';

const ML: React.FC = () => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const project = ProjectUtils(useState);

  const projectId = serviceUtils.getQueryVariable('projectId');
  const model = ModelUtils(useState);

  const { Option } = Select;

  // ensure projectid
  if (!projectId) {
    if (!alerted) {
      message.error(
        'Machine Learning settings are specific to every project. Please choose a project first.',
      );
      setAlerted(true);
    }
  }
  const projectChanged = (selectedProjectId) => {
    console.log('selectedProjectId', selectedProjectId);
    // todo change ml backend url
    project.getCurr(selectedProjectId);
  };

  // const saveMlSettings = (settings) => {
  //   console.log(settings);
  //   // http://localhost:1234/model
  //   model.setMlBackendUrl(settings.mlBackendUrl);
  //   project.curr.otherSettings = { ...project.curr?.otherSettings, ...settings };
  //   project.update(project.curr.projectId, project.curr);
  // };

  useEffect(() => {
    project.getAll();
  }, []);

  useEffect(() => {
    // console.log('model', model);
    // console.log(model.getAll());
  }, [project.curr]);

  const mlUrl = useRef();

  function saveMlBackendUrl() {
    if (!project.curr) {
      message.error('Please choose a project first!');
      return;
    }
    const mlBackendUrl = mlUrl.current.input.value;
    const otherSettings = { ...project.curr.otherSettings, mlBackendUrl: mlBackendUrl };
    project.update(project.curr.projectId, { otherSettings: otherSettings });
    model.setMlBackendUrl(mlBackendUrl);
  }

  // const selectBefore = (
  //   <Select defaultValue="http://" className="select-before" ref={mlUrlPref}>
  //     <Option value="http://">http://</Option>
  //     <Option value="https://">https://</Option>
  //   </Select>
  // );
  return (
    <PPContainer>
      <PPBlock>
        {'Project:'}
        <Select placeholder="Select a project" onChange={projectChanged}>
          {project.all?.map((proj) => (
            <Option value={proj.projectId}>{proj.name}</Option>
          ))}
        </Select>

        <Input.Group compact>
          <Input
            // addonBefore={selectBefore}
            addonBefore={'ML Backend URL '}
            style={{ width: '80%', textAlign: 'left' }}
            defaultValue="http://localhost:1234/model/"
            ref={mlUrl}
          />
          <Button type="primary" htmlType="submit" onClick={saveMlBackendUrl}>
            Submit
          </Button>
        </Input.Group>

        <br />

        <Input.Group compact>
          {'Model to use: '}
          <Select placeholder="Select a model" onChange={projectChanged}>
            {model.all?.map((mod) => (
              <Option value={mod.name}>{mod.name}</Option>
            ))}
          </Select>
        </Input.Group>
      </PPBlock>
    </PPContainer>
  );
};
export default ML;
