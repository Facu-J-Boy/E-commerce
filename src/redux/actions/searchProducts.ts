import { createAction } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { addToSearch } from './addToSearch';
import { error } from '../../interfaces/error';

export const searchProducts = createAction(
  'searchProducts',
  (param: string, products: product[] | []) => {
    addToSearch(param);
    const searchProduct = param.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchProduct)
    );
    if (filteredProducts.length === 0) {
      return {
        payload: [],
        error: {
          type: 'search',
          text: 'There are no products that match your search'
        } as error
      }; //si no se encuentra un producto enviamos un mensaje de error
    } else {
      return { payload: filteredProducts, error: null }; // en caso de encontrarse un producto retornamos los productos filtrados
    }
  }
);
