import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (data: {
    id: string | undefined;
    title: string;
    price: string;
    description: string;
    categoryId: string;
  }) => {
    try {
      const response = await axiosInstance.put(`/product/update/${data.id}`, {
        title: data.title,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
