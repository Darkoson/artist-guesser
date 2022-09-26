import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GameResult } from "../interfaces";
import RemoteService from "../services/remote";
import { useGame } from "../shared/hooks/use-game";
import { AppDispatch } from "../shared/store/config";
import {
  selectStoreSettings,
  selectStoreUsername,
  updateStoreUsername,
} from "../shared/store/game-slice";
import ScoresBoard from "./scores-board";

const EndGame = () => {
  let { scores, round } = useSelector(selectStoreSettings);
  let storeUsername = useSelector(selectStoreUsername);
  const [username, setUsername] = useState(storeUsername);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [boardResults, setBoardResults] = useState<GameResult[]>([]);
  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch<AppDispatch>();
  const { resetGame, backToGame } = useGame();

  useEffect(() => {}, [storeUsername]);

  const saveGame = () => {
    const data: GameResult = {
      scores,
      username: inputEl.current.value,
      roundsCompleted: round,
    };
    dispatch(updateStoreUsername(username));
    RemoteService.saveGame(data).then((results: GameResult[]) => {
      setBoardResults(results);
      setShowScoreBoard(true);
    });
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <EndGameContainer>
      {!showScoreBoard && (
        <div className="user-options">
          <h3 className="title"> Thank you ! ! !</h3>
          <div className="user-input">
            <input
              type="text"
              placeholder="Enter your username"
              onChange={handleChangeUsername}
              defaultValue={username}
            />
            <button onClick={saveGame} disabled={username.length < 3}>
              Save
            </button>
          </div>
        </div>
      )}
      <div className="buttons">
        <button onClick={backToGame}>{"<< Back "}</button>
        <button onClick={resetGame}>New Game</button>
      </div>

      {showScoreBoard && <ScoresBoard list={boardResults} />}
    </EndGameContainer>
  );
};

export default EndGame;

const EndGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 50px;

  .user-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .buttons {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
