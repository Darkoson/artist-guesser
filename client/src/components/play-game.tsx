import React, { FC } from "react";
import styled from "styled-components";
import { Album, Artist, GameSettings } from "../interfaces";
import AlbumList from "./album-list";
import Feedback from "./feedback";
import InputForm from "./input-form";

import {
  incrementStoreScores,
  selectStoreSettings,
  updateStoreAttempts,
  updateStoreIsCorrect,
  updateStoreRounds,
  updateStoreShowFeedback,
} from "../shared/store/game-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../shared/store/config";
import { useSelector } from "react-redux";

interface PlayGameProps {
  settings: GameSettings;
  artist: Artist;
  albums: Album[];
  changeArtistAndAlbums: () => void;
}
const PlayGame: FC<PlayGameProps> = (props) => {
  let { attempt, round, isCorrect, scores } = useSelector(selectStoreSettings);

  const points = [5, 3, 1];
  const dispatch = useDispatch<AppDispatch>();

  const check = (guessed: string) => {
    attempt++;
    let userGuess: string = guessed.toLowerCase().trim();
    let actualName: string = props.artist.name.toLowerCase().trim();
    isCorrect = userGuess === actualName;
    dispatch(updateStoreIsCorrect(isCorrect));
    if (isCorrect) {
      dispatch(incrementStoreScores(points[attempt - 1]));
    }
    dispatch(updateStoreShowFeedback(true));

    setTimeout(() => proceedNextStep(), 1000);
  };

  const log = (one: string) => {
    console.log(
      one,
      "-  round=" +
        round +
        " attempt=" +
        attempt +
        " found=" +
        isCorrect +
        " scores=" +
        scores
    );
  };

  const proceedNextStep = () => {
    dispatch(updateStoreAttempts(attempt));
    dispatch(updateStoreShowFeedback(false));
    log("inside proceedNextStep:");

    // case where an attempt is over and move to next round
    if (isCorrect || attempt === 3) {
      proceedNextRound();
    } else {
      console.log("round we are still in the same round");
    }
  };

  const proceedNextRound = () => {
    log("begin proceedNextRound:");
    round++;

    // case where the user hasn't exausted the 5 rounds yet
    if (round < 6) {
      log("starting new round");
      dispatch(updateStoreRounds(round));
      props.changeArtistAndAlbums();
      dispatch(updateStoreIsCorrect(false));
      dispatch(updateStoreAttempts(0));
      log("End proceedNextRound:");
    }
    // redired to the end of the game
    else {
      console.log("the game finished");
    }
  };

  return (
    <PlayGameContainer>
      <AlbumList albums={props.albums} attempt={attempt} />

      <div className="form">
        <div className="test">attempt tried : {props.settings.attempt}</div>
        <div className="test">
          round : {props.settings.round}| {round}
        </div>
        <div className="question">
          For <span>{points[attempt]}</span> Points <br />
          Who is the artist ?
        </div>
        <div className="input">
          <Feedback
            show={props.settings.showFeedback}
            status={props.settings.isCorrect}
          />
          <InputForm
            emit={check}
            attempt={props.settings.attempt}
            artwork={""}
          />
        </div>
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

  .form {
    .input {
      display: grid;
      grid-template-columns: 50px 1fr;
    }
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
