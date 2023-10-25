import { createAction } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';

export const getCart = createAction('getCart', () => {
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : null;
  return {
    payload: {
      products: cart,
      total: cart
        ? cart.reduce((a: number, b: product) => a + b.price, 0).toFixed(2)
        : 0
    }
  };
});
