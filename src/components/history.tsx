import { message } from 'antd';

const MOST_HISTORY_STEPS = 40;

type HistoryType = {
  index: number; // Current index in items[]
  items: any[]; // Objects to store in history
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
  const historyStr = localStorage.getItem('history');
  if (!historyStr) return;

  const history: HistoryType = JSON.parse(historyStr);
  if (!history) return;

  if (history.index >= history.items.length - 1) {
    message.error('No next history!');
    return;
  }
  history.index++;
  localStorage.setItem('history', JSON.stringify(history));
  return history.items[history.index];
}

export function backwardHistory() {
  const historyStr = localStorage.getItem('history');
  if (!historyStr) return;
  const history: HistoryType = JSON.parse(historyStr);
  console.log('history', history);
  if (!history || !history.index || history.index <= 1) {
    message.error('No previous history!');
    return;
  }
  history.index--;
  localStorage.setItem('history', JSON.stringify(history));
  return history.items[history.index];
}
