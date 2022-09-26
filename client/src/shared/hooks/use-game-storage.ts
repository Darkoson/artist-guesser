import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LocalService from "../../services/local";
import { AppDispatch } from "../store/config";
import {
  selectStoreAlbums,
  selectStoreArtist,
  selectStoreSettings,
  setStoreAlbums,
  setStoreArtist,
  setStoreSettings,
} from "../store/game-slice";
import { useGame } from "./use-game";

export const useGameStorage = () => {
  const { getArtistAndAlbumsFromServer } = useGame();
  const dispatch = useDispatch<AppDispatch>();
  const artist = useSelector(selectStoreArtist);
  const albums = useSelector(selectStoreAlbums);
  const settings = useSelector(selectStoreSettings);

  /** Function that saves local storage data into redux store */
  const fromLocalStorageOrServerToRedux = () => {
    // We first need to get the local storage data
    let storageArtist = LocalService.getArtist();
    let storageAlbums = LocalService.getAlbums();
    let storageSettings = LocalService.getSettings();

    // if the data is available, then we set it in redux store
    if (storageArtist && storageArtist.id && storageAlbums && storageSettings) {
      dispatch(setStoreArtist(storageArtist));
      dispatch(setStoreAlbums(storageAlbums));
      dispatch(setStoreSettings(storageSettings));
    }
    // case the local storage data in not available, we get new from server
    else {
      // This function automatically updates the redux store
      getArtistAndAlbumsFromServer();
    }
  };

  /** This fuction saves the redux data into the local storage */
  const fromReduxToLocalStorage = () => {
    LocalService.setArtist(artist);
    LocalService.setAlbums(albums);
    LocalService.setSettings(settings);
  };

  return { fromReduxToLocalStorage, fromLocalStorageOrServerToRedux };
};
