import { React, useState, useEffect } from 'react';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';
import { createInfo } from '@/services/api';
import serviceUtils from '@/services/serviceUtils';
import { snake2camel, getProject } from '@/services/api';
import { message } from 'antd';
import { history } from 'umi';

const Project: React.FC = () => {
  const [taskCategory, setTaskCategory] = useState();
  const [project, setProject] = useState();

  // 1. get taskCategory and ensure exist + valid
  const catg = snake2camel(serviceUtils.getQueryVariable('taskCategory'));
  if (!catg) {
    message.error('Task Category not present in url');
    history.push('/project_creation');
    // return <div />;
  }
  console.log('In', catg, createInfo, catg in createInfo);
  console.log('taskCategory', taskCategory);
  if (!(catg in createInfo)) {
    message.error('Invalid task category ' + catg);
    history.push('/project_creation');
    // return <div />;
  }
  const projectId = serviceUtils.getQueryVariable('projectId');

  useEffect(() => {
    setTaskCategory(catg);
    if (projectId) getProject(projectId, setProject);
  }, []);

  return (
    <PPContainer>
      <PPCreater imgSrc="./pics/illustration.jpg" taskCategory={taskCategory} project={project} />
    </PPContainer>
  );
};

export default Project;
