import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EndGame from "./components/end-game";

import Header from "./components/header";
import PlayGame from "./components/play-game";
import LocalService from "./services/local";
import { useGameStorage } from "./shared/hooks/use-game-storage";
import { AppDispatch } from "./shared/store/config";
import {
  selectStoreSettings,
  selectStoreAlbums,
  selectStoreArtist,
  setStoreAlbums,
  setStoreArtist,
  setStoreSettings,
} from "./shared/store/game-slice";

function App() {
  const { localStorageToRedux, reduxToLocalStorage } = useGameStorage();
  // const artist = useSelector(selectStoreArtist);
  // const albums = useSelector(selectStoreAlbums);
  const settings = useSelector(selectStoreSettings);

  // const dispatch = useDispatch<AppDispatch>();

  /** This useEffect runs at the begining of the application:
   *  Its purpose is to revive the state of the application from the
   *  local storage of the browser
   */
  useEffect(() => {
    localStorageToRedux();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** This useEffect adds an event listener to the brower:
   *  The event listener is called when the user closes the browser
   *  The intent of the event listener is to persist the state of the
   *  game into the local storage.
   */
  useEffect(
    () => {
      window.addEventListener("beforeunload", () => {
        reduxToLocalStorage();
        // LocalService.setArtist(artist);
        // LocalService.setAlbums(albums);
        // LocalService.setSettings(settings);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AppContainer>
      <Header />
      <main>{settings.endGame ? <EndGame /> : <PlayGame />}</main>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: auto;
  border: 1px solid black;
  padding: 10px 20px;
  max-width: 800px;

  main {
  }
`;

export default App;
