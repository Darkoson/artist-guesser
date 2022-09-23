import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie-slice";
import directorReducer from "./director-slice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    directors: directorReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
