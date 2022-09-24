import { Album, ApiResult, Artist } from "../interfaces";
import api from "./api";
import defaultAlbums from "./albums.json";
import { shuffle } from "../shared/utils/array";

export const iTuneAlbumsOfArtist = async (
  artistId: number
): Promise<Album[]> => {
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

const errorResponse: ApiResult = {
  ok: false,
  message: "an error has occurred",
  data: null,
};

export const getRandomArtist = async (usedIds: number[]): Promise<Artist> => {
  let response = await getArtists();
  if (response.ok && response.data) {
    const newArtists = response.data.filter(
      (artist) => !usedIds.includes(artist.id)
    );
    const n = newArtists.length;
    return newArtists[Math.floor(Math.random() * n)];
  }
  return { id: 0, name: "" };
};

export const getArtists = async (): Promise<ApiResult<Artist[]>> => {
  try {
    let response = await api.get<Artist[]>("artists");
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const getRandomArtistAndAlbums = async (
  usedIds: number[]
): Promise<[Artist, Album[]]> => {
  let artist = await getRandomArtist(usedIds);
  let foundAlbums = await iTuneAlbumsOfArtist(artist.id);
  console.log("albums: ", foundAlbums);
  let albums = defaultAlbums;
  if (foundAlbums.length > 3) {
    albums = shuffle(foundAlbums).slice(0, 3);
  }
  return [artist, albums];
};
