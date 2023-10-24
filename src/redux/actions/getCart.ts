import { createAction } from '@reduxjs/toolkit';

export const getCart = createAction('getCart', () => {
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : null;
  return {
    payload: cart
  };
});
