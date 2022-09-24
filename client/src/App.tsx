import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Header from "./components/header";
import PlayGame from "./components/play-game";
import { getRandomArtistAndAlbums } from "./services";
import { AppDispatch } from "./shared/store/config";
import {
  selectStoreAlbums,
  selectStoreArtist,
  selectStoreSettings,
  setStoreAlbums,
  setStoreArtist,
} from "./shared/store/game-slice";

function App() {
  const selectedArtist = useSelector(selectStoreArtist);
  const selectedAlbums = useSelector(selectStoreAlbums);
  const gameSettings = useSelector(selectStoreSettings);

  const dispatch = useDispatch<AppDispatch>();

  const [usedArtistIds, setUsedArtistIds] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedArtist) {
      changeArtistAndAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeArtistAndAlbums = () => {
    getRandomArtistAndAlbums(usedArtistIds).then(([newArtist, newAlbums]) => {
      console.log("new artist:", newArtist.name);
      //console.log("new albums:", newAlbums);

      setUsedArtistIds([...usedArtistIds, newArtist.id]);
      dispatch(setStoreArtist(newArtist));
      dispatch(setStoreAlbums(newAlbums));
    });
  };

  return (
    <AppContainer>
      <Header scores={gameSettings.scores} round={gameSettings.round} />
      {selectedArtist && (
        <main>
          <PlayGame
            albums={selectedAlbums}
            artist={selectedArtist}
            settings={gameSettings}
            changeArtistAndAlbums={changeArtistAndAlbums}
          />
        </main>
      )}
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
