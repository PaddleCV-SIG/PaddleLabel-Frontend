import React from 'react';
import { message } from 'antd';
import { history, useIntl } from 'umi';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, getVersion } from '@/services/utils';

const Project: React.FC = () => {
  getVersion();
  const intl = useIntl();
  const noTaskCategory = intl.formatMessage({ id: 'pages.ProjectDetail.noTaskCategory' });
  const invalidTaskCategory = intl.formatMessage({
    id: 'pages.ProjectDetail.invalidTaskCategory',
  });

  // 1. get taskCategory and ensure exist + valid
  const taskCategory = serviceUtils.getQueryVariable('taskCategory');
  console.log(taskCategory);

  if (!taskCategory) {
    message.error(noTaskCategory);
    history.push('/');
    return;
  }
  if (!(taskCategory in createInfo)) {
    message.error(invalidTaskCategory + ' ' + taskCategory);
    history.push('/');
    return;
  }
  return (
    <PPContainer>
      <PPCreater imgSrc="./pics/illustration.jpg" taskCategory={taskCategory} />
    </PPContainer>
  );
};

export default Project;
