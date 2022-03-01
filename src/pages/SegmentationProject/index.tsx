import React from 'react';
import PPCreater from '@/components/PPCreater';
import PPContainer from '@/components/PPContainer';

const Project: React.FC = () => {
  return (
    <PPContainer>
      <PPCreater
        title="Semantic Segmentation"
        imgSrc="./pics/illustration.jpg"
        mode="segment"
      ></PPCreater>
    </PPContainer>
  );
};

export default Project;
