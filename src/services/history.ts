import { message } from 'antd';
import { IntlInit } from '@/services/utils';
import { getDiff, applyDiff } from 'recursive-diff';
import type { rdiffResult } from 'recursive-diff';
import type { Dispatch, SetStateAction } from 'react';

export const MOST_HISTORY_STEPS = 40;
export type HistoryType = {
  undos: rdiffResult[][];
  redos: rdiffResult[][];
};

export type UseStateType = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];

export function HistoryUtils(useState: UseStateType) {
  const intl = IntlInit('component.history');
  const [prevState, setPrev] = useState<any>([]);

  function init(curr: any) {
    localStorage.removeItem('history');
    setPrev(curr);
    const history = { undos: [], redos: [] };
    localStorage.setItem('history', JSON.stringify(history));
  }

  function record(currState: any) {
    const diff: rdiffResult[] = getDiff(currState, prevState);
    if (diff.length == 0) return;
    setPrev(currState);
    const historyStr = localStorage.getItem('history');
    const history: HistoryType = historyStr ? JSON.parse(historyStr) : { undos: [], redos: [] };
    history.redos = [];
    history.undos.push(diff);
    localStorage.setItem('history', JSON.stringify(history));
    console.log('history record', history);
  }

  function forward() {
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
    localStorage.setItem('history', JSON.stringify(history));
    const diff = history.redos.pop();
    const curr = applyDiff(JSON.parse(JSON.stringify(prevState)), diff);
    history.undos.push(getDiff(curr, prevState));
    console.log('history redo', history);
    setPrev(curr);
    localStorage.setItem('history', JSON.stringify(history));
    return curr;
  }

  function backward() {
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
    const diff = history.undos.pop();
    const curr = applyDiff(JSON.parse(JSON.stringify(prevState)), diff);
    history.redos.push(getDiff(curr, prevState));
    setPrev(curr);
    localStorage.setItem('history', JSON.stringify(history));
    console.log('history undo', history);
    return curr;
  }

  return {
    init,
    record,
    forward,
    backward,
  };
}
