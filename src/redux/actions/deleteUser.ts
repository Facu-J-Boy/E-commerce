import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

interface DeleteUserParams {
  id: string | undefined;
  navigate: (path: string) => void;
}

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async ({ id, navigate }: DeleteUserParams) => {
    try {
      const response = await axiosInstance.delete(`/user/delete/${id}`);
      if(response.status === 200){
        navigate('/')
      }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
