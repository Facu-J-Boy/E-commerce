import { createAction } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';

export const Buy = createAction('Buy', (products: product[]) => {
  return {
    payload: {
      products: products
    }
  };
});
