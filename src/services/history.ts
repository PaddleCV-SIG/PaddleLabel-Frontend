import { message } from 'antd';
import { IntlInit } from '@/services/utils';
import { getDiff, applyDiff } from 'recursive-diff';
import type { rdiffResult } from 'recursive-diff';
import type { Dispatch, SetStateAction } from 'react';

export const MOST_HISTORY_STEPS = 40;
export type HistoryType = {
  undos: (rdiffResult[] | string)[];
  redos: (rdiffResult[] | string)[];
};

export type UseStateType = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];

export function HistoryUtils(useState: UseStateType, rpcApi) {
  const intl = IntlInit('component.history');
  const [prevState, setPrev] = useState<any>([]);

  async function parseDiff(diff: rdiffResult[][] | string): Promise<rdiffResult[]> {
    console.log('history parsediff', diff);
    const diffContent =
      typeof diff == 'string' ? JSON.parse((await rpcApi.getCache(diff)).content) : diff;
    return diffContent;
  }

  async function recDiff(diff: rdiffResult[]): Promise<rdiffResult[] | string> {
    const diffStr = JSON.stringify(diff);
    if (diffStr.length > 1000) return (await rpcApi.createCache({ content: diffStr })).cacheId;
    else return diff;
  }

  async function init(curr: any) {
    localStorage.removeItem('history');
    setPrev(curr);
    const history = { undos: [], redos: [] };
    localStorage.setItem('history', JSON.stringify(history));
    console.log('history init', history);
  }

  async function record(currState: any) {
    const diff: rdiffResult[] = getDiff(currState, prevState);
    if (diff.length == 0) return;
    setPrev(currState);
    // debugger;
    console.log('diff', diff);
    const historyStr = localStorage.getItem('history');
    const history: HistoryType = historyStr ? JSON.parse(historyStr) : { undos: [], redos: [] };
    history.redos = [];
    history.undos.push(await recDiff(diff));

    localStorage.setItem('history', JSON.stringify(history));
  }

  async function forward() {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) {
      message.error('history string not saved');
      return;
    }
    const history: HistoryType = JSON.parse(historyStr);
    if (!history || history.redos.length == 0) {
      message.error(intl('noNext'));
      return;
    }
    const diff = await parseDiff(history.redos.pop());
    const curr = applyDiff(JSON.parse(JSON.stringify(prevState)), diff);
    console.log('history redo', await recDiff(getDiff(curr, prevState)));
    history.undos.push(await recDiff(getDiff(curr, prevState)));
    setPrev(curr);
    localStorage.setItem('history', JSON.stringify(history));
    return curr;
  }

  async function backward() {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) {
      message.error('history string not found');
      return;
    }
    const history: HistoryType = JSON.parse(historyStr);
    if (!history || history.undos.length == 0) {
      message.error(intl('noPrev'));
      return;
    }
    console.log('here');
    const diff = await parseDiff(history.undos.pop());
    console.log('history undo', diff);
    const curr = applyDiff(JSON.parse(JSON.stringify(prevState)), diff);
    history.redos.push(await recDiff(getDiff(curr, prevState)));
    console.log('history.redoss', recDiff(getDiff(curr, prevState)));
    setPrev(curr);
    localStorage.setItem('history', JSON.stringify(history));
    return curr;
  }

  return {
    init,
    record,
    forward,
    backward,
  };
}
