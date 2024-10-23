import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormData } from '../../interfaces/formData';
import { axiosInstance } from '../../Config/axios';
import { userId } from './userId';

export const signUp = createAsyncThunk('signUp', async (formData: FormData) => {
  const data = {
    email: formData.email,
    password: formData.password
  };
  try {
    const response = await axiosInstance.post('/user/signup', data);
    response && userId.set(response.data._id);
    window.open(`${process.env.REACT_APP_CLIENT_URL}`, '_self');
  } catch (error: any) {
    throw error.response.data.error;
  }
});
