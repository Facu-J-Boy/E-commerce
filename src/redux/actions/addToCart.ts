import { product } from '../../interfaces/product';

export const addToCart = (product: product) => {
  // Obtener el carrito actual desde el localStorage
  const cartString = localStorage.getItem('cart') || '[]';

  // Intentar parsear el carrito desde JSON
  let cart = [];

  try {
    cart = JSON.parse(cartString);
  } catch (error) {
    console.error('Error al parsear el carrito:', error);
  }

  // Asegurarnos de que cart sea un array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Agregar el nuevo producto al carrito
  const updatedCart = [...cart, product];

  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};
