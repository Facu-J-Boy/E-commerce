export const addToSearch = (param: string) => {
  let myArray = localStorage.getItem('search');

  let searchArray: string[] = myArray ? JSON.parse(myArray) : [];

  searchArray.push(param);

  localStorage.setItem('search', JSON.stringify(searchArray));
};
