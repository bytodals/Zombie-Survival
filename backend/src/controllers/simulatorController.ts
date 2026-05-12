import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/responseHandler";
import { getSimulatorOverview } from "../services/simulatorService";

export const getOverview = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getSimulatorOverview();
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};
