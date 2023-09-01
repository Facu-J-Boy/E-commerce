import { createAction } from '@reduxjs/toolkit';

export const clearProductState = createAction('clearProductState', () => ({
  payload: {}
}));
