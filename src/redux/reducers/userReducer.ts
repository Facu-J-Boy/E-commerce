import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../interfaces/user';
import { getSession } from '../actions/getSession';
import { logOut } from '../actions/logOut';

export interface userState {
  user: user | {};
  userLoading: boolean;
}

const initialState: userState = {
  user: {},
  userLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(logOut, (state, action) => {
        state.user = action.payload;
      });
  }
});

export default userSlice.reducer;
