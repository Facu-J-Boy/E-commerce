import { createSlice } from '@reduxjs/toolkit';
import { comment } from '../../interfaces/comments';
import { getComments } from '../actions/getComments';
import { postComment } from '../actions/postComment';

export interface commentsState {
  comments: comment[];
  currentPage?: number | null | undefined;
  totalPages?: number | null | undefined;
  totalCount?: number | null | undefined;
  commentsLoading: boolean;
  inputLoading: boolean;
  error: null | string | undefined;
  message: string;
}

const initialState: commentsState = {
  comments: [],
  currentPage: null,
  totalPages: null,
  totalCount: null,
  commentsLoading: false,
  inputLoading: false,
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
        // const newComments = action.payload.reviews;
        state.comments.push(...action.payload.reviews);
        console.log('comments: ', state.comments);
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
        state.message = action.payload.message;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.error = action.error.message;
      })
      .addCase(postComment.pending, (state) => {
        state.inputLoading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.inputLoading = false;
        console.log('action.payload: ', action);
        const newComment = action.payload.newReview;
        newComment && state.comments.unshift(newComment);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.inputLoading = false;
      });
  }
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
