import { createSlice } from '@reduxjs/toolkit';
import { getSearch } from '../actions/getSearch';

interface searchState {
  allsearchs: string[] | [];
}

const initialState: searchState = {
  allsearchs: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearch, (state, action) => {
      state.allsearchs = action.payload ? action.payload.search : [];
    });
  }
});

export default searchSlice.reducer;
