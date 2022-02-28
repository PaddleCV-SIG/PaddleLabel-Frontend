import React from 'react';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';

const Project: React.FC = () => {
  return (
    <PPContainer>
      <PPCreater title="Image Classification" imgSrc="./pics/illustration.jpg"></PPCreater>
    </PPContainer>
  );
};

export default Project;
