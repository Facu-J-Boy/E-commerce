import { createAction } from '@reduxjs/toolkit';

export const getSearch = createAction('getSearch', () => {
  const searchs = localStorage.getItem('search');
  const searchParse: string[] | null = searchs ? JSON.parse(searchs) : null;
  let uniqueSearchs = searchParse ? [...new Set(searchParse)] : [];
  return {
    payload: {
      search: uniqueSearchs
    }
  };
});
