import { Request, Response } from "express";
import { ApiResult} from "../types";
import { ArtistService } from "../services/artist-service";
import { Artist } from "../db/entities/artist";

export const postArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Artist;
  console.log("data", data);

  result.data = await ArtistService.createArtist(data);
  console.log("res=", result);
  if (!result.data) {
    result.ok = false;
  }

  return res.status(200).send(result);
};

export const postBulkArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Artist[];
  console.log("data", data);

  result.data = await ArtistService.createBulkArtist(data);
  console.log("res=", result);
  if (!result.data) {
    result.ok = false;
  }

  return res.status(200).send(result);
};

export const getArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await ArtistService.findArtist(id);

  return res.status(200).send(result);
};

export const getAllArtists = async (
  req: Request,
  res: Response<ApiResult>
) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await ArtistService.listArtists();

  return res.status(200).send(result);
};

export const updateArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Artist
  result.data = await ArtistService.updateArtist(data);

  return res.status(200).send(result);
};

export const deleteArtist = async (
  req: Request,
  res: Response<ApiResult>
) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await ArtistService.deleteArtist(id);

  return res.status(200).send(result);
};
