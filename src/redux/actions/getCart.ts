import { createAction } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';

export const getCart = createAction('getCart', () => {
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : null;

  const total =
    cart && cart.length
      ? cart.reduce((a: number, b: product) => a + b.price, 0)
      : 0;

  const formattedTotal = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(total);

  return {
    payload: {
      products: cart ? cart.reverse() : [],
      total: formattedTotal
    }
  };
});
