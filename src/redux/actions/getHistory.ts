import { createAction } from '@reduxjs/toolkit';

export const getHistory = createAction('getHistory', () => {
  const historyString = localStorage.getItem('history');
  const history = historyString ? JSON.parse(historyString) : null;
  return {
    payload: {
      products: history.reverse()
    }
  };
});
