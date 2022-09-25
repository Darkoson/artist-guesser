export type ApiResult = {
  ok: boolean;
  message: string;
  data: any;
};

export type GameResult = {
  roundsCompleted: number;
  scores: number;
  username: string;
};
