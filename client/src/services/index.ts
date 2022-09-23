import { Album } from "../interfaces";
import {
  ApiResult,
  Director,
  DirectorInput,
  Movie,
  MovieInput, 
} from "../shared/types";
import api from "./api";

export const iTuneAlbumsOfArtist = async (artistId: number): Promise<Album[]> => {
  let response = await api.iTuneGet(`id=${artistId}&entity=album`);
  if (response.data.resultCount) {
    return response.data.results.map((result) => ({
      id: result.collectionId,
      name: result.collectionName,
      artwork: result.artworkUrl60,
      artistId: result.artistId,
    }));
  }
  return [];
};
export const iTuneArtists = async (): Promise<Album[]> => {
  let response = await api.iTuneGet(`id=&entity=album`);
  if (response.data.resultCount) {
    return response.data.results.map((result) => ({
      id: result.collectionId,
      name: result.collectionName,
      artwork: result.artworkUrl60,
      artistId: result.artistId,
    }));
  }
  return [];
};



const errorResponse: ApiResult = {
  ok: false,
  message: "an error has occurred",
  data: null,
};

export const postMovie = async (
  data: MovieInput
): Promise<ApiResult<Movie>> => {
  try {
    let response = await api.post<Movie>("movies", data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

 

// directors requests
export const postDirector = async (
  data: DirectorInput
): Promise<ApiResult<Director>> => {
  try {
    let response = await api.post<Director>("Directors", data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const getDirector = async (id: number): Promise<ApiResult<Director>> => {
  try {
    let response = await api.get<Director>("directors/" + id);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};
export const getDirectors = async (): Promise<ApiResult<Director[]>> => {
  try {
    let response = await api.get<Director[]>("directors");
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const putDirector = async (
  data: Director
): Promise<ApiResult<Director>> => {
  try {
    let response = await api.put<Director>("directors/" + data.id, data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const deleteDirector = async (id: number): Promise<ApiResult> => {
  try {
    let response = await api.del<ApiResult<Director>>("directors/" + id);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};
 