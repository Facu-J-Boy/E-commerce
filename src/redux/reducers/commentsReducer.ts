import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { comment } from '../../interfaces/comments';
import { getComments } from '../actions/getComments';
import { postComment } from '../actions/postComment';
import { deleteComment } from '../actions/deleteComment';

export interface commentsState {
  comments: comment[];
  deletingComment: string | null | undefined;
  currentPage?: number | null | undefined;
  totalPages?: number | null | undefined;
  totalCount?: number | null | undefined;
  commentsLoading: boolean;
  inputLoading: boolean;
  error: null | string | undefined;
}

const initialState: commentsState = {
  comments: [],
  deletingComment: null,
  currentPage: null,
  totalPages: null,
  totalCount: null,
  commentsLoading: false,
  inputLoading: false,
  error: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
    deleting: (state, action: PayloadAction<string | undefined>) => {
      state.deletingComment = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        action.payload.reviews &&
          state.comments.push(...action.payload.reviews);
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
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
        state.comments = action.payload.reviews
          ? action.payload.reviews
          : state.comments;
        state.currentPage = action.payload.currentPage
          ? action.payload.currentPage
          : state.currentPage;
        state.totalPages = action.payload.totalPages
          ? action.payload.totalPages
          : state.totalPages;
        state.totalCount = action.payload.totalCount
          ? action.payload.totalCount
          : state.totalCount;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.inputLoading = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.review?._id
        );
        state.deletingComment = null;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deletingComment = null;
      });
  }
});

export const { clearComments, deleting } = commentsSlice.actions;

export default commentsSlice.reducer;
