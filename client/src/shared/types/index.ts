export type DirectorInput = Omit<Director, "id">;

export type Director = {
  id: number;
  first_name: string;
  last_name: string;
};

export type MovieInput  = {
  name: string;
  release_year: number;
  director:  number;
};
export type MovieUpdateInput = MovieInput & {id: number};

export type Movie = {
  id: number;
  name: string;
  release_year: number;
  director: Director ;
};

export type ApiResult<T=any> = {
  ok: boolean;
  message: string;
  data: T;
};
