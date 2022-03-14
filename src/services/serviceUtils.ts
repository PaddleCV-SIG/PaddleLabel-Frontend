import type { MessageApi } from 'antd/lib/message';

const serviceUtils = () => {
  const parseError = async (err: Response, msgComponent: MessageApi, defaultErrMsg?: string) => {
    const defaultErrStr = defaultErrMsg
      ? defaultErrMsg
      : 'Something unexpected happened, please try again later.';
    if (!err || !err.body) {
      msgComponent.error(defaultErrStr);
      return;
    }
    const res = JSON.parse(await err.text());
    if (!res || !res.detail) {
      msgComponent.error(defaultErrStr);
      return;
    }
    msgComponent.error(res.detail);
  };

  function getQueryVariable(name: string, url = window.location.href) {
    const filteredName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + filteredName + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return {
    parseError,
    getQueryVariable,
    randomIntFromInterval,
  };
};

export default serviceUtils();
