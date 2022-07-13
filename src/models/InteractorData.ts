import { useState } from 'react';

export type InteractorData = {
  active: boolean;
  predictData: number[][];
  mousePoints: any[][];
};

export default () => {
  const [interactorData, setInteractorData] = useState<InteractorData>({
    active: false,
    predictData: [],
    mousePoints: [],
  });
  return { interactorData, setInteractorData };
};
