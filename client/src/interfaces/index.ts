export interface Artist {
  id: number;
  name: string;
}

export interface Album {
  id: number;
  name: string;
  artwork: string;
  artistId: number;
}

export interface iTuneResult {
  resultCount: number;
  results: any[];
}

export interface GameSettings {
  round: number;
  attempt: number;
  scores: number;
  isCorrect: boolean;
  endGame: boolean;
  showFeedback: boolean;
}
export interface GameResult {
  roundsCompleted: number;
  scores: number;
  username:string
}

export interface ApiResult<T = any> {
  ok: boolean;
  message: string;
  data: T;
}
