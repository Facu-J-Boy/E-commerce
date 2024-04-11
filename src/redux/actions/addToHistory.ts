import { product } from '../../interfaces/product';

export const addToHistory = (newProduct: product) => {
  // Obtener el historial actual desde el localStorage
  const historyString = localStorage.getItem('history') || '[]';

  // Intentar parsear el historial desde JSON
  let history = [];

  try {
    history = JSON.parse(historyString);
  } catch (error) {
    console.error('Error al parsear el historial:', error);
  }

  // Asegurarnos de que history sea un array
  if (!Array.isArray(history)) {
    history = [];
  }

  // Verificar si el nuevo producto no es un objeto vacío
  const isNonEmptyProduct = Object.keys(newProduct).length > 0;

  if (isNonEmptyProduct) {
    // Eliminar el producto existente si está presente
    history = history.filter((item) => item.id !== newProduct._id);

    // Agregar el nuevo producto al historial al final
    const updatedHistory = [...history, newProduct];

    // Guardar el historial actualizado en el localStorage
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  }
};
