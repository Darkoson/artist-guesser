import { configureStore } from "@reduxjs/toolkit";
import game from "./game-slice";

export const store = configureStore({
  reducer: { game },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
