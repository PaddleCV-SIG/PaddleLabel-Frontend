import React from 'react';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import { createInfo } from '@/services/api';
import serviceUtils from '@/services/serviceUtils';

const Project: React.FC = () => {
  const taskCategory = serviceUtils.getQueryVariable('taskCategory');
  let mode = serviceUtils.getQueryVariable('mode'); // create | edit
  if (!taskCategory) {
    message.error('Task Category not present in url');
    return;
  }
  if (!mode) mode = 'create';

  if (mode == 'create') {
    console.log('mode', mode);
    const info = createInfo[taskCategory];
    return (
      <PPContainer>
        <PPCreater
          title={info['name']}
          imgSrc="./pics/illustration.jpg"
          taskCategory={'classification'}
        />
      </PPContainer>
    );
  }
};

export default Project;
