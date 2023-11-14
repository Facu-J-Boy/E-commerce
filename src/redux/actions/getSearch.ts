import { createAction } from '@reduxjs/toolkit';

export const getSearch = createAction('getSearch', () => {
  const searchs = localStorage.getItem('search');
  const searchParse = searchs ? JSON.parse(searchs) : null;
  return {
    payload: {
      search: !searchParse ? [] : searchParse
    }
  };
});
