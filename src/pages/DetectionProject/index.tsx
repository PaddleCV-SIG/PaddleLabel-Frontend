import React from 'react';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';

const Project: React.FC = () => {
  return (
    <PPContainer>
      <PPCreater title="Object Detection" imgSrc="./pics/illustration.jpg"></PPCreater>
    </PPContainer>
  );
};

export default Project;
