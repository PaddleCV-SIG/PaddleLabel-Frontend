import React from 'react';
import { message } from 'antd';
import { history } from 'umi';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import serviceUtils from '@/services/serviceUtils';
import { createInfo, getVersion, IntlInit } from '@/services/utils';

const Project: React.FC = () => {
  getVersion();
  const intl = IntlInit('pages.projectDetail');

  // 1. get taskCategory and ensure exist + valid
  const taskCategory = serviceUtils.getQueryVariable('taskCategory');

  if (!taskCategory) {
    message.error(intl('noTaskCategory'));
    history.push('/');
    return null;
  }
  if (!(taskCategory in createInfo)) {
    message.error(intl('invalidTaskCategory') + ' ' + taskCategory);
    history.push('/');
    return null;
  }
  return (
    <PPContainer>
      <PPCreater imgSrc="./pics/illustration.jpg" taskCategory={taskCategory} />
    </PPContainer>
  );
};

export default Project;
