import React from 'react';
import { message } from 'antd';
import { history } from 'umi';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import { createInfo } from '@/services/api';
import serviceUtils from '@/services/serviceUtils';
import { snake2camel } from '@/services/utils';

const Project: React.FC = () => {
  // 1. get taskCategory and ensure exist + valid
  const taskCategory = snake2camel(serviceUtils.getQueryVariable('taskCategory'));
  if (!taskCategory) {
    message.error('Task Category not present in url');
    history.push('/');
  }
  if (!(taskCategory in createInfo)) {
    message.error('Invalid task category ' + taskCategory);
    history.push('/');
  }
  return (
    <PPContainer>
      <PPCreater imgSrc="./pics/illustration.jpg" taskCategory={taskCategory} />
    </PPContainer>
  );
};

export default Project;
