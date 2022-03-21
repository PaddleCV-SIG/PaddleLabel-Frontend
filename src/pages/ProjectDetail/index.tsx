import React from 'react';
import { message } from 'antd';
import { history, useIntl } from 'umi';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import { createInfo } from '@/services/api';
import serviceUtils from '@/services/serviceUtils';
import { snake2camel } from '@/services/utils';

const Project: React.FC = () => {
  const taskNot = useIntl().formatMessage({ id: 'pages.ProjectDetail.taskNot' });

  // 1. get taskCategory and ensure exist + valid
  const taskCategory = snake2camel(serviceUtils.getQueryVariable('taskCategory'));
  const taskCtg = useIntl().formatMessage(
    { id: 'pages.ProjectDetail.taskCtg' },
    { category: taskCategory },
  );

  if (!taskCategory) {
    message.error(taskNot);
    history.push('/');
  }
  if (!(taskCategory in createInfo)) {
    message.error(taskCtg);
    history.push('/');
  }
  return (
    <PPContainer>
      <PPCreater imgSrc="./pics/illustration.jpg" taskCategory={taskCategory} />
    </PPContainer>
  );
};

export default Project;
