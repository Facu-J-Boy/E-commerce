export const deleteToSearch = (param: string) => {
  let myArray = localStorage.getItem('search');

  let searchArray: string[] = myArray ? JSON.parse(myArray) : [];

  // Filtrar el array para excluir el elemento a eliminar
  searchArray = searchArray.filter((item) => item !== param);

  // Actualizar el localStorage con el nuevo array
  localStorage.setItem('search', JSON.stringify(searchArray));
};
