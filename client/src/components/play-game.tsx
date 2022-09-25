import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AlbumList from "./album-list";
import Feedback from "./feedback";
import InputForm from "./input-form";

import {
  incrementStoreScores,
  initialGameState,
  selectStoreAlbums,
  selectStoreArtist,
  selectStoreSettings,
  setStoreAlbums,
  setStoreArtist,
  setStoreGame,
  updateStoreAttempts,
  updateStoreEndGame,
  updateStoreIsCorrect,
  updateStoreRounds,
  updateStoreShowFeedback,
} from "../shared/store/game-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../shared/store/config";
import { useSelector } from "react-redux";
import RemoteService from "../services/remote";

/**
 * This is the component that implements the logic of the game
 *
 * @returns Tsx component
 */
const PlayGame = () => {
  const [usedArtistIds, setUsedArtistIds] = useState<number[]>([]);
  const artist = useSelector(selectStoreArtist);
  const albums = useSelector(selectStoreAlbums);
  let { attempt, round, isCorrect, showFeedback, scores } =
    useSelector(selectStoreSettings);

  const points = [5, 3, 1];
  const dispatch = useDispatch<AppDispatch>();

  /** when the user sumbits the guessed names,
   *  this function is called to validate the name
   *  this function is passed as props to the input-form element
   */
  const checkInput = (guessed: string) => {
    attempt++;
    let userGuess: string = guessed.toLowerCase().trim();
    let actualName: string = artist.name.toLowerCase().trim();
    isCorrect = userGuess === actualName;
    dispatch(updateStoreIsCorrect(isCorrect));
    if (isCorrect) {
      dispatch(incrementStoreScores(points[attempt - 1]));
    }
    dispatch(updateStoreShowFeedback(true));

    // this timeout is needed because we want show feedback
    // for 1 second and later move to the next step
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

  /** This function decides whether the user is elligible
   *  to move to the next round or has to try another
   *  attempt in the current round.
   */
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

  /**
   * This function resets the game
   * - Set the state to the initial state
   * - Resets the array of used artists to empty
   *  loads new artist and albums from APIs
   */
  const resetGame = () => {
    dispatch(setStoreGame(initialGameState));
    setUsedArtistIds([]);
    changeArtistAndAlbums();
  };

  /**
   * This method checks whether the user is allowed to start a round: if so,
   *  - it resets (attempt, isCorrect)
   *  - it radomly select another artist from DB and loads 3 albums from iTunes
   * Case where no round is allowed:
   * - the user is shown a page to save the game
   */
  const proceedNextRound = () => {
    log("begin proceedNextRound:");
    round++;

    // case where the user hasn't exausted the 5 rounds yet
    if (round < 6) {
      log("starting new round");
      dispatch(updateStoreRounds(round));
      dispatch(updateStoreIsCorrect(false));
      dispatch(updateStoreAttempts(0));
      changeArtistAndAlbums();
      log("End proceedNextRound:");
    }
    // redired to the end of the game
    else {
      console.log("the game finished");
    }
  };

  /**
   * This function makes call to the service that select ramdom artist
   *    from our Backend API and its associated albums from iTunes API
   *   - When the data is retrieved, it's then stored in the state
   *   - It keeps track of the already selected artist, so that when
   *     retrieving new random artist, old ones are no more selected again
   */
  const changeArtistAndAlbums = () => {
    RemoteService.getRandomArtistAndAlbums(usedArtistIds).then(
      ([newArtist, newAlbums]) => {
        console.log("App new artist:", newArtist.name);
        //console.log("new albums:", newAlbums);
        setUsedArtistIds([...usedArtistIds, newArtist.id]);
        dispatch(setStoreArtist(newArtist));
        dispatch(setStoreAlbums(newAlbums));
      }
    );
  };

  /**
   * When the component is monted and no artist is available in the store,
   * We then load a new one
   */
  useEffect(() => {
    if (!artist.id || !artist.name) {
      changeArtistAndAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlayGameContainer>
      <AlbumList albums={albums} attempt={attempt} />

      <div className="form">
        <div className="test">attempt tried : {attempt}</div>
        <div className="test">round : {round}</div>
        <div className="question">
          For <span>{points[attempt]}</span> Points <br />
          Who is the artist ?
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
        <button
          className="save"
          onClick={() => dispatch(updateStoreEndGame(true))}>
          Save game
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

  .form {
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
