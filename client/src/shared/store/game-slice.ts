import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Artist, GameSettings } from "../../interfaces";
import { AppState } from "./config";

interface GameState {
  username: string;
  artist: Artist | null;
  albums: Album[];
  settings: GameSettings;
}

let initialState: GameState = {
  username: "",
  artist: null,
  albums: [],
  settings: {
    scores: 0,
    round: 1,
    attempt: 0,
    isCorrect: false,
    showFeedback: false,
  },
};

const gameSlice = createSlice({
  name: "game",

  initialState,

  reducers: {
    setStoreGame(state, action: PayloadAction<GameState>) {
      state.artist = action.payload.artist;
      state.albums = action.payload.albums;
      state.settings = action.payload.settings;
    },

    setStoreArtist(state, action: PayloadAction<Artist>) {
      state.artist = action.payload;
    },

    setStoreAlbums(state, action: PayloadAction<Album[]>) {
      state.albums = action.payload;
    },

    incrementStoreScores(state, action: PayloadAction<number>) {
      state.settings.scores += action.payload;
    },

    updateStoreAttempts(state, action: PayloadAction<number>) {
      state.settings.attempt = action.payload;
    },
    updateStoreRounds(state, action: PayloadAction<number>) {
      state.settings.round = action.payload;
    },

    updateStoreIsCorrect(state, action: PayloadAction<boolean>) {
      state.settings.isCorrect = action.payload;
    },
    updateStoreShowFeedback(state, action: PayloadAction<boolean>) {
      state.settings.showFeedback = action.payload;
    },
  },
});

export const {
  setStoreArtist,
  setStoreAlbums,
  setStoreGame,
  updateStoreAttempts,
  incrementStoreScores,
  updateStoreIsCorrect,
  updateStoreShowFeedback,
  updateStoreRounds,
} = gameSlice.actions;

const gameState = (appState: AppState) => appState.game;

export const selectStoreArtist = createSelector(
  gameState,
  (state: ReturnType<typeof gameState>) => state.artist
);
export const selectStoreAlbums = createSelector(
  gameState,
  (state: ReturnType<typeof gameState>) => state.albums
);
export const selectStoreSettings = createSelector(
  gameState,
  (state: ReturnType<typeof gameState>) => state.settings
);
export const selectStoreUsername = createSelector(
  gameState,
  (state: ReturnType<typeof gameState>) => state.username
);

export default gameSlice.reducer;
