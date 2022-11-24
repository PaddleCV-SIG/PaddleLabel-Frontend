import { useState } from 'react';

export type InteractorData = {
  active: boolean;
  predictData: number[][];
  mousePoints: any[][];
  force?: boolean;
};

export default () => {
  const [interactorData, setInteractorData] = useState<InteractorData>({
    active: false,
    predictData: [],
    mousePoints: [],
    force: true,
  });
  return { interactorData, setInteractorData };
};
