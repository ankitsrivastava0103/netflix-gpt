import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResult: null,
    movieName: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      state.movieResult = action.payload.movieResult;
      state.movieName = action.payload.movieName;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
