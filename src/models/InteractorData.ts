import { useState } from 'react';

export default () => {
  const [interactorData, setInteractorData] = useState<number[][]>([]);
  return { interactorData, setInteractorData };
};
