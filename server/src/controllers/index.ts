import { Request, Response } from "express";
import { ApiResult, GameResult } from "../types";
import { Service } from "../services";
import { Artist } from "../db/entities/artist";

export const postGame = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as GameResult;
  console.log("data", data);

  result.data = await Service.saveGame(data);
  console.log("res=", result);
  if (!result.data) {
    result.ok = false;
  }

  return res.send(result);
};

export const postArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Artist;
  console.log("data", data);

  result.data = await Service.createArtist(data);
  console.log("res=", result);
  if (!result.data) {
    result.ok = false;
  }

  return res.status(200).send(result);
};

export const postBulkArtist = async (
  req: Request,
  res: Response<ApiResult>
) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Artist[];
  console.log("data", data);

  result.data = await Service.createBulkArtist(data);
  console.log("res=", result);
  if (!result.data) {
    result.ok = false;
  }

  return res.status(200).send(result);
};

export const getArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await Service.findArtist(id);

  return res.status(200).send(result);
};

export const getAllArtists = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await Service.listArtists();

  return res.status(200).send(result);
};

export const updateArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Artist;
  result.data = await Service.updateArtist(data);

  return res.status(200).send(result);
};

export const deleteArtist = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await Service.deleteArtist(id);

  return res.status(200).send(result);
};
