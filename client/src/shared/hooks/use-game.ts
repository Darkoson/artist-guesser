import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RemoteService from "../../services/remote";
import { AppDispatch } from "../store/config";
import {
  initialGameState,
  selectStoreSettings,
  setStoreAlbums,
  setStoreArtist,
  setStoreGame,
  updateStoreAttempts,
  updateStoreEndGame,
  updateStoreIsCorrect,
  updateStoreRounds,
  updateStoreShowFeedback,
  updateStoreUsedArtistIds,
} from "../store/game-slice";

export const useGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector(selectStoreSettings);

  /**
   * This function makes call to the service that select ramdom artist
   *    from our Backend API and its associated albums from iTunes API
   *   - When the data is retrieved, it's then stored in the state
   *   - It keeps track of the already selected artist, so that when
   *     retrieving new random artist, old ones are no more selected again
   */
  const getArtistAndAlbumsFromServer = () => {
    RemoteService.getRandomArtistAndAlbums(settings.usedArtistIds).then(
      ([newArtist, newAlbums]) => {
        dispatch(updateStoreUsedArtistIds(newArtist.id));
        dispatch(setStoreArtist(newArtist));
        dispatch(setStoreAlbums(newAlbums));
      }
    );
  };

  /**
   * This function resets the game
   * - Set the state to the initial state
   * - Resets the array of used artists to empty
   *  loads new artist and albums from APIs
   */
  const resetGame = () => {
    dispatch(setStoreGame(initialGameState));
    getArtistAndAlbumsFromServer();
  };

  /**
   *  This functions is called when the
   */
  const GiveUserFeedback = (isCorrect: boolean) => {
    dispatch(updateStoreIsCorrect(isCorrect));
    dispatch(updateStoreShowFeedback(true));
    // this timeout is needed because we want show feedback
    // for 1 second and later move to the next step
    setTimeout(() => updateStoreShowFeedback(false), 1000);
  };

  /** This function is called:
   *  - when the the user's guess is correct or
   *  - when the user's attempt has reached 3
   * **/
  const nextRound = () => {
    dispatch(updateStoreRounds(settings.round + 1));
    dispatch(updateStoreAttempts(0));
    getArtistAndAlbumsFromServer();
  };

  /**
   *  This functions is called when the
   */
  const backToGame = () => {
    dispatch(updateStoreEndGame(false));
  };

  /**
   *  This functions is called when the
   */
  const completeGame = () => {
    dispatch(updateStoreEndGame(true));
  };

  return {
    getArtistAndAlbumsFromServer,
    GiveUserFeedback,
    nextRound,
    resetGame,
    completeGame,
    backToGame,
  };
};
