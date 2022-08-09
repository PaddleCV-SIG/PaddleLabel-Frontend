import { message } from 'antd';
import { IntlInit } from '@/services/utils';

export const MOST_HISTORY_STEPS = 40;

export type HistoryType = {
  index: number; // Current index in items[]
  items: any[]; // Objects to store in history
};

export const HistoryUtils = () => {
  const intl = IntlInit('component.history');

  function record(newItem: any) {
    const historyStr = localStorage.getItem('history');
    const history: HistoryType = historyStr ? JSON.parse(historyStr) : { index: -1, items: [] };
    if (JSON.stringify(history.items[history.index]) == JSON.stringify(newItem)) {
      return;
    }
    const earliestIndex =
      history.index > MOST_HISTORY_STEPS ? history.index - MOST_HISTORY_STEPS : 0;
    const itemsToKeep = history.items.splice(
      earliestIndex,
      history.index == 0 ? 1 : history.index + 1,
    );
    history.items = itemsToKeep.concat([newItem]);
    if (history.index <= MOST_HISTORY_STEPS) history.index++;
    else history.index = MOST_HISTORY_STEPS + 1;
    localStorage.setItem('history', JSON.stringify(history));
  }

  function init() {
    localStorage.removeItem('history');
    record([]);
  }

  function forward() {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) return;

    const history: HistoryType = JSON.parse(historyStr);
    if (!history) return;

    if (history.index >= history.items.length - 1) {
      message.error(intl('noNext'));
      return;
    }
    history.index++;
    localStorage.setItem('history', JSON.stringify(history));
    return history.items[history.index];
  }

  function backward() {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) return;
    const history: HistoryType = JSON.parse(historyStr);
    console.log('history', history);
    if (!history || !history.index || history.index <= 1) {
      message.error(intl('noPrev'));
      return;
    }
    history.index--;
    localStorage.setItem('history', JSON.stringify(history));
    return history.items[history.index];
  }

  return {
    init,
    record,
    forward,
    backward,
  };
};
