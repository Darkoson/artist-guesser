import React from "react";
import styled from "styled-components";
import AlbumList from "./album-list";
import Feedback from "./feedback";
import InputForm from "./input-form";

import {
  incrementStoreScores,
  selectStoreAlbums,
  selectStoreArtist,
  selectStoreSettings,
  updateStoreAttempts,
} from "../shared/store/game-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../shared/store/config";
import { useSelector } from "react-redux";
import { useGame } from "../shared/hooks/use-game";

/**
 * This is the component that implements the logic of the game
 *
 * @returns Tsx component
 */
const PlayGame = () => {
  const artist = useSelector(selectStoreArtist);
  const albums = useSelector(selectStoreAlbums);
  let { attempt, round, isCorrect, showFeedback } =
    useSelector(selectStoreSettings);

  const { GiveUserFeedback, resetGame, nextRound, completeGame } = useGame();

  const points = [5, 3, 1];
  const dispatch = useDispatch<AppDispatch>();

  /** when the user sumbits the guessed names,
   *  this function is called to validate the name
   *  this function is passed as props to the input-form element
   */
  const checkInput = (guessed: string) => {
    let userGuess: string = guessed.toLowerCase().trim();
    let actualName: string = artist.name.toLowerCase().trim();
    isCorrect = userGuess === actualName;

    // we display the feedback to the user
    GiveUserFeedback(isCorrect);
    if (isCorrect) {
      dispatch(incrementStoreScores(points[attempt]));
    }

    attempt++;
    dispatch(updateStoreAttempts(attempt));

    if (round < 5 && (isCorrect || attempt > 2)) {
      nextRound();
    } else if (round === 5 && (isCorrect || attempt > 2)) {
      completeGame();
    }
  };

  return (
    <PlayGameContainer>
      <AlbumList albums={albums} attempt={attempt} />

      <div className="form">
        <div className="test">Attempt tried : {attempt}</div>
        <div className="question">
          For <span className="points">{points[attempt]}</span> Points : Who is
          the artist ?
        </div>
        <div className="input">
          <Feedback show={showFeedback} status={isCorrect} />
          <InputForm onEmit={checkInput} attempt={attempt} artwork={""} />
        </div>
      </div>
      <div className="buttons">
        <button className="reset" onClick={resetGame}>
          Reset
        </button>
        <button className="save" onClick={completeGame}>
          End game
        </button>
      </div>
    </PlayGameContainer>
  );
};

export default PlayGame;

const PlayGameContainer = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  .points {
    padding: 2px 10px;
    background-color: brown;
    color: white;
    font-size: 12px;
    border-radius: 8px;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .input {
      display: grid;
      grid-template-columns: 50px 1fr;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    .reset,
    .save {
      margin: 0px 20px;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
