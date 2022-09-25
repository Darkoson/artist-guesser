import { Album, Artist, GameSettings } from "../interfaces";

export enum LocalKeys {
  ARTIST = "game_artist",
  ALBUMS = "game_albums",
  SETTINGS = "game_settings",
}

export default class LocalService {
  static setArtist = (artist: Artist) => {
    localStorage.setItem(LocalKeys.ARTIST, JSON.stringify(artist));
  };

  static getArtist = (): Artist | null => {
    let artist: Artist | null = null;
    let stringVal = localStorage.getItem(LocalKeys.ARTIST);
    if (stringVal) {
      artist = JSON.parse(stringVal) as Artist;
    }
    return artist;
  };

  static setAlbums = (albums: Album[]) => {
    localStorage.setItem(LocalKeys.ALBUMS, JSON.stringify(albums));
  };

  static getAlbums = (): Album[] | null => {
    let albums: Album[] | null = null;
    let stringVal = localStorage.getItem(LocalKeys.ALBUMS);
    if (stringVal) {
      albums = JSON.parse(stringVal) as Album[];
    }
    return albums;
  };

  static setSettings = (albums: GameSettings) => {
    localStorage.setItem(LocalKeys.SETTINGS, JSON.stringify(albums));
  };

  static getSettings = (): GameSettings | null => {
    let settings: GameSettings | null = null;
    let stringVal = localStorage.getItem(LocalKeys.SETTINGS);
    if (stringVal) {
      settings = JSON.parse(stringVal) as GameSettings;
    }
    return settings;
  };
}
