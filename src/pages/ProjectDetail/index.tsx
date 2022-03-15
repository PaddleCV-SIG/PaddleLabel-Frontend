import React from 'react';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import { createInfo } from '@/services/api';
import serviceUtils from '@/services/serviceUtils';
import { snake2camel } from '@/services/api';
import { message } from 'antd';
import { history } from 'umi';

const Project: React.FC = () => {
  let taskCategory = serviceUtils.getQueryVariable('taskCategory');
  let mode = serviceUtils.getQueryVariable('mode'); // create | edit
  if (!mode) mode = 'create';

  if (!taskCategory) {
    message.error('Task Category not present in url');
    history.push('/project_creation');
    return <div />;
  }
  taskCategory = snake2camel(taskCategory);
  console.log('In', taskCategory, createInfo, taskCategory in createInfo);
  console.log('taskCategory', taskCategory);
  if (!(taskCategory in createInfo)) {
    message.error('Invalid task category ' + taskCategory);
    history.push('/project_creation');
    return <div />;
  }

  if (mode == 'create') {
    const info = createInfo[taskCategory];
    return (
      <PPContainer>
        <PPCreater
          title={info['name']}
          imgSrc="./pics/illustration.jpg"
          taskCategory={taskCategory}
        />
      </PPContainer>
    );
  }
};

export default Project;
