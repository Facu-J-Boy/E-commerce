import { product } from '../../interfaces/product';

export const addToHistory = (product: product) => {
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

  // Agregar el nuevo producto al historial
  const updatedHistory = [...history, product];

  // Guardar el historial actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(updatedHistory));
};
