import { createAction } from '@reduxjs/toolkit';

export const logOut = createAction('logOut', () => {
  return {
    payload: {}
  };
});
