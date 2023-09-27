import { createSlice } from '@reduxjs/toolkit';
import { comment } from '../../interfaces/comments';
import { getComments } from '../actions/getComments';

interface commentsState {
  comments: comment[] | [];
  commentsLoading: boolean;
  error: null | string | undefined;
}

const initialState: commentsState = {
  comments: [],
  commentsLoading: false,
  error: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.error = action.error.message;
      });
  }
});

export default commentsSlice.reducer;
