import { Movie } from "../db/entities/movie";
import { Director } from "../db/entities/director";

export type IMovieInput = Omit<Movie, "id">;
export type IDirectorInput = Omit<Director, "id" | "movies">;

export type ApiResult = {
  ok: boolean;
  message: string;
  data: any;
};
