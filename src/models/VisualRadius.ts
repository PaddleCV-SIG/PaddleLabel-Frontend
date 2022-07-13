import { useState } from 'react';

export default () => {
  const [radius, setRadius] = useState(10);
  return { radius, setRadius };
};
