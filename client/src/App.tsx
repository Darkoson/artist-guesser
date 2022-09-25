import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Header from "./components/header";
import PlayGame from "./components/play-game";
import LocalService from "./services/local";
import { AppDispatch } from "./shared/store/config";
import {
  selectStoreAlbums,
  selectStoreArtist,
  selectStoreSettings,
  setStoreAlbums,
  setStoreArtist,
  setStoreSettings,
} from "./shared/store/game-slice";

function App() {
  const selectedArtist = useSelector(selectStoreArtist);
  const selectedAlbums = useSelector(selectStoreAlbums);
  const selectedSettings = useSelector(selectStoreSettings);

  const dispatch = useDispatch<AppDispatch>();

  /** This useEffect runs at the begining of the application:
   *  Its purpose is to revive the state of the application from the
   *  local storage of the browser
   */
  useEffect(() => {
    let storageAlbums = LocalService.getAlbums();
    let storageArtist = LocalService.getArtist();
    let storageSettings = LocalService.getSettings();

    if (storageAlbums && storageArtist && storageSettings) {
      dispatch(setStoreArtist(storageArtist));
      dispatch(setStoreAlbums(storageAlbums));
      dispatch(setStoreSettings(storageSettings));
    }

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
        LocalService.setArtist(selectedArtist);
        LocalService.setAlbums(selectedAlbums);
        LocalService.setSettings(selectedSettings);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AppContainer>
      <Header />
      <main>
        <PlayGame />
      </main>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: auto;
  border: 1px solid black;
  padding: 10px 50px;
  max-width: 800px;

  main {
  }
`;

export default App;
