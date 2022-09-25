import { Album, ApiResult, Artist, GameResult } from "../interfaces";
import api from "./api";
import defaultAlbums from "./albums.json";
import { shuffle } from "../shared/utils/array";

export default class RemoteService {
  static iTuneAlbumsOfArtist = async (artistId: number): Promise<Album[]> => {
    let response = await api.iTuneGet(`id=${artistId}&entity=album`);
    if (response.data.resultCount) {
      response.data.results
        .map((result) => ({
          id: result.collectionId,
          name: result.collectionName,
          artwork: result.artworkUrl60,
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

  static getRandomArtistAndAlbums = async (
    usedIds: number[]
  ): Promise<[Artist, Album[]]> => {
    let artist = await RemoteService.getRandomArtist(usedIds);
    let foundAlbums = await RemoteService.iTuneAlbumsOfArtist(artist.id);
    console.log("albums: ", foundAlbums);
    let albums = defaultAlbums;
    if (foundAlbums.length > 3) {
      albums = shuffle(foundAlbums).slice(0, 3);
    }
    return [artist, albums];
  };

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
