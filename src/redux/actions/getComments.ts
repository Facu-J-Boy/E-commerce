import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getComments = createAsyncThunk('getComments', async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
