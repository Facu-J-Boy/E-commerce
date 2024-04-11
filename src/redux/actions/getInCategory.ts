import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GetInCategoryArgs {
  category: string;
  _id: string | undefined;
}

export const getInCategory = createAsyncThunk(
  'getInCategory',
  async ({ category, _id }: GetInCategoryArgs) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
