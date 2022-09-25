import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GameResult } from "../interfaces";
import RemoteService from "../services/remote";
import {
  selectStoreSettings,
  selectStoreUsername,
} from "../shared/store/game-slice";
import ScoresBoard from "./scores-board";

const EndGame = () => {
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [boardResults, setBoardResults] = useState<GameResult[]>([]);
  let { scores, round } = useSelector(selectStoreSettings);
  let username = useSelector(selectStoreUsername);
  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;

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

  return (
    <EndGameContainer>
      <div className="user-input">
        <input type="text" placeholder="Enter Full name" ref={inputEl} />
        <button
          onClick={saveGame}
          disabled={!showScoreBoard && inputEl.current.value.length < 3}>
          Submit
        </button>
      </div>

      {showScoreBoard && <ScoresBoard list={boardResults} />}
    </EndGameContainer>
  );
};

export default EndGame;

const EndGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 20px;
`;
