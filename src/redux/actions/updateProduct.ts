import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (data: {
    id: string | undefined;
    image: File | undefined;
    title: string;
    price: string;
    description: string;
    categoryId: string;
  }) => {
    console.log({ data });
    const formData = new FormData();
    data.image && formData.append('image', data.image);
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    try {
      const response = await axiosInstance.put(
        `/product/update/${data.id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
