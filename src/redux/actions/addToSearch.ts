// export const addToSearch = (param: string) => {
//   let myArray = localStorage.getItem('search');

//   let searchArray: string[] = myArray ? JSON.parse(myArray) : [];

//   searchArray.push(param);

//   localStorage.setItem('search', JSON.stringify(searchArray));
// };

export const addToSearch = (param: string) => {
  let myArray = localStorage.getItem('search');

  let searchArray: string[] = myArray ? JSON.parse(myArray) : [];

  // Verificar si el param ya está en el array
  if (!searchArray.includes(param)) {
    searchArray.push(param);
    localStorage.setItem('search', JSON.stringify(searchArray));
  }
};
