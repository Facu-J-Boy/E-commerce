export const getSearch = () => {
  const searchs = localStorage.getItem('search');
  return {
    payload: {
      search: !searchs ? [] : searchs
    }
  };
};
