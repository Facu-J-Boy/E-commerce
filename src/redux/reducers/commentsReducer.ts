import { createSlice } from '@reduxjs/toolkit';
import { comment } from '../../interfaces/comments';

interface commentsState {
  comments: comment[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: commentsState = {
  comments: [],
  loading: false,
  error: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export default commentsSlice;
