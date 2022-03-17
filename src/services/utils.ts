import {message } from 'antd';

const getScaleUtils = (useState, range: number[] = [0.1, 3]) => {
  const [scale, setScaleRaw] = useState<number>(1);

  const changeScale = (delta: number) => {
    let s = scale;
    s+=delta;
    if (s < range[0]) {
      s = range[0];
      message.error('Smallest scale is ' + range[0]);
    }
    if (s > range[1]) {
      s = range[1];
      message.error('Largest scale is ' + range[1]);
    }
    setScaleRaw(s);
  };
  return {
    scale,
    changeScale
  }
}

export default getScaleUtils;
