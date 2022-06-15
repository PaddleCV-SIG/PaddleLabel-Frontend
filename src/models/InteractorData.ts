import { useState } from 'react';

export default () => {
  const [interactorData, setInteractorData] = useState([]);
  return { interactorData, setInteractorData };
};
