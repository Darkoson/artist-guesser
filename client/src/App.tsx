import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AlbumList from "./components/albums";
import InputForm from "./components/input-form";
import { Artist } from "./interfaces";

function App() {
  const [attempt, setAttempt] = useState(0);
  let selectedArtist: Artist = { id: 1, name: "Artist" };

  useEffect(() => {}, []);

  const check = (found: boolean) => {
    setAttempt((at) => at + 1);

    return;
  };

  return (
    <AppContainer>
      <h2 className="app-title"> Guess The Artist </h2>
      <header>
        <h3 className="round">Round: 1 </h3>
        <h3 className="scores">
          Total Scores: <span>451</span>
        </h3>
      </header>

      <main>
        <AlbumList />
        <InputForm
          emit={check}
          attempt={attempt}
          artist={selectedArtist}
          artwork={""}
        />
      </main>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: auto;
  border: 1px solid black;
  padding: 10px 50px;
  max-width: 800px;
  .app-title {
    text-align: center;
    font-weight: 1000;
    color: red;
  }
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  main {
    margin-bottom: 50px;
    display: grid;
    gap: 80px;

    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default App;
