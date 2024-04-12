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
  message: string;
}

const initialState: commentsState = {
  comments: [],
  currentPage: null,
  totalPages: null,
  totalCount: null,
  commentsLoading: false,
  error: null,
  message: ''
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.message = '';
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
        state.message = action.payload.message;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
