import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Artist, GameSettings } from "../../interfaces";
import { AppState } from "./config";

interface GameState {
  username: string;
  artist: Artist;
  albums: Album[];
  settings: GameSettings;
}

export const initialGameState: GameState = {
  username: "",
  artist: { id: 0, name: "" },
  albums: [],
  settings: {
    scores: 0,
    round: 1,
    attempt: 0,
    isCorrect: false,
    endGame: false,
    showFeedback: false,
  },
};

const gameSlice = createSlice({
  name: "game",

  initialState: initialGameState,

  reducers: {
    setStoreGame(state, action: PayloadAction<GameState>) {
      state.artist = action.payload.artist;
      state.albums = action.payload.albums;
      state.settings = action.payload.settings;
    },

    setStoreArtist(state, action: PayloadAction<Artist>) {
      state.artist = action.payload;
    },

    setStoreSettings(state, action: PayloadAction<GameSettings>) {
      state.settings = action.payload;
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
    updateStoreEndGame(state, action: PayloadAction<boolean>) {
      state.settings.endGame = action.payload;
    },
    updateStoreShowFeedback(state, action: PayloadAction<boolean>) {
      state.settings.showFeedback = action.payload;
    },
  },
});

export const {
  setStoreArtist,
  setStoreAlbums,
  setStoreSettings,
  setStoreGame,
  updateStoreAttempts,
  incrementStoreScores,
  updateStoreIsCorrect,
  updateStoreShowFeedback,
  updateStoreRounds,
  updateStoreEndGame,
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
