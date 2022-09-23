import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Director } from "../types";
import { AppState } from "./config";

interface DirectorsState {
  directors: Director[];
}

let initialState: DirectorsState = { directors: [] };

const directorSlice = createSlice({
  name: "directors",

  initialState,

  reducers: {
    setStoreDirectors(state, action: PayloadAction<Director[]>) {
      state.directors = action.payload;
    },
    addStoreDirector(state, action: PayloadAction<Director>) {
      state.directors.push(action.payload);
    },

    updateStoreDirector(state, action: PayloadAction<Director>) {
      let list = state.directors.filter((m) => m.id !== action.payload.id);
      list.unshift(action.payload);
      state.directors = list;
    },

    deleteStoreDirector(state, action: PayloadAction<number>) {
      state.directors = state.directors.filter(
        (m: Director) => m.id !== action.payload
      );
    },
  },
});

export const {
  addStoreDirector,
  setStoreDirectors,
  updateStoreDirector,
  deleteStoreDirector,
} = directorSlice.actions;

const directorsState = (appState: AppState) => appState.directors;

export const selectStoreDirectors = createSelector(
  directorsState,
  (state: ReturnType<typeof directorsState>) => state.directors
);
//export const selectOneStoreDirector = createSelector(selectStoreDirectors, ;

export default directorSlice.reducer;
