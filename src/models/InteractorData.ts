import { useState } from 'react';

export type InteractorData = {
  predictData: number[][];
  mousePoints: any[][];
};

export default () => {
  const [interactorData, setInteractorData] = useState<InteractorData>();
  return { interactorData, setInteractorData };
};
