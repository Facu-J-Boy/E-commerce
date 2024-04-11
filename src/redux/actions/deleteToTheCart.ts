export const deleteToTheCart = (_id: string) => {
  // Obtén el carrito actual desde el localStorage
  const cartString = localStorage.getItem('cart') || '[]';

  // Intenta parsear el carrito desde JSON
  let cart = [];

  try {
    cart = JSON.parse(cartString);
  } catch (error) {
    console.error('Error al parsear el carrito:', error);
  }

  // Asegúrate de que cart sea un array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Filtra el carrito para eliminar el producto con el ID deseado
  const updatedCart = cart.filter((product) => product._id !== _id);

  // Guarda el carrito actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};
