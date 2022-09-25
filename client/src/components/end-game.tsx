import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GameResult } from "../interfaces";
import RemoteService from "../services/remote";
import { AppDispatch } from "../shared/store/config";
import {
  initialGameState,
  selectStoreSettings,
  selectStoreUsername,
  setStoreGame,
  updateStoreEndGame,
} from "../shared/store/game-slice";
import ScoresBoard from "./scores-board";

const EndGame = () => {
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [boardResults, setBoardResults] = useState<GameResult[]>([]);
  let { scores, round } = useSelector(selectStoreSettings);
  let username = useSelector(selectStoreUsername);
  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    inputEl.current.value = username;
  }, [username]);

  const saveGame = () => {
    const data: GameResult = {
      scores,
      username: inputEl.current.value,
      roundsCompleted: round,
    };
    RemoteService.saveGame(data).then((results: GameResult[]) => {
      setBoardResults(results);
      setShowScoreBoard(true);
    });
  };

  const restartGame = () => {
    dispatch(setStoreGame(initialGameState));
    dispatch(updateStoreEndGame(false));
  };

  return (
    <EndGameContainer>
      {!showScoreBoard && (
        <div className="user-form">
          <h3 className="title"> Congratulations ! ! !</h3>
          <div className="user-input">
            <input
              type="text"
              placeholder="Enter your username"
              ref={inputEl}
            />
            <button
              onClick={saveGame}
              disabled={!showScoreBoard && inputEl?.current?.value.length < 3}>
              Save
            </button>
          </div>
        </div>
      )}
      <button onClick={restartGame}>Start New Game</button>

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
  gap: 20px;
`;
