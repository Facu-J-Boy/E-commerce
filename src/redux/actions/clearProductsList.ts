import { createAction } from '@reduxjs/toolkit';

export const clearProductsList = createAction('clearProductslist', () => ({
  payload: []
}));
