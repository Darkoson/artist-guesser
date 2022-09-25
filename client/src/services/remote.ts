import { Album, ApiResult, Artist, GameResult } from "../interfaces";
import api from "./api";
import defaultAlbums from "./albums.json";
import { shuffle } from "../shared/utils/array";

export default class RemoteService {
  static iTuneAlbumsOfArtist = async (artistId: number): Promise<Album[]> => {
    let response = await api.iTuneGet(`id=${artistId}&entity=album`);
    if (response.data.resultCount) {
      return response.data.results
        .map((result) => ({
          id: result.collectionId,
          name: result.collectionName,
          artwork: result.artworkUrl100 || result.artworkUrl60,
          artistId: result.artistId,
        }))
        .filter(
          (album: Album) =>
            album.id !== undefined &&
            album.name !== undefined &&
            album.artwork !== undefined
        );
    }
    return [];
  };

  static getRandomArtist = async (usedIds: number[]): Promise<Artist> => {
    let response = await RemoteService.getArtists();
    if (response.ok && response.data) {
      const newArtists = response.data.filter(
        (artist) => !usedIds.includes(artist.id)
      );
      const n = newArtists.length;
      return newArtists[Math.floor(Math.random() * n)];
    }

    return { id: 0, name: "" };
  };

  /** This functions returns all the artists
   *  From our API
   */
  static getArtists = async (): Promise<ApiResult<Artist[]>> => {
    try {
      let response = await api.get<Artist[]>("artists");
      return response.data;
    } catch (err: any) {
      let errorResponse: ApiResult = {
        ok: false,
        message: err.message,
        data: null,
      };
      return errorResponse;
    }
  };

  /** This function selects a Random
   *  Artist from our list of artists stored in the database
   * and randomly selects 3 the albums of the artist, from iTunes
   */
  static getRandomArtistAndAlbums = async (
    usedIds: number[]
  ): Promise<[Artist, Album[]]> => {
    let artist = await RemoteService.getRandomArtist(usedIds);
    let foundAlbums = await RemoteService.iTuneAlbumsOfArtist(artist.id);
    console.log("iTunes albums: ", foundAlbums);
    let albums = defaultAlbums;
    if (foundAlbums.length > 3) {
      albums = shuffle(foundAlbums).slice(0, 3);
    }
    return [artist, albums];
  };

  /** This function is responsible for saving the progression
   *  of a user and then returns the list of stored games:
   * - This is used to construct the scores board
   */
  static saveGame = async (gameData: GameResult): Promise<GameResult[]> => {
    try {
      let response = await api.post<GameResult[]>("games", gameData);
      return response.data.data as GameResult[];
    } catch (err: any) {
      console.log(err);
      return [];
    }
  };
}
