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

export const useGameStorage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const artist = useSelector(selectStoreArtist);
  const albums = useSelector(selectStoreAlbums);
  const settings = useSelector(selectStoreSettings);

  const reduxToLocalStorage = () => {
    let storageAlbums = LocalService.getAlbums();
    let storageArtist = LocalService.getArtist();
    let storageSettings = LocalService.getSettings();

    if (storageAlbums && storageArtist && storageSettings) {
      dispatch(setStoreArtist(storageArtist));
      dispatch(setStoreAlbums(storageAlbums));
      dispatch(setStoreSettings(storageSettings));
    }
  };

  const localStorageToRedux = () => {
    LocalService.setArtist(artist);
    LocalService.setAlbums(albums);
    LocalService.setSettings(settings);
  };

  return {reduxToLocalStorage, localStorageToRedux};
};
