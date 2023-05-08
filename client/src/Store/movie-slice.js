import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: null,
    allDirectors: null,
    allActors: null,
    allActress: null,
    allGenre: null,
  },
  reducers: {
    addMovies(state, action) {
      state.allMovies = action.payload;
    },
    removeMovies(state) {
      state.allMovies = null;
    },
    addDirectors(state, action) {
      state.allDirectors = action.payload;
    },
    removeDirectors(state) {
      state.allDirectors = null;
    },
    addActors(state, action) {
      state.allActors = action.payload;
    },
    removeActors(state) {
      state.allActors = null;
    },
    addActress(state, action) {
      state.allActress = action.payload;
    },
    removeActress(state) {
      state.allActress = null;
    },
    addGenre(state, action) {
      state.allGenre = action.payload;
    },
    removeGenre(state) {
      state.allGenre = null;
    },
  },
});

export const movieAction = movieSlice.actions;
export default movieSlice;
