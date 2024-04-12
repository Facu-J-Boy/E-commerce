import { createSlice } from '@reduxjs/toolkit';
import { comment } from '../../interfaces/comments';
import { getComments } from '../actions/getComments';

export interface commentsState {
  comments: comment[];
  currentPage?: number | null | undefined;
  totalPages?: number | null | undefined;
  totalCount?: number | null | undefined;
  commentsLoading: boolean;
  error: null | string | undefined;
}

const initialState: commentsState = {
  comments: [],
  currentPage: null,
  totalPages: null,
  totalCount: null,
  commentsLoading: false,
  error: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        const newComments = action.payload.reviews;
        state.comments.push(...newComments);
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
