import { createAction } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';

export const searchProducts = createAction(
  'searchProducts',
  (param: string, products: product[] | []) => {
    if (!param) {
      return { payload: products, error: null };
    } else {
      const searchProduct = param.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchProduct)
      );
      if (filteredProducts.length === 0) {
        return {
          payload: [],
          error: 'There are no products that match your search'
        }; //si no se encuentra un producto hacemos que el estado products sea un string con un mensaje de error
      } else {
        return { payload: filteredProducts, error: null }; // en caso de encontrarse un producto seteamos los resultados en el estado de productos
      }
    }
  }
);
