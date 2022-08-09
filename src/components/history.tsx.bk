import { message } from 'antd';
import { IntlInit } from '@/services/utils';

const MOST_HISTORY_STEPS = 40;

type HistoryType = {
  index: number; // Current index in items[]
  items: any[]; // Objects to store in history
};

export const HistoryUtils = () => {
  const intl = IntlInit('component.history');

  function init() {
    localStorage.removeItem('history');
    recordHistory([]);
  }

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

  function forward() {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) return;

    const history: HistoryType = JSON.parse(historyStr);
    if (!history) return;

    if (history.index >= history.items.length - 1) {
      message.error(intl('noNext'));
      // message.error('noNext');

      return;
    }
    history.index++;
    localStorage.setItem('history', JSON.stringify(history));
    return history.items[history.index];
  }

  function backward() {
    // const intl = IntlInit('component.history');
    const historyStr = localStorage.getItem('history');
    if (!historyStr) return;
    const history: HistoryType = JSON.parse(historyStr);
    console.log('history', history);
    if (!history || !history.index || history.index <= 1) {
      // message.error(intl('noPrev'));
      message.error('noPrev');
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

export function initHistory() {
  localStorage.removeItem('history');
  recordHistory([]);
}

export function recordHistory(newItem: any) {
  const historyStr = localStorage.getItem('history');
  const history: HistoryType = historyStr ? JSON.parse(historyStr) : { index: -1, items: [] };
  if (JSON.stringify(history.items[history.index]) == JSON.stringify(newItem)) {
    return;
  }
  const earliestIndex = history.index > MOST_HISTORY_STEPS ? history.index - MOST_HISTORY_STEPS : 0;
  const itemsToKeep = history.items.splice(
    earliestIndex,
    history.index == 0 ? 1 : history.index + 1,
  );
  history.items = itemsToKeep.concat([newItem]);
  if (history.index <= MOST_HISTORY_STEPS) history.index++;
  else history.index = MOST_HISTORY_STEPS + 1;
  localStorage.setItem('history', JSON.stringify(history));
}

export function forwardHistory() {
  // const intl = IntlInit('component.history');
  const historyStr = localStorage.getItem('history');
  if (!historyStr) return;

  const history: HistoryType = JSON.parse(historyStr);
  if (!history) return;

  if (history.index >= history.items.length - 1) {
    // message.error(intl('noNext'));
    message.error('noNext');

    return;
  }
  history.index++;
  localStorage.setItem('history', JSON.stringify(history));
  return history.items[history.index];
}

export function backwardHistory() {
  // const intl = IntlInit('component.history');
  const historyStr = localStorage.getItem('history');
  if (!historyStr) return;
  const history: HistoryType = JSON.parse(historyStr);
  console.log('history', history);
  if (!history || !history.index || history.index <= 1) {
    // message.error(intl('noPrev'));
    message.error('noPrev');
    return;
  }
  history.index--;
  localStorage.setItem('history', JSON.stringify(history));
  return history.items[history.index];
}
