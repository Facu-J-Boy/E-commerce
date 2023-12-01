export const deleteToSearch = (param: string) => {
  // Obtén las búsquedas actuales desde el localStorage
  const searchString = localStorage.getItem('search') || '[]';

  // Intenta parsear las búsquedas desde JSON
  let search: string[] = [];

  try {
    search = JSON.parse(searchString);
  } catch (error) {
    console.error('Error al parsear las búsquedas:', error);
  }

  // Asegúrate de que search sea un array
  if (!Array.isArray(search)) {
    search = [];

    // Filtra las búsquedas para eliminar el elemento con el param deseado
    const updatedSearch = search.filter((element) => element !== param);

    // Guarda las búsquedas actualizado en el localStorage
    localStorage.setItem('search', JSON.stringify(updatedSearch));
  }
};
