import React from 'react';
import { message } from 'antd';
import { history, useIntl } from 'umi';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, snake2camel } from '@/services/utils';

const Project: React.FC = () => {
  const intl = useIntl();
  const noTaskCategory = intl.formatMessage({ id: 'pages.ProjectDetail.noTaskCategory' });
  const invalidTaskCategory = intl.formatMessage({
    id: 'pages.ProjectDetail.invalidTaskCategory',
  });

  // 1. get taskCategory and ensure exist + valid
  const taskCategory = snake2camel(serviceUtils.getQueryVariable('taskCategory'));

  if (!taskCategory) {
    message.error(noTaskCategory);
    history.push('/');
  }
  if (!(taskCategory in createInfo)) {
    message.error(invalidTaskCategory + ' ' + taskCategory);
    history.push('/');
  }
  return (
    <PPContainer>
      <PPCreater imgSrc="./pics/illustration.jpg" taskCategory={taskCategory} />
    </PPContainer>
  );
};

export default Project;
