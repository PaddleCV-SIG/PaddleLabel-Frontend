import React from 'react';
import PPSegMode from '@/components/PPSegMode';
import PPContainer from '@/components/PPContainer';

const Project: React.FC = () => {
  return (
    <PPContainer>
      <PPSegMode title="Semantic Segmentation" imgSrc="./pics/illustration.jpg" />
    </PPContainer>
  );
};

export default Project;
