import { Request, Response, NextFunction } from "express";
import * as service from "../services/zombieBehaviorService.js";
import { sendSuccess } from "../utils/responseHandler.js";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
    const data = await service.getAllZombieBehaviors();
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};