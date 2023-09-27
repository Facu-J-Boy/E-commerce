import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getComments = createAsyncThunk('getComments', async (id) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
