import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { product } from '../../interfaces/product';

interface GetInCategoryArgs {
  category: string;
  id: string | undefined;
}

export const getInCategory = createAsyncThunk(
  'getInCategory',
  async ({ category, id }: GetInCategoryArgs) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return response.data.filter((p: product) =>
        id ? p.id !== parseInt(id, 10) : null
      );
    } catch (error) {
      console.log(error);
    }
  }
);
