import { createAction } from '@reduxjs/toolkit';

export const getSearch = createAction('getSearch', () => {
  const searchs = localStorage.getItem('search');
  const searchParse: string[] | [] = searchs ? JSON.parse(searchs) : [];
  return {
    payload: {
      search: searchParse
    }
  };
});
