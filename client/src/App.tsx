import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EndGame from "./components/end-game";

import Header from "./components/header";
import PlayGame from "./components/play-game";
import { useGameStorage } from "./shared/hooks/use-game-storage";
import { selectStoreSettings } from "./shared/store/game-slice";

function App() {
  const { fromReduxToLocalStorage, fromLocalStorageOrServerToRedux } =
    useGameStorage();
  const settings = useSelector(selectStoreSettings);

  // const dispatch = useDispatch<AppDispatch>();

  /** This useEffect runs at the begining of the application:
   *  Its purpose is to retrieve the state of the application from the
   *  local storage of the browser
   */
  useEffect(() => {
    fromLocalStorageOrServerToRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** This useEffect adds an event listener to the browser:
   *  The event listener is called when the user closes the browser
   *  The intent of the event listener is to persist the state of the
   *  game into the local storage before closing or refreshing.
   */
  useEffect(() => {
    window.addEventListener("beforeunload", () => fromReduxToLocalStorage());
  }, [fromReduxToLocalStorage]);

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
`;

export default App;
