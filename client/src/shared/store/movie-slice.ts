import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types";
import { AppState } from "./config";

interface MoviesState {
  movies: Movie[];
}

let initialState: MoviesState = { movies: [] };

const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    setStoreMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    addStoreMovie(state, action: PayloadAction<Movie>) {
      state.movies.push(action.payload);
    },

    updateStoreMovie(state, action: PayloadAction<Movie>) {
      let list = state.movies.filter((m) => m.id !== action.payload.id);
      list.unshift(action.payload)
      state.movies = list;
    },

    deleteStoreMovie(state, action: PayloadAction<number>) {
      state.movies = state.movies.filter((m:Movie) => m.id !== action.payload);
    },
  },
});

export const { addStoreMovie, setStoreMovies, updateStoreMovie, deleteStoreMovie } =
  movieSlice.actions;

const moviesState = (appState: AppState) => appState.movies;

export const selectStoreMovies = createSelector(
         moviesState,
         (state: ReturnType <typeof moviesState>) => state.movies
       );
//export const selectOneStoreMovie = createSelector(selectStoreMovies, ;

export default movieSlice.reducer;
